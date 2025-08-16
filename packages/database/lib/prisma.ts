import { PrismaClient } from "@prisma/client";

// This is needed to prevent multiple instances of Prisma Client in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create Prisma Client singleton
const prismaClient = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ['query', 'error', 'warn'] : ['error'],
});

// Save reference in development to prevent multiple instances
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaClient;

export const prisma = prismaClient;
