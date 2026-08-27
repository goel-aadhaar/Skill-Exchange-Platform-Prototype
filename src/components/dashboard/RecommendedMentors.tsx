'use client';

import React from 'react';
import { Student } from '../../types';
import { useApp } from '../../context/AppContext';
import { MentorCard } from '../mentors/MentorCard';
import { Users, Sparkles, ArrowRight } from 'lucide-react';

interface RecommendedMentorsProps {
  currentUser: Student;
  students: Student[];
}

export const RecommendedMentors: React.FC<RecommendedMentorsProps> = ({
  currentUser,
  students
}) => {
  const {
    setActiveTab,
    setSelectedMentorForModal,
    openRequestModal,
    setSelectedSkillForMentorSearch
  } = useApp();

  const targetLearnSkillNames = currentUser.skillsToLearn.map((s) => s.skillName.toLowerCase());

  const recommended = students
    .filter((st) => st.id !== currentUser.id && st.role !== 'admin')
    .sort((a, b) => {
      const aMatches = a.skillsToTeach.filter((s) =>
        targetLearnSkillNames.some((tls) => s.skillName.toLowerCase().includes(tls))
      ).length;
      const bMatches = b.skillsToTeach.filter((s) =>
        targetLearnSkillNames.some((tls) => s.skillName.toLowerCase().includes(tls))
      ).length;

      if (bMatches !== aMatches) return bMatches - aMatches;
      return b.rating - a.rating;
    })
    .slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-900" />
            Recommended Peer Mentors for You
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by relevance to your target learning goals and peer ratings
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedSkillForMentorSearch(null);
            setActiveTab('find_mentor');
          }}
          className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1"
        >
          <span>Explore All Campus Mentors →</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        {recommended.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onViewProfile={(m) => setSelectedMentorForModal(m)}
            onRequestMentor={(m, skill) => openRequestModal(m, skill)}
            highlightSkill={targetLearnSkillNames[0] || null}
          />
        ))}
        {recommended.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500">
            No peer mentors available right now.
          </div>
        )}
      </div>
    </div>
  );
};
