import React from 'react';
import { Student, RatingReview } from '../../types';
import { Modal } from '../common/Modal';
import { StarRating } from '../common/StarRating';
import { Clock, MessageSquare } from 'lucide-react';

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
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl" title="Peer Mentor Profile">
      <div className="space-y-8 pb-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-[#0B192C] text-white flex items-center justify-center font-bold text-2xl shrink-0">
              {mentor.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{mentor.name}</h2>
              <div className="text-sm text-slate-600 space-x-2">
                <span>{mentor.program}</span>
                <span>•</span>
                <span className="font-mono text-slate-500">{mentor.studentId}</span>
              </div>
              
              <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  {mentor.rating} ★
                </span>
                <span className="text-slate-300">|</span>
                <span>{mentor.sessionsCompleted} sessions completed</span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {mentor.availability}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-slate-700 leading-relaxed max-w-2xl">
          {mentor.bio}
        </div>

        <hr className="border-slate-100" />

        {/* Teaching Skills */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Skills They Can Teach</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mentor.skillsToTeach.map(st => (
              <div key={st.skillId} className="border border-slate-200 rounded p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-bold text-slate-900">{st.skillName}</span>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{st.proficiency}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mb-3">
                    <span>{st.domain}</span>
                    {st.verified && (
                      <>
                        <span>•</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 uppercase tracking-wider">
                          Verified
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">
                    {st.experienceNote}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{st.sessionsHelped} peer sessions</span>
                  <button
                    onClick={() => onRequestMentor(mentor, st.skillName)}
                    className="text-xs font-bold text-[#0B192C] hover:underline"
                  >
                    Request Mentoring →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {mentorReviews.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Peer Reviews</h3>
            <div className="space-y-3">
              {mentorReviews.map(review => (
                <div key={review.id} className="bg-slate-50 rounded p-4 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-800">{review.skillName}</span>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  {review.review && (
                    <p className="text-slate-600 italic">&quot;{review.review}&quot;</p>
                  )}
                  <div className="text-xs text-slate-400 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};
