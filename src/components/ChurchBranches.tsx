import { MapPin, Phone, Clock, Globe } from 'lucide-react';

interface Service {
  day: string;
  type: string;
  time: string;
  location: string;
  serviceType?: string;
  link?: string;
}

interface Branch {
  name: string;
  country?: string;
  address: string;
  phone: string;
  isActive: boolean;
  services: Service[];
}

interface ChurchBranchesProps {
  branches: Branch[];
  onEdit?: (branch: Branch) => void;
  onToggleActive?: (branch: Branch) => void;
  onDelete?: (branch: Branch) => void;
  showActions?: boolean;
}

export function ChurchBranches({ branches, onEdit, onToggleActive, onDelete, showActions = false }: ChurchBranchesProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Church Branches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{branch.name}</h3>
                  <div className="flex space-x-2">
                    {showActions && onEdit && (
                      <button
                        onClick={() => onEdit(branch)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                    {showActions && onDelete && (
                      <button
                        onClick={() => onDelete(branch)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Branch Info */}
                <div className="space-y-3 mb-6">
                  {branch.country && (
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{branch.country}</span>
                    </div>
                  )}
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{branch.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{branch.phone}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Service Times</h4>
                  {branch.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          {service.serviceType || service.type}
                        </span>
                        <div className="flex items-center space-x-1">
                          {service.type === 'Online' ? (
                            <Globe className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                          ) : (
                            <MapPin className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                          )}
                          <span className="text-xs text-gray-600 dark:text-gray-400">{service.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{service.day} at {service.time}</span>
                      </div>
                      {service.link && (
                        <a
                          href={service.link}
                          className="inline-block mt-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm underline"
                        >
                          Join Service
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Action Buttons */}
                {showActions && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => onEdit?.(branch)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onToggleActive?.(branch)}
                      className={`px-3 py-1 text-white text-sm rounded transition-colors ${
                        branch.isActive 
                          ? 'bg-orange-600 hover:bg-orange-700' 
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {branch.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => onDelete?.(branch)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
