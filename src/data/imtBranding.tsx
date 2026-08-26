import React from 'react';

export const IMT_BRAND = {
  institutionName: 'Institute of Management Technology, Hyderabad',
  shortName: 'IMT Hyderabad',
  platformName: 'IMT Skill Exchange',
  tagline: 'Peer Mentoring & Placement Readiness Hub',
  establishedYear: '2011',
  colors: {
    navyDark: '#0B192C',     // Anchor Deep Navy
    navyRoyal: '#1E3A8A',    // Classic Academic Blue
    goldDark: '#D97706',     // Ochre Gold
    goldLight: '#F59E0B',    // Amber Warm
    goldTint: '#FEF3C7',     // Soft Parchment Gold
    surface: '#FFFFFF',
    canvas: '#F8FAFC',
    ink: '#0F172A',
    muted: '#64748B',
    border: '#E2E8F0'
  }
};

export const ImtLogo: React.FC<{
  className?: string;
  variant?: 'full' | 'compact' | 'white';
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', variant = 'full', size = 'md' }) => {
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Handcrafted Academic Crest Emblem */}
      <div
        className={`relative flex items-center justify-center rounded-2xl font-serif-display font-black shadow-xs transition-transform duration-200 hover:scale-105 select-none ${
          size === 'sm'
            ? 'w-8 h-8 text-xs'
            : size === 'lg'
            ? 'w-12 h-12 text-base'
            : 'w-10 h-10 text-sm'
        } ${
          isWhite
            ? 'bg-amber-400 text-[#0B192C] border border-amber-300 ring-2 ring-white/20'
            : 'bg-[#0B192C] text-amber-400 border border-amber-500/40 ring-1 ring-black/5'
        }`}
      >
        <span className="tracking-tight font-extrabold">IMT</span>
        {/* Academic gold badge pip */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-white shadow-xs" />
      </div>

      {variant !== 'compact' && (
        <div className="flex flex-col select-none">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight ${
                size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base'
              } ${isWhite ? 'text-white' : 'text-[#0B192C]'}`}
            >
              IMT <span className="text-amber-500 font-extrabold">Skill Exchange</span>
            </span>
          </div>
          <span
            className={`font-bold tracking-wider uppercase mt-1 ${
              size === 'sm' ? 'text-[9px]' : 'text-[10px]'
            } ${isWhite ? 'text-slate-300' : 'text-slate-500'}`}
          >
            IMT Hyderabad • Placement & SIP Hub
          </span>
        </div>
      )}
    </div>
  );
};
