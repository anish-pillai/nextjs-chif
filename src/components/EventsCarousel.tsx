'use client';

import { useState, useEffect } from 'react';
import { DateDisplay, TimeDisplay } from '@/components/TimeDisplay';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useSiteConfig } from '@/components/SiteConfigProvider';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  location: string;
  organizer: {
    id: string;
    name: string;
  };
}

interface EventsCarouselProps {
  events: Event[];
}

export function EventsCarousel({ events }: EventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const siteConfig = useSiteConfig();

  useEffect(() => {
    if (events.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [events.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (events.length === 0) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4">
            <span className="block text-2xl sm:text-3xl md:text-4xl font-medium mb-1">Welcome to</span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-300 dark:to-primary-500">
              {siteConfig.titleHeader}
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{siteConfig.titleSubHeader}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 px-4">Join us this Sunday for an inspiring worship experience</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Sundays at 12:30 PM</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">2751 Brunswick Pike, Lawrence Township, NJ 08648</span>
              <span className="sm:hidden">Lawrence Township, NJ</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentEvent = events[currentIndex];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Static Welcome Message */}
        <div className="mb-4">
          <span className="block text-2xl sm:text-3xl md:text-4xl font-medium mb-1">Welcome to</span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-300 dark:to-primary-500">
            {siteConfig.titleHeader}
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{siteConfig.titleSubHeader}</span>
        </div>

        {/* Carousel Content - Only Events */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl border border-white/20">
          {/* Event Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg">{currentEvent.title}</h2>
          
          {/* Event Description */}
          <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 max-w-2xl mx-auto text-white/95 drop-shadow">{currentEvent.description}</p>
          
          {/* Event Details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-2">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-white/30">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              <span className="text-xs sm:text-sm text-white"><DateDisplay timestamp={currentEvent.startTime} /></span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-white/30">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              <span className="text-xs sm:text-sm text-white">
                <TimeDisplay timestamp={currentEvent.startTime} /> - <TimeDisplay timestamp={currentEvent.endTime} />
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-white/30">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              <span className="text-xs sm:text-sm text-white truncate max-w-[200px]">{currentEvent.location}</span>
            </div>
            {currentEvent.startTime !== currentEvent.endTime && (
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-white/30">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                <span className="text-xs sm:text-sm text-white">Ends: <DateDisplay timestamp={currentEvent.endTime} /></span>
              </div>
            )}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-6 sm:w-8 shadow-lg'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
