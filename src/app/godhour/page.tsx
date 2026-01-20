'use client';

import { useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import Image from 'next/image';

const GodHourPage = () => {
  useEffect(() => {
    // Redirect to Zoom meeting - works better on mobile
    window.location.href = 'https://us06web.zoom.us/j/85494751529?pwd=DYX8CY0B02Hjay6Xojuq1dxVH810lW.1';
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection
        title="God's Hour"
        description="Join us for our daily morning and evening prayer meeting."
        reducedHeight={true}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            {/* God's Hour Image */}
            <div className="mb-8">
              <Image
                src="/images/godhour.png"
                alt="God's Hour"
                width={400}
                height={300}
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>

            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Welcome to God's Hour
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join us for our daily prayer meeting where we come together to  
              pray, and grow in our faith community.
            </p>
            
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Meeting Details
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p><strong>Platform:</strong> Zoom</p>
                <p><strong>Meeting ID:</strong> 854 9475 1529</p>
                <p><strong>Join us every day morning and evening for a time of prayer and fellowship!</strong></p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                The Zoom meeting should open automatically in a new tab.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                If it doesn't open,{' '}
                <a 
                  href="https://us06web.zoom.us/j/85494751529?pwd=DYX8CY0B02Hjay6Xojuq1dxVH810lW.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  click here to join the meeting
                </a>.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You will be redirected to the homepage in a few seconds...
              </p>
            </div>

            <div className="mt-8">
              <a 
                href="/"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Return to Homepage
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GodHourPage;
