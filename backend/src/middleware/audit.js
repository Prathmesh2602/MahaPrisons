const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const auditLogger = (action) => {
  return async (req, res, next) => {
    // Capture the original json to intercept the response status
    const originalJson = res.json.bind(res);
    
    res.json = (body) => {
      // Execute original response
      originalJson(body);

      // Only log successful mutations
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        // Fire and forget audit log creation
        prisma.auditLog.create({
          data: {
            userId: req.user.userId,
            action: action,
            resource: req.baseUrl + req.path,
            resourceId: req.params.id || null,
            diff: req.body || {},
            ipAddress: req.ip || req.connection.remoteAddress
          }
        }).catch(err => console.error('Audit Log Error:', err));
      }
    };
    next();
  };
};

module.exports = { auditLogger };
