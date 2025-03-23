'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { EventType } from '@prisma/client';
import { formatDateTimeForInput, getCurrentTimestamp, toUnixTimestamp } from '@/lib/utils';
import { createEventSchema } from '@/lib/validations';

interface EventFormProps {
  onSuccess?: () => void;
}

export function EventForm({ onSuccess }: EventFormProps) {
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      startTime: toUnixTimestamp(formData.get('startTime') as string),
      endTime: toUnixTimestamp(formData.get('endTime') as string),
      location: formData.get('location'),
      type: formData.get('type') as EventType,
      organizerId: 'cm8kts6au00008oe2dur82izo' // Default admin user ID
    };

    // Client-side validation
    try {
      createEventSchema.parse(data);
      setValidationErrors({});
    } catch (e: any) {
      if (e.errors) {
        const errors: Record<string, string> = {};
        e.errors.forEach((err: any) => {
          if (err.path && err.path.length > 0) {
            errors[err.path[0]] = err.message;
          }
        });
        setValidationErrors(errors);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      formRef.current?.reset();
      router.refresh();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setError('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Event Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base py-2 px-3"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={5}
          required
          minLength={10}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${validationErrors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-primary-500'}`}
        />
        {validationErrors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Time
          </label>
          <input
            type="datetime-local"
            name="startTime"
            id="startTime"
            required
            defaultValue={formatDateTimeForInput(getCurrentTimestamp())}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Time
          </label>
          <input
            type="datetime-local"
            name="endTime"
            id="endTime"
            required
            defaultValue={formatDateTimeForInput(getCurrentTimestamp() + 2 * 60 * 60)} // 2 hours from now
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base py-2 px-3"
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base py-2 px-3"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Event Type
        </label>
        <select
          name="type"
          id="type"
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base py-2 px-3"
        >
          <option value="">Select a type...</option>
          {Object.entries(EventType).map(([key, value]) => (
            <option key={key} value={value}>
              {key.charAt(0) + key.slice(1).toLowerCase().replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating Event...' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}
