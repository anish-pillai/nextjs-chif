import { Users, Heart, BookOpen } from 'lucide-react';
import { leadershipTeam } from '@/data/team';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">About Our Church</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            City Harvest International Fellowship is a vibrant, multicultural community of believers
            dedicated to sharing God's love and making a positive impact in our city.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To love God, love people, and make disciples who transform our community.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To be a beacon of hope and transformation in our city and beyond.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Our Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                A diverse family united in faith, serving God and our neighbors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((member) => (
              <div key={member.id} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Statement of Faith</h2>
          <div className="prose dark:prose-invert mx-auto">
            <p className="mb-4">
              We believe in the authority of Scripture, the Trinity, salvation through Jesus Christ,
              and the power of the Holy Spirit in the lives of believers.
            </p>
            <p className="mb-4">
              We affirm the historic Christian faith as revealed in the Bible and expressed in the
              Apostles' and Nicene Creeds.
            </p>
            <p>
              Our faith is centered on the gospel of Jesus Christ and His transformative work in
              our lives and communities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}