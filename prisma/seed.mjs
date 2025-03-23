import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const now = Math.floor(Date.now() / 1000);
  
  // Create admin user using raw SQL
  const result = await prisma.$executeRaw`
    INSERT INTO "User" (id, email, name, role, "createdAt", "updatedAt")
    VALUES (
      ${`cm8kts6au00008oe2dur82izo`},
      'admin@chif.org',
      'Admin',
      'ADMIN',
      ${now},
      ${now}
    )
    ON CONFLICT (email) DO UPDATE
    SET "updatedAt" = ${now}
    RETURNING *;
  `;

  const admin = await prisma.user.findUnique({
    where: { email: 'admin@chif.org' }
  });

  console.log({ admin });

  // Create leadership team
  const leadershipTeam = [
    {
      id: 'lt_001',
      name: 'Rev. Vikram Shinde',
      role: 'Senior Pastor',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80',
      description: 'Leading our congregation with wisdom and compassion.',
      email: 'vikram.shinde@chif.org',
      order: 1
    },
    {
      id: 'lt_002',
      name: 'Dr. Hithakshi Shinde (Pastor)',
      role: 'Senior Pastor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
      description: 'Guiding our youth with energy and dedication.',
      email: 'hithakshi.shinde@chif.org',
      order: 2
    },
    {
      id: 'lt_003',
      name: 'Gitanjali Pillai',
      role: 'Worship Pastor',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80',
      description: 'Directing our worship ministry with passion and excellence.',
      email: 'gitanjali.pillai@chif.org',
      order: 3
    },
    {
      id: 'lt_004',
      name: 'Anish Pillai',
      role: 'Youth Pastor',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80',
      description: 'Guiding our youth with energy and dedication.',
      email: 'anish.pillai@chif.org',
      order: 4
    },
  ];

  // Insert leadership team using raw SQL for better control over IDs
  for (const member of leadershipTeam) {
    await prisma.$executeRaw`
      INSERT INTO "leadershipTeam" (id, name, role, image, description, email, "order", "createdAt", "updatedAt")
      VALUES (
        ${member.id},
        ${member.name},
        ${member.role},
        ${member.image},
        ${member.description},
        ${member.email},
        ${member.order},
        ${now},
        ${now}
      )
      ON CONFLICT (id) DO UPDATE
      SET 
        name = ${member.name},
        role = ${member.role},
        image = ${member.image},
        description = ${member.description},
        email = ${member.email},
        "order" = ${member.order},
        "updatedAt" = ${now}
      RETURNING *;
    `;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
