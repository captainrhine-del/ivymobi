interface EmptyActivityPanelProps {
  activityCount: number;
}

export function EmptyActivityPanel({ activityCount }: EmptyActivityPanelProps) {
  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <h2 className="text-base font-medium text-foreground mb-6">所有活动</h2>

      {/* Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <svg
          width="240"
          height="200"
          viewBox="0 0 240 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4"
        >
          {/* Phone/tablet device */}
          <rect x="60" y="20" width="120" height="160" rx="12" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="2" />
          <rect x="70" y="35" width="100" height="120" rx="4" fill="hsl(var(--background))" />
          
          {/* Content lines on screen */}
          <rect x="80" y="50" width="60" height="6" rx="2" fill="hsl(var(--primary) / 0.4)" />
          <rect x="80" y="65" width="80" height="4" rx="2" fill="hsl(var(--muted-foreground) / 0.3)" />
          <rect x="80" y="75" width="70" height="4" rx="2" fill="hsl(var(--muted-foreground) / 0.3)" />
          <rect x="80" y="85" width="75" height="4" rx="2" fill="hsl(var(--muted-foreground) / 0.3)" />
          
          {/* Play button */}
          <circle cx="170" cy="120" r="20" fill="hsl(var(--primary) / 0.2)" />
          <path d="M165 110 L180 120 L165 130 Z" fill="hsl(var(--primary))" />
          
          {/* Envelope/mail icon */}
          <rect x="30" y="100" width="40" height="28" rx="4" fill="hsl(var(--primary))" />
          <path d="M32 102 L50 118 L68 102" stroke="hsl(var(--primary-foreground))" strokeWidth="2" fill="none" />
          
          {/* Megaphone person */}
          <circle cx="200" cy="90" r="15" fill="hsl(var(--primary) / 0.3)" />
          <ellipse cx="200" cy="130" rx="20" ry="25" fill="hsl(var(--primary))" />
          
          {/* Megaphone */}
          <path d="M210 85 L235 70 L235 100 L210 95 Z" fill="hsl(var(--muted-foreground))" />
          <ellipse cx="210" cy="90" rx="5" ry="8" fill="hsl(var(--muted-foreground))" />
          
          {/* Sound waves */}
          <path d="M238 75 Q245 85 238 95" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
          <path d="M242 70 Q252 85 242 100" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
          
          {/* Decorative leaves */}
          <ellipse cx="45" cy="50" rx="8" ry="15" fill="hsl(142 76% 36%)" transform="rotate(-30 45 50)" />
          <ellipse cx="55" cy="45" rx="6" ry="12" fill="hsl(142 76% 36%)" transform="rotate(15 55 45)" />
          <ellipse cx="195" cy="45" rx="6" ry="12" fill="hsl(25 95% 53%)" transform="rotate(-20 195 45)" />
          <ellipse cx="205" cy="50" rx="5" ry="10" fill="hsl(25 95% 53%)" transform="rotate(25 205 50)" />
          
          {/* Dotted circle decoration */}
          <circle cx="180" cy="40" r="25" stroke="hsl(var(--primary) / 0.3)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        </svg>

        <p className="text-sm text-muted-foreground">
          共{activityCount}个活动。
        </p>
      </div>
    </div>
  );
}
