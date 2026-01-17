'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface EventData {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  startDateTime: string;
  endDateTime: string;
  imageUrl?: string | null;
  organizerId: string;
}

export default function EditEventContent({ id }: { id: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    imageUrl: '',
  });

  useEffect(() => {
    // Redirect if not authenticated or not admin/pastor/staff
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated' && 
        !['ADMIN', 'PASTOR', 'STAFF'].includes(session.user.role)) {
      router.push('/');
      return;
    }

    // Fetch event data
    if (status === 'authenticated') {
      fetchEvent();
    }
  }, [status, session, router, id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      
      const data = await response.json();
      const event = data.data;
      
      // Parse dates and times
      const startDateTime = new Date(event.startTime * 1000); // Convert from Unix timestamp
      const endDateTime = new Date(event.endTime * 1000); // Convert from Unix timestamp
      
      // Format date and time for form inputs
      const startDate = startDateTime.toISOString().split('T')[0];
      const startTime = startDateTime.toTimeString().slice(0, 5);
      const endDate = endDateTime.toISOString().split('T')[0];
      const endTime = endDateTime.toTimeString().slice(0, 5);
      
      setFormData({
        title: event.title,
        description: event.description,
        location: event.location,
        type: event.type,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        imageUrl: event.imageUrl || '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Format dates and times
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      const eventData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        type: formData.type,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
      };

      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        
        // Handle validation errors specifically
        if (errorData.error && errorData.error.includes('Validation error')) {
          try {
            const validationError = JSON.parse(errorData.error.replace('Validation error: ', ''));
            const errorMessage = Object.values(validationError).join(', ');
            throw new Error(`Validation failed: ${errorMessage}`);
          } catch (parseError) {
            throw new Error(errorData.error || 'Failed to update event');
          }
        }
        
        throw new Error(errorData.error || errorData.message || 'Failed to update event');
      }

      // Redirect to admin dashboard on success
      router.push('/admin?tab=events');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Event</h1>
        <Link 
          href="/admin?tab=events" 
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Back to Events
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="WORSHIP">Worship Service</option>
                <option value="PRAYER">Prayer Meeting</option>
                <option value="BIBLE_STUDY">Bible Study</option>
                <option value="YOUTH">Youth Event</option>
                <option value="OUTREACH">Outreach</option>
                <option value="SPECIAL">Special Event</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Time *
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Time *
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image URL (optional)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 transition-colors disabled:bg-primary-300 dark:disabled:bg-primary-900"
            >
              {submitting ? 'Updating...' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
