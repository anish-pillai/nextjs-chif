export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-x-0 top-0 w-full"
        style={{ height: '50vh' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="text-primary-600" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="50%" className="text-primary-500" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" className="text-primary-400" stopColor="currentColor" stopOpacity="0.4" />
          </linearGradient>
          <pattern id="heroPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" className="text-primary-300/20" fill="currentColor" />
            <path d="M0 50 L100 50 M50 0 L50 100" className="text-primary-400/10" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        
        {/* Background with gradient */}
        <rect width="1920" height="600" fill="url(#heroGradient)" />
        
        {/* Decorative pattern overlay */}
        <rect width="1920" height="600" fill="url(#heroPattern)" />
        
        {/* Decorative waves */}
        <path d="M0,400 Q480,300 960,400 T1920,400 L1920,600 L0,600 Z" 
              className="text-primary-700/30" fill="currentColor" />
        <path d="M0,500 Q480,400 960,500 T1920,500 L1920,600 L0,600 Z" 
              className="text-primary-800/20" fill="currentColor" />
        
        {/* Decorative circles */}
        <circle cx="200" cy="150" r="60" className="text-primary-400/10" fill="currentColor" />
        <circle cx="1720" cy="200" r="80" className="text-primary-500/10" fill="currentColor" />
        <circle cx="150" cy="450" r="40" className="text-primary-300/15" fill="currentColor" />
        <circle cx="1770" cy="480" r="50" className="text-primary-400/10" fill="currentColor" />
      </svg>
    </div>
  );
}
