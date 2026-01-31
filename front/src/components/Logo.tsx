import React from 'react';
import { Plane } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'white' | 'icon-only';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'default', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 40,
  };

  const textColor = variant === 'white' ? 'text-white' : 'text-slate-900';
  const iconColor = variant === 'white' ? 'text-amber-400' : 'text-amber-500';

  return (
    <div className={`flex items-center gap-2 ${sizeClasses[size]}`}>
      <div className={`relative ${iconColor}`}>
        <Plane 
          size={iconSizes[size]} 
          className="rotate-45 transition-transform hover:scale-110"
          strokeWidth={2.5}
        />
      </div>
      {variant !== 'icon-only' && (
        <span className={`${textColor} tracking-tight`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          JANDED
        </span>
      )}
    </div>
  );
}