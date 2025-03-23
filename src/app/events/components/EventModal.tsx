'use client';

import React from 'react';
import { format } from 'date-fns';
import { X, Calendar, Clock, MapPin, User } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    start: Date;
    end: Date;
    extendedProps: {
      description: string;
      location: string;
      organizer: string;
    };
  } | null;
}

export function EventModal({ isOpen, onClose, event }: EventModalProps) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{event.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-primary-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Date</div>
              <div className="text-gray-600 dark:text-gray-300">
                {format(event.start, 'EEEE, MMMM d, yyyy')}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-primary-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Time</div>
              <div className="text-gray-600 dark:text-gray-300">
                {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Location</div>
              <div className="text-gray-600 dark:text-gray-300">{event.extendedProps.location}</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-primary-500 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Organizer</div>
              <div className="text-gray-600 dark:text-gray-300">{event.extendedProps.organizer}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="font-medium text-gray-900 dark:text-white mb-2">Details</div>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {event.extendedProps.description}
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
