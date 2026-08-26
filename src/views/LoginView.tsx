'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ImtLogo, IMT_BRAND } from '../data/imtBranding';
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Lock,
  Mail,
  Building2,
  Database
} from 'lucide-react';

interface LoginViewProps {
  onGoToRegister: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onGoToRegister }) => {
  const { loginWithStudentId, isLoading } = useApp();

  const [identifier, setIdentifier] = useState('25A3HP658'); // Default to Tushar Goel
  const [password, setPassword] = useState('demo123');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    await loginWithStudentId(identifier.trim());
  };

  const demoAccounts = [
    {
      name: 'Tushar Goel',
      studentId: '25A3HP658',
      role: 'PGDM 1st Yr (Learner)',
      desc: 'Wants Python & SQL for Analytics internship',
      badge: 'Learner',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200'
    },
    {
      name: 'Oshi Shrivastava',
      studentId: '25A3HP651',
      role: 'PGDM 2nd Yr (Deloitte PPO)',
      desc: 'Teaches Python for Data Science & SQL Querying',
      badge: 'Senior Mentor',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      name: 'Naman Aggarwal',
      studentId: '25A3HP613',
      role: 'PGDM 2nd Yr (Goldman Sachs PPO)',
      desc: 'Teaches 3-Statement Financial Modeling & Valuation',
      badge: 'Finance Mentor',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200'
    },
    {
      name: 'Lavisha Khandelwal',
      studentId: '25A3HP082',
      role: 'PGDM 2nd Yr (McKinsey PPO)',
      desc: 'Teaches Consulting Case Cracking & Guesstimates',
      badge: 'Strategy Mentor',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200'
    },
    {
      name: 'Tanvi Khandelwal',
      studentId: '25A3HP175',
      role: 'PGDM 2nd Yr (Microsoft PPO)',
      desc: 'Teaches PRDs, Figma Prototyping & Product Growth',
      badge: 'Product Mentor',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-200'
    },
    {
      name: 'Dr. Arvind Swaminathan',
      studentId: 'placement.cell@imthyderabad.edu.in',
      role: 'Faculty Placement Cell Head',
      desc: 'Verifies student skill badges & manages 226 JDs',
      badge: 'Admin',
      badgeColor: 'bg-slate-900 text-amber-400 border-slate-700'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Yellow & Blue subtle ambient gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200 via-amber-100/40 to-slate-100" />

      <div className="relative max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: IMT Hyderabad Branding & Mission */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Logo */}
          <div className="p-1">
            <ImtLogo variant="full" size="lg" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Official Peer Skill-Exchange & Placement Prep</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942] tracking-tight leading-tight">
              Connect. Learn. Get Placed at{' '}
              <span className="text-amber-600">IMT Hyderabad</span>.
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              Bridge your summer internship & final placement skill gaps with top-rated peer mentors on campus. Real-time skill matching against <strong>226 placement JDs</strong> and <strong>75 internship drives</strong>.
            </p>
          </div>

          {/* Key Value Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F2942]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>226 Placement JDs</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Direct skill gap comparison for Deloitte, Amazon, Apple, Goldman Sachs.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F2942]">
                <Database className="w-4 h-4 text-blue-600" />
                <span>Live Neon PostgreSQL</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Real multi-user peer mentoring requests with persistent database synchronization.
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Login Card & 1-Click Persona Access */}
        <div className="lg:col-span-6 bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Sign In to Your IMT Account
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your Roll ID or select one of the 5 seeded student personas below
            </p>
          </div>

          {/* Direct Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                IMT Student ID or Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 25A3HP658 or tushar.goel@imthyderabad.edu.in"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Verifying with PostgreSQL...' : 'Sign In to Skill Exchange'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500">New IMT student?</span>
              <button
                type="button"
                onClick={onGoToRegister}
                className="font-extrabold text-blue-900 hover:text-amber-600 underline cursor-pointer"
              >
                Register New Student Profile →
              </button>
            </div>
          </form>

          {/* 1-Click Demo Personas */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                1-Click Instant Persona Sign-In:
              </span>
              <span className="text-[10px] text-slate-500">Live Seed Accounts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.studentId}
                  type="button"
                  onClick={() => {
                    setIdentifier(acc.studentId);
                    loginWithStudentId(acc.studentId);
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/70 hover:border-blue-300 transition-all text-left space-y-0.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-blue-900">
                      {acc.name}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${acc.badgeColor}`}>
                      {acc.badge}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">{acc.studentId}</div>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{acc.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
