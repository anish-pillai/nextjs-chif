'use client';

import React from 'react';
import { SermonCard } from '@/components/SermonCard';
import { VideoModal } from '@/components/VideoModal';
import { HeroCarousel } from '@/components/HeroCarousel';
import { EventsCarousel } from '@/components/EventsCarousel';
import { ChurchBranches } from '@/components/ChurchBranches';
import { SermonWithPreacher, Event } from '@/types';

interface HomeClientProps {
  latestSermon: SermonWithPreacher | null;
  futureEvents: Event[];
  siteConfig: {
    titleHeader: string;
  };
}

export function HomeClient({ latestSermon, futureEvents, siteConfig }: HomeClientProps) {
  const [selectedVideoId, setSelectedVideoId] = React.useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  return (
    <div className="space-y-8">
      {/* Row 1: Welcome Header */}
      <section className="text-center py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to {siteConfig.titleHeader}
        </h1>
      </section>

      {/* Row 2 & 3: Latest Sermon and Hero Carousel - Side by Side */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Latest Sermon - 40% width on desktop */}
          <div className="lg:w-2/5">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Watch us on YouTube</h2>
              {latestSermon ? (
                <SermonCard 
                  sermon={latestSermon} 
                  onPlay={(videoId) => {
                    setSelectedVideoId(videoId);
                    setIsVideoModalOpen(true);
                  }}
                />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <p>No sermons available yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Hero Carousel - 60% width on desktop */}
          <div className="lg:w-3/5">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* Row 4: Events Carousel */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Upcoming Events</h2>
          <EventsCarousel events={futureEvents} />
        </div>
      </section>

      {/* Church Branches Section */}
      <ChurchBranches />

      {/* Video Modal */}
      <VideoModal
        videoId={selectedVideoId}
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setSelectedVideoId(null);
        }}
      />
    </div>
  );
}
