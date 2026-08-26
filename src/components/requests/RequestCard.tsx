'use client';

import React, { useState } from 'react';
import { MentoringRequest, RatingReview } from '../../types';
import { Badge } from '../common/Badge';
import { StarRating } from '../common/StarRating';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Sparkles,
  MessageSquare,
  Video,
  Star,
  User
} from 'lucide-react';

interface RequestCardProps {
  request: MentoringRequest;
  onOpenRatingModal: (request: MentoringRequest) => void;
  onOpenWorkspace?: (request: MentoringRequest) => void;
  existingRating?: RatingReview;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onOpenRatingModal,
  onOpenWorkspace,
  existingRating
}) => {
  const {
    currentUser,
    acceptMentoringRequest,
    rejectMentoringRequest,
    completeMentoringSession
  } = useApp();

  const [isAccepting, setIsAccepting] = useState(false);
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/imth-peer-session');
  const [mentorNote, setMentorNote] = useState('Accepted! Looking forward to our session.');
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('Schedule conflict during this time slot.');

  const isMentor = currentUser.id === request.mentorId;
  const isRequester = currentUser.id === request.requesterId;

  const otherPersonName = isMentor ? request.requesterName : request.mentorName;
  const otherPersonProgram = isMentor ? request.requesterProgram : 'Mentor';
  const otherPersonAvatar = isMentor ? request.requesterAvatar : request.mentorAvatar;

  const statusNormalized = request.status.toUpperCase();

  const handleAccept = async () => {
    await acceptMentoringRequest(request.id, meetingLink, mentorNote);
    setIsAccepting(false);
  };

  const handleReject = async () => {
    await rejectMentoringRequest(request.id, rejectReason);
    setIsRejecting(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all p-5 space-y-4">
      {/* Top row: Other party, skill, and status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0F2942] text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold text-sm shrink-0">
            {otherPersonAvatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-900">
                {isMentor ? `Mentee: ${request.requesterName}` : `Mentor: ${request.mentorName}`}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                ({otherPersonProgram})
              </span>
            </div>
            <div className="text-xs text-slate-700 font-semibold mt-0.5">
              Topic: <span className="text-blue-900 font-bold">{request.skillName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
              statusNormalized === 'PENDING'
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : statusNormalized === 'ACCEPTED'
                ? 'bg-blue-50 text-blue-900 border-blue-200'
                : statusNormalized === 'COMPLETED'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}
          >
            {request.status}
          </span>
          <span className="text-[10px] text-slate-400">
            {new Date(request.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Request Details */}
      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2 text-slate-600">
          <span className="font-bold text-slate-800 shrink-0">Goal:</span>
          <span>{request.reason}</span>
        </div>

        {request.message && (
          <div className="flex items-start gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="italic">&quot;{request.message}&quot;</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-slate-500 pt-1">
          {request.preferredDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{request.preferredDate}</span>
            </div>
          )}
          {request.preferredTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{request.preferredTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mentor Response / Meeting Link */}
      {statusNormalized === 'ACCEPTED' && (
        <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-700" />
              Session Scheduled & Confirmed
            </span>
            {request.meetingLink && (
              <a
                href={request.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-900 hover:underline flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-blue-200"
              >
                <span>Open Google Meet</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {request.mentorResponseNote && (
            <p className="text-slate-700">
              <span className="font-semibold text-slate-900">Note from Mentor: </span>
              {request.mentorResponseNote}
            </p>
          )}
        </div>
      )}

      {/* If Completed & has review */}
      {statusNormalized === 'COMPLETED' && existingRating && (
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-900">
              Submitted Mentorship Review:
            </span>
            <StarRating rating={existingRating.rating} size="xs" />
          </div>
          <p className="text-slate-700 italic">&quot;{existingRating.review}&quot;</p>
        </div>
      )}

      {/* Action Footers */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        {/* Mentor Action: Accept / Reject forms */}
        {isMentor && statusNormalized === 'PENDING' && (
          <>
            {!isAccepting && !isRejecting ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <button
                  type="button"
                  onClick={() => setIsRejecting(true)}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-rose-700 bg-slate-100 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => setIsAccepting(true)}
                  className="px-4 py-1.5 text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-xs transition-colors inline-flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
                  Accept Request
                </button>
              </div>
            ) : isAccepting ? (
              <div className="w-full space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold text-slate-900">
                  Accept & Schedule Session
                </div>
                <input
                  type="text"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="Meeting link (Google Meet / Zoom)"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900"
                />
                <input
                  type="text"
                  value={mentorNote}
                  onChange={(e) => setMentorNote(e.target.value)}
                  placeholder="Note for the student"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAccepting(false)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="px-4 py-1 text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-lg"
                  >
                    Confirm Acceptance
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold text-slate-900">
                  Decline Mentoring Request
                </div>
                <input
                  type="text"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Reason for declining..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsRejecting(false)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReject}
                    className="px-3 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
                  >
                    Confirm Decline
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Mentor / Requester Action: Enter Room or Mark Complete */}
        {statusNormalized === 'ACCEPTED' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
            <span className="text-[11px] text-blue-900 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Session is confirmed in PostgreSQL.
            </span>
            <div className="flex items-center gap-2">
              {onOpenWorkspace && (
                <button
                  type="button"
                  onClick={() => onOpenWorkspace(request)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors inline-flex items-center gap-1 border border-slate-300"
                >
                  <Video className="w-3.5 h-3.5 text-blue-600" />
                  Live Room
                </button>
              )}
              <button
                type="button"
                onClick={() => completeMentoringSession(request.id)}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0F2942] hover:bg-slate-900 rounded-xl shadow-2xs transition-colors inline-flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Mark Completed
              </button>
            </div>
          </div>
        )}

        {/* Requester Action: Rate Mentor */}
        {statusNormalized === 'COMPLETED' && isRequester && !existingRating && (
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] text-emerald-700 font-semibold">
              ✓ Mentoring session completed!
            </span>
            <button
              type="button"
              onClick={() => onOpenRatingModal(request)}
              className="px-4 py-1.5 text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5" />
              Rate & Review Mentor
            </button>
          </div>
        )}

        {statusNormalized === 'COMPLETED' && isMentor && (
          <div className="text-[11px] text-slate-500">
            ✓ Session recorded in your mentor statistics.
          </div>
        )}
      </div>
    </div>
  );
};
