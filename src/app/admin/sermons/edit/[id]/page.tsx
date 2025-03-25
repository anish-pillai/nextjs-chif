'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface SermonData {
  id: string;
  title: string;
  description: string;
  preacherId: string;
  date: number;
  dateString?: string; // Add dateString property for form handling
  videoUrl: string | null;
  audioUrl: string | null;
  scripture: string;
  series: string | null;
}

// Client component that handles the form logic
function SermonEditor({ id }: { id: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SermonData>({
    id: '',
    title: '',
    description: '',
    preacherId: '',
    date: 0,
    videoUrl: '',
    audioUrl: '',
    scripture: '',
    series: '',
  });

  // Fetch the sermon data
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated' && 
        !['ADMIN', 'PASTOR'].includes(session.user.role)) {
      router.push('/');
      return;
    }

    const fetchSermonData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/sermons/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch sermon data');
        }
        
        const data = await response.json();
        
        // Convert Unix timestamp to date string for the input
        const dateObj = new Date(data.sermon.date * 1000); // Convert seconds to milliseconds
        const formattedDate = dateObj.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        
        setFormData({
          ...data.sermon,
          date: data.sermon.date, // Keep the Unix timestamp for internal use
          dateString: formattedDate, // Add a formatted date string for the input
        });
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    if (id) {
      fetchSermonData();
    }
  }, [id, router, session, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Ensure we have a valid date string before converting
      if (!formData.dateString) {
        throw new Error('Sermon date is required');
      }

      // Create a date object at noon to avoid timezone issues
      const dateObj = new Date(formData.dateString);
      dateObj.setHours(12, 0, 0, 0);
      
      // Validate that the date is valid
      if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date format');
      }

      // Convert to Unix timestamp in seconds (not milliseconds)
      const unixTimestamp = Math.floor(dateObj.getTime() / 1000);
      
      // Log the date conversion for debugging
      console.log('Date string:', formData.dateString);
      console.log('Date object:', dateObj);
      console.log('Unix timestamp:', unixTimestamp);
      
      const sermonData = {
        title: formData.title,
        description: formData.description,
        preacherId: formData.preacherId,
        date: unixTimestamp, // Store as Unix timestamp in seconds
        videoUrl: formData.videoUrl || null,
        audioUrl: formData.audioUrl || null,
        scripture: formData.scripture,
        series: formData.series || null
      };

      const response = await fetch(`/api/sermons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sermonData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update sermon');
      }

      // Redirect to admin dashboard on success
      router.push('/admin?tab=sermons');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Sermon</h1>
        <Link 
          href="/admin?tab=sermons" 
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Back to Sermons
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
                Sermon Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Scripture Reference *
              </label>
              <input
                type="text"
                name="scripture"
                value={formData.scripture}
                onChange={handleChange}
                required
                placeholder="e.g., John 3:16"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="dateString"
                value={formData.dateString}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Series (Optional)
              </label>
              <input
                type="text"
                name="series"
                value={formData.series || ''}
                onChange={handleChange}
                placeholder="e.g., Summer Series"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Video URL (Optional)
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl || ''}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Audio URL (Optional)
              </label>
              <input
                type="url"
                name="audioUrl"
                value={formData.audioUrl || ''}
                onChange={handleChange}
                placeholder="https://example.com/audio.mp3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-900"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// This is the main component that Next.js will render
export default async function EditSermonPage({ params }: { params: any }) {
  // Handle params - could be a Promise in some versions of Next.js
  const resolvedParams = params instanceof Promise ? await params : params;
  const id = resolvedParams.id;
  
  // Pass the ID to the editor component
  return <SermonEditor id={id} />;
}
