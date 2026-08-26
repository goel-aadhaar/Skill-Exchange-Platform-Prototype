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

  // Find mentors who teach skills the student wants to learn or domain matches
  const targetLearnSkillNames = currentUser.skillsToLearn.map((s) => s.skillName.toLowerCase());

  const recommended = students
    .filter((st) => st.id !== currentUser.id && st.role !== 'admin')
    .sort((a, b) => {
      // Prioritize mentors teaching student's target skills
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-4 h-4 text-[#8B1E2D]" />
            Recommended Peer Mentors for You
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by relevance to your learning goals and student ratings
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedSkillForMentorSearch(null);
            setActiveTab('find_mentor');
          }}
          className="text-xs font-semibold text-[#8B1E2D] hover:underline flex items-center gap-1"
        >
          View all mentors →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommended.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onViewProfile={(m) => setSelectedMentorForModal(m)}
            onRequestMentor={(m, skill) => openRequestModal(m, skill)}
            highlightSkill={targetLearnSkillNames[0] || null}
          />
        ))}
      </div>
    </div>
  );
};
