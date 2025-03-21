import React from 'react';
import { Clock, Calendar, MapPin } from 'lucide-react';

const ChildrensMinistryPage = () => {
  const ageGroups = [
    {
      name: 'Nursery',
      ageRange: '0-2 years',
      description: 'Loving care for our littlest ones'
    },
    {
      name: 'Preschool',
      ageRange: '3-5 years',
      description: 'Interactive learning through play and stories'
    },
    {
      name: 'Elementary',
      ageRange: '6-12 years',
      description: 'Dynamic Bible teaching and activities'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Children&apos;s Ministry</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nurturing young hearts in the love and knowledge of Christ.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Our Children&apos;s Ministry</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our children&apos;s ministry provides a safe, fun, and nurturing environment where
                children can learn about God&apos;s love through age-appropriate activities, Bible
                stories, music, and crafts. We believe in partnering with parents to help children
                build a strong foundation of faith.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <span>Ages 0-12</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span>Every Sunday</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <span>During Morning Service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <span>Children&apos;s Wing</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1200"
                alt="Children's Ministry"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Age Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ageGroups.map((group) => (
              <div key={group.name} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 mb-4">{group.ageRange}</p>
                <p className="text-gray-600 dark:text-gray-300">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">Register Your Child</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Parent/Guardian Name"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                placeholder="Child's Name"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                placeholder="Child's Age"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                placeholder="Emergency Contact"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
            </div>
            <textarea
              placeholder="Any allergies or special needs?"
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            />
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Register Child
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ChildrensMinistryPage;
