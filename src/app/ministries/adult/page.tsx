import React from 'react';
import { Users, Clock, Calendar, MapPin } from 'lucide-react';

const AdultMinistryPage = () => {
  const ministryOpportunities = [
    {
      name: 'Bible Studies',
      frequency: 'Weekly',
      description: 'In-depth Scripture study and discussion'
    },
    {
      name: 'Small Groups',
      frequency: 'Bi-weekly',
      description: 'Fellowship and life application'
    },
    {
      name: 'Service Teams',
      frequency: 'Monthly',
      description: 'Community outreach and church service'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Adult Ministry</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Growing together in faith through fellowship, study, and service.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Our Adult Ministry</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our adult ministry offers various opportunities for spiritual growth, fellowship,
                and service. Through Bible studies, small groups, and ministry opportunities, we
                help adults deepen their faith and build meaningful relationships within our
                church community.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary-600" />
                  <span>Adults 18+</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span>Various Days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <span>Multiple Times Available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <span>Various Locations</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&q=80&w=1200"
                alt="Adult Ministry"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Opportunities */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ministry Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ministryOpportunities.map((opportunity) => (
              <div key={opportunity.name} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{opportunity.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 mb-4">{opportunity.frequency}</p>
                <p className="text-gray-600 dark:text-gray-300">{opportunity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join a Group Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">Join a Group</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
              <select
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                defaultValue=""
              >
                <option value="" disabled>Select Interest Area</option>
                <option value="bible-studies">Bible Studies</option>
                <option value="small-groups">Small Groups</option>
                <option value="service-teams">Service Teams</option>
              </select>
            </div>
            <textarea
              placeholder="Tell us about yourself and your interests"
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            />
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Join Ministry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdultMinistryPage;
