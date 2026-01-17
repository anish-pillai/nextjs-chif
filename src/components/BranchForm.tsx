'use client';

import { useState, useEffect } from 'react';

interface ServiceFormData {
  id?: string;
  day: string;
  type: string;
  serviceType?: string;
  time: string;
  location: string;
  link?: string;
}

interface Site {
  id: string;
  name: string;
  domain: string;
}

interface BranchFormData {
  id?: string;
  name: string;
  country?: string;
  address: string;
  phone: string;
  isActive: boolean;
  order: number;
  siteIds: string[];
  services?: ServiceFormData[];
}

interface BranchFormProps {
  branch?: BranchFormData;
  onSubmit: (data: BranchFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  title: string;
}

export function BranchForm({ branch, onSubmit, onCancel, loading = false, title }: BranchFormProps) {
  const [sites, setSites] = useState<Site[]>([]);
  const [services, setServices] = useState<ServiceFormData[]>(branch?.services || [
    {
      day: 'Sunday',
      type: 'In-Person',
      serviceType: '',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      link: ''
    }
  ]);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await fetch('/api/sites-config');
      if (!response.ok) {
        throw new Error('Failed to fetch sites');
      }
      const data = await response.json();
      setSites(data.data || []);
    } catch (err) {
      console.error('Error fetching sites:', err);
    }
  };

  const addService = () => {
    setServices([...services, {
      day: 'Sunday',
      type: 'In-Person',
      serviceType: '',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      link: ''
    }]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: keyof ServiceFormData, value: string) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setServices(updatedServices);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const branchData: BranchFormData = {
      id: branch?.id,
      name: (formData.get('name') as string),
      country: (formData.get('country') as string) || undefined,
      address: (formData.get('address') as string),
      phone: (formData.get('phone') as string),
      isActive: (formData.get('isActive') as string) === 'on',
      order: parseInt((formData.get('order') as string) || '0'),
      siteIds: (formData.getAll('sites') as string[]) || [],
      services: services.map(service => ({
        day: service.day,
        type: service.type,
        serviceType: service.serviceType || '',
        time: service.time,
        location: service.location,
        link: service.link || ''
      }))
    };
    
    onSubmit(branchData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ×
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Branch Name *
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={branch?.name || ''}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              defaultValue={branch?.country || ''}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address *
            </label>
            <textarea
              name="address"
              required
              rows={3}
              defaultValue={branch?.address || ''}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sites
            </label>
            <select
              name="sites"
              multiple
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {sites?.map((site) => (
                <option 
                  key={site.id} 
                  value={site.id}
                  selected={branch?.siteIds?.includes(site.id)}
                >
                  {site.name} ({site.domain})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple sites</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              required
              defaultValue={branch?.phone || ''}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Order
            </label>
            <input
              type="number"
              name="order"
              defaultValue={branch?.order || 0}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={branch?.isActive ?? true}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Active
            </label>
          </div>
        </div>
        
        {/* Service Times Section */}
        <div className="md:col-span-2 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Service Times</h3>
            <button
              type="button"
              onClick={addService}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Add Service Time
            </button>
          </div>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Day *
                    </label>
                    <select
                      value={service.day}
                      onChange={(e) => updateService(index, 'day', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type *
                    </label>
                    <select
                      value={service.type}
                      onChange={(e) => updateService(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="In-Person">In-Person</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Service Type
                    </label>
                    <input
                      type="text"
                      value={service.serviceType || ''}
                      onChange={(e) => updateService(index, 'serviceType', e.target.value)}
                      placeholder="e.g., English Service, Youth Service"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Time *
                    </label>
                    <input
                      type="text"
                      value={service.time}
                      onChange={(e) => updateService(index, 'time', e.target.value)}
                      placeholder="e.g., 10:00 AM"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={service.location}
                      onChange={(e) => updateService(index, 'location', e.target.value)}
                      placeholder="e.g., Main Sanctuary, Zoom"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Link (for online services)
                    </label>
                    <input
                      type="url"
                      value={service.link || ''}
                      onChange={(e) => updateService(index, 'link', e.target.value)}
                      placeholder="https://zoom.us/j/123456789"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                
                {services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="mt-3 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    Remove Service
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : (branch?.id ? 'Save Changes' : 'Create Branch')}
          </button>
        </div>
      </form>
    </div>
  );
}
