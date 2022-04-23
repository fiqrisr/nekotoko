import { hash } from 'argon2';
import { PrismaClient } from '../src/generated/prisma-client.ts';

async function seed() {
  console.info('Seeding database...');

  const prisma = new PrismaClient();
  const username = 'admin';
  const password = await hash('narkopika');
  const user = await prisma.user.create({
    data: {
      full_name: 'Admin Narkopika',
      username,
      password,
      role: ['admin'],
    },
  });

  await prisma.user.upsert({
    where: { username: user.username },
    update: {},
    create: user,
  });

  void prisma.$disconnect();

  console.info('Seeded database successfully');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
