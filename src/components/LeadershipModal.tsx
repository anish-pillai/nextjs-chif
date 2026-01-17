'use client';

import { useState, useEffect } from 'react';
import { X, Upload, User } from 'lucide-react';
import Image from 'next/image';

interface LeadershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: LeadershipFormData) => void;
  member?: LeadershipFormData | null;
  loading?: boolean;
}

interface LeadershipFormData {
  id?: string;
  name: string;
  role: string;
  image: string;
  description?: string;
  email?: string;
  order: number;
}

export function LeadershipModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  member = null, 
  loading = false 
}: LeadershipModalProps) {
  const [formData, setFormData] = useState<LeadershipFormData>({
    name: '',
    role: '',
    image: '',
    description: '',
    email: '',
    order: 0
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  // Update form data when member prop changes
  useEffect(() => {
    if (member) {
      setFormData({
        id: member.id,
        name: member.name || '',
        role: member.role || '',
        image: member.image || '',
        description: member.description || '',
        email: member.email || '',
        order: member.order || 0
      });
      setImagePreview(member.image || '');
    } else {
      setFormData({
        name: '',
        role: '',
        image: '',
        description: '',
        email: '',
        order: 0
      });
      setImagePreview('');
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'order' ? parseInt(value, 10) || 0 : value 
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, we'll create a preview and store as base64
      // In production, you'd upload to a service like Cloudinary, S3, etc.
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {member ? 'Edit Leadership Team Member' : 'Add New Leadership Team Member'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 flex justify-center mb-4">
              <div className="relative">
                {imagePreview ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden">
                    <Image 
                      src={imagePreview} 
                      alt={formData.name || 'Preview'} 
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-2 cursor-pointer hover:bg-primary-700 transition-colors">
                  <Upload className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role *
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Display Order *
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-900 transition-colors"
            >
              {loading ? 'Saving...' : (member ? 'Update' : 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
