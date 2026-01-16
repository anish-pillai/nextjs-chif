import React from 'react';
import { DateDisplay, TimeDisplay } from '@/components/TimeDisplay';
import { prisma } from '@/lib/db';
import { EventsCalendar } from './components/EventsCalendar';
import { EventType } from '@prisma/client';
import { Event as ChurchEvent } from '@/types';

export const dynamic = 'force-dynamic'; // Disable SSG to always fetch fresh data

async function getEvents(type?: EventType) {
  const where: any = type ? { type } : {};
  
  try {
    const events = await prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: { startTime: 'asc' }
    });
    
    // Convert timestamp fields to Date objects for the client component
    return events.map(event => ({
      ...event,
      startTime: event.startTime,  // Keep as Unix timestamp for the calendar component
      endTime: event.endTime,      // Keep as Unix timestamp for the calendar component
      // Add any other conversions needed here
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

async function getEventTypes(): Promise<EventType[]> {
  // Get unique types from existing events
  const types = await prisma.event.groupBy({
    by: ['type'],
  });
  
  return types.map((t) => t.type as EventType);
}

export default async function EventsPage() {
  const [events, eventTypes] = await Promise.all([
    getEvents(),
    getEventTypes()
  ]);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white">Events Calendar</h1>
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
              <a href="/events" className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow-md">
                All Events
              </a>
              {eventTypes.map((type) => (
                <a 
                  key={type}
                  href={`/events?type=${type}`}
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700"
                >
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="w-full">
          {/* Calendar View */}
          <div className="w-full">
            <EventsCalendar events={events} />
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">No events found</h3>
                <p className="text-gray-600 dark:text-gray-300">Check back soon for upcoming events!</p>
              </div>
            ) : (
              events.map((event: ChurchEvent) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-primary-600 dark:text-primary-400 mb-4">
                    <DateDisplay timestamp={event.startTime} format="MMMM d, yyyy" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <TimeDisplay timestamp={event.startTime} /> - <TimeDisplay timestamp={event.endTime} />
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Organized by: {event.organizer ? event.organizer.name : 'No organizer assigned'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


