'use client';

import { useState, useEffect, useCallback } from 'react';

interface HeroImage {
  id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  order: number;
}

// Cache for storing images and timestamp
let imageCache: { images: HeroImage[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function HeroCarousel() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    // Check cache first
    const now = Date.now();
    if (imageCache && (now - imageCache.timestamp) < CACHE_DURATION) {
      setImages(imageCache.images);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/hero-images', {
        cache: 'default',
        headers: {
          'Cache-Control': 'max-age=300',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Update cache
        const now = Date.now();
        imageCache = {
          images: data,
          timestamp: now,
        };
        
        setImages(data);
      }
    } catch (error) {
      console.error('Error fetching hero images:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();

    // Set up periodic cache refresh
    const refreshInterval = setInterval(() => {
      fetchImages();
    }, CACHE_DURATION);

    return () => clearInterval(refreshInterval);
  }, [fetchImages]);

  useEffect(() => {
    // Set up auto-advance carousel
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

  if (isLoading) {
    return (
      <div className="relative h-96 lg:h-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  if (images.length === 0) {
    // Fallback to default background
    return (
      <div className="relative h-96 lg:h-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <img
          src="/images/bg2.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  return (
    <div className="relative h-96 lg:h-full overflow-hidden">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-full object-contain object-center bg-black"
              loading="eager"
              style={{
                contentVisibility: index === currentIndex ? 'auto' : 'hidden',
              }}
            />
          </div>
        ))}
      </div>

      {/* Carousel indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
