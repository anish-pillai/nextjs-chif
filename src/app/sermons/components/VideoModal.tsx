'use client';

import React from 'react';

interface VideoModalProps {
  videoId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ videoId, isOpen, onClose }: VideoModalProps) {
  if (!isOpen || !videoId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl mx-4 aspect-video">
        <button
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
          onClick={onClose}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
