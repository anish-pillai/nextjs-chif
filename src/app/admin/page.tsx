'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ConfirmModal } from '@/components/ConfirmModal';
import { LeadershipModal } from '@/components/LeadershipModal';

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  organizerId: string;
  organizer?: {
    name: string;
  };
}

interface Sermon {
  id: string;
  title: string;
  description: string;
  date: number; // Unix timestamp in seconds
  videoUrl?: string;
  audioUrl?: string;
  scripture: string;
  series?: string;
  preacherId: string;
  createdAt: number;
  updatedAt: number;
  preacher: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface LeadershipTeam {
  id: string;
  name: string;
  role: string;
  image: string;
  description?: string;
  email?: string;
  order: number;
  createdAt: number;
  updatedAt: number;
}

function AdminDashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam && ['users', 'events', 'sermons', 'leadership'].includes(tabParam) ? tabParam : 'users');
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [leadershipTeam, setLeadershipTeam] = useState<LeadershipTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newLeadershipMember, setNewLeadershipMember] = useState({
    name: '',
    role: '',
    image: '',
    description: '',
    email: '',
    order: 0
  });
  const [leadershipModalOpen, setLeadershipModalOpen] = useState(false);
  const [editingLeadershipMember, setEditingLeadershipMember] = useState<LeadershipTeam | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'event' | 'sermon' | 'leadership';
    id: string;
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'event',
    id: '',
    title: '',
    message: ''
  });

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated' && session.user.role !== 'ADMIN' && session.user.role !== 'PASTOR') {
      router.push('/');
      return;
    }

    // Fetch data based on active tab
    if (status === 'authenticated' && (session.user.role === 'ADMIN' || session.user.role === 'PASTOR')) {
      if (activeTab === 'users') fetchUsers();
      if (activeTab === 'events') fetchEvents();
      if (activeTab === 'sermons') fetchSermons();
      if (activeTab === 'leadership') fetchLeadershipTeam();
    }
  }, [status, session, router, activeTab]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchSermons = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sermons');
      if (!response.ok) {
        throw new Error('Failed to fetch sermons');
      }
      const data = await response.json();
      // Check if data.data exists and is an array
      if (data.data && Array.isArray(data.data)) {
        setSermons(data.data);
      } else {
        // If data.data is not an array, set an empty array
        setSermons([]);
        console.error('Sermons data is not in expected format:', data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching sermons:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchLeadershipTeam = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/leadership');
      if (!response.ok) {
        throw new Error('Failed to fetch leadership team');
      }
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        setLeadershipTeam(data.data);
      } else {
        setLeadershipTeam([]);
        console.error('Leadership team data is not in expected format:', data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching leadership team:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      // Refresh user list
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const deleteEvent = (eventId: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'event',
      id: eventId,
      title: 'Delete Event',
      message: 'Are you sure you want to delete this event? This action cannot be undone.'
    });
  };

  const confirmDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Refresh event list
      fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const deleteSermon = (sermonId: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'sermon',
      id: sermonId,
      title: 'Delete Sermon',
      message: 'Are you sure you want to delete this sermon? This action cannot be undone.'
    });
  };

  const confirmDeleteSermon = async (sermonId: string) => {
    try {
      const response = await fetch(`/api/sermons/${sermonId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete sermon');
      }

      // Refresh sermon list
      fetchSermons();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };
  
  const deleteLeadershipMember = (memberId: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'leadership',
      id: memberId,
      title: 'Delete Leadership Team Member',
      message: 'Are you sure you want to delete this leadership team member? This action cannot be undone.'
    });
  };

  const confirmDeleteLeadershipMember = async (memberId: string) => {
    try {
      const response = await fetch(`/api/leadership/${memberId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete leadership team member');
      }

      // Refresh leadership team list
      fetchLeadershipTeam();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };
  
  const openLeadershipModal = (member?: LeadershipTeam) => {
    setEditingLeadershipMember(member || null);
    setLeadershipModalOpen(true);
  };

  const closeLeadershipModal = () => {
    setLeadershipModalOpen(false);
    setEditingLeadershipMember(null);
  };

  const handleLeadershipSubmit = async (memberData: any) => {
    try {
      const url = editingLeadershipMember 
        ? `/api/leadership/${editingLeadershipMember.id}`
        : '/api/leadership';
      
      const method = editingLeadershipMember ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...memberData,
          updatedAt: Math.floor(Date.now() / 1000)
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingLeadershipMember ? 'update' : 'add'} leadership team member`);
      }

      // Refresh leadership team list and close modal
      fetchLeadershipTeam();
      closeLeadershipModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleConfirmDelete = () => {
    switch (confirmModal.type) {
      case 'event':
        confirmDeleteEvent(confirmModal.id);
        break;
      case 'sermon':
        confirmDeleteSermon(confirmModal.id);
        break;
      case 'leadership':
        confirmDeleteLeadershipMember(confirmModal.id);
        break;
    }
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  if (status === 'loading' || loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => {
            setActiveTab('users');
            router.push('/admin?tab=users');
          }}
          className={`py-2 px-4 font-medium ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
        >
          Users
        </button>
        <button
          onClick={() => {
            setActiveTab('events');
            router.push('/admin?tab=events');
          }}
          className={`py-2 px-4 font-medium ${activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
        >
          Events
        </button>
        <button
          onClick={() => {
            setActiveTab('sermons');
            router.push('/admin?tab=sermons');
          }}
          className={`py-2 px-4 font-medium ${activeTab === 'sermons' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
        >
          Sermons
        </button>
        <button
          onClick={() => {
            setActiveTab('leadership');
            router.push('/admin?tab=leadership');
          }}
          className={`py-2 px-4 font-medium ${activeTab === 'leadership' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
        >
          Leadership Team
        </button>
      </div>
      
      {/* Content based on active tab */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        {activeTab === 'users' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="ADMIN">Admin</option>
                          <option value="PASTOR">Pastor</option>
                          <option value="STAFF">Staff</option>
                          <option value="MEMBER">Member</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'events' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Event Management</h2>
              <Link 
                href="/admin/events/new" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Add New Event
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Organizer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{event.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{event.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{event.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{event.organizer?.name || 'Unknown'}</td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <Link 
                          href={`/admin/events/edit/${event.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => deleteEvent(event.id)}
                          className="text-red-600 hover:text-red-800 ml-3"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'sermons' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sermon Management</h2>
              <Link 
                href="/admin/sermons/new" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Add New Sermon
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Speaker</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Added By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sermons && sermons.length > 0 ? sermons.map((sermon) => (
                    <tr key={sermon.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{sermon.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{new Date(typeof sermon.date === 'number' ? sermon.date * 1000 : sermon.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{sermon.preacher?.name || 'Unknown'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{sermon.preacher?.name || 'Unknown'}</td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <Link 
                          href={`/admin/sermons/edit/${sermon.id}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => deleteSermon(sermon.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ml-3"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No sermons found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'leadership' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Leadership Team Management</h2>
              <button
                onClick={() => openLeadershipModal()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Add New Team Member
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {leadershipTeam && leadershipTeam.length > 0 ? leadershipTeam.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{member.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{member.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{member.order}</td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button 
                          onClick={() => openLeadershipModal(member)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteLeadershipMember(member.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ml-3"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No leadership team members found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Leadership Modal */}
      <LeadershipModal
        isOpen={leadershipModalOpen}
        onClose={closeLeadershipModal}
        onSubmit={handleLeadershipSubmit}
        member={editingLeadershipMember}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading admin dashboard...</h2>
          <div className="animate-pulse h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}
