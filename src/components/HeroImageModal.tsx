'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface HeroImage {
  id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  order: number;
  isActive: boolean;
}

interface HeroImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; image?: File }) => void;
  image?: HeroImage | null;
}

export function HeroImageModal({
  isOpen,
  onClose,
  onSubmit,
  image
}: HeroImageModalProps) {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (image) {
      setTitle(image.title);
      setPreview(image.imageUrl);
    } else {
      setTitle('');
      setSelectedFile(null);
      setPreview('');
    }
    setError('');
  }, [image, isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    if (!image && !selectedFile) {
      setError('Please select an image');
      return;
    }

    onSubmit({
      title: title.trim(),
      image: selectedFile || undefined
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {image ? 'Edit Hero Image' : 'Add New Hero Image'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Image Preview/Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image {image ? '(Current)' : '(2300x1300 pixels)'}
              </label>
              <div className="flex items-center space-x-6">
                {preview ? (
                  <div className="flex-shrink-0">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-32 w-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0">
                    <div className="h-32 w-48 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                )}
                
                <div className="flex-1">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md cursor-pointer transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{image ? 'Change Image' : 'Choose Image'}</span>
                  </label>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter image title"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700">
                {error}
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              {image ? 'Update' : 'Add'} Hero Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
