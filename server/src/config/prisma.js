import { PrismaClient } from "@prisma/client";

// One shared client. Creating many clients would exhaust database connections.
export const prisma = new PrismaClient();