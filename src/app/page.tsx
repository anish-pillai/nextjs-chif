import { prisma } from '@/lib/db';
import { getCurrentTimestamp } from '@/lib/utils';
import { getSiteConfig } from '@/lib/site-config';
import { SiteConfigProvider } from '@/components/SiteConfigProvider';
import { HomeClient } from '@/components/HomeClient';

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

async function getLatestSermon() {
  try {
    const latestSermon = await prisma.sermon.findFirst({
      orderBy: { date: 'desc' },
      include: {
        preacher: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    if (!latestSermon) return null;

    // Convert to match SermonWithPreacher type
    return {
      ...latestSermon,
      date: new Date(latestSermon.date * 1000), // Convert from Unix timestamp to Date
      createdAt: new Date(latestSermon.createdAt * 1000),
      updatedAt: new Date(latestSermon.updatedAt * 1000),
    };
  } catch (error) {
    console.error('Error fetching latest sermon:', error);
    return null;
  }
}

export default async function Home() {
  const futureEvents = await getFutureEvents();
  const latestSermon = await getLatestSermon();
  const siteConfig = await getSiteConfig();

  return (
    <SiteConfigProvider siteConfig={siteConfig}>
      <HomeClient 
        latestSermon={latestSermon}
        futureEvents={futureEvents}
        siteConfig={siteConfig}
      />
    </SiteConfigProvider>
  );
}