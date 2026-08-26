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
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/imt-peer-session');
  const [mentorNote, setMentorNote] = useState('Accepted! Looking forward to our session.');
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('Schedule conflict during this time slot.');

  const isMentor = currentUser.id === request.mentorId;
  const isRequester = currentUser.id === request.requesterId;

  const otherPersonName = isMentor ? request.requesterName : request.mentorName;
  const otherPersonProgram = isMentor ? request.requesterProgram : 'Mentor';
  const otherPersonAvatar = isMentor ? request.requesterAvatar : request.mentorAvatar;

  const handleAccept = () => {
    acceptMentoringRequest(request.id, meetingLink, mentorNote);
    setIsAccepting(false);
  };

  const handleReject = () => {
    rejectMentoringRequest(request.id, rejectReason);
    setIsRejecting(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all p-5 space-y-4">
      {/* Top row: Other party, skill, and status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B1E2D] to-[#60111D] text-white flex items-center justify-center font-bold text-sm shrink-0">
            {otherPersonAvatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                {isMentor ? `Mentee: ${request.requesterName}` : `Mentor: ${request.mentorName}`}
              </span>
              <span className="text-[10px] text-slate-500">
                ({otherPersonProgram})
              </span>
            </div>
            <div className="text-xs text-slate-700 font-semibold mt-0.5">
              Topic: <span className="text-[#8B1E2D]">{request.skillName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="status" level={request.status} size="sm" />
          <span className="text-[10px] text-slate-400">
            {new Date(request.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Request Details */}
      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2 text-slate-600">
          <span className="font-semibold text-slate-800 shrink-0">Goal:</span>
          <span>{request.reason}</span>
        </div>

        {request.message && (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-slate-700 italic">
            &quot;{request.message}&quot;
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-slate-600 pt-1">
          <div className="flex items-center gap-1.5 font-medium text-slate-800">
            <Calendar className="w-3.5 h-3.5 text-[#8B1E2D]" />
            <span>{request.preferredDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{request.preferredTime}</span>
          </div>
        </div>

        {/* If accepted, show meeting link and mentor note */}
        {request.status === 'Accepted' && (
          <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-emerald-700" />
                Confirmed Session Video Link:
              </span>
              {request.meetingLink && (
                <a
                  href={request.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-1"
                >
                  Join Meeting <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            {request.mentorResponseNote && (
              <p className="text-[11px] text-emerald-800">
                Mentor Note: {request.mentorResponseNote}
              </p>
            )}
          </div>
        )}

        {request.status === 'Rejected' && request.mentorResponseNote && (
          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
            Declined note: {request.mentorResponseNote}
          </div>
        )}
      </div>

      {/* If Completed & has review */}
      {request.status === 'Completed' && existingRating && (
        <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 space-y-1 text-xs">
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
        {isMentor && request.status === 'Pending' && (
          <>
            {!isAccepting && !isRejecting ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <button
                  type="button"
                  onClick={() => setIsRejecting(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => setIsAccepting(true)}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors inline-flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Accept Request
                </button>
              </div>
            ) : isAccepting ? (
              <div className="w-full space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs font-bold text-slate-800">
                  Accept & Schedule Session
                </div>
                <input
                  type="text"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="Meeting link (Google Meet / Zoom)"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-900"
                />
                <input
                  type="text"
                  value={mentorNote}
                  onChange={(e) => setMentorNote(e.target.value)}
                  placeholder="Note for the student"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-900"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAccepting(false)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="px-3 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded"
                  >
                    Confirm Acceptance
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs font-bold text-slate-800">
                  Decline Mentoring Request
                </div>
                <input
                  type="text"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Reason for declining..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-900"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsRejecting(false)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReject}
                    className="px-3 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded"
                  >
                    Confirm Decline
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Mentor / Requester Action: Enter Room or Mark Complete */}
        {request.status === 'Accepted' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Session is confirmed & ready.
            </span>
            <div className="flex items-center gap-2">
              {onOpenWorkspace && (
                <button
                  type="button"
                  onClick={() => onOpenWorkspace(request)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1 border border-slate-300"
                >
                  <Video className="w-3.5 h-3.5 text-blue-600" />
                  Enter Live Room
                </button>
              )}
              <button
                type="button"
                onClick={() => completeMentoringSession(request.id)}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg shadow-2xs transition-colors inline-flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mark Completed
              </button>
            </div>
          </div>
        )}

        {/* Requester Action: Rate Mentor */}
        {request.status === 'Completed' && isRequester && !existingRating && (
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] text-emerald-700 font-semibold">
              ✓ Mentoring session completed!
            </span>
            <button
              type="button"
              onClick={() => onOpenRatingModal(request)}
              className="px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-2xs transition-colors inline-flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5" />
              Rate & Review Mentor
            </button>
          </div>
        )}

        {request.status === 'Completed' && isMentor && (
          <div className="text-[11px] text-slate-500">
            ✓ Session recorded in your mentor profile statistics.
          </div>
        )}
      </div>
    </div>
  );
};
