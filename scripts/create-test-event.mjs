import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({
    where: { email: 'admin@chif.org' }
  });

  // Current timestamp in seconds
  const now = Math.floor(Date.now() / 1000);
  const oneHourLater = now + 3600; // 1 hour later

  const event = await prisma.event.create({
    data: {
      title: 'Test Event',
      description: 'Testing Unix timestamp storage',
      startTime: now,
      endTime: oneHourLater,
      location: 'Test Location',
      type: 'OTHER',
      organizerId: admin.id,
      createdAt: now,
      updatedAt: now
    }
  });

  console.log('Created event:', {
    ...event,
    startTimeReadable: new Date(event.startTime * 1000).toISOString(),
    endTimeReadable: new Date(event.endTime * 1000).toISOString()
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
