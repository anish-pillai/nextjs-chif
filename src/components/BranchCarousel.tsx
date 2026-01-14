'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Globe } from 'lucide-react';

interface Service {
  day: string;
  type: string;
  time: string;
  location: string;
  serviceType?: string;
  link?: string;
}

interface Branch {
  name: string;
  address: string;
  phone: string;
  services: Service[];
}

interface BranchCarouselProps {
  branches: Branch[];
}

export function BranchCarousel({ branches }: BranchCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % branches.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [branches.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (branches.length === 0) return null;

  const currentBranch = branches[currentIndex];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Carousel Content */}
      <div className="text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="mb-6">
          <span className="block text-3xl md:text-4xl font-medium mb-2">Welcome to</span>
          <span className="block text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-300 dark:to-primary-500">
            City Harvest
          </span>
          <span className="block text-5xl md:text-6xl font-bold">AG Church</span>
        </h1>
        
        {/* Branch Name */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{currentBranch.name}</h2>
        
        {/* Branch Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{currentBranch.address}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Phone className="h-4 w-4" />
            <span className="text-sm">{currentBranch.phone}</span>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-3 mb-8">
          <h3 className="text-xl font-semibold">Service Times</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentBranch.services.map((service, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">
                    {service.serviceType || service.type}
                  </span>
                  <div className="flex items-center space-x-1">
                    {service.type === 'Online' ? (
                      <Globe className="h-4 w-4" />
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}
                    <span className="text-sm">{service.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-3 w-3" />
                  <span>{service.day} at {service.time}</span>
                </div>
                {service.link && (
                  <a
                    href={service.link}
                    className="inline-block mt-2 text-primary-300 hover:text-primary-200 text-sm underline"
                  >
                    Join Service
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2">
          {branches.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to branch ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
