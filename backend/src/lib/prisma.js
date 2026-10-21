const { PrismaClient } = require('@prisma/client');

// Use a shared singleton PrismaClient instance across all routes.
// In serverless environments (like Vercel), instantiating multiple PrismaClient
// instances creates separate connection pools that quickly exhaust PostgreSQL connection limits.
// Attaching to global in non-production preserves the connection across hot-reloads.
const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
