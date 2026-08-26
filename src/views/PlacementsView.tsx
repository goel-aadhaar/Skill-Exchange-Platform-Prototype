'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CompanyCard } from '../components/companies/CompanyCard';
import { EmptyState } from '../components/common/EmptyState';
import {
  Building2,
  Search,
  Filter,
  Briefcase,
  Sparkles,
  RotateCcw,
  Calendar
} from 'lucide-react';

export const PlacementsView: React.FC = () => {
  const {
    companies,
    currentUser,
    setSelectedCompanyForModal,
    setSelectedSkillForMentorSearch,
    setActiveTab,
    domains
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');

  const filteredCompanies = companies.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchIndustry = c.industry.toLowerCase().includes(q);
      const matchSkill = c.requiredSkills.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchIndustry && !matchSkill) return false;
    }

    if (selectedDomain !== 'all' && c.domain.toLowerCase() !== selectedDomain.toLowerCase()) {
      return false;
    }

    if (selectedTier !== 'all' && c.tier !== selectedTier) {
      return false;
    }

    return true;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDomain('all');
    setSelectedTier('all');
  };

  const handleFindMentorForSkill = (skillName: string) => {
    setSelectedSkillForMentorSearch(skillName);
    setActiveTab('find_mentor');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Placements & Internships Directory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare recruiter skill expectations against your student profile to uncover skill gaps before interview shortlists.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto font-medium">
          Sample Recruiter Dataset • Phase 1 Placement Cycle
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search by company or skill */}
          <div className="relative sm:col-span-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies (Deloitte, McKinsey, Amazon) or skills..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            />
          </div>

          {/* Domain Filter */}
          <div>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            >
              <option value="all">All Domains</option>
              {domains.map((dom) => (
                <option key={dom.id} value={dom.name}>
                  {dom.name}
                </option>
              ))}
            </select>
          </div>

          {/* Recruiter Tier Filter */}
          <div>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            >
              <option value="all">All Recruiter Tiers</option>
              <option value="Super Dream">Super Dream (₹22+ LPA)</option>
              <option value="Tier 1 Dream">Tier 1 Dream (₹15 - ₹22 LPA)</option>
              <option value="Core Marquee">Core Marquee</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>
            Showing <span className="font-bold text-slate-900">{filteredCompanies.length}</span> recruiter profiles
          </span>

          {(searchQuery || selectedDomain !== 'all' || selectedTier !== 'all') && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-rose-700 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No Recruiters Found"
          description="We couldn't find any company matching your filter criteria. Try resetting filters to explore all campus drives."
          actionText="Reset Filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              currentUser={currentUser}
              onViewCompany={(c) => setSelectedCompanyForModal(c)}
              onFindMentorForSkill={handleFindMentorForSkill}
            />
          ))}
        </div>
      )}
    </div>
  );
};
