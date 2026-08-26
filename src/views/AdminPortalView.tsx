'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Skill, SkillVerificationRequest } from '../types';
import {
  Shield,
  ShieldCheck,
  Users,
  BookOpen,
  Building2,
  ArrowLeftRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  ExternalLink,
  Award,
  Clock,
  RotateCcw
} from 'lucide-react';

export const AdminPortalView: React.FC = () => {
  const {
    students,
    skills,
    requests,
    ratings,
    verifications,
    processSkillVerification,
    resetDatabaseData,
    isLoading
  } = useApp();

  const [adminTab, setAdminTab] = useState<'verifications' | 'skills' | 'requests'>('verifications');

  // Verification Remarks Modal
  const [rejectModalVerif, setRejectModalVerif] = useState<SkillVerificationRequest | null>(null);
  const [rejectRemarks, setRejectRemarks] = useState('Insufficient internship / credential documentation.');

  // Stats calculation
  const totalStudents = students.filter((s) => s.role !== 'admin').length;
  const verifiedStudents = students.filter((s) => s.role !== 'admin' && s.isVerified).length;
  const pendingVerifications = verifications.filter((v) => v.status === 'Pending');
  const totalCompletedSessions = requests.filter((r) => r.status.toUpperCase() === 'COMPLETED').length;
  const avgPlatformRating = (
    ratings.reduce((acc, r) => acc + r.rating, 0) / (ratings.length || 1)
  ).toFixed(1);

  const handleApprove = async (v: SkillVerificationRequest) => {
    await processSkillVerification(v.id, 'Approved', 'Verified against official IMT Hyderabad academic and internship credentials.');
  };

  const handleRejectConfirm = async () => {
    if (rejectModalVerif) {
      await processSkillVerification(rejectModalVerif.id, 'Rejected', rejectRemarks);
      setRejectModalVerif(null);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0F2942] text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Placement Cell & Faculty Administration Portal
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official Placement Office controls: verify student skill badges, oversee peer mentorship sessions, and manage 226 JDs / 75 SIPs in PostgreSQL.
          </p>
        </div>

        <button
          type="button"
          onClick={resetDatabaseData}
          disabled={isLoading}
          className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto border border-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Re-seed Database Data</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Registered Students</span>
          <div className="text-2xl font-black text-slate-900">{totalStudents}</div>
          <div className="text-[11px] text-emerald-600 font-semibold">{verifiedStudents} verified badges</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Skill Claims</span>
          <div className="text-2xl font-black text-amber-600">{pendingVerifications.length}</div>
          <div className="text-[11px] text-slate-500">Requires verification review</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sessions Completed</span>
          <div className="text-2xl font-black text-blue-900">{totalCompletedSessions}</div>
          <div className="text-[11px] text-slate-500">Across 226 recruiter profiles</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Platform Quality Index</span>
          <div className="text-2xl font-black text-amber-500">{avgPlatformRating} ★</div>
          <div className="text-[11px] text-slate-500">{ratings.length} student reviews recorded</div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setAdminTab('verifications')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            adminTab === 'verifications'
              ? 'bg-[#0F2942] text-amber-400 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Skill Verification Queue ({pendingVerifications.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('skills')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            adminTab === 'skills'
              ? 'bg-[#0F2942] text-amber-400 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum Skills Master ({skills.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('requests')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            adminTab === 'requests'
              ? 'bg-[#0F2942] text-amber-400 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Campus Mentorship Audit Log ({requests.length})</span>
        </button>
      </div>

      {/* VERIFICATIONS TAB */}
      {adminTab === 'verifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Student Credential Claims ({verifications.length})
            </span>
          </div>

          {verifications.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
              No verification claims currently pending.
            </div>
          ) : (
            <div className="space-y-3">
              {verifications.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{v.studentName}</span>
                      <span className="text-xs text-slate-500 font-mono">({v.studentId || v.studentProgram})</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          v.status === 'Pending'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : v.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            : 'bg-rose-50 text-rose-900 border-rose-200'
                        }`}
                      >
                        {v.status}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-blue-900">
                      Claimed Skill: <span className="text-slate-900">{v.skillName}</span> ({v.claimedProficiency} Proficiency)
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <strong>Submitted Evidence:</strong> {v.evidenceNote}
                    </div>

                    {v.adminRemarks && (
                      <div className="text-[11px] text-slate-500 italic">
                        Placement Remarks: {v.adminRemarks}
                      </div>
                    )}
                  </div>

                  {v.status === 'Pending' && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setRejectModalVerif(v)}
                        className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-rose-700 bg-slate-100 hover:bg-rose-50 rounded-xl border border-slate-300"
                      >
                        Decline
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(v)}
                        className="px-4 py-1.5 text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-xs flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve Badge
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SKILLS TAB */}
      {adminTab === 'skills' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {skills.map((s) => (
              <div
                key={s.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">{s.domain}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-900 rounded-full border border-blue-200">
                    {s.demandLevel} Demand
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900">{s.name}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REQUESTS AUDIT TAB */}
      {adminTab === 'requests' && (
        <div className="space-y-3">
          {requests.map((r) => (
            <div
              key={r.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900">
                  {r.requesterName} ➔ {r.mentorName} ({r.skillName})
                </div>
                <div className="text-[11px] text-slate-500">
                  Goal: {r.reason} • {new Date(r.createdAt).toLocaleDateString()}
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  r.status.toUpperCase() === 'PENDING'
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : r.status.toUpperCase() === 'COMPLETED'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-blue-50 text-blue-900 border-blue-200'
                }`}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* REJECT REMARKS MODAL */}
      {rejectModalVerif && (
        <Modal
          isOpen={!!rejectModalVerif}
          onClose={() => setRejectModalVerif(null)}
          title="Decline Skill Claim"
          subtitle={`Provide feedback to ${rejectModalVerif.studentName}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Remarks for Student
              </label>
              <textarea
                value={rejectRemarks}
                onChange={(e) => setRejectRemarks(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setRejectModalVerif(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectConfirm}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
