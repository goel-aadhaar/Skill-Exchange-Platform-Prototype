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

  return (
    <div className="bg-gradient-to-r from-[#0F2942] via-[#1E3A8A] to-[#0A192F] rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden border border-blue-900/40">
      {/* Background Gold Ambient Glow */}
      <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-amber-400/10 to-transparent pointer-events-none" />
      <div className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold backdrop-blur-xs border border-amber-400/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>IMT Hyderabad • Skill Exchange & Placement Repository</span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {greeting}, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
              Prepare smarter for your next summer internship or placement. Master key competencies with verified peer mentors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">Target Role:</span>
              <span className="font-bold text-white">{currentUser.targetRole || 'Business Analyst'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">Domain:</span>
              <span className="font-bold text-white">{currentUser.targetDomain || 'Data Analytics'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">Roll ID:</span>
              <span className="font-mono font-bold text-amber-300">{currentUser.studentId}</span>
            </div>
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 min-w-[260px] space-y-3 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200">Placement Readiness</span>
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
              <span>Add more skills or request peer mentoring to reach 100%.</span>
            ) : (
              <span className="text-emerald-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Profile fully placement-ready!
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('find_mentor')}
            className="w-full py-2 px-3 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            Find a Peer Mentor
            <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
          </button>
        </div>
      </div>
    </div>
  );
};
