'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { StarRating } from '../components/common/StarRating';
import { Modal } from '../components/common/Modal';
import { ReadinessReportModal } from '../components/profile/ReadinessReportModal';
import {
  User,
  GraduationCap,
  Briefcase,
  Calendar,
  Clock,
  Edit,
  ShieldCheck,
  Star,
  BookOpen,
  Award,
  CheckCircle2,
  Printer
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, updateStudentProfile, ratings, companies } = useApp();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Edit form state
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [targetDomain, setTargetDomain] = useState(currentUser.targetDomain);
  const [targetRole, setTargetRole] = useState(currentUser.targetRole);
  const [careerGoal, setCareerGoal] = useState(currentUser.careerGoal);
  const [availability, setAvailability] = useState(currentUser.availability);
  const [specialization, setSpecialization] = useState(currentUser.specialization);

  // Filter reviews received by this student
  const myReviews = ratings.filter((r) => r.mentorId === currentUser.id);

  // Completion calculation
  let score = 30;
  if (currentUser.bio && currentUser.bio.length > 20) score += 15;
  if (currentUser.skillsToTeach.length > 0) score += 20;
  if (currentUser.skillsToLearn.length > 0) score += 20;
  if (currentUser.targetRole) score += 15;
  const completionPercent = Math.min(score, 100);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name,
      bio,
      targetDomain,
      targetRole,
      careerGoal,
      availability,
      specialization
    });
    setIsEditOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#8B1E2D] text-white flex items-center justify-center font-bold shadow-xs">
              <User className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              My Student Profile
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personal academic record, mentorship ratings, and career preference details.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl transition-colors border border-slate-300 shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            Readiness Dossier
          </button>

          <button
            type="button"
            onClick={() => {
              setName(currentUser.name);
              setBio(currentUser.bio);
              setTargetDomain(currentUser.targetDomain);
              setTargetRole(currentUser.targetRole);
              setCareerGoal(currentUser.careerGoal);
              setAvailability(currentUser.availability);
              setSpecialization(currentUser.specialization);
              setIsEditOpen(true);
            }}
            className="px-4 py-2 text-xs font-bold text-[#8B1E2D] bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-200 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B1E2D] to-[#5C101B] text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
              {currentUser.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {currentUser.name}
                </h2>
                {currentUser.isVerified && (
                  <Badge variant="verified" size="sm">
                    Verified Student
                  </Badge>
                )}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-700">{currentUser.studentId}</span>
                <span>•</span>
                <span>{currentUser.email}</span>
                <span>•</span>
                <span>{currentUser.program}</span>
              </div>
              <div className="text-xs text-slate-600 font-medium mt-1">
                {currentUser.specialization} • {currentUser.academicYear}
              </div>
            </div>
          </div>

          {currentUser.role !== 'admin' && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-right min-w-[180px]">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Mentorship Rating
              </div>
              <div className="mt-1 flex justify-end">
                <StarRating rating={currentUser.rating} size="sm" ratingsCount={currentUser.ratingsCount} />
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {currentUser.sessionsCompleted} sessions completed
              </div>
            </div>
          )}
        </div>

        {/* Profile Completion Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">Profile Readiness Indicator</span>
            <span className="font-bold text-[#8B1E2D]">{completionPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="h-full rounded-full bg-[#8B1E2D] transition-all"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#8B1E2D]" />
              Career & Placement Goals
            </div>
            <div className="text-xs text-slate-800">
              <span className="font-semibold text-slate-500 block">Target Role:</span>
              <span className="font-bold text-slate-900">{currentUser.targetRole || 'Not Set'}</span>
            </div>
            <div className="text-xs text-slate-800">
              <span className="font-semibold text-slate-500 block">Target Domain:</span>
              <span className="font-bold text-slate-900">{currentUser.targetDomain || 'General'}</span>
            </div>
            <div className="text-xs text-slate-800">
              <span className="font-semibold text-slate-500 block">Career Objective:</span>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{currentUser.careerGoal}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              Availability & About
            </div>
            <div className="text-xs text-slate-800">
              <span className="font-semibold text-slate-500 block">Weekly Availability:</span>
              <span className="text-slate-800 font-medium">{currentUser.availability}</span>
            </div>
            <div className="text-xs text-slate-800">
              <span className="font-semibold text-slate-500 block">Bio:</span>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{currentUser.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Received Section */}
      {currentUser.role !== 'admin' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                Reviews from Peer Mentees ({myReviews.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Feedback and star endorsements from students you mentored
              </p>
            </div>
            <div className="text-xs font-bold text-slate-800">
              Average {currentUser.rating.toFixed(1)} / 5.0
            </div>
          </div>

          {myReviews.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No written reviews received yet. Complete mentoring sessions to collect peer endorsements.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {myReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] font-bold flex items-center justify-center text-slate-700">
                        {rev.reviewerAvatar}
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {rev.reviewerName}
                      </span>
                    </div>
                    <StarRating rating={rev.rating} size="xs" showNumber={false} />
                  </div>

                  <div className="text-[11px] text-[#8B1E2D] font-semibold">
                    Mentored on: {rev.skillName}
                  </div>

                  <p className="text-xs text-slate-700 italic">
                    &quot;{rev.review}&quot;
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {rev.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.2 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Student Profile"
        subtitle="Keep your placement preferences and availability up to date"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Domain
              </label>
              <select
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="Data Analytics">Data Analytics</option>
                <option value="Consulting">Consulting</option>
                <option value="Finance">Finance</option>
                <option value="Product Management">Product Management</option>
                <option value="Marketing">Marketing</option>
                <option value="Technology">Technology</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Short Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Availability Schedule
            </label>
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg shadow-xs"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Official Placement Readiness Dossier Modal */}
      <ReadinessReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        student={currentUser}
        companies={companies}
      />
    </div>
  );
};
