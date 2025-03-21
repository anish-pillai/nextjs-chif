import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="mb-6">
            <span className="block text-3xl md:text-4xl font-medium mb-2">Welcome to</span>
            <span className="block text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-300 dark:to-primary-500">City Harvest</span>
            <span className="block text-5xl md:text-6xl font-bold">International Fellowship</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">Join us this Sunday for an inspiring worship experience</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <Clock className="h-5 w-5" />
              <span>Sundays at 10:00 AM</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <MapPin className="h-5 w-5" />
              <span>12 Quince Ct, Lawrence Township NJ 08648</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 mb-4">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">March {10 + i}, 2024</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community Event {i}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Join us for a wonderful time of fellowship and worship.
                  </p>
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-primary-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Subscribe to our newsletter for updates, events, and spiritual encouragement.
            </p>
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}