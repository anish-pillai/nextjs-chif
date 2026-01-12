'use client';

import { useState } from 'react';
import { createCheckoutSession } from '@/services/stripe-service';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Stripe } from '@stripe/stripe-js';

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
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe: Stripe | null = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
      
      // Use the correct method for newer Stripe versions
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
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
