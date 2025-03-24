import React from 'react';
import { prisma } from '@/lib/db';
import { SermonsPageClient } from './components/SermonsPageClient';

type SermonWithPreacher = {
  id: string;
  title: string;
  description: string;
  videoUrl: string | null;
  audioUrl: string | null;
  preacherId: string;
  preacher: {
    id: string;
    name: string;
  };
  date: Date;
  scripture: string;
  series: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const dynamic = 'force-dynamic'; // Disable SSG to always fetch fresh data

async function getSermons(preacherId?: string, series?: string, limit: number = 12) {
  const where: any = {};
  
  if (preacherId) {
    where.preacherId = preacherId;
  }
  
  if (series) {
    where.series = series;
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

async function getSeriesList() {
  // Get unique series from existing sermons
  const series = await prisma.sermon.groupBy({
    by: ['series'],
    where: {
      series: {
        not: null
      }
    }
  });
  
  return series
    .map((s: { series: string | null }) => s.series)
    .filter((s: string | null): s is string => s !== null);
}

export default async function SermonsPage() {
  const [fetchedSermons, seriesList] = await Promise.all([
    getSermons(),
    getSeriesList()
  ]);

  // Convert numeric dates to Date objects for the client component
  const sermons = fetchedSermons.map(sermon => ({
    ...sermon,
    date: new Date(sermon.date * 1000), // Convert from Unix timestamp (seconds) to JavaScript Date
    createdAt: new Date(sermon.createdAt * 1000),
    updatedAt: new Date(sermon.updatedAt * 1000)
  }));

  return <SermonsPageClient sermons={sermons} seriesList={seriesList} />;
}
