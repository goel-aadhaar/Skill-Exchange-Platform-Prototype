import React from 'react';
import { Student, RatingReview } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { StarRating } from '../common/StarRating';
import {
  ShieldCheck,
  Award,
  Calendar,
  Clock,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface MentorProfileModalProps {
  mentor: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestMentor: (mentor: Student, skillName?: string) => void;
  ratings: RatingReview[];
}

export const MentorProfileModal: React.FC<MentorProfileModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onRequestMentor,
  ratings
}) => {
  if (!mentor) return null;

  const mentorReviews = ratings.filter((r) => r.mentorId === mentor.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl" title="Student Peer Profile">
      <div className="space-y-6">
        {/* Top Profile Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B1E2D] to-[#60111D] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              {mentor.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  {mentor.name}
                </h2>
                {mentor.isVerified && (
                  <Badge variant="verified" size="sm">
                    Verified Mentor
                  </Badge>
                )}
              </div>
              <div className="text-xs text-slate-600 font-medium mt-0.5 flex items-center gap-2 flex-wrap">
                <span>{mentor.studentId}</span>
                <span>•</span>
                <span>{mentor.program}</span>
                <span>•</span>
                <span>{mentor.academicYear}</span>
              </div>
              {mentor.targetRole && (
                <div className="inline-flex items-center gap-1 mt-1.5 text-xs text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                  <Briefcase className="w-3.5 h-3.5 text-[#8B1E2D]" />
                  <span>{mentor.targetRole}</span>
                </div>
              )}
            </div>
          </div>

          <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
            <div>
              <StarRating rating={mentor.rating} size="sm" ratingsCount={mentor.ratingsCount} />
              <div className="text-xs text-slate-500 font-medium mt-1">
                {mentor.sessionsCompleted} Sessions Completed
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestMentor(mentor);
              }}
              className="sm:mt-3 px-4 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg shadow-xs transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Request Mentoring
            </button>
          </div>
        </div>

        {/* Bio & Career Direction */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            About & Placement Objective
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/80">
            {mentor.bio}
          </p>
        </div>

        {/* Skills I Can Teach Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Skills I Can Teach ({mentor.skillsToTeach.length})
            </h4>
            <span className="text-[11px] text-slate-500">
              Click &quot;Request&quot; to book a session on a specific topic
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mentor.skillsToTeach.map((st) => (
              <div
                key={st.skillId}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-900">
                      {st.skillName}
                    </span>
                    <Badge variant="proficiency" level={st.proficiency} size="xs" />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <span>{st.domain}</span>
                    <span>•</span>
                    <span>{st.sessionsHelped} students helped</span>
                    {st.verified && (
                      <span className="flex items-center text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 uppercase tracking-wider">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {st.experienceNote}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Available for mentoring
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onRequestMentor(mentor, st.skillName);
                    }}
                    className="text-xs font-semibold text-[#8B1E2D] hover:underline"
                  >
                    Request this skill →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills I Am Learning */}
        {mentor.skillsToLearn.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Skills Currently Learning
            </h4>
            <div className="flex flex-wrap gap-2">
              {mentor.skillsToLearn.map((sl) => (
                <div
                  key={sl.skillId}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold">{sl.skillName}</span>
                  <span className="text-[10px] text-slate-500">
                    (Target: {sl.targetLevel})
                  </span>
                  <Badge variant="priority" level={sl.priority} size="xs" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Availability Schedule */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#8B1E2D] shrink-0" />
          <div className="text-xs text-slate-700">
            <span className="font-bold text-slate-900 block">Weekly Availability Schedule:</span>
            <span>{mentor.availability}</span>
          </div>
        </div>

        {/* Peer Reviews & Ratings */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Peer Reviews ({mentorReviews.length})
            </h4>
            <span className="text-xs font-semibold text-slate-700">
              Average {mentor.rating} / 5.0
            </span>
          </div>

          {mentorReviews.length === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-500">
              No written reviews yet for this student.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {mentorReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-xl border border-slate-100 bg-white shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                        {rev.reviewerAvatar}
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {rev.reviewerName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({rev.reviewerProgram})
                      </span>
                    </div>
                    <StarRating rating={rev.rating} size="xs" showNumber={false} />
                  </div>

                  <div className="text-[11px] text-[#8B1E2D] font-semibold">
                    Mentored in: {rev.skillName}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    &quot;{rev.review}&quot;
                  </p>

                  {rev.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rev.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
