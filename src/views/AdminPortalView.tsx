'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Skill, Company, SkillVerificationRequest, ProficiencyLevel } from '../types';
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
  Clock
} from 'lucide-react';

export const AdminPortalView: React.FC = () => {
  const {
    students,
    skills,
    companies,
    requests,
    ratings,
    verifications,
    adminApproveVerification,
    adminRejectVerification,
    adminAddSkill,
    adminAddCompany
  } = useApp();

  const [adminTab, setAdminTab] = useState<'verifications' | 'skills' | 'companies' | 'requests'>('verifications');

  // Verification Remarks Modal
  const [rejectModalVerif, setRejectModalVerif] = useState<SkillVerificationRequest | null>(null);
  const [rejectRemarks, setRejectRemarks] = useState('Insufficient internship / credential documentation.');

  // Add Skill Modal
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillDomain, setNewSkillDomain] = useState('Data Analytics');
  const [newSkillCategory, setNewSkillCategory] = useState<Skill['category']>('Business & Analytics');
  const [newSkillDesc, setNewSkillDesc] = useState('');
  const [newSkillDemand, setNewSkillDemand] = useState<Skill['demandLevel']>('High');

  // Add Company Modal
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [newCompName, setNewCompName] = useState('');
  const [newCompIndustry, setNewCompIndustry] = useState('Management Consulting');
  const [newCompDomain, setNewCompDomain] = useState('Consulting');
  const [newCompTier, setNewCompTier] = useState<Company['tier']>('Tier 1 Dream');
  const [newCompDesc, setNewCompDesc] = useState('');
  const [newCompSkills, setNewCompSkills] = useState('SQL, Excel, Case Frameworks');
  const [newCompDeadline, setNewCompDeadline] = useState('2026-10-15');

  // Stats calculation
  const totalStudents = students.filter((s) => s.role !== 'admin').length;
  const verifiedStudents = students.filter((s) => s.role !== 'admin' && s.isVerified).length;
  const pendingVerifications = verifications.filter((v) => v.status === 'Pending');
  const totalCompletedSessions = requests.filter((r) => r.status === 'Completed').length;
  const avgPlatformRating = (
    ratings.reduce((acc, r) => acc + r.rating, 0) / (ratings.length || 1)
  ).toFixed(1);

  const handleApprove = (v: SkillVerificationRequest) => {
    adminApproveVerification(v.id, 'Verified against official academic & corporate credentials.');
  };

  const handleRejectConfirm = () => {
    if (rejectModalVerif) {
      adminRejectVerification(rejectModalVerif.id, rejectRemarks);
      setRejectModalVerif(null);
    }
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    adminAddSkill({
      name: newSkillName,
      domain: newSkillDomain,
      category: newSkillCategory,
      description: newSkillDesc,
      demandLevel: newSkillDemand,
      associatedRoles: ['Campus Placement Aspirants'],
      associatedCompanies: ['Top Campus Recruiters']
    });
    setIsAddSkillOpen(false);
    setNewSkillName('');
    setNewSkillDesc('');
  };

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedSkills = newCompSkills.split(',').map((s) => s.trim()).filter(Boolean);
    adminAddCompany({
      name: newCompName,
      industry: newCompIndustry,
      domain: newCompDomain,
      tier: newCompTier,
      description: newCompDesc,
      requiredSkills: parsedSkills,
      preferredSkills: ['Strong Communication'],
      applicationDeadline: newCompDeadline,
      roles: [
        {
          title: 'Management Associate',
          type: 'Final Placement',
          location: 'Gurugram / Mumbai',
          ctcOrStipend: '₹16.0 LPA',
          eligibility: 'PGDM Students in good standing',
          deadline: newCompDeadline,
          requiredSkills: parsedSkills,
          preferredSkills: []
        }
      ]
    });
    setIsAddCompanyOpen(false);
    setNewCompName('');
    setNewCompDesc('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Placement Cell Administration Portal
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official administrative interface for verifying student peer skills, overseeing placement drives, and platform governance.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Faculty Admin Access Granted</span>
        </div>
      </div>

      {/* Admin KPI Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Students
          </div>
          <div className="text-xl font-black text-slate-900 mt-1">{totalStudents}</div>
          <div className="text-[10px] text-slate-500">Across 2 cohorts</div>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 shadow-2xs">
          <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
            Verified Students
          </div>
          <div className="text-xl font-black text-emerald-900 mt-1">{verifiedStudents}</div>
          <div className="text-[10px] text-emerald-700">Official badges</div>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 shadow-2xs">
          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
            Pending Queue
          </div>
          <div className="text-xl font-black text-amber-900 mt-1">
            {pendingVerifications.length}
          </div>
          <div className="text-[10px] text-amber-700">Needs review</div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Skills in Catalog
          </div>
          <div className="text-xl font-black text-slate-900 mt-1">{skills.length}</div>
          <div className="text-[10px] text-slate-500">8 domain tracks</div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Recruiters
          </div>
          <div className="text-xl font-black text-slate-900 mt-1">{companies.length}</div>
          <div className="text-[10px] text-slate-500">Tier 1 & Marquee</div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Platform Rating
          </div>
          <div className="text-xl font-black text-amber-600 mt-1">{avgPlatformRating} ★</div>
          <div className="text-[10px] text-slate-500">{ratings.length} peer reviews</div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setAdminTab('verifications')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            adminTab === 'verifications'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
          <span>Skill Verification Queue</span>
          {pendingVerifications.length > 0 && (
            <span className="bg-[#8B1E2D] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
              {pendingVerifications.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('skills')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            adminTab === 'skills'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Skills Catalog ({skills.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('companies')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            adminTab === 'companies'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Placement Recruiters ({companies.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('requests')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            adminTab === 'requests'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Mentoring Audit Log ({requests.length})</span>
        </button>
      </div>

      {/* TAB 1: Skill Verification Queue */}
      {adminTab === 'verifications' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Pending Student Verification Claims
              </h3>
              <p className="text-xs text-slate-500">
                Review submitted evidence and grant official placement cell skill badges.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {verifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  Verification queue is completely clear.
                </div>
              ) : (
                verifications.map((v) => (
                  <div
                    key={v.id}
                    className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                          {v.studentAvatar}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {v.studentName}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {v.studentProgram} • {v.studentId}
                          </div>
                        </div>

                        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#8B1E2D]">
                            {v.skillName}
                          </span>
                          <Badge variant="proficiency" level={v.claimedProficiency} size="xs" />
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                        <span className="font-semibold text-slate-900 block mb-0.5">
                          Student Submitted Evidence & Credentials:
                        </span>
                        &quot;{v.evidenceNote}&quot;
                      </div>

                      {v.adminRemarks && (
                        <div className="text-[11px] text-slate-500">
                          <span className="font-semibold">Admin Remarks: </span>
                          {v.adminRemarks}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
                      {v.status === 'Pending' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setRejectModalVerif(v)}
                            className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
                          >
                            Decline
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApprove(v)}
                            className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Approve & Verify Badge
                          </button>
                        </>
                      ) : v.status === 'Approved' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                          <CheckCircle2 className="w-4 h-4" />
                          Approved & Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-lg">
                          <XCircle className="w-4 h-4" />
                          Declined
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Skills Catalog */}
      {adminTab === 'skills' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Master Skills Catalog
              </h3>
              <p className="text-xs text-slate-500">
                Curate skills mapped to target industry tracks and recruiter demand.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddSkillOpen(true)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New Skill
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {skills.map((sk) => (
                <div
                  key={sk.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{sk.name}</span>
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                        {sk.domain}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{sk.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Demand: {sk.demandLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Placement Recruiters */}
      {adminTab === 'companies' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Placement & Internship Recruiter Directory
              </h3>
              <p className="text-xs text-slate-500">
                Manage companies, required skill criteria, and application timelines.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddCompanyOpen(true)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Recruiter
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {companies.map((c) => (
                <div
                  key={c.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{c.name}</span>
                      <Badge variant="company-tier" size="xs">
                        {c.tier}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">
                      {c.domain} • Required: {c.requiredSkills.join(', ')}
                    </p>
                  </div>
                  <div className="text-xs text-slate-500">
                    Deadline: <span className="font-semibold text-slate-800">{c.applicationDeadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Mentoring Audit Log */}
      {adminTab === 'requests' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Campus Mentorship Audit Log
            </h3>
            <p className="text-xs text-slate-500">
              Monitor active peer learning interactions and engagement health across departments.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">
                      {r.requesterName} → {r.mentorName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Topic: <span className="font-semibold text-[#8B1E2D]">{r.skillName}</span> ({r.preferredDate})
                    </div>
                  </div>

                  <Badge variant="status" level={r.status} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reject Verification Modal */}
      <Modal
        isOpen={!!rejectModalVerif}
        onClose={() => setRejectModalVerif(null)}
        title="Decline Verification Request"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Provide feedback for why this skill claim could not be validated:
          </p>
          <textarea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 resize-none"
          />
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setRejectModalVerif(null)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRejectConfirm}
              className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded"
            >
              Confirm Decline
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Skill Modal */}
      <Modal
        isOpen={isAddSkillOpen}
        onClose={() => setIsAddSkillOpen(false)}
        title="Add Skill to Platform Catalog"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSkill} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              required
              placeholder="e.g. Prompt Engineering with LangChain"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Domain Track
              </label>
              <select
                value={newSkillDomain}
                onChange={(e) => setNewSkillDomain(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="Data Analytics">Data Analytics</option>
                <option value="Consulting">Consulting</option>
                <option value="Finance">Finance</option>
                <option value="Product Management">Product Management</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Demand Level
              </label>
              <select
                value={newSkillDemand}
                onChange={(e) => setNewSkillDemand(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="Very High">Very High</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Description
            </label>
            <textarea
              value={newSkillDesc}
              onChange={(e) => setNewSkillDesc(e.target.value)}
              rows={2}
              required
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddSkillOpen(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#8B1E2D] rounded-lg"
            >
              Add to Catalog
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Company Modal */}
      <Modal
        isOpen={isAddCompanyOpen}
        onClose={() => setIsAddCompanyOpen(false)}
        title="Add Recruiter to Placement Directory"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateCompany} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Company Name *
            </label>
            <input
              type="text"
              value={newCompName}
              onChange={(e) => setNewCompName(e.target.value)}
              required
              placeholder="e.g. KPMG India"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Recruiter Tier
              </label>
              <select
                value={newCompTier}
                onChange={(e) => setNewCompTier(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="Super Dream">Super Dream</option>
                <option value="Tier 1 Dream">Tier 1 Dream</option>
                <option value="Core Marquee">Core Marquee</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                value={newCompDeadline}
                onChange={(e) => setNewCompDeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Required Skills (comma separated) *
            </label>
            <input
              type="text"
              value={newCompSkills}
              onChange={(e) => setNewCompSkills(e.target.value)}
              required
              placeholder="e.g. SQL & Database Querying, Power BI & DAX, Advanced Excel"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Overview Description
            </label>
            <textarea
              value={newCompDesc}
              onChange={(e) => setNewCompDesc(e.target.value)}
              rows={2}
              required
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddCompanyOpen(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#8B1E2D] rounded-lg"
            >
              Add Recruiter
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
