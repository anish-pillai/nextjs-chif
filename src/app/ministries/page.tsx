import React from 'react';
import { Users, Heart, BookOpen, Music, Baby, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';

export default function Ministries() {
  const ministries = [
    {
      name: "Youth Ministry",
      description: "Empowering the next generation through faith, fellowship, and fun.",
      icon: Users,
      href: "/ministries/youth",
      leader: "Michael Chen",
      email: "youth@chif.church"
    },
    {
      name: "Children's Ministry",
      description: "Nurturing young hearts in the love and knowledge of Christ.",
      icon: Baby,
      href: "/ministries/children",
      leader: "Sarah Thompson",
      email: "children@chif.church"
    },
    {
      name: "Adult Ministry",
      description: "Growing together in faith through Bible study and fellowship.",
      icon: UserPlus,
      href: "/ministries/adult",
      leader: "Pastor John Smith",
      email: "adult@chif.church"
    }
  ];

  return (
    <div>
      <HeroSection
        title="Our Ministries"
        description="Discover how you can grow in faith and serve others through our various ministry opportunities."
        reducedHeight={true}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ministries.map((ministry) => {
              const Icon = ministry.icon;
              return (
                <div key={ministry.name} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{ministry.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{ministry.description}</p>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ministry Leader:</p>
                      <p className="font-medium">{ministry.leader}</p>
                      <p className="text-primary-600 dark:text-primary-400">{ministry.email}</p>
                    </div>
                    <Link
                      href={ministry.href}
                      className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-2 rounded-md transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            We believe everyone has a place to serve and grow in our church community.
            Contact our ministry leaders or fill out the form below to get started.
          </p>
          <form className="max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <select className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 mb-4">
              <option value="">Select a Ministry</option>
              {ministries.map((ministry) => (
                <option key={ministry.name} value={ministry.name}>{ministry.name}</option>
              ))}
            </select>
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 mb-4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition-colors"
            >
              Get Connected
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}