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
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="mb-6">
            <span className="block text-3xl md:text-4xl font-medium mb-2">Welcome to</span>
            <span className="block text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-300 dark:to-primary-500">
              City Harvest
            </span>
            <span className="block text-5xl md:text-6xl font-bold">International Fellowship</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">Join us this Sunday for an inspiring worship experience</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <Clock className="h-5 w-5" />
              <span>Sundays at 12:30 PM</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <MapPin className="h-5 w-5" />
              <span>2751 Brunswick Pike, Lawrence Township, NJ 08648</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentEvent = events[currentIndex];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center text-white max-w-4xl mx-auto px-4">
        {/* Static Welcome Message */}
        <div className="mb-6">
          <span className="block text-3xl md:text-4xl font-medium mb-2">Welcome to</span>
          <span className="block text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-300 dark:to-primary-500">
            City Harvest
          </span>
          <span className="block text-5xl md:text-6xl font-bold">International Fellowship</span>
        </div>

        {/* Carousel Content - Only Events */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          {/* Event Title */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">{currentEvent.title}</h2>
          
          {/* Event Description */}
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-white/95 drop-shadow">{currentEvent.description}</p>
          
          {/* Event Details */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
              <Calendar className="h-4 w-4 text-white" />
              <span className="text-sm text-white"><DateDisplay timestamp={currentEvent.startTime} /></span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
              <Clock className="h-4 w-4 text-white" />
              <span className="text-sm text-white">
                <TimeDisplay timestamp={currentEvent.startTime} /> - <TimeDisplay timestamp={currentEvent.endTime} />
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
              <MapPin className="h-4 w-4 text-white" />
              <span className="text-sm text-white">{currentEvent.location}</span>
            </div>
            {currentEvent.startTime !== currentEvent.endTime && (
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                <Calendar className="h-4 w-4 text-white" />
                <span className="text-sm text-white">Ends: <DateDisplay timestamp={currentEvent.endTime} /></span>
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
                    ? 'bg-white w-8 shadow-lg'
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
