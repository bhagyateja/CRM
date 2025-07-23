import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.create({
    data: {
      name: 'Acme Corp',
      users: {
        create: [
          {
            email: 'admin@acme.com',
            passwordHash: 'hashedpassword',
            role: 'ADMIN'
          },
          {
            email: 'sales@acme.com',
            passwordHash: 'hashedpassword',
            role: 'SALES'
          }
        ]
      },
      contacts: {
        create: [
          {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            company: 'ClientCo',
            notes: 'Interested in product A'
          }
        ]
      },
      deals: {
        create: [
          {
            name: 'Big Deal',
            value: 15000,
            stage: 'QUALIFIED'
          }
        ]
      }
    }
  });

  console.log('Seeded org:', org);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
