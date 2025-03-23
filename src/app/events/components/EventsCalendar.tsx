'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventClickArg, EventContentArg } from '@fullcalendar/core';
import { EventModal } from './EventModal';

import { Event } from '@/types';
import { formatDateTime } from '@/lib/utils';

interface EventsCalendarProps {
  events: Event[];
}

export function EventsCalendar({ events }: EventsCalendarProps) {
  const [selectedEvent, setSelectedEvent] = React.useState<EventClickArg['event'] | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleEventClick = React.useCallback((info: EventClickArg) => {
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  }, []);

  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.startTime * 1000),
    end: new Date(event.endTime * 1000),
    extendedProps: {
      description: event.description,
      location: event.location,
      type: event.type,
      organizer: event.organizer.name
    }
  }));

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          eventContent={renderEventContent}
          height="auto"
          eventClick={handleEventClick}
        />
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent ? {
          title: selectedEvent.title,
          start: selectedEvent.start || new Date(),
          end: selectedEvent.end || new Date(),
          extendedProps: {
            description: selectedEvent.extendedProps.description,
            location: selectedEvent.extendedProps.location,
            organizer: selectedEvent.extendedProps.organizer
          }
        } : null}
      />
    </>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div className="p-1 hover:bg-primary-50 dark:hover:bg-primary-900/20 cursor-pointer transition-colors rounded group">
      <div className="font-semibold text-sm truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">{eventInfo.event.title}</div>
      <div className="text-xs text-gray-600 dark:text-gray-300 truncate group-hover:text-primary-500/80 dark:group-hover:text-primary-300/80">
        {eventInfo.event.start?.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} - 
        {eventInfo.event.end?.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-300 truncate group-hover:text-primary-500/80 dark:group-hover:text-primary-300/80">
        {eventInfo.event.extendedProps.location}
      </div>
    </div>
  );
}

