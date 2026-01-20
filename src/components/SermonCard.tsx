'use client';

import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

type SermonWithPreacher = {
  id: string;
  title: string;
  videoUrl: string | null;
  preacherId: string;
  preacher: {
    id: string;
    name: string;
  };
  date: Date | number;
  createdAt: Date | number;
  updatedAt: Date | number;
};

interface SermonCardProps {
  sermon: SermonWithPreacher;
  onPlay?: (videoId: string) => void;
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

export function SermonCard({ sermon, onPlay }: SermonCardProps) {
  const videoId = getYouTubeVideoId(sermon.videoUrl);
  
  const handlePlay = () => {
    if (videoId && onPlay) {
      onPlay(videoId);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        <Image
          src={
            videoId 
              ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
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
            className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePlay}
            disabled={!videoId}
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
  );
}
