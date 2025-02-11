import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function connect() {
    await prisma.$connect();
    console.log("Connected to the database...");
};


export { connect };