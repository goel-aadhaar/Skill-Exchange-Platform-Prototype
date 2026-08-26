'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ImtLogo, IMT_BRAND } from '../data/imtBranding';
import {
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  UserCheck,
  Shield,
  ArrowRight,
  GraduationCap,
  Users,
  Building2,
  BookOpen
} from 'lucide-react';

interface LoginViewProps {
  onGoToRegister: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onGoToRegister }) => {
  const { login, switchPersona } = useApp();

  const [emailOrId, setEmailOrId] = useState('aadhaar.verma@imt.edu');
  const [password, setPassword] = useState('imt2024');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(emailOrId);
      setIsLoading(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full mx-auto bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left Side: IMT Academic Branding & Value Proposition */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#8B1E2D] via-[#781825] to-[#55101A] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Crest background watermark */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 blur-xl pointer-events-none" />
          <div className="absolute top-1/4 -left-12 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="relative z-10 space-y-6">
            <ImtLogo variant="white" className="h-12" />

            <div className="space-y-3 pt-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-xs border border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Placement Readiness Initiative</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight leading-tight text-white">
                {IMT_BRAND.tagline}
              </h1>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md font-light">
                {IMT_BRAND.description}
              </p>
            </div>
          </div>

          {/* Institutional Stats Highlight */}
          <div className="relative z-10 grid grid-cols-3 gap-3 pt-8 border-t border-white/15 mt-8">
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-bold font-serif text-white">
                720+
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 uppercase tracking-wider font-medium">
                Students
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-bold font-serif text-white">
                35+
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 uppercase tracking-wider font-medium">
                Core Skills
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-bold font-serif text-white">
                100%
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 uppercase tracking-wider font-medium">
                Peer Driven
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form & Quick Demo Switchers */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Student & Faculty Portal
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your IMT credentials or select a pre-configured demo account below.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  IMT Email or Student ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={emailOrId}
                    onChange={(e) => setEmailOrId(e.target.value)}
                    required
                    placeholder="name@imt.edu or IMT2024PGDM..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[11px] text-[#8B1E2D] hover:underline font-medium"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-9 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#8B1E2D] focus:ring-[#8B1E2D]"
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? 'Authenticating...' : 'Sign In to SkillConnect'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* 1-Click Demo Logins for Evaluator */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Instant Demo Logins (Faculty & Stakeholder Evaluation)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => switchPersona('student-aadhaar')}
                  className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Aadhaar (Learner)</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Needs SQL, Power BI
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => switchPersona('student-rahul')}
                  className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Rahul (Mentor)</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Deloitte PPO • 4.9★
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => switchPersona('student-priya')}
                  className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Building2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Priya (Finance)</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Goldman Sachs PPO
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => switchPersona('admin-arvind')}
                  className="p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-left transition-colors"
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-rose-900">
                    <Shield className="w-3.5 h-3.5 text-rose-600" />
                    <span>Placement Admin</span>
                  </div>
                  <div className="text-[10px] text-rose-600 mt-0.5">
                    Verification & Drives
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* New User Footer */}
          <div className="pt-6 text-center text-xs text-slate-600 border-t border-slate-100 mt-6">
            New to IMT SkillConnect?{' '}
            <button
              type="button"
              onClick={onGoToRegister}
              className="font-bold text-[#8B1E2D] hover:underline"
            >
              Create your Student Profile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
