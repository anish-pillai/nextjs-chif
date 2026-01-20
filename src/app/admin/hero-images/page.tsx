'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface HeroImage {
  id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  order: number;
  isActive: boolean;
}

export default function HeroImagesAdmin() {
  const { data: session } = useSession();
  const [images, setImages] = useState<HeroImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/hero-images');
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Error fetching hero images:', error);
      setError('Failed to fetch hero images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !title.trim()) {
      setError('Please select an image and enter a title');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', title.trim());

      const response = await fetch('/api/hero-images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess('Image uploaded successfully!');
        setTitle('');
        setSelectedFile(null);
        fetchImages();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/hero-images/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        fetchImages();
        setSuccess(`Image ${!isActive ? 'shown' : 'hidden'} successfully!`);
      } else {
        setError('Failed to update image status');
      }
    } catch (error) {
      console.error('Error updating image:', error);
      setError('Failed to update image status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const response = await fetch(`/api/hero-images/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Image deleted successfully!');
        fetchImages();
      } else {
        setError('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setError('Failed to delete image');
    }
  };

  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-800">Access Denied</h2>
          <p className="text-red-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hero Images Management</h1>
            <p className="text-gray-600">Manage carousel images for hero background.</p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Required dimensions:</strong> 2300x1300 pixels
            </p>
          </div>
          <Link 
            href="/admin?tab=hero-images"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-700">{success}</p>
        </div>
      )}

      {/* Hero Images List */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Hero Images List</h2>
        
        {isLoading ? (
          <p>Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-gray-500">No images uploaded yet. Add your first hero image below!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  {!image.isActive && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">Hidden</span>
                    </div>
                  )}
                </div>
                
                {/* Image Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {image.width}x{image.height} pixels • Order: {image.order}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleActive(image.id, image.isActive)}
                      className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                        image.isActive
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {image.isActive ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="px-3 py-2 bg-red-100 text-red-800 rounded text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Hero Image */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Hero Image</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Image Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image title"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image File (2300x1300 pixels)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {selectedFile.name} ({selectedFile.size} bytes)
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            {uploading ? 'Uploading...' : 'Add Hero Image'}
          </button>
        </form>
      </div>
    </div>
  );
}
