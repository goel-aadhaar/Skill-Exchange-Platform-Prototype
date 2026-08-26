'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MentorCard } from '../components/mentors/MentorCard';
import { Search, X } from 'lucide-react';

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

  useEffect(() => {
    if (selectedSkillForMentorSearch) {
      setSelectedSkill(selectedSkillForMentorSearch);
    }
  }, [selectedSkillForMentorSearch]);

  const filteredMentors = students.filter((st) => {
    if (st.id === currentUser.id || st.role === 'admin') return false;
    if (st.skillsToTeach.length === 0) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = st.name.toLowerCase().includes(q);
      const programMatch = st.program.toLowerCase().includes(q);
      const skillMatch = st.skillsToTeach.some((s) => s.skillName.toLowerCase().includes(q));
      if (!nameMatch && !programMatch && !skillMatch) return false;
    }

    if (selectedSkill !== 'all') {
      const hasSkill = st.skillsToTeach.some(
        (s) => s.skillName.toLowerCase().includes(selectedSkill.toLowerCase()) ||
               selectedSkill.toLowerCase().includes(s.skillName.toLowerCase())
      );
      if (!hasSkill) return false;
    }

    if (selectedDomain !== 'all') {
      const hasDomain = st.skillsToTeach.some(
        (s) => s.domain.toLowerCase() === selectedDomain.toLowerCase()
      );
      if (!hasDomain) return false;
    }

    if (minRating > 0 && st.rating < minRating) return false;
    if (verifiedOnly && !st.isVerified && !st.skillsToTeach.some((s) => s.verified)) return false;
    if (selectedProficiency !== 'all') {
      const hasProf = st.skillsToTeach.some((s) => s.proficiency === selectedProficiency);
      if (!hasProf) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150 max-w-5xl">
      <div className="border-b border-slate-200 pb-6 pt-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Find a Peer Mentor
        </h1>
        <p className="text-sm text-slate-600">
          Search for an IMT student who can teach you the skills you need for your placement goals.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        {/* Search Bar */}
        <div className="relative border-b border-slate-200">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What skill do you want to learn? (Search Python, SQL, Power BI...)"
            className="w-full pl-10 pr-4 py-3.5 text-sm bg-white text-slate-900 focus:outline-none"
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

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 bg-slate-50/50 p-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Domain
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
            >
              <option value="all">All Domains</option>
              {domains.map((dom) => (
                <option key={dom.id} value={dom.name}>
                  {dom.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Skill Level
            </label>
            <select
              value={selectedProficiency}
              onChange={(e) => setSelectedProficiency(e.target.value)}
              className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
            >
              <option value="all">Any Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
            >
              <option value={0}>Any Rating</option>
              <option value={4.0}>4.0+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
              <option value={4.8}>4.8+ Stars</option>
            </select>
          </div>

          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded border-slate-300 text-[#0B192C] focus:ring-[#0B192C]"
              />
              <span className="text-xs font-semibold text-slate-700">Verified Only</span>
            </label>
          </div>
          
          <div className="flex items-center justify-end pt-5">
             <span className="text-xs text-slate-500 font-medium">
               {filteredMentors.length} result{filteredMentors.length !== 1 ? 's' : ''}
             </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden mt-6">
        {filteredMentors.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onViewProfile={(m) => setSelectedMentorForModal(m)}
            onRequestMentor={(m, skill) => openRequestModal(m, skill)}
            highlightSkill={selectedSkill !== 'all' ? selectedSkill : null}
          />
        ))}
        {filteredMentors.length === 0 && (
          <div className="p-12 text-center text-sm text-slate-500">
            No mentors found matching your search criteria. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
};
