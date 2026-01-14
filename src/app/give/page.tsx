import React from 'react';
import Link from 'next/link';

const givingOptions = [
  {
    id: 1,
    title: 'One-Time Gift',
    description: 'Make a single contribution to support our ministry.',
    icon: (
      <svg
        className="w-12 h-12 text-primary-500 mb-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Recurring Giving',
    description: 'Set up automatic monthly or weekly donations.',
    icon: (
      <svg
        className="w-12 h-12 text-primary-500 mb-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Special Campaigns',
    description: 'Support specific ministry projects and outreach efforts.',
    icon: (
      <svg
        className="w-12 h-12 text-primary-500 mb-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
];

const amounts = [
  { value: 50, label: '$50' },
  { value: 100, label: '$100' },
  { value: 250, label: '$250' },
  { value: 500, label: '$500' },
  { value: 1000, label: '$1000' },
  { value: 2500, label: '$2500' },
];

const GivePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Give to Our Church
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Support our mission to spread God&apos;s love and make a difference in our community.
          </p>
        </div>
      </section>

      {/* Giving Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {givingOptions.map((option) => (
              <div
                key={option.id}
                className="text-center p-8"
              >
                <div className="flex justify-center">{option.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {option.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {option.description}
                </p>
              </div>
            ))}
          </div>

          {/* Giving Form */}
          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              {/* Amount Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Select Amount
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amounts.map((amount) => (
                    <button
                      key={amount.value}
                      className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-colors"
                    >
                      {amount.label}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Custom Amount"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                  />
                </div>
              </div>

              {/* Giving Type */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Giving Type
                </h3>
                <select className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white">
                  <option value="tithe">Tithe</option>
                  <option value="offering">Offering</option>
                  <option value="missions">Missions</option>
                  <option value="building">Building Fund</option>
                </select>
              </div>

              {/* Frequency */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Frequency
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                    One-Time
                  </button>
                  <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 text-gray-900 dark:text-white transition-colors">
                    Recurring
                  </button>
                </div>
              </div>

              {/* Continue Button */}
              <button className="w-full bg-primary-500 text-white py-4 rounded-lg hover:bg-primary-600 transition-colors font-semibold">
                Continue to Payment
              </button>

              {/* Download Statement */}
              <div className="text-center">
                <Link
                  href="#"
                  className="inline-flex items-center text-primary-500 hover:text-primary-600"
                >
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
                  Download Giving Statement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Other Ways to Give
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                By Mail
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Send checks to:
                <br />
                City Harvest AG Church
                <br />
                123 Main Street
                <br />
                City, State 12345
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Text to Give
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Text &quot;GIVE&quot; to (555) 123-4567
                <br />
                Follow the prompts to complete your gift
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GivePage;
