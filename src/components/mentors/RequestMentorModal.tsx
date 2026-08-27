'use client';

import React, { useState, useEffect } from 'react';
import { Student } from '../../types';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Sparkles, Calendar, Clock, Send, BookOpen, User, CheckCircle2 } from 'lucide-react';

interface RequestMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Student | null;
  preselectedSkill?: string | null;
}

export const RequestMentorModal: React.FC<RequestMentorModalProps> = ({
  isOpen,
  onClose,
  mentor,
  preselectedSkill
}) => {
  const { sendMentoringRequest, currentUser } = useApp();

  const [selectedSkillId, setSelectedSkillId] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('7:00 PM - 8:30 PM');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (mentor && mentor.skillsToTeach.length > 0) {
      if (preselectedSkill) {
        const found = mentor.skillsToTeach.find(
          (s) => s.skillName.toLowerCase() === preselectedSkill.toLowerCase()
        );
        setSelectedSkillId(found ? found.skillId : mentor.skillsToTeach[0].skillId);
      } else {
        setSelectedSkillId(mentor.skillsToTeach[0].skillId);
      }
    }

    const d = new Date();
    d.setDate(d.getDate() + 2);
    setPreferredDate(d.toISOString().split('T')[0]);

    setReason('Preparing for upcoming campus placement technical and case rounds.');
    setMessage(
      'Hi, I would really appreciate your guidance and hands-on practice for this topic.'
    );
  }, [mentor, preselectedSkill]);

  if (!mentor) return null;

  const currentSkill = mentor.skillsToTeach.find((s) => s.skillId === selectedSkillId) || mentor.skillsToTeach[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSkill) return;

    setIsSubmitting(true);
    const success = await sendMentoringRequest({
      mentorId: mentor.id,
      skillId: currentSkill.skillId,
      reason,
      preferredDate,
      preferredTime,
      message
    });
    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Peer Mentoring"
      subtitle={`Send a structured learning request to ${mentor.name}`}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mentor Info Pill */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-[#0F2942] text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold text-sm shadow-xs">
            {mentor.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-slate-900">
              Mentor: {mentor.name} ({mentor.studentId})
            </div>
            <div className="text-[11px] text-slate-500">
              {mentor.program} • Rating: {mentor.rating}★ ({mentor.sessionsCompleted} sessions)
            </div>
          </div>
          <div className="text-[11px] text-slate-500 text-right">
            <span className="text-emerald-700 font-bold block">Available</span>
          </div>
        </div>

        {/* Skill Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Select Skill to Learn *
          </label>
          <select
            value={selectedSkillId}
            onChange={(e) => setSelectedSkillId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
          >
            {mentor.skillsToTeach.map((st) => (
              <option key={st.skillId} value={st.skillId}>
                {st.skillName} ({st.proficiency} Level)
              </option>
            ))}
          </select>
        </div>

        {/* Reason / Target Goal */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Learning Goal / Purpose *
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Preparing for Deloitte Business Analyst technical interview"
            required
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Preferred Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Preferred Date *
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Preferred Time Slot *
            </label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
            >
              <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM (Evening)</option>
              <option value="7:00 PM - 8:30 PM">7:00 PM - 8:30 PM (Post Dinner)</option>
              <option value="8:30 PM - 10:00 PM">8:30 PM - 10:00 PM (Night)</option>
              <option value="Weekend Morning (10 AM - 12 PM)">Weekend Morning (10 AM - 12 PM)</option>
              <option value="Weekend Afternoon (3 PM - 5 PM)">Weekend Afternoon (3 PM - 5 PM)</option>
            </select>
          </div>
        </div>

        {/* Message for Mentor */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Personal Note for Mentor
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Introduce yourself and specify exact topics (e.g. SQL Window functions or DCF valuation formulas)..."
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-slate-900" />
            <span>{isSubmitting ? 'Sending request...' : 'Submit Mentoring Request'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
