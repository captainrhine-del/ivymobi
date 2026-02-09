import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
  viColor: string;
  setViColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Convert hex to HSL
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the # if present
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function updateCSSVariables(hex: string) {
  const hsl = hexToHSL(hex);
  const root = document.documentElement;
  
  // Update primary color
  root.style.setProperty('--primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
  
  // Update ring color to match primary
  root.style.setProperty('--ring', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
  
  // Update accent color (lighter version of primary)
  root.style.setProperty('--accent', `${hsl.h} ${hsl.s}% 97%`);
  root.style.setProperty('--accent-foreground', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
  
  // Update sidebar colors
  root.style.setProperty('--sidebar-primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
  root.style.setProperty('--sidebar-accent', `${hsl.h} ${hsl.s}% 97%`);
  root.style.setProperty('--sidebar-accent-foreground', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
  root.style.setProperty('--sidebar-ring', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
  
  // Update admin icon background (10% opacity effect using very light version)
  root.style.setProperty('--admin-icon-bg', `${hsl.h} ${hsl.s}% 95%`);
  root.style.setProperty('--admin-icon-color', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [viColor, setViColorState] = useState(() => {
    // Load from localStorage or use default
    return localStorage.getItem('viColor') || '#2563eb';
  });

  const setViColor = (color: string) => {
    setViColorState(color);
    localStorage.setItem('viColor', color);
    updateCSSVariables(color);
  };

  // Apply theme on mount
  useEffect(() => {
    updateCSSVariables(viColor);
  }, []);

  return (
    <ThemeContext.Provider value={{ viColor, setViColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
