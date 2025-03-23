import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({
    where: { email: 'admin@chif.org' }
  });

  // Get the raw timestamp value
  console.log('Timestamp as Unix epoch (milliseconds):', admin.createdAt.getTime());
  console.log('Timestamp as Unix epoch (seconds):', Math.floor(admin.createdAt.getTime() / 1000));
  
  // Create a test event with explicit timestamps
  const event = await prisma.event.create({
    data: {
      title: 'Test Event',
      description: 'Testing timestamp storage',
      startTime: new Date(1711238400000), // 2024-03-24 00:00:00 UTC
      endTime: new Date(1711242000000),   // 2024-03-24 01:00:00 UTC
      location: 'Test Location',
      type: 'OTHER',
      organizerId: admin.id
    }
  });

  console.log('\nEvent timestamps:');
  console.log('Start time (Unix epoch ms):', event.startTime.getTime());
  console.log('End time (Unix epoch ms):', event.endTime.getTime());
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
