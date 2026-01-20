'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import { ConfirmModal } from '@/components/ConfirmModal';
import { HeroImageModal } from '@/components/HeroImageModal';

interface HeroImage {
  id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  order: number;
  isActive: boolean;
}

export function HeroImagesManagement() {
  const { data: session } = useSession();
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<HeroImage | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/hero-images?includeInactive=true');
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        setError('Failed to fetch hero images');
      }
    } catch (err) {
      setError('Failed to fetch hero images');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingImage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (image: HeroImage) => {
    setEditingImage(image);
    setIsModalOpen(true);
  };

  const handleDelete = (image: HeroImage) => {
    setImageToDelete(image);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return;

    try {
      const response = await fetch(`/api/hero-images/${imageToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setImages(images.filter(img => img.id !== imageToDelete.id));
        setDeleteModalOpen(false);
        setImageToDelete(null);
      } else {
        setError('Failed to delete hero image');
      }
    } catch (err) {
      setError('Failed to delete hero image');
    }
  };

  const handleToggleActive = async (image: HeroImage) => {
    try {
      const response = await fetch(`/api/hero-images/${image.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !image.isActive }),
      });

      if (response.ok) {
        setImages(images.map(img => 
          img.id === image.id ? { ...img, isActive: !img.isActive } : img
        ));
      } else {
        setError('Failed to update hero image');
      }
    } catch (err) {
      setError('Failed to update hero image');
    }
  };

  const handleModalSubmit = async (data: { title: string; image?: File }) => {
    try {
      let response;
      
      if (editingImage) {
        // Update existing image (title only for now)
        response = await fetch(`/api/hero-images/${editingImage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: data.title }),
        });
      } else {
        // Create new image
        const formData = new FormData();
        formData.append('title', data.title);
        if (data.image) {
          formData.append('image', data.image);
        }
        
        response = await fetch('/api/hero-images', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        setIsModalOpen(false);
        setEditingImage(null);
        fetchImages(); // Refresh list
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save hero image');
      }
    } catch (err) {
      setError('Failed to save hero image');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingImage(null);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hero Images Management</h1>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Hero Image</span>
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
                  Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dimensions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Order
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
              {images.map((image) => (
                <tr key={image.id} className={image.isActive ? '' : 'opacity-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="h-12 w-20 object-cover rounded border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ImageIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {image.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {image.width}×{image.height}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {image.order}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      image.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {image.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleActive(image)}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        title={image.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {image.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(image)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(image)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No hero images yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Get started by adding your first hero image.
          </p>
          <button
            onClick={handleCreate}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Hero Image</span>
          </button>
        </div>
      )}

      <HeroImageModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        image={editingImage}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Hero Image"
        message={`Are you sure you want to delete "${imageToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
