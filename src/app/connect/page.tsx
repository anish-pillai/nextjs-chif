import React from 'react';
import Link from 'next/link';
import { smallGroups } from '@/data/smallGroups';



const ConnectPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Connect With Us
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We&apos;d love to hear from you and help you get connected to our church family.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <svg
                    className="w-6 h-6 text-primary-500 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    123 Main Street, City, State 12345
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <svg
                    className="w-6 h-6 text-primary-500 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    (555) 123-4567
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <svg
                    className="w-6 h-6 text-primary-500 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    info@chif.church
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <svg
                    className="w-6 h-6 text-primary-500 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Sunday Services: 10:00 AM
                  </span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:bg-[#1864D6] transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="w-12 h-12 bg-[#E4405F] rounded-full flex items-center justify-center text-white hover:bg-[#D63A54] transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="w-12 h-12 bg-[#FF0000] rounded-full flex items-center justify-center text-white hover:bg-[#E60000] transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Get in Touch
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                />
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Small Groups Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Small Groups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {smallGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {group.name}
                </h3>
                <div className="space-y-2 mb-6">
                  <p className="text-gray-600 dark:text-gray-300">
                    Day: {group.day}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Time: {group.time}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Location: {group.location}
                  </p>
                </div>
                <button className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors">
                  Join Group
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConnectPage;
