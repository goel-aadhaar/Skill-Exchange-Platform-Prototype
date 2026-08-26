'use client';

import React from 'react';
import { Student, Skill } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  Sparkles,
  Users,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface SkillGapCardProps {
  currentUser: Student;
  skills: Skill[];
  students: Student[];
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({
  currentUser,
  skills,
  students
}) => {
  const { setActiveTab, setSelectedSkillForMentorSearch } = useApp();

  const targetDomain = currentUser.targetDomain || 'Data Analytics';

  const studentSkillMap = new Map<string, string>();
  currentUser.skillsToTeach.forEach((s) => studentSkillMap.set(s.skillName.toLowerCase(), s.proficiency));
  currentUser.skillsToLearn.forEach((s) => studentSkillMap.set(s.skillName.toLowerCase(), s.currentLevel));

  const domainSkills = skills.filter(
    (sk) => sk.domain.toLowerCase() === targetDomain.toLowerCase() || sk.category === 'Business & Analytics'
  );

  const skillGapItems = domainSkills.map((sk) => {
    const studentLevel = studentSkillMap.get(sk.name.toLowerCase()) || 'None';
    const isMissingOrBeginner = studentLevel === 'None' || studentLevel === 'Beginner';

    const availableMentors = students.filter(
      (st) =>
        st.id !== currentUser.id &&
        st.skillsToTeach.some((teach) => teach.skillName.toLowerCase() === sk.name.toLowerCase() && teach.isAvailable)
    );

    return {
      skill: sk,
      studentLevel,
      isMissingOrBeginner,
      availableMentorsCount: availableMentors.length
    };
  });

  const prioritizedSkills = skillGapItems
    .sort((a, b) => {
      if (a.isMissingOrBeginner && !b.isMissingOrBeginner) return -1;
      if (!a.isMissingOrBeginner && b.isMissingOrBeginner) return 1;
      return b.availableMentorsCount - a.availableMentorsCount;
    })
    .slice(0, 4);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Skill Gap Intelligence & Learning Recommendations
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Personalized for your target domain ({targetDomain}) based on IMT Hyderabad recruiters.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('placements')}
          className="text-xs font-bold text-blue-900 hover:text-amber-600 inline-flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View 226 Placement JDs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Skill Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {prioritizedSkills.map(({ skill, studentLevel, isMissingOrBeginner, availableMentorsCount }) => (
          <div
            key={skill.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
              isMissingOrBeginner
                ? 'bg-amber-50/40 border-amber-200/90'
                : 'bg-slate-50/70 border-slate-200/80'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {skill.domain}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {skill.name}
                  </h3>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isMissingOrBeginner
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {isMissingOrBeginner ? 'Skill Gap' : 'Acquired'}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {skill.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Users className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                <span className="font-semibold text-slate-800">{availableMentorsCount}</span>
                <span className="text-slate-500">peers teach this</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedSkillForMentorSearch(skill.name);
                  setActiveTab('find_mentor');
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 transition-colors shadow-2xs flex items-center gap-1"
              >
                <span>Find Mentor</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
