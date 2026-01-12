import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';

interface DonationFormProps {
  onSuccess?: () => void;
}

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'INR', symbol: '₹' }
];

const predefinedAmounts = {
  USD: [50, 100, 250, 500, 1000, 2500],
  INR: [1000, 2000, 5000, 10000, 25000, 50000]
};

export function DonationFormInner({ onSuccess }: DonationFormProps) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !amount) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency
        }),
      });

      const { clientSecret, error: backendError } = await response.json();
      if (backendError) throw new Error(backendError);

      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/donation/success`,
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const currencySymbol = currencies.find(c => c.code === currency)?.symbol || '$';

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Select Amount</h3>
        <div className="flex items-center gap-4 mb-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>{c.code}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {predefinedAmounts[currency as keyof typeof predefinedAmounts].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt.toString())}
              className={`px-6 py-3 bg-white dark:bg-gray-800 border ${
                amount === amt.toString()
                  ? 'border-primary-500'
                  : 'border-gray-300 dark:border-gray-700'
              } rounded-lg hover:border-primary-500 dark:hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-colors`}
            >
              {currencySymbol}{amt}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Custom Amount"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement />
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || !stripe}
          className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Donate ${currencySymbol}${amount || '0'}`}
        </button>
      </form>
    </div>
  );
}

export default function DonationForm(props: DonationFormProps) {
  const [clientSecret, setClientSecret] = useState('');

  // Initialize payment when component mounts
  useState(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 0,
        currency: 'USD'
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  });

  return clientSecret ? (
    <Elements stripe={getStripe()} options={{ clientSecret }}>
      <DonationFormInner {...props} />
    </Elements>
  ) : (
    <div>Loading...</div>
  );
}
