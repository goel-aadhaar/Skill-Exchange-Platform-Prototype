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
          className="p-5 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-blue-50/40 border-2 border-amber-400/90 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/90 px-2.5 py-0.5 rounded-md">
                Incoming Mentoring Request
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-data font-medium">
                {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div className="text-base sm:text-lg font-black text-[#0B192C]">
              {req.requesterName} ({req.requesterProgram}) requested peer mentoring in{' '}
              <span className="text-amber-600 underline decoration-amber-300">{req.skillName}</span>
            </div>

            {req.message && (
              <p className="text-xs text-slate-700 italic bg-white/90 p-3 rounded-2xl border border-slate-200 shadow-2xs leading-relaxed">
                &quot;{req.message}&quot;
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-0.5">
              {req.preferredDate && (
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{req.preferredDate}</span>
                </div>
              )}
              {req.preferredTime && (
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{req.preferredTime}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => rejectMentoringRequest(req.id)}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-rose-700 bg-white hover:bg-rose-50 border border-slate-300 hover:border-rose-300 rounded-xl transition-all shadow-2xs cursor-pointer"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => acceptMentoringRequest(req.id)}
              className="px-5 py-2.5 text-xs font-black text-[#0B192C] bg-amber-400 hover:bg-amber-500 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0B192C]" />
              <span>Accept Mentoring Request</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
