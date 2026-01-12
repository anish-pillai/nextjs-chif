To get the value for STRIPE_WEBHOOK_SECRET, follow these steps:

Go to your Stripe Dashboard:
https://dashboard.stripe.com/test/webhooks (for test mode) or https://dashboard.stripe.com/webhooks (for live mode).
Click on "Add endpoint" (or select your existing webhook endpoint if you already have one).
Set the endpoint URL to your local or deployed server’s webhook handler (e.g., https://yourdomain.com/api/webhook or http://localhost:3000/api/webhook for local development).
After creating the endpoint, Stripe will show you a list of webhook endpoints. Click on the endpoint you just created.
On the endpoint details page, you will see a section called "Signing secret". Click "Reveal" to display your STRIPE_WEBHOOK_SECRET.
Copy this value and paste it into your .env file as:
CopyInsert
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXX
If you are running Stripe CLI for local development, you can also get the webhook secret from the Stripe CLI output after running:

CopyInsert
stripe listen --forward-to localhost:3000/api/webhook
The CLI will display something like:

CopyInsert
Ready! Your webhook signing secret is whsec_XXXXXXXXXXXXXXXXXXXXXXXX
