'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Sparkles,
  ChevronUp,
  ChevronDown,
  UserCheck,
  Building2,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  X
} from 'lucide-react';

export const DemoTourGuide: React.FC = () => {
  const { switchPersona, setActiveTab, setSelectedSkillForMentorSearch } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const scenarios = [
    {
      id: 's1',
      title: '1. Learner Journey (Skill Gap → Request)',
      persona: 'student-aadhaar',
      tab: 'dashboard' as const,
      desc: 'Log in as Aadhaar (PGDM Analytics 1st Yr) → see missing SQL & Power BI skills → 1-click find mentor.',
      action: () => {
        switchPersona('student-aadhaar');
        setActiveTab('dashboard');
      }
    },
    {
      id: 's2',
      title: '2. Mentor Journey (Accept Request → Session)',
      persona: 'student-rahul',
      tab: 'my_requests' as const,
      desc: 'Log in as Rahul (Deloitte PPO Senior) → review incoming SQL request → accept with meeting link.',
      action: () => {
        switchPersona('student-rahul');
        setActiveTab('my_requests');
      }
    },
    {
      id: 's3',
      title: '3. Placement Company Skill Matcher',
      persona: 'student-aadhaar',
      tab: 'placements' as const,
      desc: 'Open Deloitte / McKinsey / Amazon requirements → check skill gaps → bridge gap with peer.',
      action: () => {
        switchPersona('student-aadhaar');
        setActiveTab('placements');
      }
    },
    {
      id: 's4',
      title: '4. Placement Cell Admin & Verification',
      persona: 'admin-arvind',
      tab: 'admin_portal' as const,
      desc: 'Log in as Faculty Admin Dr. Arvind → approve/reject pending student skill claims in verification queue.',
      action: () => {
        switchPersona('admin-arvind');
        setActiveTab('admin_portal');
      }
    }
  ];

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm w-full">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 border border-slate-700 text-xs font-bold transition-all animate-bounce"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Evaluation Demo Guide</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#8B1E2D] text-white flex items-center justify-center text-xs font-bold">
                IMT
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  Guided Evaluation Scenarios
                </h4>
                <p className="text-[10px] text-slate-500">
                  1-Click shortcuts for faculty & stakeholder review
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
                title="Dismiss guide"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {scenarios.map((sc) => (
              <div
                key={sc.id}
                onClick={() => {
                  sc.action();
                }}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-rose-50/50 hover:border-[#8B1E2D]/40 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#8B1E2D]">
                  <span>{sc.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#8B1E2D] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {sc.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-slate-400 text-center pt-1 border-t border-slate-100">
            Click any scenario to immediately load the corresponding persona & screen.
          </div>
        </div>
      )}
    </div>
  );
};
