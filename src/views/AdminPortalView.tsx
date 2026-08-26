'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { SkillVerificationRequest, Student, PlacementJob, InternshipOpportunity } from '../types';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Building2,
  ArrowLeftRight,
  CheckCircle2,
  XCircle,
  Search,
  ExternalLink,
  Award,
  Clock,
  RotateCcw,
  LayoutDashboard,
  Star,
  Activity
} from 'lucide-react';

type AdminTab = 'dashboard' | 'student_verif' | 'skill_verif' | 'requests' | 'ratings' | 'repositories';

export const AdminPortalView: React.FC = () => {
  const {
    students,
    skills,
    requests,
    ratings,
    verifications,
    processSkillVerification,
    processStudentVerification,
    resetDatabaseData,
    isLoading,
    currentUser
  } = useApp();

  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Verification Remarks Modal
  const [rejectModalVerif, setRejectModalVerif] = useState<SkillVerificationRequest | null>(null);
  const [rejectRemarks, setRejectRemarks] = useState('Insufficient internship / credential documentation.');

  // Student Verification Remarks Modal
  const [rejectModalStudent, setRejectModalStudent] = useState<Student | null>(null);

  // Repositories Data
  const [placements, setPlacements] = useState<PlacementJob[]>([]);
  const [internships, setInternships] = useState<InternshipOpportunity[]>([]);
  const [totalPlacements, setTotalPlacements] = useState(0);
  const [totalInternships, setTotalInternships] = useState(0);

  useEffect(() => {
    if (adminTab === 'repositories' || adminTab === 'dashboard') {
      fetch('/api/placements?limit=10').then(res => res.json()).then(data => {
        if (data.jobs) setPlacements(data.jobs);
        if (data.total) setTotalPlacements(data.total);
      });
      fetch('/api/internships?limit=10').then(res => res.json()).then(data => {
        if (data.internships) setInternships(data.internships);
        if (data.total) setTotalInternships(data.total);
      });
    }
  }, [adminTab]);

  // Stats calculation
  const totalStudents = students.filter((s) => s.role !== 'admin').length;
  const pendingStudents = students.filter((s) => s.role !== 'admin' && !s.isVerified);
  const pendingVerifications = verifications.filter((v) => v.status === 'Pending');
  const activeMentoring = requests.filter((r) => r.status.toUpperCase() === 'PENDING' || r.status.toUpperCase() === 'ACCEPTED').length;
  const completedMentoring = requests.filter((r) => r.status.toUpperCase() === 'COMPLETED').length;
  const avgPlatformRating = (
    ratings.reduce((acc, r) => acc + r.rating, 0) / (ratings.length || 1)
  ).toFixed(1);
  const totalOpportunities = totalPlacements + totalInternships;

  // Handlers
  const handleApproveSkill = async (v: SkillVerificationRequest) => {
    await processSkillVerification(v.id, 'Approved', 'Verified against official IMT Hyderabad academic and internship credentials.');
  };

  const handleRejectSkillConfirm = async () => {
    if (rejectModalVerif) {
      await processSkillVerification(rejectModalVerif.id, 'Rejected', rejectRemarks);
      setRejectModalVerif(null);
    }
  };

  const handleApproveStudent = async (student: Student) => {
    await processStudentVerification(student.id, 'Verify');
  };

  const handleRejectStudentConfirm = async () => {
    if (rejectModalStudent) {
      await processStudentVerification(rejectModalStudent.id, 'Reject');
      setRejectModalStudent(null);
    }
  };

  if (currentUser.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-500">
        <ShieldCheck className="w-16 h-16 text-rose-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
        <p className="text-sm">You do not have permission to view the Administration Portal.</p>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'student_verif', label: 'Student Verification', icon: Users, count: pendingStudents.length },
    { id: 'skill_verif', label: 'Skill Verification', icon: ShieldCheck, count: pendingVerifications.length },
    { id: 'requests', label: 'Mentoring Requests', icon: ArrowLeftRight, count: requests.length },
    { id: 'ratings', label: 'Ratings & Reviews', icon: Star, count: ratings.length },
    { id: 'repositories', label: 'Repositories', icon: Building2 }
  ];

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
              Administration Portal
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            IMT Skill Exchange Oversight and Verification
          </p>
        </div>

        <button
          type="button"
          onClick={resetDatabaseData}
          disabled={isLoading}
          className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto border border-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Re-seed Database</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              adminTab === tab.id
                ? 'bg-[#0F2942] text-amber-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label} {tab.count !== undefined && `(${tab.count})`}</span>
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {adminTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Students</span>
              <div className="text-2xl font-black text-slate-900">{totalStudents}</div>
              <div className="text-[11px] text-emerald-600 font-semibold">{totalStudents - pendingStudents.length} verified</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Student Verifs</span>
              <div className="text-2xl font-black text-amber-600">{pendingStudents.length}</div>
              <div className="text-[11px] text-slate-500">Requires review</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Skills Claimed</span>
              <div className="text-2xl font-black text-blue-900">{skills.length}</div>
              <div className="text-[11px] text-slate-500">Curriculum catalog</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Skill Verifs</span>
              <div className="text-2xl font-black text-amber-600">{pendingVerifications.length}</div>
              <div className="text-[11px] text-slate-500">Requires review</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Mentoring</span>
              <div className="text-2xl font-black text-emerald-600">{activeMentoring}</div>
              <div className="text-[11px] text-slate-500">In-progress sessions</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed Mentoring</span>
              <div className="text-2xl font-black text-blue-900">{completedMentoring}</div>
              <div className="text-[11px] text-slate-500">Total successful sessions</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Rating</span>
              <div className="text-2xl font-black text-amber-500">{avgPlatformRating} ★</div>
              <div className="text-[11px] text-slate-500">{ratings.length} reviews recorded</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Opportunities</span>
              <div className="text-2xl font-black text-indigo-600">{totalOpportunities || '301'}</div>
              <div className="text-[11px] text-slate-500">Placements & Internships</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
             <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Platform Activity</h3>
             </div>
             <div className="space-y-4">
                {requests.slice(0, 5).map(r => (
                   <div key={r.id} className="flex items-start gap-3 text-xs border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <div>
                         <p className="text-slate-900">
                           <span className="font-bold">{r.requesterName}</span> requested mentoring from <span className="font-bold">{r.mentorName}</span> for <span className="font-bold">{r.skillName}</span>
                         </p>
                         <p className="text-[10px] text-slate-500">{new Date(r.createdAt).toLocaleString()}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* STUDENT VERIFICATIONS TAB */}
      {adminTab === 'student_verif' && (
        <div className="space-y-4">
          {pendingStudents.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
              No student verification claims currently pending.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingStudents.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{s.name}</span>
                      <span className="text-xs text-slate-500 font-mono">({s.studentId})</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-amber-100 text-amber-900 border-amber-300">
                        Pending
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">
                      {s.program} - {s.specialization} • Batch of {s.graduationYear}
                    </div>
                    <div className="text-xs text-slate-500">
                      Email: {s.email}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setRejectModalStudent(s)}
                      className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-rose-700 bg-slate-100 hover:bg-rose-50 rounded-xl border border-slate-300"
                    >
                      Reject & Remove
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApproveStudent(s)}
                      className="px-4 py-1.5 text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verify Student
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SKILL VERIFICATIONS TAB */}
      {adminTab === 'skill_verif' && (
        <div className="space-y-4">
          {verifications.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
              No skill verification claims found.
            </div>
          ) : (
            <div className="space-y-3">
              {verifications.map((v) => (
                <div key={v.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{v.studentName}</span>
                      <span className="text-xs text-slate-500 font-mono">({v.studentId || v.studentProgram})</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          v.status === 'Pending' ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : v.status === 'Approved' ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
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
                        Remarks: {v.adminRemarks}
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
                        onClick={() => handleApproveSkill(v)}
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

      {/* REQUESTS AUDIT TAB */}
      {adminTab === 'requests' && (
        <div className="space-y-3">
          {requests.length === 0 && (
             <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
               No mentoring requests found.
             </div>
          )}
          {requests.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4 text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900">
                  {r.requesterName} ➔ {r.mentorName} ({r.skillName})
                </div>
                <div className="text-[11px] text-slate-500">
                  Goal: {r.reason} • {new Date(r.createdAt).toLocaleDateString()}
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  r.status.toUpperCase() === 'PENDING' ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : r.status.toUpperCase() === 'COMPLETED' ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : r.status.toUpperCase() === 'ACCEPTED' ? 'bg-blue-50 text-blue-900 border-blue-200'
                  : 'bg-slate-100 text-slate-600 border-slate-300'
                }`}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* RATINGS TAB */}
      {adminTab === 'ratings' && (
        <div className="space-y-3">
          {ratings.length === 0 && (
             <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
               No ratings and reviews found.
             </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {ratings.map(r => (
                <div key={r.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                   <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{r.skillName} Mentoring</span>
                      <span className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                         {r.rating} <Star className="w-3.5 h-3.5 fill-current" />
                      </span>
                   </div>
                   <div className="text-xs text-slate-500">
                      Reviewed by {r.reviewerName} for {r.mentorName}
                   </div>
                   <p className="text-xs text-slate-700 italic border-l-2 border-amber-200 pl-3">
                      "{r.review}"
                   </p>
                   {r.tags && r.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                         {r.tags.map(t => (
                            <span key={t} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">{t}</span>
                         ))}
                      </div>
                   )}
                </div>
             ))}
          </div>
        </div>
      )}

      {/* REPOSITORIES TAB */}
      {adminTab === 'repositories' && (
        <div className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placements */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                    Placement Repository ({totalPlacements} JDs)
                 </h3>
                 <div className="space-y-3">
                    {placements.length > 0 ? placements.map(p => (
                       <div key={p.id} className="text-xs border-b border-slate-50 pb-2">
                          <div className="font-bold text-slate-800">{p.companyName}</div>
                          <div className="text-slate-500">{p.role} • {p.sector}</div>
                          <div className="text-emerald-600 font-semibold mt-0.5">{p.ctcOffered}</div>
                       </div>
                    )) : <div className="text-xs text-slate-500">Loading...</div>}
                 </div>
              </div>

              {/* Internships */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                    Internship Repository ({totalInternships} SIPs)
                 </h3>
                 <div className="space-y-3">
                    {internships.length > 0 ? internships.map(i => (
                       <div key={i.id} className="text-xs border-b border-slate-50 pb-2">
                          <div className="font-bold text-slate-800">{i.companyName}</div>
                          <div className="text-slate-500">{i.role} • {i.locations}</div>
                          <div className="text-blue-600 font-semibold mt-0.5">{i.stipend}</div>
                       </div>
                    )) : <div className="text-xs text-slate-500">Loading...</div>}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* REJECT MODALS */}
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
                onClick={handleRejectSkillConfirm}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </Modal>
      )}

      {rejectModalStudent && (
        <Modal
          isOpen={!!rejectModalStudent}
          onClose={() => setRejectModalStudent(null)}
          title="Reject Student Registration"
          subtitle={`This will remove ${rejectModalStudent.name}'s account from the system.`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
               Are you sure you want to reject this student? Their account will be permanently removed.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setRejectModalStudent(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectStudentConfirm}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl"
              >
                Reject & Remove
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
