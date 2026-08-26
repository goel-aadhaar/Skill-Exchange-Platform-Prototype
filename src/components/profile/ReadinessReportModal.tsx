'use client';

import React from 'react';
import { Student, Skill, Company } from '../../types';
import { Modal } from '../common/Modal';
import { ImtLogo, IMT_BRAND } from '../../data/imtBranding';
import {
  Printer,
  ShieldCheck,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { StarRating } from '../common/StarRating';

interface ReadinessReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  companies: Company[];
}

export const ReadinessReportModal: React.FC<ReadinessReportModalProps> = ({
  isOpen,
  onClose,
  student,
  companies
}) => {
  if (!student) return null;

  const verifiedTeachingSkills = student.skillsToTeach.filter((s) => s.verified);
  const targetCompanies = companies.filter(
    (c) => c.domain.toLowerCase() === student.targetDomain.toLowerCase()
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      title="Official Placement Skill-Readiness Report"
      subtitle="Institutional competency snapshot for placement committee & recruiter panels"
    >
      <div className="space-y-6">
        {/* Printable Card Area */}
        <div className="p-6 rounded-2xl bg-white border-2 border-slate-300 space-y-6 print:border-none print:p-0">
          {/* Institution Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <ImtLogo variant="full" />
            <div className="text-right">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Corporate Relations & Placement Cell
              </div>
              <div className="text-[11px] text-slate-500">
                Academic Year {student.academicYear.split('(')[1]?.replace(')', '') || '2024–2026'}
              </div>
              <div className="text-[10px] text-emerald-800 font-semibold mt-0.5">
                Verified Student Dossier
              </div>
            </div>
          </div>

          {/* Student Profile Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Student Name</span>
              <span className="font-bold text-slate-900">{student.name}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Roll ID</span>
              <span className="font-semibold text-slate-800">{student.studentId}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Program / Track</span>
              <span className="font-semibold text-slate-800">{student.program}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Target Domain</span>
              <span className="font-bold text-[#8B1E2D]">{student.targetDomain}</span>
            </div>
          </div>

          {/* Verified Competency Badges */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              1. Verified Skills & Teaching Credentials
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {student.skillsToTeach.map((st) => (
                <div
                  key={st.skillId}
                  className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{st.skillName}</span>
                    <span className="text-[10px] text-slate-500">
                      {st.proficiency} Level • {st.sessionsHelped} peer sessions helped
                    </span>
                  </div>
                  {st.verified ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Self-Assessed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Target Skills in Progress */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-600" />
              2. Skills Under Peer Mentorship
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {student.skillsToLearn.map((sl) => (
                <div key={sl.skillId} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="font-semibold text-slate-900 block truncate">{sl.skillName}</span>
                  <span className="text-[10px] text-slate-500">
                    Current: {sl.currentLevel} ➔ Target: {sl.targetLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Peer Feedback Standing */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-amber-900 block">Campus Peer Mentorship Reputation:</span>
              <span className="text-slate-700">
                {student.sessionsCompleted} peer mentoring interactions conducted with an average rating of {student.rating.toFixed(1)} ★
              </span>
            </div>
            <StarRating rating={student.rating} size="sm" ratingsCount={student.ratingsCount} />
          </div>

          {/* Signoff stamp */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
            <div>Generated by IMT Ghaziabad Skill-Exchange Platform</div>
            <div className="font-serif font-bold text-slate-700">Placement Committee Seal Verified</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save Readiness Dossier
          </button>
        </div>
      </div>
    </Modal>
  );
};
