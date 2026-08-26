'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DomainInfo } from '../types';
import {
  Compass,
  Briefcase,
  TrendingUp,
  BarChart3,
  Layers,
  Megaphone,
  Cpu,
  Truck,
  Award,
  Users,
  Building2,
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const DomainsView: React.FC = () => {
  const { domains, skills, companies, students, setSelectedSkillForMentorSearch, setActiveTab } = useApp();

  const [activeDomainId, setActiveDomainId] = useState<string>(domains[0]?.id || 'domain-analytics');

  const activeDomain = domains.find((d) => d.id === activeDomainId) || domains[0];

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return BarChart3;
      case 'Briefcase':
        return Briefcase;
      case 'TrendingUp':
        return TrendingUp;
      case 'Layers':
        return Layers;
      case 'Megaphone':
        return Megaphone;
      case 'Cpu':
        return Cpu;
      case 'Truck':
        return Truck;
      default:
        return Award;
    }
  };

  // Domain skills
  const domainSkills = skills.filter(
    (sk) => sk.domain.toLowerCase() === activeDomain.name.toLowerCase() || activeDomain.keySkills.includes(sk.name)
  );

  // Top domain mentors
  const domainMentors = students.filter(
    (st) =>
      st.role !== 'admin' &&
      st.skillsToTeach.some((s) => s.domain.toLowerCase() === activeDomain.name.toLowerCase() || activeDomain.keySkills.includes(s.skillName))
  );

  // Top companies for this domain
  const domainCompanies = companies.filter(
    (c) => c.domain.toLowerCase() === activeDomain.name.toLowerCase() || activeDomain.topRecruiters.includes(c.name)
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#8B1E2D] text-white flex items-center justify-center font-bold shadow-xs">
            <Compass className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Domains & Career Experience Hub
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore campus recruitment expectations, salary benchmarks, core required skills, and peer mentors across domains.
        </p>
      </div>

      {/* Domain Selection Tabs Carousel */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {domains.map((dom) => {
          const Icon = getDomainIcon(dom.iconName);
          const isActive = dom.id === activeDomainId;
          return (
            <button
              key={dom.id}
              type="button"
              onClick={() => setActiveDomainId(dom.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all border ${
                isActive
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{dom.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Domain Overview Hero */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-7 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#8B1E2D] border border-rose-200 text-xs font-bold">
              <span>{activeDomain.name} Domain Track</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {activeDomain.name} Preparation Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeDomain.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 min-w-[240px] space-y-2">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Typical CTC / Package Range
            </div>
            <div className="text-lg font-black text-emerald-800">
              {activeDomain.avgPackage}
            </div>
            <div className="text-[11px] text-slate-500">
              Based on historical IMT campus placement data
            </div>
          </div>
        </div>

        {/* Market Insights Banner */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">Placement Cell Market Insight: </span>
            {activeDomain.marketInsight}
          </div>
        </div>

        {/* Popular Roles */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Popular Career Roles Recruited on Campus
          </h3>
          <div className="flex flex-wrap gap-2">
            {activeDomain.popularRoles.map((role, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Key Skills in Demand */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Key Required Skills for {activeDomain.name} ({domainSkills.length})
            </h3>
            <span className="text-xs text-slate-500">
              Click skill to discover available peer mentors
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {domainSkills.map((sk) => (
              <div
                key={sk.id}
                onClick={() => {
                  setSelectedSkillForMentorSearch(sk.name);
                  setActiveTab('find_mentor');
                }}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#8B1E2D] hover:shadow-2xs cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#8B1E2D]">
                      {sk.name}
                    </h4>
                    <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded font-semibold border border-amber-200">
                      {sk.demandLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {sk.description}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#8B1E2D]">
                  <span>Find Mentors</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Recruiters */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Top Recruiters for {activeDomain.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {activeDomain.topRecruiters.map((recruiter, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {recruiter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
