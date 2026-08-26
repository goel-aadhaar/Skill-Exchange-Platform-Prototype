'use client';

import React from 'react';
import { Company, Student } from '../../types';
import { useApp } from '../../context/AppContext';
import { Building2, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

interface UpcomingDrivesProps {
  companies: Company[];
  currentUser: Student;
}

export const UpcomingDrives: React.FC<UpcomingDrivesProps> = ({ companies, currentUser }) => {
  const { setActiveTab, setSelectedCompanyForModal, setSelectedSkillForMentorSearch } = useApp();

  const studentSkillNames = [
    ...currentUser.skillsToTeach.map((s) => s.skillName.toLowerCase()),
    ...currentUser.skillsToLearn.map((s) => s.skillName.toLowerCase())
  ];

  const upcoming = companies.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            Top Placement & Internship Drives
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Key upcoming deadlines and role requirement gaps
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('placements')}
          className="text-xs font-semibold text-[#8B1E2D] hover:underline flex items-center gap-1"
        >
          View all companies →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {upcoming.map((company) => {
          const matchedSkills = company.requiredSkills.filter((req) =>
            studentSkillNames.some((sk) => sk.includes(req.toLowerCase()) || req.toLowerCase().includes(sk))
          );
          const matchPercent = Math.round((matchedSkills.length / (company.requiredSkills.length || 1)) * 100);

          return (
            <div
              key={company.id}
              onClick={() => {
                setSelectedCompanyForModal(company);
              }}
              className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 p-4.5 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      {company.logo}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#8B1E2D] transition-colors">
                        {company.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {company.domain}
                      </p>
                    </div>
                  </div>
                  <Badge variant="company-tier" size="xs">
                    {company.tier}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#8B1E2D] font-semibold my-2">
                  <Calendar className="w-3 h-3" />
                  <span>Deadline: {company.applicationDeadline}</span>
                </div>

                {/* Match bar */}
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] space-y-1 mb-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Skill Match:</span>
                    <span className="font-bold text-slate-800">{matchPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${matchPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>{company.roles.length} Open Roles</span>
                <span className="text-[#8B1E2D] group-hover:translate-x-0.5 transition-transform">
                  Check Gaps →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
