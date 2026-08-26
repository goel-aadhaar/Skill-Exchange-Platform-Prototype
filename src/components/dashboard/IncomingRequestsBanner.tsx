'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { MentoringRequest } from '../../types';
import { ArrowLeftRight, CheckCircle2, X, Calendar, Clock, MessageSquare, Sparkles } from 'lucide-react';

export const IncomingRequestsBanner: React.FC = () => {
  const { currentUser, requests, acceptMentoringRequest, rejectMentoringRequest } = useApp();

  const pendingReceived = requests.filter(
    (r) => r.mentorId === currentUser.id && r.status.toUpperCase() === 'PENDING'
  );

  if (pendingReceived.length === 0) return null;

  return (
    <div className="space-y-3">
      {pendingReceived.map((req) => (
        <div
          key={req.id}
          className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-blue-50/40 border-2 border-amber-400 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                Incoming Mentoring Request
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-mono">
                {new Date(req.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="text-base font-extrabold text-[#0F2942]">
              {req.requesterName} ({req.requesterProgram}) wants to learn{' '}
              <span className="text-amber-600 underline decoration-amber-300">{req.skillName}</span> from you.
            </div>

            {req.message && (
              <p className="text-xs text-slate-600 italic bg-white/80 p-2.5 rounded-xl border border-slate-200/80">
                &quot;{req.message}&quot;
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
              {req.preferredDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{req.preferredDate}</span>
                </div>
              )}
              {req.preferredTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{req.preferredTime}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => rejectMentoringRequest(req.id)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-slate-300 hover:border-rose-300 rounded-xl transition-all shadow-2xs"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => acceptMentoringRequest(req.id)}
              className="px-5 py-2 text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-900" />
              Accept Request
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
