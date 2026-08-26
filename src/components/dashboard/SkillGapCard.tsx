'use client';

import React from 'react';
import { Student, Skill } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Users,
  ArrowRight,
  Target,
  AlertTriangle,
  CheckCircle2,
  BookOpen
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
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Recruiter Skill-Gap Intelligence & Peer Bridge
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against IMT Hyderabad recruiter criteria for <strong className="text-slate-700">{targetDomain}</strong>
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('placements')}
          className="text-xs font-bold text-blue-900 hover:text-amber-600 inline-flex items-center gap-1.5 self-start sm:self-auto bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
        >
          <span>Explore 226 Placement JDs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Signature Grid: Required Skill vs Student State vs Peer Supply */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prioritizedSkills.map(({ skill, studentLevel, isMissingOrBeginner, availableMentorsCount }) => (
          <div
            key={skill.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              isMissingOrBeginner
                ? 'bg-amber-50/30 border-amber-200/90 hover:border-amber-300 shadow-2xs'
                : 'bg-slate-50/60 border-slate-200/80'
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {skill.domain}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 mt-0.5">
                    {skill.name}
                  </h3>
                </div>

                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                    isMissingOrBeginner
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {isMissingOrBeginner ? 'Skill Gap Detected' : 'Verified Competency'}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {skill.description}
              </p>

              {/* Status Comparison Indicator */}
              <div className="flex items-center gap-3 text-xs pt-1">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="text-[11px] text-slate-400 font-bold uppercase">Your Level:</span>
                  <span className={`font-bold ${isMissingOrBeginner ? 'text-amber-800' : 'text-emerald-700'}`}>
                    {studentLevel}
                  </span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="text-[11px] text-slate-400 font-bold uppercase">Demand:</span>
                  <span className="font-bold text-blue-900 font-data">{skill.demandLevel}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Users className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                <span className="font-extrabold text-slate-900 font-data">{availableMentorsCount}</span>
                <span className="text-slate-500 font-medium">peer mentors available</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedSkillForMentorSearch(skill.name);
                  setActiveTab('find_mentor');
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Find Senior Mentor</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
