import { Users, Calendar, Clock, MapPin } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';

export default function YouthMinistry() {
  return (
    <div>
      <HeroSection
        title="Youth Ministry"
        description="Empowering the next generation through faith, fellowship, and fun."
        reducedHeight={true}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Our Youth Ministry</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our youth ministry is dedicated to helping teenagers grow in their faith, develop strong
                Christian values, and build lasting friendships. Through engaging activities, Bible study,
                and mentorship, we create a safe and welcoming environment where youth can explore their
                faith and discover their purpose.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span>Ages 13-18</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span>Every Friday Night</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span>7:00 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span>Youth Center</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2000"
                alt="Youth Group"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Weekly Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Youth Worship",
                day: "Friday",
                description: "Contemporary worship and Bible teaching"
              },
              {
                name: "Small Groups",
                day: "Sunday",
                description: "Age-specific discipleship groups"
              },
              {
                name: "Outreach",
                day: "Monthly",
                description: "Community service and evangelism"
              }
            ].map((activity) => (
              <div key={activity.name} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">{activity.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 mb-4">{activity.day}</p>
                <p className="text-gray-600 dark:text-gray-300">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Get Involved</h2>
          <form className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Parent/Guardian Name"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
              <input
                type="text"
                placeholder="Youth Name"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <textarea
              placeholder="Any questions or concerns?"
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 mb-6"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition-colors"
            >
              Join Youth Ministry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}