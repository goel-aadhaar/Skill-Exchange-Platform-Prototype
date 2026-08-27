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
  const { currentUser, ratings, addToast, updateCurrentUser } = useApp();

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

  const myReviews = ratings.filter((r) => r.mentorId === currentUser.id);

  let score = 20;
  if (currentUser.bio && currentUser.bio.length >= 10) score += 10;
  if (currentUser.targetRole && currentUser.careerGoal) score += 10;
  if (currentUser.cgpa) score += 5;
  if (currentUser.linkedinUrl) score += 5;
  if (currentUser.skillsToTeach && currentUser.skillsToTeach.length >= 1) score += 15;
  if (currentUser.skillsToLearn && currentUser.skillsToLearn.length >= 1) score += 15;
  if (currentUser.sessionsCompleted && currentUser.sessionsCompleted >= 1) score += 10;
  if (currentUser.avatar) score += 10;
  const completionPercent = Math.min(score, 100);

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await updateCurrentUser({
      ...currentUser,
      name,
      bio,
      targetDomain,
      targetRole,
      careerGoal,
      availability,
      specialization
    });
    setIsSaving(false);
    if (success) {
      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been updated successfully.'
      });
      setIsEditOpen(false);
    } else {
      addToast({
        type: 'error',
        title: 'Save Failed',
        message: 'Could not save your changes. Please try again.'
      });
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0F2942] text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold shadow-xs">
              <User className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              My Student Profile
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personal academic record, mentorship ratings, and career preference details at IMT Hyderabad.
          </p>
          <div className="mt-3">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-700">Profile Completion</span>
              <span className="font-bold text-slate-900">{completionPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#0F2942] rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              ></div>
            </div>
          </div>
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
            className="px-4 py-2 text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0F2942] text-amber-400 border border-amber-400/30 flex items-center justify-center font-extrabold text-xl shadow-xs">
              {currentUser.avatar}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-slate-900">{currentUser.name}</h2>
                {currentUser.isVerified && (
                  <Badge variant="verified" size="sm">
                    Placement Cell Verified
                  </Badge>
                )}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Roll No: <span className="font-mono font-bold text-blue-900">{currentUser.studentId}</span> • {currentUser.email}
              </div>
              <div className="text-xs text-slate-600 font-semibold">
                {currentUser.program} • {currentUser.academicYear} • CGPA: {currentUser.cgpa || '8.2'}
              </div>
            </div>
          </div>

          <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200 text-right shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
              Peer Mentor Rating
            </span>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <StarRating rating={currentUser.rating} size="sm" ratingsCount={currentUser.ratingsCount} />
            </div>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              {currentUser.sessionsCompleted} completed peer sessions
            </span>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">About Me</span>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            {currentUser.bio || 'PGDM student at IMT Hyderabad preparing for campus placements.'}
          </p>
        </div>

        {/* Goals & Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Domain</span>
            <span className="text-xs font-extrabold text-blue-900">{currentUser.targetDomain || 'Data Analytics'}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Role</span>
            <span className="text-xs font-extrabold text-slate-900">{currentUser.targetRole || 'Business Analyst'}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mentorship Availability</span>
            <span className="text-xs font-semibold text-slate-700">{currentUser.availability || 'Weekdays 7 PM - 10 PM'}</span>
          </div>
        </div>
      </div>

      {/* Reviews Received Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />
          <span>Peer Reviews & Ratings Received ({myReviews.length})</span>
        </h3>

        {myReviews.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-100">
            No peer ratings received yet. Conduct mentoring sessions to earn reviews and boost your campus standing.
          </div>
        ) : (
          <div className="space-y-3">
            {myReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0F2942] text-amber-400 flex items-center justify-center font-bold text-xs">
                      {rev.reviewerAvatar || 'ST'}
                    </div>
                    <span className="font-bold text-slate-900">{rev.reviewerName}</span>
                    <span className="text-slate-400">• Topic: {rev.skillName}</span>
                  </div>
                  <StarRating rating={rev.rating} size="xs" />
                </div>
                <p className="text-slate-700 italic bg-white p-2.5 rounded-xl border border-slate-200/80">
                  &quot;{rev.review}&quot;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT PROFILE MODAL */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Student Profile"
        subtitle="Update your career preferences and availability details"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Specialization Track
            </label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Domain
              </label>
              <input
                type="text"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Career Goal / Target Companies
            </label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Availability
            </label>
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Bio / Experience Summary
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-slate-900 font-extrabold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>{isSaving ? 'Saving changes...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* READINESS REPORT MODAL */}
      {isReportOpen && (
        <ReadinessReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          student={currentUser}
        />
      )}
    </div>
  );
};
