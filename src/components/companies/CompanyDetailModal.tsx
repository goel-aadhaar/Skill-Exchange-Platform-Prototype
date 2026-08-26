'use client';

import React from 'react';
import { Company, Student } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import {
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  Sparkles,
  Users,
  Briefcase,
  ExternalLink,
  Award,
  AlertTriangle
} from 'lucide-react';

interface CompanyDetailModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: Student;
  onFindMentorForSkill: (skillName: string) => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  isOpen,
  onClose,
  currentUser,
  onFindMentorForSkill
}) => {
  if (!company) return null;

  // Compute acquired vs missing skills
  const studentSkillNames = [
    ...currentUser.skillsToTeach.map((s) => s.skillName.toLowerCase()),
    ...currentUser.skillsToLearn.map((s) => s.skillName.toLowerCase())
  ];

  const skillCoverage = company.requiredSkills.map((req) => {
    const isAcquired = studentSkillNames.some(
      (sk) => sk.includes(req.toLowerCase()) || req.toLowerCase().includes(sk)
    );
    return {
      name: req,
      isAcquired
    };
  });

  const missingSkills = skillCoverage.filter((s) => !s.isAcquired);
  const acquiredCount = skillCoverage.filter((s) => s.isAcquired).length;
  const matchPercentage = Math.round((acquiredCount / (company.requiredSkills.length || 1)) * 100);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      title={`${company.name} — Placement & Skill Requirements`}
    >
      <div className="space-y-6">
        {/* Top Company Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg tracking-wider shadow-md shrink-0">
              {company.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  {company.name}
                </h2>
                <Badge variant="company-tier" size="sm">
                  {company.tier}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {company.industry} • {company.domain}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {company.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8B1E2D]" />
                  Deadline: {company.applicationDeadline}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Hiring Drive:</div>
            <div className="text-xs font-bold text-slate-900">{company.hiringSeason}</div>
          </div>
        </div>

        {/* Company Overview */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Company Overview
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/80">
            {company.description}
          </p>
        </div>

        {/* Dynamic Skill Matcher & Peer Bridge */}
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Your Skill Readiness for {company.name}
              </h4>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded border ${
                matchPercentage >= 70
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}
            >
              {matchPercentage}% Skill Match ({acquiredCount}/{company.requiredSkills.length} acquired)
            </span>
          </div>

          {missingSkills.length > 0 ? (
            <div className="text-xs text-slate-700">
              <span className="font-semibold text-rose-700">
                You are {missingSkills.length} skill{missingSkills.length > 1 ? 's' : ''} away
              </span>{' '}
              from fulfilling the core technical requirements for this recruiter. You can find an IMT peer mentor on campus to bridge this gap:
            </div>
          ) : (
            <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Excellent! Your student profile satisfies all required skill criteria for this company.
            </div>
          )}

          {/* Skill Breakdown Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {skillCoverage.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border flex items-center justify-between gap-2 text-xs transition-colors ${
                  item.isAcquired
                    ? 'bg-white border-emerald-200 text-slate-800'
                    : 'bg-white border-rose-200 text-slate-900 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {item.isAcquired ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span className="font-semibold truncate">{item.name}</span>
                </div>

                {!item.isAcquired && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onFindMentorForSkill(item.name);
                    }}
                    className="shrink-0 text-[11px] font-bold text-white bg-[#8B1E2D] hover:bg-[#701420] px-2 py-1 rounded transition-colors shadow-2xs inline-flex items-center gap-1"
                  >
                    <Users className="w-3 h-3" />
                    Find Mentor
                  </button>
                )}
                {item.isAcquired && (
                  <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                    Acquired
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Roles Available on Campus */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Campus Placement & Internship Openings ({company.roles.length})
          </h4>
          <div className="space-y-3">
            {company.roles.map((role, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-bold text-slate-900">
                        {role.title}
                      </h5>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {role.type}
                      </span>
                    </div>
                    <div className="text-xs text-[#8B1E2D] font-bold mt-0.5">
                      Compensation: {role.ctcOrStipend}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    Location: {role.location}
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-800">Eligibility: </span>
                  {role.eligibility}
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Role Specific Skills:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {role.requiredSkills.map((rsk, ridx) => (
                      <span
                        key={ridx}
                        className="text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {rsk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
