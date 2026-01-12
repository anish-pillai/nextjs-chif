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
  address: string;
  phone: string;
  services: Service[];
}

interface ChurchBranchesProps {
  branches: Branch[];
}

export function ChurchBranches({ branches }: ChurchBranchesProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Church Branches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{branch.name}</h3>
                
                {/* Branch Info */}
                <div className="space-y-3 mb-6">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
