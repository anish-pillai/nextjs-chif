import Stripe from 'stripe';
import { loadStripe, Stripe as StripeClient } from '@stripe/stripe-js';

// Lazy Stripe instance - only initialize when needed
let stripeInstance: Stripe | null = null;

export function getStripe() {
  if (!stripeInstance) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    
    stripeInstance = new Stripe(stripeSecretKey, {
      apiVersion: '2025-04-30.basil',
      typescript: true,
    });
  }
  return stripeInstance;
}

// For backward compatibility
export const stripe = getStripe();

// Client-side Stripe promise
let stripePromise: Promise<StripeClient | null>;
export const getStripeClient = (): Promise<StripeClient | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable is not set');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Helper to format amount for display
export const formatAmount = (amount: number): string => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
