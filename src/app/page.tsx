import { Calendar, MapPin, Clock } from 'lucide-react';
import { DateDisplay, TimeDisplay } from '@/components/TimeDisplay';
import { HeroBackground } from '@/components/HeroBackground';
import { EventsCarousel } from '@/components/EventsCarousel';
import { ChurchBranches } from '@/components/ChurchBranches';
import { prisma } from '@/lib/db';
import { getCurrentTimestamp } from '@/lib/utils';
import churchBranches from './churchBranches.json';

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

export default async function Home() {
  const futureEvents = await getFutureEvents();
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
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