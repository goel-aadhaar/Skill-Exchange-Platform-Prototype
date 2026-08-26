import React from 'react';

export const IMT_BRAND = {
  name: 'Institute of Management Technology',
  shortName: 'IMT Ghaziabad',
  portalName: 'IMT SkillConnect',
  portalSubtitle: 'Peer Skill-Exchange & Placement Preparation Platform',
  tagline: 'Connect. Learn. Prepare. Succeed.',
  description: 'Find peers who can help you build the skills you need for top tier internships and placements.',
  stats: {
    totalStudents: 720,
    academicYears: '2024–2026 & 2023–2025',
    programs: ['PGDM', 'PGDM (Marketing)', 'PGDM (Finance)', 'PGDM (Analytics)', 'PGDM (Executive)'],
  }
};

export const ImtLogo: React.FC<{ className?: string; variant?: 'full' | 'compact' | 'white' | 'badge' }> = ({
  className = 'h-10',
  variant = 'full'
}) => {
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center rounded-lg bg-[#8B1E2D] text-white font-bold tracking-wider shadow-sm ${className}`}>
        <span className="text-xs font-serif font-black tracking-widest px-2 py-1 border border-white/20 rounded">
          IMT
        </span>
      </div>
    );
  }

  if (variant === 'white') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner font-serif font-black text-sm tracking-widest">
          IMT
        </div>
        <div>
          <div className="font-serif font-bold tracking-tight text-white leading-none text-base">
            IMT GHAZIABAD
          </div>
          <div className="text-[10px] tracking-wider uppercase text-slate-300 font-medium mt-0.5">
            Skill-Exchange Platform
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="w-9 h-9 rounded-lg bg-[#8B1E2D] flex items-center justify-center text-white shadow-sm font-serif font-black text-xs tracking-wider border border-[#701420]">
          IMT
        </div>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-slate-900 leading-tight text-sm tracking-tight">
            IMT SkillConnect
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            Peer Mentorship Hub
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* IMT Academic Crest Emblem */}
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8B1E2D] to-[#6E1421] flex items-center justify-center text-white shadow-sm border border-[#5C101B] relative group">
        <div className="absolute inset-0.5 rounded-[10px] border border-white/20 flex flex-col items-center justify-center">
          <span className="font-serif font-black text-xs tracking-widest text-amber-300">
            IMT
          </span>
          <span className="text-[7px] tracking-tighter text-white/90 uppercase font-sans font-semibold -mt-0.5">
            EST. 1980
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-serif font-bold text-slate-900 tracking-tight text-base leading-tight">
            IMT GHAZIABAD
          </span>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-amber-200">
            Official
          </span>
        </div>
        <span className="text-xs text-slate-600 font-medium">
          Skill-Exchange Platform for Placements
        </span>
      </div>
    </div>
  );
};
