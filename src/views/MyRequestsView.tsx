'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RequestCard } from '../components/requests/RequestCard';
import { RatingModal } from '../components/requests/RatingModal';
import { SessionWorkspaceModal } from '../components/requests/SessionWorkspaceModal';
import { EmptyState } from '../components/common/EmptyState';
import { MentoringRequest } from '../types';
import {
  ArrowLeftRight,
  Send,
  Inbox,
  CheckCircle2,
  Sparkles,
  Clock,
  Plus
} from 'lucide-react';

export const MyRequestsView: React.FC = () => {
  const { requests, currentUser, ratings, setActiveTab, completeMentoringSession } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'received' | 'sent' | 'active' | 'completed'>('all');
  const [selectedRequestForRating, setSelectedRequestForRating] = useState<MentoringRequest | null>(null);
  const [selectedRequestForWorkspace, setSelectedRequestForWorkspace] = useState<MentoringRequest | null>(null);

  const userRequests = requests.filter(
    (r) => r.mentorId === currentUser.id || r.requesterId === currentUser.id
  );

  const filteredRequests = userRequests.filter((r) => {
    const status = r.status.toUpperCase();
    if (activeTabFilter === 'received') return r.mentorId === currentUser.id;
    if (activeTabFilter === 'sent') return r.requesterId === currentUser.id;
    if (activeTabFilter === 'active') return status === 'ACCEPTED' || status === 'ACTIVE';
    if (activeTabFilter === 'completed') return status === 'COMPLETED';
    return true;
  });

  const receivedPendingCount = userRequests.filter(
    (r) => r.mentorId === currentUser.id && r.status.toUpperCase() === 'PENDING'
  ).length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0F2942] text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold shadow-xs">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Mentorship Requests & Sessions
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track incoming requests from peers, schedule confirmed sessions, and review completed interactions in PostgreSQL.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('find_mentor')}
          className="px-4 py-2 text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Request New Mentoring
        </button>
      </div>

      {/* Filter Tabs Carousel */}
      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTabFilter('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            activeTabFilter === 'all'
              ? 'bg-[#0F2942] text-amber-400 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Requests ({userRequests.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTabFilter('received')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTabFilter === 'received'
              ? 'bg-[#0F2942] text-amber-400 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Inbox className="w-3 h-3" />
          <span>Received as Mentor</span>
          {receivedPendingCount > 0 && (
            <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
              {receivedPendingCount} new
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTabFilter('sent')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTabFilter === 'sent'
              ? 'bg-[#0F2942] text-amber-400 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Send className="w-3 h-3" />
          <span>Sent by Me</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabFilter('active')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTabFilter === 'active'
              ? 'bg-[#0F2942] text-amber-400 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3 h-3" />
          <span>Active / Scheduled</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabFilter('completed')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTabFilter === 'completed'
              ? 'bg-[#0F2942] text-amber-400 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-3 h-3" />
          <span>Completed</span>
        </button>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          title="No requests found"
          description={
            activeTabFilter === 'received'
              ? "You haven't received any mentoring requests from peers yet."
              : activeTabFilter === 'sent'
              ? "You haven't sent any mentoring requests yet. Find a mentor to bridge your skill gaps!"
              : 'No mentoring records match this filter.'
          }
          actionText="Find a Peer Mentor"
          onAction={() => setActiveTab('find_mentor')}
        />
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => {
            const existingReview = ratings.find((r) => r.requestId === req.id);
            return (
              <RequestCard
                key={req.id}
                request={req}
                existingRating={existingReview}
                onOpenRatingModal={(r) => setSelectedRequestForRating(r)}
                onOpenWorkspace={(r) => setSelectedRequestForWorkspace(r)}
              />
            );
          })}
        </div>
      )}

      {/* Rating & Review Modal */}
      {selectedRequestForRating && (
        <RatingModal
          isOpen={!!selectedRequestForRating}
          onClose={() => setSelectedRequestForRating(null)}
          request={selectedRequestForRating}
        />
      )}

      {/* Live Workspace Room Modal */}
      {selectedRequestForWorkspace && (
        <SessionWorkspaceModal
          isOpen={!!selectedRequestForWorkspace}
          onClose={() => setSelectedRequestForWorkspace(null)}
          request={selectedRequestForWorkspace}
          onCompleteAndRate={(req) => {
            completeMentoringSession(req.id);
            setSelectedRequestForWorkspace(null);
            setSelectedRequestForRating(req);
          }}
        />
      )}
    </div>
  );
};
