'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  description?: string;
  email?: string;
}

export default function NewSermon() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadershipTeam, setLeadershipTeam] = useState<LeadershipMember[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    preacherId: '',
    date: '',
    videoUrl: '',
    audioUrl: '',
    scripture: '',
    series: '',
  });

  // Fetch leadership team on component mount
  useEffect(() => {
    const fetchLeadershipTeam = async () => {
      try {
        const response = await fetch('/api/leadership');
        if (response.ok) {
          const data = await response.json();
          console.log('Leadership team members:', data.data);
          setLeadershipTeam(data.data || []);
        } else {
          console.error('Failed to fetch leadership team');
        }
      } catch (err) {
        console.error('Error fetching leadership team:', err);
      }
    };

    if (status === 'authenticated') {
      fetchLeadershipTeam();
    }
  }, [status]);

  // Redirect if not authenticated or not admin/pastor
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  if (status === 'authenticated' && 
      !['ADMIN', 'PASTOR'].includes(session.user.role)) {
    router.push('/');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing in description
    if (name === 'description' && value.length >= 10) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) {
      console.log('Already submitting, preventing double submission');
      return;
    }
    
    setIsSubmitting(true);
    setLoading(true);
    setError(null);

    // Client-side validation
    if (!formData.title.trim()) {
      setError('Sermon title is required');
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('Sermon description is required');
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    if (formData.description.trim().length < 10) {
      setError('Sermon description must be at least 10 characters');
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    if (!formData.scripture.trim()) {
      setError('Scripture reference is required');
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    if (!formData.preacherId.trim()) {
      setError('Please select a preacher from the leadership team');
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    if (!formData.date) {
      setError('Sermon date is required');
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    try {
      // Ensure we have a valid date string before converting
      const dateObj = new Date(formData.date);
      dateObj.setHours(12, 0, 0, 0);
      
      // Validate that the date is valid
      if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date format');
      }

      // Convert to Unix timestamp in seconds (not milliseconds)
      const unixTimestamp = Math.floor(dateObj.getTime() / 1000);
      
      // Log the date conversion for debugging
      console.log('Date string:', formData.date);
      console.log('Date object:', dateObj);
      console.log('Unix timestamp:', unixTimestamp);
      
      const sermonData = {
        title: formData.title,
        description: formData.description,
        preacherId: formData.preacherId, // Use selected preacher from leadership team
        date: unixTimestamp, // Store as Unix timestamp in seconds
        videoUrl: formData.videoUrl || null,
        audioUrl: formData.audioUrl || null,
        scripture: formData.scripture,
        series: formData.series || null
      };

      console.log('Submitting sermon data:', sermonData);
      console.log('Description length:', formData.description.length);
      console.log('Description value:', JSON.stringify(formData.description));

      const response = await fetch('/api/sermons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sermonData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create sermon');
      }

      // Redirect to admin dashboard on success
      router.push('/admin?tab=sermons');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Sermon</h1>
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
                Description * (minimum 10 characters)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                minLength={10}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter a detailed description of the sermon (at least 10 characters)..."
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
                Preacher *
              </label>
              <select
                name="preacherId"
                value={formData.preacherId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select a preacher...</option>
                {leadershipTeam.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} - {member.role}
                  </option>
                ))}
              </select>
              {leadershipTeam.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  No leadership team members available. Please add team members first.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
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
                value={formData.series}
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
                value={formData.videoUrl}
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
                value={formData.audioUrl}
                onChange={handleChange}
                placeholder="https://example.com/audio.mp3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>

            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-900"
            >
              {loading || isSubmitting ? 'Creating...' : 'Create Sermon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
