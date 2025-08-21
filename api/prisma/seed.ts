import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.create({
    data: { name: 'Minha Empresa' }
  });

  const passwordHash = await bcrypt.hash('123456', 10);

  await prisma.user.create({
    data: {
      name: 'Danilo',
      email: 'danilo@example.com',
      password: passwordHash,
      role: 'ADMIN',
      tenantId: tenant.id,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
