'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { VideoModal } from './VideoModal';
import { HeroSection } from '@/components/HeroSection';

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

interface SermonsPageClientProps {
  sermons: SermonWithPreacher[];
}

function getYouTubeVideoId(url: string | null): string | null {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    
    // Handle regular youtube.com URLs
    if (urlObj.hostname === 'youtube.com' || urlObj.hostname === 'www.youtube.com') {
      // First check for 'v' parameter (standard videos)
      const vParam = urlObj.searchParams.get('v');
      if (vParam) return vParam;
      
      // Check for live URLs that use /live/ path format
      if (urlObj.pathname.includes('/live/')) {
        const pathParts = urlObj.pathname.split('/');
        // The ID is usually right after 'live' in the path
        for (let i = 0; i < pathParts.length; i++) {
          if (pathParts[i] === 'live' && i + 1 < pathParts.length) {
            return pathParts[i + 1];
          }
        }
      }
    } 
    // Handle youtu.be short URLs
    else if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
  } catch (e) {
    console.error('Invalid YouTube URL:', e);
  }
  return null;
}

export function SermonsPageClient({ sermons }: SermonsPageClientProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedVideoId, setSelectedVideoId] = React.useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  const filteredSermons = sermons.filter(sermon => sermon.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection
        title="Sermon Archive"
        description="Explore our collection of messages that inspire, teach, and transform."
        reducedHeight={true}
      />

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sermons..."
              className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Sermons Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSermons.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">No sermons found</h3>
              <p className="text-gray-600 dark:text-gray-300">Check back soon for upcoming sermons!</p>
            </div>
          ) : (
            filteredSermons.map((sermon: SermonWithPreacher) => (
              <div
                key={sermon.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={
                      sermon.videoUrl 
                        ? `https://img.youtube.com/vi/${getYouTubeVideoId(sermon.videoUrl)}/maxresdefault.jpg` 
                        : '/images/sermon-placeholder.jpg'
                    }
                    alt={sermon.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-primary-500 mb-2">
                    <time>
                      {format(
                        // Convert Unix timestamp in seconds to milliseconds for JavaScript Date
                        typeof sermon.date === 'number' 
                          ? new Date(sermon.date * 1000) 
                          : new Date(sermon.date), 
                        'MMMM d, yyyy'
                      )}
                    </time>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {sermon.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {sermon.preacher.name}
                  </p>
                  <div className="flex gap-3">
                    <button 
                      className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                      onClick={() => {
                        const videoId = getYouTubeVideoId(sermon.videoUrl);
                        if (videoId) {
                          setSelectedVideoId(videoId);
                          setIsVideoModalOpen(true);
                        }
                      }}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Play
                    </button>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Podcast Subscribe Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Subscribe to Our Podcast
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Never miss a sermon. Subscribe to our podcast and listen on your favorite platform.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="#"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              Apple Podcasts
            </Link>
            <Link
              href="#"
              className="px-6 py-3 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors"
            >
              Spotify
            </Link>
            <Link
              href="#"
              className="px-6 py-3 bg-[#FF0000] text-white rounded-lg hover:bg-[#ff1a1a] transition-colors"
            >
              YouTube
            </Link>
          </div>
        </div>
      </section>

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
