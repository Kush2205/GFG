// Export the prisma singleton from lib/prisma.ts
export { prisma } from './lib/prisma.ts';

// Re-export PrismaClient for types
export type { PrismaClient } from '@prisma/client';