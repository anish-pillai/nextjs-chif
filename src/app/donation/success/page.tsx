import Link from 'next/link';

export default function DonationSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Thank You for Your Donation!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your generous contribution helps us continue our mission.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
