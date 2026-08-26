import React from 'react';

export const IMT_BRAND = {
  institutionName: 'Institute of Management Technology, Hyderabad',
  shortName: 'IMT Hyderabad',
  platformName: 'IMT Skill Exchange',
  tagline: 'Student-to-Student Skill Exchange for Internships & Placements',
  colors: {
    primaryBlue: '#0F2942', // Deep Navy Blue
    accentBlue: '#1E3A8A',  // Classic Royal Navy
    primaryYellow: '#F59E0B', // Warm Golden Yellow
    accentYellow: '#D97706',  // Amber Gold
    lightYellowBg: '#FEF3C7', // Soft Gold Tint
    lightBg: '#F8FAFC',
    darkText: '#0F172A',
    slateMuted: '#64748B'
  }
};

export const ImtLogo: React.FC<{
  className?: string;
  variant?: 'full' | 'compact' | 'white';
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', variant = 'full', size = 'md' }) => {
  const isWhite = variant === 'white';

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-13'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Academic Crest Emblem */}
      <div className={`relative flex items-center justify-center rounded-xl font-serif font-black shadow-md border transition-all ${
        size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-12 h-12 text-lg' : 'w-10 h-10 text-sm'
      } ${
        isWhite
          ? 'bg-amber-400 text-slate-900 border-amber-300'
          : 'bg-[#0F2942] text-amber-400 border-amber-500/40'
      }`}>
        <span className="tracking-tighter font-extrabold">IMT</span>
        {/* Academic yellow star indicator */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-[#0F2942]" />
      </div>

      {variant !== 'compact' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight leading-none ${
                size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base'
              } ${isWhite ? 'text-white' : 'text-slate-900'}`}
            >
              IMT <span className="text-amber-500 font-extrabold">Skill Exchange</span>
            </span>
          </div>
          <span
            className={`font-semibold tracking-wider uppercase ${
              size === 'sm' ? 'text-[9px]' : 'text-[10px]'
            } ${isWhite ? 'text-slate-300' : 'text-slate-500'}`}
          >
            IMT Hyderabad • Placement & SIP
          </span>
        </div>
      )}
    </div>
  );
};
