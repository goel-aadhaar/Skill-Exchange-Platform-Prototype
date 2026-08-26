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

  // Dynamic time-of-day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Calculate profile completion percentage
  let score = 30; // base registered
  if (currentUser.bio && currentUser.bio.length > 20) score += 15;
  if (currentUser.skillsToTeach.length > 0) score += 20;
  if (currentUser.skillsToLearn.length > 0) score += 20;
  if (currentUser.targetRole) score += 15;
  const completionPercent = Math.min(score, 100);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-lg relative overflow-hidden">
      {/* Subtle academic geometric watermark */}
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
      <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#8B1E2D]/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>IMT Placement & Internship Skill-Exchange Hub</span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {greeting}, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Prepare smarter for your next internship or placement. Bridge skill gaps with top-rated peer mentors on campus.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Target Role:</span>
              <span className="font-semibold text-white">{currentUser.targetRole || 'Not Set'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">Domain:</span>
              <span className="font-semibold text-white">{currentUser.targetDomain || 'General'}</span>
            </div>
          </div>
        </div>

        {/* Profile Completion Meter & Quick Action */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 min-w-[260px] space-y-3 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200">Profile Readiness</span>
            <span className="font-bold text-amber-400">{completionPercent}%</span>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-300">
            {completionPercent < 100 ? (
              <span>Add more skills or submit for verification to hit 100%.</span>
            ) : (
              <span className="text-emerald-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Profile fully optimized!
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('find_mentor')}
            className="w-full py-2 px-3 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            Find a Peer Mentor
            <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
