'use client';

import React from 'react';
import { Student } from '../../types';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Target, Award, CheckCircle2 } from 'lucide-react';

interface WelcomeBannerProps {
  currentUser: Student;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ currentUser }) => {
  const { setActiveTab } = useApp();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  let score = 30;
  if (currentUser.bio && currentUser.bio.length > 20) score += 15;
  if (currentUser.skillsToTeach.length > 0) score += 20;
  if (currentUser.skillsToLearn.length > 0) score += 20;
  if (currentUser.targetRole) score += 15;
  const completionPercent = Math.min(score, 100);

  // SVG circular stroke calculation
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercent / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-[#0B192C] via-[#0F2942] to-[#1E3A8A] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-900/50">
      {/* Background Subtle Geometric Texture & Gold Ambient Glow */}
      <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3.5 max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-extrabold backdrop-blur-xs border border-amber-400/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>IMT Hyderabad • Peer Mentoring & Placement Hub</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {greeting}, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed max-w-xl">
              Accelerate your placement readiness. Connect with campus peers who hold PPOs at Deloitte, Goldman Sachs, and McKinsey to bridge your technical skill gaps.
            </p>
          </div>

          {/* Key Target Pill Tags */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">Target Role:</span>
              <span className="font-bold text-white">{currentUser.targetRole || 'Business Analyst'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">Track:</span>
              <span className="font-bold text-white">{currentUser.targetDomain || 'Data Analytics'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs font-data">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">Roll:</span>
              <span className="font-bold text-amber-300">{currentUser.studentId}</span>
            </div>
          </div>
        </div>

        {/* Circular Placement Readiness Meter & CTA */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 min-w-[270px] flex flex-col items-center justify-between gap-4 shrink-0 shadow-lg">
          <div className="flex items-center gap-4 w-full justify-between">
            <div className="space-y-0.5 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
                Placement Readiness
              </span>
              <div className="text-xl font-black text-white">
                {completionPercent}% <span className="text-xs text-amber-400 font-semibold">Ready</span>
              </div>
              <span className="text-[10px] text-slate-300 block">
                {completionPercent >= 80 ? '✓ High recruiter alignment' : 'Add skills to optimize profile'}
              </span>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  className="text-white/20"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  className="text-amber-400 transition-all duration-700 ease-out"
                  strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-xs font-black text-white font-data">
                {completionPercent}%
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('find_mentor')}
            className="w-full py-2.5 px-4 text-xs font-black text-[#0B192C] bg-amber-400 hover:bg-amber-500 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <span>Find a Peer Mentor</span>
            <ArrowRight className="w-4 h-4 text-[#0B192C]" />
          </button>
        </div>
      </div>
    </div>
  );
};
