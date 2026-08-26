'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MentorCard } from '../components/mentors/MentorCard';
import { EmptyState } from '../components/common/EmptyState';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  Star,
  BookOpen,
  X,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

export const FindMentorView: React.FC = () => {
  const {
    students,
    currentUser,
    skills,
    domains,
    selectedSkillForMentorSearch,
    setSelectedSkillForMentorSearch,
    setSelectedMentorForModal,
    openRequestModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [selectedProficiency, setSelectedProficiency] = useState<string>('all');

  // Handle pre-filtered skill from other tabs
  useEffect(() => {
    if (selectedSkillForMentorSearch) {
      setSelectedSkill(selectedSkillForMentorSearch);
    }
  }, [selectedSkillForMentorSearch]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkill('all');
    setSelectedDomain('all');
    setMinRating(0);
    setVerifiedOnly(false);
    setSelectedProficiency('all');
    setSelectedSkillForMentorSearch(null);
  };

  // Filter students (exclude current user and faculty admin)
  const filteredMentors = students.filter((st) => {
    if (st.id === currentUser.id || st.role === 'admin') return false;
    if (st.skillsToTeach.length === 0) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = st.name.toLowerCase().includes(q);
      const programMatch = st.program.toLowerCase().includes(q);
      const skillMatch = st.skillsToTeach.some((s) => s.skillName.toLowerCase().includes(q));
      if (!nameMatch && !programMatch && !skillMatch) return false;
    }

    // Skill filter
    if (selectedSkill !== 'all') {
      const hasSkill = st.skillsToTeach.some(
        (s) => s.skillName.toLowerCase().includes(selectedSkill.toLowerCase()) ||
               selectedSkill.toLowerCase().includes(s.skillName.toLowerCase())
      );
      if (!hasSkill) return false;
    }

    // Domain filter
    if (selectedDomain !== 'all') {
      const hasDomain = st.skillsToTeach.some(
        (s) => s.domain.toLowerCase() === selectedDomain.toLowerCase()
      );
      if (!hasDomain) return false;
    }

    // Rating filter
    if (minRating > 0 && st.rating < minRating) {
      return false;
    }

    // Verified only filter
    if (verifiedOnly && !st.isVerified && !st.skillsToTeach.some((s) => s.verified)) {
      return false;
    }

    // Proficiency filter
    if (selectedProficiency !== 'all') {
      const hasProf = st.skillsToTeach.some((s) => s.proficiency === selectedProficiency);
      if (!hasProf) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#8B1E2D] text-white flex items-center justify-center font-bold shadow-xs">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Find a Peer Mentor
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Connect with verified senior students and peers to practice interview skills, case cracking, and technical tools.
          </p>
        </div>

        {selectedSkillForMentorSearch && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold">
            <span>Filtered for: &quot;{selectedSkillForMentorSearch}&quot;</span>
            <button
              onClick={() => setSelectedSkillForMentorSearch(null)}
              className="text-amber-700 hover:text-amber-900"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by mentor name, skill (e.g. SQL, Power BI, Valuation), or program..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Skill Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Filter by Skill
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => {
                setSelectedSkill(e.target.value);
                setSelectedSkillForMentorSearch(e.target.value === 'all' ? null : e.target.value);
              }}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            >
              <option value="all">All Skills ({skills.length})</option>
              {skills.map((sk) => (
                <option key={sk.id} value={sk.name}>
                  {sk.name}
                </option>
              ))}
            </select>
          </div>

          {/* Domain Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Domain / Track
            </label>
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

          {/* Rating Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5★ and above</option>
              <option value={4.8}>4.8★ Top Rated</option>
            </select>
          </div>

          {/* Proficiency Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Proficiency
            </label>
            <select
              value={selectedProficiency}
              onChange={(e) => setSelectedProficiency(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            >
              <option value="all">All Levels</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        {/* Checkbox and Clear Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="rounded border-slate-300 text-[#8B1E2D] focus:ring-[#8B1E2D]"
            />
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Show Verified Mentors Only
            </span>
          </label>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{filteredMentors.length}</span> peer mentors
            </span>

            {(searchQuery || selectedSkill !== 'all' || selectedDomain !== 'all' || minRating > 0 || verifiedOnly || selectedProficiency !== 'all') && (
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
      </div>

      {/* Mentor Cards Grid */}
      {filteredMentors.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Peer Mentors Found"
          description="We couldn't find any mentors matching your exact filters. Try clearing some criteria or searching for another skill."
          actionText="Clear All Filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              onViewProfile={(m) => setSelectedMentorForModal(m)}
              onRequestMentor={(m, skill) => openRequestModal(m, skill)}
              highlightSkill={selectedSkill !== 'all' ? selectedSkill : null}
            />
          ))}
        </div>
      )}
    </div>
  );
};
