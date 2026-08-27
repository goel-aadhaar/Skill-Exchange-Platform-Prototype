'use client';

import React, { useState, useEffect } from 'react';
import { MentoringRequest } from '../../types';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Clock,
  Sparkles,
  BookOpen,
  Code,
  FileText,
  CheckCircle2,
  Share2,
  ExternalLink
} from 'lucide-react';

interface SessionWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: MentoringRequest | null;
  onCompleteAndRate: (request: MentoringRequest) => void;
}

export const SessionWorkspaceModal: React.FC<SessionWorkspaceModalProps> = ({
  isOpen,
  onClose,
  request,
  onCompleteAndRate
}) => {
  const { currentUser } = useApp();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(1450); // mock 24 mins into session
  const [sessionNotes, setSessionNotes] = useState('');

  useEffect(() => {
    if (request) {
      setSessionNotes(
        request.sessionNotes ||
          `-- Peer Mentoring Scratchpad: ${request.skillName}\n-- Date: ${request.preferredDate}\n\n1. Overview & Key Frameworks:\n- Core concepts reviewed\n- Common interview pitfalls discussed\n\n2. Hands-on Practice & Notes:\n- Problem 1: Step-by-step breakdown\n- Problem 2: Optimization logic\n\n3. Action Items for Placement Rounds:\n- Solve 5 follow-up practice cases\n- Refine resume bullet with specific metrics`
      );
    }
  }, [request]);

  useEffect(() => {
    let timer: any;
    if (isOpen) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!request) return null;

  const isMentor = currentUser.id === request.mentorId;
  const otherName = isMentor ? request.requesterName : request.mentorName;
  const otherAvatar = isMentor ? request.requesterAvatar : request.mentorAvatar;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={`Live Peer Mentoring Room — ${request.skillName}`}
    >
      <div className="space-y-5">
        {/* Live Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Session in Progress
              </span>
            </div>
            <span className="text-slate-500">•</span>
            <div className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatTimer(secondsElapsed)}</span>
            </div>
          </div>

          {/* Participant chips */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200">
              <div className="w-5 h-5 rounded-full bg-[#0F2942] text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold text-[10px]">
                {currentUser.avatar}
              </div>
              <span>You ({isMentor ? 'Mentor' : 'Learner'})</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200">
              <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">
                {otherAvatar}
              </div>
              <span>{otherName} ({isMentor ? 'Learner' : 'Mentor'})</span>
            </div>
          </div>
        </div>

        {/* Video feed mock area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Peer Feed */}
          <div className="h-44 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 relative overflow-hidden flex flex-col justify-between p-3.5 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                {otherName}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live Feed
              </span>
            </div>

            <div className="w-14 h-14 rounded-full bg-white/10 text-white font-bold text-lg flex items-center justify-center mx-auto border border-white/20 shadow-md">
              {otherAvatar}
            </div>

            <div className="text-[11px] text-slate-400 text-center">
              Audio & Screen Connected (HD)
            </div>
          </div>

          {/* User Feed */}
          <div className="h-44 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 relative overflow-hidden flex flex-col justify-between p-3.5 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                You ({currentUser.name})
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-1 rounded ${isMicOn ? 'bg-white/20 text-white' : 'bg-rose-600 text-white'}`}
                >
                  {isMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-1 rounded ${isVideoOn ? 'bg-white/20 text-white' : 'bg-rose-600 text-white'}`}
                >
                  {isVideoOn ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="w-14 h-14 rounded-full bg-[#0F2942] text-amber-400 border border-amber-400/30 font-bold text-lg flex items-center justify-center mx-auto shadow-md">
              {currentUser.avatar}
            </div>

            <div className="text-[11px] text-slate-400 text-center">
              Microphone Active • Google Meet Bridge
            </div>
          </div>
        </div>

        {/* Collaborative Notes & Code Scratchpad */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Shared Real-Time Session Scratchpad & Code Editor
              </label>
            </div>
            <span className="text-[11px] text-slate-500">
              Auto-syncing with {otherName}
            </span>
          </div>

          <textarea
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            rows={8}
            className="w-full p-3.5 text-xs font-mono bg-slate-900 text-slate-100 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none leading-relaxed"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>After completing the session, you can submit your peer rating.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Minimize
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onCompleteAndRate(request);
              }}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Finish Session & Leave Rating
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
