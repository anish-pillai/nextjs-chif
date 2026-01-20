import { prisma } from '@/lib/db';
import { SermonsPageClient } from './components/SermonsPageClient';

type SermonWithPreacher = {
  id: string;
  title: string;
  videoUrl: string | null;
  preacherId: string;
  preacher: {
    id: string;
    name: string;
  };
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const dynamic = 'force-dynamic'; // Disable SSG to always fetch fresh data

async function getSermons(preacherId?: string, limit: number = 12) {
  const where: any = {};
  
  if (preacherId) {
    where.preacherId = preacherId;
  }
  
  try {
    return await prisma.sermon.findMany({
      where,
      include: {
        preacher: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: { date: 'desc' },
      take: limit,
    });
  } catch (error) {
    console.error('Error fetching sermons:', error);
    return [];
  }
}

export default async function SermonsPage() {
  const fetchedSermons = await getSermons();

  // Convert numeric dates to Date objects for the client component
  // Handle empty arrays and ensure safe conversion
  const sermons = Array.isArray(fetchedSermons) ? fetchedSermons.map(sermon => ({
    ...sermon,
    date: sermon.date ? new Date(sermon.date * 1000) : new Date(), // Convert from Unix timestamp (seconds) to JavaScript Date with fallback
    createdAt: sermon.createdAt ? new Date(sermon.createdAt * 1000) : new Date(),
    updatedAt: sermon.updatedAt ? new Date(sermon.updatedAt * 1000) : new Date()
  })) : [];

  return <SermonsPageClient sermons={sermons} />;
}
