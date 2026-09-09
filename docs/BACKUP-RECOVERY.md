# Backup & Disaster Recovery Procedures

## Database Backups (PostgreSQL)
- **Schedule**: Automated full backups are taken daily at 02:00 IST via cron job.
- **Retention Policy**: Backups are retained for 30 days in off-site encrypted S3 storage.
- **Command**:
  ```bash
  docker exec -t postgres-db pg_dumpall -c -U postgres > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
  ```

## Disaster Recovery Time Objective (RTO)
- Expected recovery time from a complete failure is **< 4 hours**.
- The `seedFromLegacyData.js` pipeline ensures a baseline can always be established in minutes if needed.

## Redis Cache
- Redis acts purely as an ephemeral caching layer and does not require backups. If the Redis container fails, the application gracefully falls back to database queries.
