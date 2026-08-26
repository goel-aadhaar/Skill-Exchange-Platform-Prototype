'use client';

import React from 'react';
import { Student, Skill, Company } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  Sparkles,
  Users,
  Building2,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface SkillGapCardProps {
  currentUser: Student;
  skills: Skill[];
  companies: Company[];
  students: Student[];
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({
  currentUser,
  skills,
  companies,
  students
}) => {
  const { setActiveTab, setSelectedSkillForMentorSearch } = useApp();

  // Find target domain and role
  const targetDomain = currentUser.targetDomain || 'Data Analytics';

  // Gather student's existing skills
  const studentSkillMap = new Map<string, string>();
  currentUser.skillsToTeach.forEach((s) => studentSkillMap.set(s.skillName.toLowerCase(), s.proficiency));
  currentUser.skillsToLearn.forEach((s) => studentSkillMap.set(s.skillName.toLowerCase(), s.currentLevel));

  // Determine top domain skills required by campus recruiters
  const domainSkills = skills.filter(
    (sk) => sk.domain.toLowerCase() === targetDomain.toLowerCase() || sk.category === 'Business & Analytics'
  );

  // Compute skill gap items
  const skillGapItems = domainSkills.map((sk) => {
    const studentLevel = studentSkillMap.get(sk.name.toLowerCase()) || 'None';
    const isMissingOrBeginner = studentLevel === 'None' || studentLevel === 'Beginner';

    // Count how many peer mentors teach this skill
    const availableMentors = students.filter(
      (st) =>
        st.id !== currentUser.id &&
        st.skillsToTeach.some((teach) => teach.skillName.toLowerCase() === sk.name.toLowerCase() && teach.isAvailable)
    );

    // Count recruiter demand
    const hiringCompanies = companies.filter((c) =>
      c.requiredSkills.some((req) => req.toLowerCase() === sk.name.toLowerCase())
    );

    return {
      skill: sk,
      studentLevel,
      isMissingOrBeginner,
      availableMentorsCount: availableMentors.length,
      hiringCompaniesCount: hiringCompanies.length,
      companiesList: hiringCompanies.map((c) => c.name)
    };
  });

  // Sort by missing skills first, then by recruiter demand
  const prioritizedSkills = skillGapItems
    .sort((a, b) => {
      if (a.isMissingOrBeginner && !b.isMissingOrBeginner) return -1;
      if (!a.isMissingOrBeginner && b.isMissingOrBeginner) return 1;
      return b.hiringCompaniesCount - a.hiringCompaniesCount;
    })
    .slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Skill Gap Analysis & Recommendations
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Personalized for your target domain ({targetDomain}) and upcoming campus drives.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('domains')}
          className="text-xs font-semibold text-[#8B1E2D] hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <Compass className="w-3.5 h-3.5" />
          Explore Domain Matrix →
        </button>
      </div>

      {/* Recommended skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {prioritizedSkills.map(({ skill, studentLevel, isMissingOrBeginner, availableMentorsCount, hiringCompaniesCount, companiesList }) => (
          <div
            key={skill.id}
            className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
              isMissingOrBeginner
                ? 'bg-gradient-to-br from-amber-50/40 to-white border-amber-200 shadow-2xs hover:border-amber-300'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {skill.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {skill.domain} • {skill.category}
                  </div>
                </div>

                <Badge
                  variant={isMissingOrBeginner ? 'priority' : 'proficiency'}
                  level={isMissingOrBeginner ? 'High' : (studentLevel as any)}
                  size="xs"
                >
                  {isMissingOrBeginner ? 'High Priority Gap' : `Your Level: ${studentLevel}`}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                {skill.description}
              </p>

              {/* Demand badges */}
              <div className="space-y-1.5 mb-3 text-[11px]">
                {hiringCompaniesCount > 0 && (
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-semibold">{hiringCompaniesCount} Campus Recruiters</span>
                    <span className="text-slate-400">({companiesList.slice(0, 2).join(', ')})</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-slate-700">
                  <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-emerald-800">
                    {availableMentorsCount} Peer Mentor{availableMentorsCount !== 1 ? 's' : ''} available on campus
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                {isMissingOrBeginner ? 'Bridge this gap before drives' : 'Proficiency logged'}
              </span>

              <button
                type="button"
                onClick={() => {
                  setSelectedSkillForMentorSearch(skill.name);
                  setActiveTab('find_mentor');
                }}
                className="text-xs font-bold text-[#8B1E2D] hover:text-[#721522] hover:underline inline-flex items-center gap-1"
              >
                Find a Mentor
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
