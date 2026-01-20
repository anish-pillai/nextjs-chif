'use client';

import { useState, useEffect } from 'react';
import { DateDisplay, TimeDisplay } from '@/components/TimeDisplay';
import { Calendar, Clock, MapPin } from 'lucide-react';

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
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No upcoming events</p>
      </div>
    );
  }

  const currentEvent = events[currentIndex];

  return (
    <div className="relative">
      {/* Event Content */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {currentEvent.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {currentEvent.description}
        </p>
        
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <DateDisplay timestamp={currentEvent.startTime} />
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <TimeDisplay timestamp={currentEvent.startTime} /> - <TimeDisplay timestamp={currentEvent.endTime} />
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {currentEvent.location}
          </div>
        </div>

      </div>

      {/* Carousel Indicators */}
      {events.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary-500 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to event ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
