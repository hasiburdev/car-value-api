import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

global.beforeEach(async () => {
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
    await prisma.$connect();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
  }
});
