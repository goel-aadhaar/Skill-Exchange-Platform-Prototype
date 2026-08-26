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

    // Default preferred date to 2 days from now
    const d = new Date();
    d.setDate(d.getDate() + 2);
    setPreferredDate(d.toISOString().split('T')[0]);

    setReason('Preparing for upcoming campus placement technical and case rounds.');
    setMessage(
      'Hi, I would really appreciate your guidance and feedback on real interview questions and best practices for this topic.'
    );
  }, [mentor, preselectedSkill]);

  if (!mentor) return null;

  const currentSkill = mentor.skillsToTeach.find((s) => s.skillId === selectedSkillId) || mentor.skillsToTeach[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSkill) return;

    setIsSubmitting(true);
    setTimeout(() => {
      sendMentoringRequest({
        mentorId: mentor.id,
        skillId: currentSkill.skillId,
        skillName: currentSkill.skillName,
        skillDomain: currentSkill.domain,
        reason,
        preferredDate,
        preferredTime,
        message
      });
      setIsSubmitting(false);
    }, 400);
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
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-[#8B1E2D] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {mentor.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-slate-900">
              Mentor: {mentor.name}
            </div>
            <div className="text-[11px] text-slate-500">
              {mentor.program} • Rating: {mentor.rating}★ ({mentor.sessionsCompleted} sessions)
            </div>
          </div>
          <div className="text-[11px] text-slate-500 text-right">
            <span className="text-emerald-700 font-semibold block">Available</span>
            <span className="text-[10px]">{mentor.availability.split('&')[0]}</span>
          </div>
        </div>

        {/* Skill Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Which skill do you want to learn? *
          </label>
          <select
            value={selectedSkillId}
            onChange={(e) => setSelectedSkillId(e.target.value)}
            required
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
          >
            {mentor.skillsToTeach.map((st) => (
              <option key={st.skillId} value={st.skillId}>
                {st.skillName} ({st.proficiency} level — {st.domain})
              </option>
            ))}
          </select>
        </div>

        {/* Learning Goal / Reason */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Primary Learning Objective / Context *
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Preparing for Deloitte Business Analyst interview / Project assignment"
            required
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
          />
        </div>

        {/* Date & Time slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Preferred Date *
            </label>
            <div className="relative">
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Preferred Time Slot *
            </label>
            <input
              type="text"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              placeholder="e.g. 7:00 PM - 8:30 PM"
              required
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            />
          </div>
        </div>

        {/* Personal Message / Questions */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Message / Specific Questions you want covered
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Mention any specific problems, datasets, or concepts you want help with..."
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] resize-none"
          />
        </div>

        {/* Notice */}
        <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
          💡 <span className="font-semibold text-slate-700">Peer-to-Peer Mentorship:</span> Mentorship on IMT SkillConnect is fully collaborative and free. {mentor.name} will receive a notification and can confirm the session with a meeting link.
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg shadow-xs transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>Sending Request...</>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Send Mentoring Request
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
