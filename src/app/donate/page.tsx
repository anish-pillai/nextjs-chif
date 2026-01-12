'use client';

import { useState } from 'react';
import CheckoutButton from '@/components/checkout-button';

export default function DonatePage() {
  const [amount, setAmount] = useState('25');
  
  // These price IDs should match the ones in your Stripe dashboard
  const getPriceId = (amount: string) => {
    // Map amounts to your Stripe Price IDs
    const priceMap: Record<string, string> = {
      '10': 'price_abc123', // Replace with your actual price ID for $10
      '25': 'price_def456', // Replace with your actual price ID for $25
      '50': 'price_ghi789', // Replace with your actual price ID for $50
      '100': 'price_jkl012', // Replace with your actual price ID for $100
    };
    
    return priceMap[amount] || '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Support Our Ministry
          </div>
          <h1 className="block mt-1 text-2xl leading-tight font-medium text-black">
            Make a Donation
          </h1>
          <p className="mt-2 text-gray-500">
            Your generous gift helps us continue our mission and serve our community.
          </p>
          
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select an amount</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {['10', '25', '50', '100'].map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className={`px-4 py-3 border rounded-lg text-center transition-colors ${
                    amount === value
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  ${value}
                </button>
              ))}
              
              <div className="col-span-2">
                <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Or enter a custom amount
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="custom-amount"
                    id="custom-amount"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="1"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <CheckoutButton 
                priceId={getPriceId(amount)} 
                buttonText={`Donate $${amount}`}
                className="w-full justify-center py-3 text-base"
              />
            </div>
            
            <p className="mt-4 text-xs text-gray-500 text-center">
              Secure payment processed by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
