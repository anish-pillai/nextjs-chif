import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { prisma } from '@/lib/db';
import { getCurrentTimestamp } from '@/lib/utils';

async function getLatestEvents() {
  try {
    // First try to get upcoming events
    const upcomingEvents = await prisma.event.findMany({
      take: 3,
      orderBy: { startTime: 'asc' },
      where: {
        startTime: {
          gte: getCurrentTimestamp()
        }
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    // If no upcoming events, get the latest events regardless of date
    if (upcomingEvents.length === 0) {
      return await prisma.event.findMany({
        take: 3,
        orderBy: { startTime: 'desc' },
        include: {
          organizer: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      });
    }

    return upcomingEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function Home() {
  const latestEvents = await getLatestEvents();
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
              <span>Sundays at 12:30 PM</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <MapPin className="h-5 w-5" />
              <span>2751 Brunswick Pike, Lawrence Township, NJ 08648</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestEvents.length > 0 ? (
              latestEvents.map((event) => (
                <div key={event.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 mb-4">
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">{format(event.startTime * 1000, 'MMMM d, yyyy')}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {format(event.startTime * 1000, 'h:mm a')} - {format(event.endTime * 1000, 'h:mm a')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {event.description}
                    </p>
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-600 dark:text-gray-400">
                <p>No upcoming events found.</p>
              </div>
            )}
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