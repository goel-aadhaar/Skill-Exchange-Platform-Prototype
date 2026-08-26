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
  const { domains, skills, students, setSelectedSkillForMentorSearch, setActiveTab } = useApp();

  const [activeDomainId, setActiveDomainId] = useState<string>(domains[0]?.id || 'domain-analytics');

  const activeDomain = domains.find((d) => d.id === activeDomainId) || domains[0] || {
    id: 'domain-analytics',
    name: 'Data Analytics & IT',
    iconName: 'BarChart3',
    description: 'Data-driven business decision making, analytics tools, SQL databases, and BI visualization.',
    popularRoles: ['Business Analyst', 'Analytics Consultant', 'Product Analyst', 'BI Developer'],
    keySkills: ['Python for Data Analysis', 'SQL & Database Querying', 'Power BI & DAX', 'Tableau Visual Analytics'],
    topRecruiters: ['Deloitte USI', 'Amazon', 'EY GDS', 'PwC', 'KPMG', 'Mu Sigma'],
    avgPackage: '₹14.5 LPA - ₹24.0 LPA',
    marketInsight: 'High demand for candidates proficient in end-to-end Python + SQL data workflows.'
  };

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

  const domainSkills = skills.filter(
    (sk) => sk.domain.toLowerCase() === activeDomain.name.toLowerCase() || (activeDomain.keySkills && activeDomain.keySkills.includes(sk.name))
  );

  const domainMentors = students.filter(
    (st) =>
      st.role !== 'admin' &&
      st.skillsToTeach.some(
        (s) =>
          s.domain.toLowerCase() === activeDomain.name.toLowerCase() ||
          (activeDomain.keySkills && activeDomain.keySkills.includes(s.skillName))
      )
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#0F2942] text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold shadow-xs">
            <Compass className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Career Tracks & Domain Intelligence
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore campus recruitment expectations, CTC benchmarks, required core skills, and peer mentors across domains at IMT Hyderabad.
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
                  ? 'bg-[#0F2942] text-amber-400 border-[#0F2942] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{dom.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Domain Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                IMT Hyderabad Career Specialization Track
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {activeDomain.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeDomain.description}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 min-w-[200px] text-right shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Placement CTC Band
            </span>
            <div className="text-lg font-black text-blue-900 font-mono mt-0.5">
              {activeDomain.avgPackage}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
              Top recruiters on campus
            </span>
          </div>
        </div>

        {/* Roles & Market Insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-900" />
              Target Campus Roles
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeDomain.popularRoles?.map((r, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
              Recruiter Insight
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {activeDomain.marketInsight}
            </p>
          </div>
        </div>

        {/* Key Required Skills with Mentor Bridge */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-900" />
            Core Skills Needed for this Domain
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {activeDomain.keySkills?.map((skillName, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2"
              >
                <span className="text-xs font-bold text-slate-900">{skillName}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSkillForMentorSearch(skillName);
                    setActiveTab('find_mentor');
                  }}
                  className="text-[11px] font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 self-start"
                >
                  <span>Find Mentor →</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Top Recruiters for {activeDomain.name}:
          </span>
          <div className="flex flex-wrap gap-2">
            {activeDomain.topRecruiters?.map((rec, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
              >
                {rec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
