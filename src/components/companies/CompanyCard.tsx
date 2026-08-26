import React from 'react';
import { Company, Student } from '../../types';
import { Badge } from '../common/Badge';
import { Building2, Calendar, MapPin, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
  currentUser: Student;
  onViewCompany: (company: Company) => void;
  onFindMentorForSkill: (skillName: string) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  currentUser,
  onViewCompany,
  onFindMentorForSkill
}) => {
  // Check student skill coverage
  const studentSkillNames = [
    ...currentUser.skillsToTeach.map((s) => s.skillName.toLowerCase()),
    ...currentUser.skillsToLearn.map((s) => s.skillName.toLowerCase())
  ];

  const matchedSkills = company.requiredSkills.filter((req) =>
    studentSkillNames.some((sk) => sk.includes(req.toLowerCase()) || req.toLowerCase().includes(sk))
  );

  const missingSkills = company.requiredSkills.filter(
    (req) => !studentSkillNames.some((sk) => sk.includes(req.toLowerCase()) || req.toLowerCase().includes(sk))
  );

  const matchPercentage = Math.round((matchedSkills.length / (company.requiredSkills.length || 1)) * 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all p-5 flex flex-col justify-between group">
      <div>
        {/* Top: Logo & Tier */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs shrink-0">
              {company.logo}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#8B1E2D] transition-colors leading-tight">
                {company.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {company.domain} • {company.industry.split('&')[0]}
              </p>
            </div>
          </div>

          <Badge variant="company-tier" size="xs">
            {company.tier}
          </Badge>
        </div>

        {/* Roles count & Deadline */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mb-3 bg-slate-50 p-2 rounded-lg">
          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-[#8B1E2D]" />
            <span>{company.roles.length} Open Roles</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Deadline: {company.applicationDeadline}</span>
          </div>
        </div>

        {/* Dynamic Skill Match Indicator */}
        <div className="mb-3.5 p-2.5 rounded-lg border border-slate-100 bg-slate-50/70">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-semibold text-slate-700">Your Skill Match:</span>
            <span
              className={`font-bold ${
                matchPercentage >= 70 ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {matchPercentage}% ({matchedSkills.length}/{company.requiredSkills.length} skills)
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                matchPercentage >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${matchPercentage}%` }}
            />
          </div>

          {missingSkills.length > 0 && (
            <div className="mt-2 text-[10px] text-slate-600 flex items-center justify-between gap-1">
              <span className="truncate">
                Gap: <span className="font-semibold text-rose-700">{missingSkills[0]}</span>
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFindMentorForSkill(missingSkills[0]);
                }}
                className="text-[10px] font-bold text-[#8B1E2D] hover:underline shrink-0"
              >
                Find Mentor →
              </button>
            </div>
          )}
        </div>

        {/* Required skills tags */}
        <div className="space-y-1 mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Key Required Skills
          </div>
          <div className="flex flex-wrap gap-1">
            {company.requiredSkills.slice(0, 3).map((sk, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium"
              >
                {sk}
              </span>
            ))}
            {company.requiredSkills.length > 3 && (
              <span className="text-[10px] text-slate-500 self-center">
                +{company.requiredSkills.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onViewCompany(company)}
          className="w-full py-2 px-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          View Roles & Skill Match
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
    </div>
  );
};
