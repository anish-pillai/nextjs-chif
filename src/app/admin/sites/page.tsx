'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Edit2, Trash2, Globe, Eye, EyeOff } from 'lucide-react';
import { ConfirmModal } from '@/components/ConfirmModal';
import { SiteModal } from '@/components/SiteModal';

interface Site {
  id: string;
  domain: string;
  name: string;
  titleHeader: string;
  titleSubHeader: string;
  description: string;
  logo: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: number;
  updatedAt: number;
}

export default function SitesAdmin() {
  const { data: session } = useSession();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [siteToDelete, setSiteToDelete] = useState<Site | null>(null);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await fetch('/api/sites?includeInactive=true');
      const data = await response.json();
      
      if (data.success) {
        setSites(data.data);
      } else {
        setError(data.error || 'Failed to fetch sites');
      }
    } catch (err) {
      setError('Failed to fetch sites');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingSite(null);
    setIsModalOpen(true);
  };

  const handleEdit = (site: Site) => {
    setEditingSite(site);
    setIsModalOpen(true);
  };

  const handleDelete = (site: Site) => {
    setSiteToDelete(site);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!siteToDelete) return;

    try {
      const response = await fetch(`/api/sites/${siteToDelete.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setSites(sites.filter(s => s.id !== siteToDelete.id));
        setDeleteModalOpen(false);
        setSiteToDelete(null);
      } else {
        setError(data.error || 'Failed to delete site');
      }
    } catch (err) {
      setError('Failed to delete site');
    }
  };

  const handleToggleActive = async (site: Site) => {
    try {
      const response = await fetch(`/api/sites/${site.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !site.isActive }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSites(sites.map(s => 
          s.id === site.id ? { ...s, isActive: !s.isActive } : s
        ));
      } else {
        setError(data.error || 'Failed to update site');
      }
    } catch (err) {
      setError('Failed to update site');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSite(null);
    fetchSites(); // Refresh the list
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sites Management</h1>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Site</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sites.map((site) => (
                <tr key={site.id} className={site.isActive ? '' : 'opacity-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {site.domain}
                      </span>
                      {site.isDefault && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">{site.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {site.titleHeader}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {site.titleSubHeader}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      site.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {site.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleActive(site)}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        title={site.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {site.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(site)}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      {!site.isDefault && (
                        <button
                          onClick={() => handleDelete(site)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SiteModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        site={editingSite}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Site"
        message={`Are you sure you want to delete the site "${siteToDelete?.domain}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
