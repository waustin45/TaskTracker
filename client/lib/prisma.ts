// lib/prisma.ts
import { PrismaClient } from "@/prismaLib/generated/prisma";

// Add the Prisma Client instance to the global object in development
// to prevent hot-reloading from creating new instances on every save.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// 1. Check for existing instance (during hot-reload in dev)
const prisma = global.prisma || new PrismaClient({
  log: ['query'], // Optional: logs all queries to the console
});

// 2. In development, save the instance to the global object
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;