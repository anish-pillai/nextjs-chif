import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sermons } from '@/data/sermons';



const SermonsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Sermon Archive
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our collection of messages that inspire, teach, and transform.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
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
          {sermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={sermon.image}
                  alt={sermon.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-primary-500 mb-2">
                  <time>{sermon.date}</time>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {sermon.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {sermon.pastor}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Series: {sermon.series}
                </p>
                <div className="flex gap-3">
                  <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
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
                  <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default SermonsPage;
