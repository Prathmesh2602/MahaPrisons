#!/usr/bin/env bash
# Run a shell command on the server (no SSH needed; goes through AWS Systems Manager) and print its output.
#   ./run-on-server.sh "docker compose -f /opt/mahaprisons/docker-compose.yml ps"
set -euo pipefail
export AWS_PROFILE="${AWS_PROFILE:-default}" AWS_REGION="${AWS_REGION:-ap-south-1}" AWS_PAGER=""
INSTANCE="$(aws ec2 describe-instances --filters Name=tag:Name,Values=mahaprisons-api Name=instance-state-name,Values=running --query 'Reservations[0].Instances[0].InstanceId' --output text)"
PARAMS="$(mktemp)"; trap 'rm -f "$PARAMS"' EXIT
python3 -c 'import json,sys; print(json.dumps({"executionTimeout":["1800"],"commands":[sys.argv[1]]}))' "$1" > "$PARAMS"
# A freshly launched server takes a minute or two before the SSM agent registers.
for i in $(seq 1 40); do
  [ "$(aws ssm describe-instance-information --filters Key=InstanceIds,Values="$INSTANCE" --query 'length(InstanceInformationList)' --output text)" = 1 ] && break
  sleep 6
done
CMD="$(aws ssm send-command --instance-ids "$INSTANCE" --document-name AWS-RunShellScript --timeout-seconds 600 --parameters "file://$PARAMS" --query Command.CommandId --output text)"
while st="$(aws ssm get-command-invocation --command-id "$CMD" --instance-id "$INSTANCE" --query Status --output text 2>/dev/null || echo Pending)"; [ "$st" = InProgress ] || [ "$st" = Pending ]; do sleep 3; done
aws ssm get-command-invocation --command-id "$CMD" --instance-id "$INSTANCE" --query '[StandardOutputContent,StandardErrorContent]' --output text
[ "$st" = Success ] || { echo "Command ended with status: $st" >&2; exit 1; }
