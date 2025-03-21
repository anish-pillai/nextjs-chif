import React from 'react';

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Events Calendar</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay connected with our church community through our various events and activities.
          </p>
        </div>
      </section>

      {/* Event Filters */}
      <div className="bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow-md">
                All Events
              </button>
              <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700">
                Worship
              </button>
              <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700">
                Youth
              </button>
              <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700">
                Study
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Sunday Worship Service */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-blue-400 mb-4">Every Sunday</div>
          <h3 className="text-2xl font-bold mb-3">Sunday Worship Service</h3>
          <p className="text-gray-300 mb-4">
            Join us for worship, prayer, and the Word.
          </p>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            10:00 AM
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Main Sanctuary
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 transition py-2 rounded-md">
            Register Now
          </button>
        </div>

        {/* Youth Night */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-blue-400 mb-4">Every Friday</div>
          <h3 className="text-2xl font-bold mb-3">Youth Night</h3>
          <p className="text-gray-300 mb-4">
            A night of fellowship, games, and spiritual growth for teens.
          </p>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            7:00 PM
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Youth Center
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 transition py-2 rounded-md">
            Register Now
          </button>
        </div>

        {/* Bible Study */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-blue-400 mb-4">Every Wednesday</div>
          <h3 className="text-2xl font-bold mb-3">Bible Study</h3>
          <p className="text-gray-300 mb-4">
            In-depth Bible study and discussion.
          </p>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            7:00 PM
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Fellowship Hall
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 transition py-2 rounded-md">
            Register Now
          </button>
        </div>
      </div>

      {/* Submit Event Form */}
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-4">Submit an Event</h2>
        <p className="text-gray-300 text-center mb-8">
          Have an event you&apos;d like to add to our calendar? Submit it for review.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Event Name"
            className="w-full bg-gray-900 rounded-md px-4 py-2 text-white"
          />
          <input
            type="date"
            className="w-full bg-gray-900 rounded-md px-4 py-2 text-white"
          />
          <input
            type="time"
            className="w-full bg-gray-900 rounded-md px-4 py-2 text-white"
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full bg-gray-900 rounded-md px-4 py-2 text-white"
          />
          <textarea
            placeholder="Event Description"
            rows={4}
            className="w-full bg-gray-900 rounded-md px-4 py-2 text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-md font-semibold"
          >
            Submit Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventsPage;
