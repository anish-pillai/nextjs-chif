'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSession } from '@/services/stripe-service';
import { useSession } from 'next-auth/react';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentStatus, setPaymentStatus] = useState('Processing...');
  const { data: session } = useSession();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setPaymentStatus('No session ID provided');
        return;
      }

      try {
        const stripeSession = await getSession(sessionId);
        
        if (stripeSession.payment_status === 'paid') {
          setPaymentStatus('Payment successful! Thank you for your purchase.');
          
          // Here you would typically update your database with the purchase information
          // For example, if you're using NextAuth with a database:
          if (session?.user?.email) {
            // Update user's subscription status in your database
            await fetch('/api/update-subscription', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: session.user.email,
                sessionId,
              }),
            });
          }
        } else {
          setPaymentStatus('Payment not completed. Please try again.');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setPaymentStatus('Error verifying payment. Please contact support.');
      }
    };

    verifyPayment();
  }, [sessionId, session]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Status</h1>
        <p className="mb-6">{paymentStatus}</p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
