import { hash } from 'argon2';
import { PrismaClient } from '../src/generated/prisma-client.ts';

async function seed() {
  console.info('Seeding database...');
  const prisma = new PrismaClient();

  try {
    const username = 'admin';
    const password = await hash('narkopika');
    const user = await prisma.user.create({
      data: {
        full_name: 'Admin Narkopika',
        username,
        password,
        roles: ['admin'],
      },
    });

    console.info('Seeding default admin user');
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    });
  } catch (err) {
    console.error('Seeding database failed!');
    console.error(err);
  } finally {
    void prisma.$disconnect();
  }

  console.info('Seeded database successfully');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
