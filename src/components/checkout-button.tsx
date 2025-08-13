'use client';

import { useState } from 'react';
import { createCheckoutSession } from '@/services/stripe-service';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface CheckoutButtonProps {
  priceId: string;
  buttonText?: string;
  className?: string;
}

export default function CheckoutButton({
  priceId,
  buttonText = 'Donate Now',
  className = '',
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // Get the user's email if they're logged in
      const customerEmail = session?.user?.email || undefined;
      
      // Create a checkout session
      const { sessionId } = await createCheckoutSession(priceId, customerEmail);
      
      // Redirect to Stripe Checkout
      const stripe = (await import('@stripe/stripe-js')).loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      
      const { error } = await (await stripe).redirectToCheckout({
        sessionId,
      });
      
      if (error) {
        console.error('Error redirecting to checkout:', error);
        throw error;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error (e.g., show an error message to the user)
      alert('An error occurred while processing your payment. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        isLoading ? 'opacity-75 cursor-not-allowed' : ''
      } ${className}`}
    >
      {isLoading ? 'Processing...' : buttonText}
    </button>
  );
}
