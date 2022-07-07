import { PrismaClient, Prisma } from '../src/generated/prisma-client.ts';

const categories: Prisma.Enumerable<Prisma.CategoryCreateManyInput> = [
  {
    name: 'Kopi',
  },
  {
    name: 'Teh',
  },
  {
    name: 'Susu',
  },
];

const compositions: Prisma.Enumerable<Prisma.CompositionCreateManyInput> = [
  {
    name: 'Kopi hitam',
    stock: 20,
    unit: 'kg',
  },
  {
    name: 'Teh',
    stock: 50,
    unit: 'kg',
  },
  {
    name: 'Susu',
    stock: 35,
    unit: 'kg',
  },
  {
    name: 'Air putih',
    stock: 20,
    unit: 'L',
  },
];

async function seed() {
  console.info('Seeding database...');
  const prisma = new PrismaClient();

  try {
    console.info('Seeding categories');
    await prisma.category.createMany({
      data: categories,
    });

    console.info('Seeding compositions');
    await prisma.composition.createMany({
      data: compositions,
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
