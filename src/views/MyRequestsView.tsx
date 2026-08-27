'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RatingModal } from '../components/requests/RatingModal';
import { SessionWorkspaceModal } from '../components/requests/SessionWorkspaceModal';
import { MentoringRequest } from '../types';
import { Modal } from '../components/common/Modal';
import { ArrowLeftRight, Check, X, Play, Star, Plus, Video, MessageSquare, AlertCircle } from 'lucide-react';

export const MyRequestsView: React.FC = () => {
  const { 
    requests, 
    currentUser, 
    ratings, 
    setActiveTab, 
    acceptMentoringRequest,
    rejectMentoringRequest,
    completeMentoringSession 
  } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'received' | 'sent' | 'active' | 'completed'>('received');
  const [selectedRequestForRating, setSelectedRequestForRating] = useState<MentoringRequest | null>(null);
  const [selectedRequestForWorkspace, setSelectedRequestForWorkspace] = useState<MentoringRequest | null>(null);
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);

  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/');
  const [acceptNote, setAcceptNote] = useState('');
  const [rejectNote, setRejectNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userRequests = requests.filter(
    (r) => r.mentorId === currentUser.id || r.requesterId === currentUser.id
  );

  const filteredRequests = userRequests.filter((r) => {
    const status = r.status.toUpperCase();
    if (activeTabFilter === 'received') return r.mentorId === currentUser.id && status === 'PENDING';
    if (activeTabFilter === 'sent') return r.requesterId === currentUser.id && status === 'PENDING';
    if (activeTabFilter === 'active') return status === 'ACCEPTED' || status === 'ACTIVE';
    if (activeTabFilter === 'completed') return status === 'COMPLETED' || status === 'REJECTED';
    return true;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const receivedPendingCount = userRequests.filter(
    (r) => r.mentorId === currentUser.id && r.status.toUpperCase() === 'PENDING'
  ).length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150 max-w-5xl">
      <div className="border-b border-slate-200 pb-6 pt-2">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Mentoring Requests
          </h1>
          <button
            type="button"
            onClick={() => setActiveTab('find_mentor')}
            className="px-4 py-2 text-xs font-bold text-white bg-[#0B192C] hover:bg-blue-900 rounded transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Find Mentor
          </button>
        </div>
        <p className="text-sm text-slate-600">
          Manage your incoming teaching requests, active sessions, and learning history.
        </p>
      </div>

      <div className="flex bg-slate-50 border border-slate-200 rounded p-1 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => setActiveTabFilter('received')}
          className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded transition-colors flex items-center justify-center gap-2 ${
            activeTabFilter === 'received' ? 'bg-white shadow-xs text-slate-900 border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Received 
          {receivedPendingCount > 0 && (
            <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-sm text-[10px] font-bold">
              {receivedPendingCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTabFilter('sent')}
          className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded transition-colors ${
            activeTabFilter === 'sent' ? 'bg-white shadow-xs text-slate-900 border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Sent
        </button>
        <button
          type="button"
          onClick={() => setActiveTabFilter('active')}
          className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded transition-colors ${
            activeTabFilter === 'active' ? 'bg-white shadow-xs text-slate-900 border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setActiveTabFilter('completed')}
          className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded transition-colors ${
            activeTabFilter === 'completed' ? 'bg-white shadow-xs text-slate-900 border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          History
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3 font-semibold">Student</th>
              <th className="px-4 py-3 font-semibold">Skill</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">Date & Time</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {filteredRequests.map(r => {
              const isMentor = currentUser.id === r.mentorId;
              const otherPersonName = isMentor ? r.requesterName : r.mentorName;
              const statusNormalized = r.status.toUpperCase();
              
              return (
                <React.Fragment key={r.id}>
                  <tr 
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setExpandedRequestId(expandedRequestId === r.id ? null : r.id)}
                  >
                    <td className="px-4 py-4 align-middle">
                      <div className="font-bold text-slate-900">{otherPersonName}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{isMentor ? 'Learner' : 'Mentor'}</div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="font-semibold text-slate-800">{r.skillName}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[150px]" title={r.reason}>
                        {r.reason}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle hidden sm:table-cell text-xs text-slate-600">
                      <div>{r.preferredDate}</div>
                      <div>{r.preferredTime}</div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        statusNormalized === 'PENDING' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        statusNormalized === 'ACCEPTED' || statusNormalized === 'ACTIVE' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                        statusNormalized === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        'bg-slate-100 text-slate-600 border-slate-300'
                      }`}>
                        {statusNormalized === 'PENDING' ? 'Awaiting Response' :
                         statusNormalized === 'ACCEPTED' || statusNormalized === 'ACTIVE' ? 'In Progress' :
                         statusNormalized === 'COMPLETED' ? 'Completed' :
                         statusNormalized === 'REJECTED' ? 'Declined' : statusNormalized}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        {isMentor && statusNormalized === 'PENDING' && (
                          <>
                            <button 
                              onClick={() => setAcceptingId(r.id)}
                              className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-3 py-1.5 rounded transition-colors"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => setRejectingId(r.id)}
                              className="text-xs font-bold text-slate-600 hover:text-rose-700 hover:underline px-2 py-1.5"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        
                        {!isMentor && statusNormalized === 'PENDING' && (
                          <span className="text-xs text-slate-500 italic">Waiting...</span>
                        )}
  
                        {(statusNormalized === 'ACCEPTED' || statusNormalized === 'ACTIVE') && (
                          <>
                            <button
                              onClick={() => setSelectedRequestForWorkspace(r)}
                              className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded flex items-center gap-1 transition-colors"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              Open
                            </button>
                            {isMentor && (
                              <button
                                onClick={() => completeMentoringSession(r.id)}
                                className="text-xs font-bold text-slate-600 hover:text-emerald-700 hover:underline px-2 py-1.5"
                              >
                                Complete
                              </button>
                            )}
                          </>
                        )}
  
                        {statusNormalized === 'COMPLETED' && !isMentor && (
                          ratings.some(rt => rt.requestId === r.id) ? (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                              Rated ★
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedRequestForRating(r)}
                              className="text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-2xs"
                            >
                              <Star className="w-3 h-3 fill-current" />
                              Rate Mentor
                            </button>
                          )
                        )}
  
                        {statusNormalized === 'COMPLETED' && isMentor && (
                          <span className="text-xs text-slate-500 font-medium">
                            Completed
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedRequestId === r.id && (
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <td colSpan={5} className="px-6 py-6">
                        <div className="flex items-start space-x-6 text-sm">
                          <div className="flex flex-col min-w-[120px]">
                            <span className="font-bold text-slate-700">Requested</span>
                            <span className="text-slate-500 text-xs mt-1">{new Date(r.createdAt).toLocaleString()}</span>
                          </div>
                          {(statusNormalized === 'ACCEPTED' || statusNormalized === 'ACTIVE' || statusNormalized === 'COMPLETED' || statusNormalized === 'REJECTED') && (
                            <>
                              <div className="h-0.5 w-12 bg-slate-300 mt-2 shrink-0"></div>
                              <div className="flex flex-col min-w-[120px]">
                                <span className="font-bold text-slate-700">{statusNormalized === 'REJECTED' ? 'Declined' : 'Accepted'}</span>
                                <span className="text-slate-500 text-xs mt-1">{r.acceptedAt ? new Date(r.acceptedAt).toLocaleString() : 'N/A'}</span>
                                {r.mentorResponseNote && (
                                  <div className="mt-2 text-xs italic text-slate-600 bg-slate-100 p-2 rounded border border-slate-200">
                                    "{r.mentorResponseNote}"
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                          {statusNormalized === 'COMPLETED' && (
                            <>
                              <div className="h-0.5 w-12 bg-slate-300 mt-2 shrink-0"></div>
                              <div className="flex flex-col min-w-[120px]">
                                <span className="font-bold text-slate-700">Completed</span>
                                <span className="text-slate-500 text-xs mt-1">{r.completedAt ? new Date(r.completedAt).toLocaleString() : 'N/A'}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-sm">
                  No requests found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedRequestForRating && (
        <RatingModal
          isOpen={!!selectedRequestForRating}
          onClose={() => setSelectedRequestForRating(null)}
          request={selectedRequestForRating}
        />
      )}

      {selectedRequestForWorkspace && (
        <SessionWorkspaceModal
          isOpen={!!selectedRequestForWorkspace}
          onClose={() => setSelectedRequestForWorkspace(null)}
          request={selectedRequestForWorkspace}
          onCompleteAndRate={(r) => {
            setSelectedRequestForWorkspace(null);
            setSelectedRequestForRating(r);
          }}
        />
      )}

      {/* Accept Request Modal */}
      <Modal
        isOpen={!!acceptingId}
        onClose={() => { setAcceptingId(null); setMeetingLink('https://meet.google.com/'); setAcceptNote(''); }}
        title="Accept Mentoring Request"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Meeting Link</label>
            <div className="relative">
              <Video className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="https://meet.google.com/..."
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">This link will be shared with the learner.</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Response Note (Optional)</label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                value={acceptNote}
                onChange={(e) => setAcceptNote(e.target.value)}
                rows={3}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                placeholder="Looking forward to our session..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => { setAcceptingId(null); setMeetingLink('https://meet.google.com/'); setAcceptNote(''); }}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                if (!acceptingId) return;
                setIsSubmitting(true);
                await acceptMentoringRequest(acceptingId, meetingLink, acceptNote);
                setIsSubmitting(false);
                setAcceptingId(null);
                setMeetingLink('https://meet.google.com/');
                setAcceptNote('');
              }}
              className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded flex items-center gap-1.5"
              disabled={isSubmitting || !meetingLink}
            >
              <Check className="w-4 h-4" />
              {isSubmitting ? 'Accepting...' : 'Confirm & Accept'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Reject Request Modal */}
      <Modal
        isOpen={!!rejectingId}
        onClose={() => { setRejectingId(null); setRejectNote(''); }}
        title="Decline Request"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              Are you sure you want to decline this request? The learner will be notified.
            </p>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reason for Declining</label>
            <textarea
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              rows={3}
              className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="e.g., Schedule conflict, not available this week..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => { setRejectingId(null); setRejectNote(''); }}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                if (!rejectingId) return;
                setIsSubmitting(true);
                await rejectMentoringRequest(rejectingId, rejectNote || 'Schedule conflict.');
                setIsSubmitting(false);
                setRejectingId(null);
                setRejectNote('');
              }}
              className="px-4 py-2 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded flex items-center gap-1.5"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4" />
              {isSubmitting ? 'Declining...' : 'Confirm Decline'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
