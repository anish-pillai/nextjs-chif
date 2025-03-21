# CHIF - City Harvest International Fellowship Website

A modern, responsive church website built with Next.js and Tailwind CSS.

## Features

- Modern, responsive design
- Dark mode support
- Multiple ministry pages:
  - Children's Ministry
  - Adult Ministry
  - Youth Ministry
- Event management
- Sermon library
- Online giving
- Contact forms
- Small groups management

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Lucide Icons
- TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/anish-pillai/nextjs-chif.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── connect/           # Connect page
│   ├── events/            # Events page
│   ├── give/             # Give page
│   ├── ministries/       # Ministry pages
│   │   ├── adult/       
│   │   ├── children/    
│   │   └── youth/       
│   └── sermons/          # Sermons page
├── components/           # Reusable React components
├── data/                # Data files
└── styles/              # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
