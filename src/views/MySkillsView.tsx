'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ProficiencyLevel, PriorityLevel, Skill } from '../types';
import {
  BookMarked,
  GraduationCap,
  Plus,
  Trash2,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
  AlertCircle
} from 'lucide-react';

export const MySkillsView: React.FC = () => {
  const {
    currentUser,
    skills,
    addSkillToTeach,
    removeSkillToTeach,
    toggleSkillAvailability,
    addSkillToLearn,
    removeSkillToLearn,
    requestSkillVerification,
    setSelectedSkillForMentorSearch,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'teach' | 'learn'>('teach');

  // Add Teach Modal State
  const [isAddTeachOpen, setIsAddTeachOpen] = useState(false);
  const [teachSkillId, setTeachSkillId] = useState('');
  const [teachProficiency, setTeachProficiency] = useState<ProficiencyLevel>('Intermediate');
  const [teachNote, setTeachNote] = useState('');
  const [teachAvailable, setTeachAvailable] = useState(true);

  // Add Learn Modal State
  const [isAddLearnOpen, setIsAddLearnOpen] = useState(false);
  const [learnSkillId, setLearnSkillId] = useState('');
  const [learnCurrentLevel, setLearnCurrentLevel] = useState<ProficiencyLevel | 'None'>('Beginner');
  const [learnTargetLevel, setLearnTargetLevel] = useState<ProficiencyLevel>('Advanced');
  const [learnPriority, setLearnPriority] = useState<PriorityLevel>('High');

  // Verification Modal State
  const [isVerifModalOpen, setIsVerifModalOpen] = useState(false);
  const [verifSkillId, setVerifSkillId] = useState('');
  const [verifProficiency, setVerifProficiency] = useState<ProficiencyLevel>('Advanced');
  const [verifEvidence, setVerifEvidence] = useState('');

  const handleAddTeach = (e: React.FormEvent) => {
    e.preventDefault();
    const skillObj = skills.find((s) => s.id === teachSkillId);
    if (!skillObj) return;

    addSkillToTeach({
      skillId: skillObj.id,
      skillName: skillObj.name,
      domain: skillObj.domain,
      proficiency: teachProficiency,
      experienceNote: teachNote || 'Eager to mentor peers on this topic.',
      isAvailable: teachAvailable
    });

    setIsAddTeachOpen(false);
    setTeachSkillId('');
    setTeachNote('');
  };

  const handleAddLearn = (e: React.FormEvent) => {
    e.preventDefault();
    const skillObj = skills.find((s) => s.id === learnSkillId);
    if (!skillObj) return;

    addSkillToLearn({
      skillId: skillObj.id,
      skillName: skillObj.name,
      domain: skillObj.domain,
      currentLevel: learnCurrentLevel,
      targetLevel: learnTargetLevel,
      priority: learnPriority
    });

    setIsAddLearnOpen(false);
    setLearnSkillId('');
  };

  const handleRequestVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifSkillId || !verifEvidence) return;

    requestSkillVerification(verifSkillId, verifProficiency, verifEvidence);
    setIsVerifModalOpen(false);
    setVerifSkillId('');
    setVerifEvidence('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#8B1E2D] text-white flex items-center justify-center font-bold shadow-xs">
              <BookMarked className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              My Skills Portfolio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your peer-mentorship offerings and track skills you are building for placement readiness.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveSubTab('teach')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'teach'
                ? 'bg-white text-[#8B1E2D] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Skills I Can Teach ({currentUser.skillsToTeach.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('learn')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'learn'
                ? 'bg-white text-[#8B1E2D] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Skills I Want to Learn ({currentUser.skillsToLearn.length})</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Skills I Can Teach */}
      {activeSubTab === 'teach' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Other students can discover your profile and request 1-on-1 peer sessions for these topics.
            </div>
            <button
              type="button"
              onClick={() => setIsAddTeachOpen(true)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Skill to Teach
            </button>
          </div>

          {currentUser.skillsToTeach.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                <BookMarked className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-slate-800">
                You haven&apos;t added any teaching skills yet.
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Add skills from prior projects, certifications, or past internships to help your peers prepare.
              </p>
              <button
                type="button"
                onClick={() => setIsAddTeachOpen(true)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#8B1E2D] rounded-lg"
              >
                Add Your First Teaching Skill
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUser.skillsToTeach.map((st) => (
                <div
                  key={st.skillId}
                  className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">
                          {st.skillName}
                        </h3>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {st.domain}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Badge variant="proficiency" level={st.proficiency} size="xs" />
                        {st.verified ? (
                          <Badge variant="verified" size="xs">
                            Verified
                          </Badge>
                        ) : (
                          <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-medium">
                            Self-Claimed
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {st.experienceNote}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{st.sessionsHelped} peer sessions conducted</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSkillAvailability(st.skillId)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded border transition-colors ${
                          st.isAvailable
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {st.isAvailable ? '● Available' : '○ Paused'}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    {!st.verified ? (
                      <button
                        type="button"
                        onClick={() => {
                          setVerifSkillId(st.skillId);
                          setVerifProficiency(st.proficiency);
                          setIsVerifModalOpen(true);
                        }}
                        className="text-xs font-bold text-[#8B1E2D] hover:underline flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Request Verification Badge
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified by Placement Cell
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => removeSkillToTeach(st.skillId)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Remove skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: Skills I Want to Learn */}
      {activeSubTab === 'learn' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              The platform dynamically checks for campus mentors teaching these topics.
            </div>
            <button
              type="button"
              onClick={() => setIsAddLearnOpen(true)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Learning Goal
            </button>
          </div>

          {currentUser.skillsToLearn.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-slate-800">
                No learning goals added yet.
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Add skills you need to build for placement drives to receive recommendations and matching mentors.
              </p>
              <button
                type="button"
                onClick={() => setIsAddLearnOpen(true)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#8B1E2D] rounded-lg"
              >
                Add a Learning Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUser.skillsToLearn.map((sl) => (
                <div
                  key={sl.skillId}
                  className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">
                          {sl.skillName}
                        </h3>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {sl.domain}
                        </div>
                      </div>

                      <Badge variant="priority" level={sl.priority} size="xs" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs p-2.5 bg-slate-50 rounded-lg mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Current Level
                        </span>
                        <span className="font-semibold text-slate-800">{sl.currentLevel}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Target Proficiency
                        </span>
                        <span className="font-semibold text-emerald-800">{sl.targetLevel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSkillForMentorSearch(sl.skillName);
                        setActiveTab('find_mentor');
                      }}
                      className="text-xs font-bold text-[#8B1E2D] hover:underline flex items-center gap-1"
                    >
                      <Users className="w-3.5 h-3.5" />
                      Find Mentors for this skill →
                    </button>

                    <button
                      type="button"
                      onClick={() => removeSkillToLearn(sl.skillId)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Remove goal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Teaching Skill Modal */}
      <Modal
        isOpen={isAddTeachOpen}
        onClose={() => setIsAddTeachOpen(false)}
        title="Add Skill You Can Teach"
        subtitle="Offer 1-on-1 peer mentorship to your IMT batchmates"
        maxWidth="lg"
      >
        <form onSubmit={handleAddTeach} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Skill from Catalog *
            </label>
            <select
              value={teachSkillId}
              onChange={(e) => setTeachSkillId(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            >
              <option value="">-- Choose a skill --</option>
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.domain})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Your Self-Assessed Proficiency *
            </label>
            <select
              value={teachProficiency}
              onChange={(e) => setTeachProficiency(e.target.value as ProficiencyLevel)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            >
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Experience / Project Note
            </label>
            <textarea
              value={teachNote}
              onChange={(e) => setTeachNote(e.target.value)}
              rows={3}
              placeholder="e.g. Used SQL and Tableau during summer internship; solved 100+ LeetCode problems..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddTeachOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg shadow-xs"
            >
              Add to Teaching Portfolio
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Learning Goal Modal */}
      <Modal
        isOpen={isAddLearnOpen}
        onClose={() => setIsAddLearnOpen(false)}
        title="Add Skill You Want to Learn"
        subtitle="Track your preparation goals for upcoming placement drives"
        maxWidth="lg"
      >
        <form onSubmit={handleAddLearn} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Skill from Catalog *
            </label>
            <select
              value={learnSkillId}
              onChange={(e) => setLearnSkillId(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            >
              <option value="">-- Choose a skill to learn --</option>
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.domain})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Current Level
              </label>
              <select
                value={learnCurrentLevel}
                onChange={(e) => setLearnCurrentLevel(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="None">None (Absolute Beginner)</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Proficiency
              </label>
              <select
                value={learnTargetLevel}
                onChange={(e) => setLearnTargetLevel(e.target.value as ProficiencyLevel)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced (Interview Ready)</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Urgency / Priority Level
            </label>
            <select
              value={learnPriority}
              onChange={(e) => setLearnPriority(e.target.value as PriorityLevel)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            >
              <option value="High">High Priority (Needed for Phase 1 Drives)</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddLearnOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg shadow-xs"
            >
              Add Learning Goal
            </button>
          </div>
        </form>
      </Modal>

      {/* Request Verification Badge Modal */}
      <Modal
        isOpen={isVerifModalOpen}
        onClose={() => setIsVerifModalOpen(false)}
        title="Request Placement Cell Endorsement"
        subtitle="Submit verification proof to receive an official Verified Mentor badge"
        maxWidth="lg"
      >
        <form onSubmit={handleRequestVerification} className="space-y-4">
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              Verified skills receive 3x higher peer mentorship requests and appear at the top of mentor discovery.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Claimed Proficiency Level *
            </label>
            <select
              value={verifProficiency}
              onChange={(e) => setVerifProficiency(e.target.value as ProficiencyLevel)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            >
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Verification Proof & Credentials *
            </label>
            <textarea
              value={verifEvidence}
              onChange={(e) => setVerifEvidence(e.target.value)}
              rows={3}
              required
              placeholder="Describe your credentials (e.g., Summer Internship project at Deloitte/PwC, CFA/Coursera certification ID, GitHub repo link, or B-school competition rank)..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsVerifModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Submit to Placement Cell
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
