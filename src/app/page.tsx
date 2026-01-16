import { HeroBackground } from '@/components/HeroBackground';
import { EventsCarousel } from '@/components/EventsCarousel';
import { ChurchBranches } from '@/components/ChurchBranches';
import { prisma } from '@/lib/db';
import { getCurrentTimestamp } from '@/lib/utils';

async function getFutureEvents() {
  try {
    const futureEvents = await prisma.event.findMany({
      take: 5, // Get up to 5 future events for carousel
      orderBy: { startTime: 'asc' },
      where: {
        startTime: {
          gte: getCurrentTimestamp()
        }
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    return futureEvents;
  } catch (error) {
    console.error('Error fetching future events:', error);
    return [];
  }
}

async function getChurchBranches() {
  try {
    const branches = await prisma.churchBranch.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        services: {
          orderBy: { day: 'asc' }
        }
      }
    });

    return branches;
  } catch (error) {
    console.error('Error fetching church branches:', error);
    return [];
  }
}

export default async function Home() {
  const futureEvents = await getFutureEvents();
  const churchBranches = await getChurchBranches();
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[calc(50vh-4rem)] md:min-h-[calc(35vh-1rem)] flex items-start justify-center pt-16">
        <HeroBackground />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
        <EventsCarousel events={futureEvents} />
      </section>

      {/* Church Branches Section */}
      <ChurchBranches branches={churchBranches} />

    </div>
  );
}