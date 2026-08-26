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
    addTeachingSkill,
    removeTeachingSkill,
    addLearningSkill,
    removeLearningSkill,
    submitSkillVerification,
    setSelectedSkillForMentorSearch,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'teach' | 'learn'>('teach');

  // Add Teach Modal State
  const [isAddTeachOpen, setIsAddTeachOpen] = useState(false);
  const [teachSkillId, setTeachSkillId] = useState('');
  const [teachProficiency, setTeachProficiency] = useState<ProficiencyLevel>('Intermediate');
  const [teachNote, setTeachNote] = useState('');

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

  const handleAddTeach = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillObj = skills.find((s) => s.id === teachSkillId) || skills[0];
    if (!skillObj) return;

    await addTeachingSkill(skillObj.id, teachProficiency, teachNote || 'Eager to mentor peers on this topic.');
    setIsAddTeachOpen(false);
    setTeachSkillId('');
    setTeachNote('');
  };

  const handleAddLearn = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillObj = skills.find((s) => s.id === learnSkillId) || skills[0];
    if (!skillObj) return;

    await addLearningSkill(skillObj.id, learnCurrentLevel, learnTargetLevel, learnPriority);
    setIsAddLearnOpen(false);
    setLearnSkillId('');
  };

  const handleRequestVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifSkillId || !verifEvidence) return;

    await submitSkillVerification(verifSkillId, verifProficiency, verifEvidence);
    setIsVerifModalOpen(false);
    setVerifSkillId('');
    setVerifEvidence('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0F2942] text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold shadow-xs">
              <BookMarked className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              My Skills Portfolio & Learning Goals
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage skills you can teach to juniors, request official Placement Cell verification, and set your target learning goals.
          </p>
        </div>

        {/* Tab Switcher & Quick Add Button */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveSubTab('teach')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'teach'
                  ? 'bg-[#0F2942] text-amber-400 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>I Can Teach ({currentUser.skillsToTeach.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('learn')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'learn'
                  ? 'bg-[#0F2942] text-amber-400 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>I Want to Learn ({currentUser.skillsToLearn.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (activeSubTab === 'teach') {
                if (skills.length > 0) setTeachSkillId(skills[0].id);
                setIsAddTeachOpen(true);
              } else {
                if (skills.length > 0) setLearnSkillId(skills[0].id);
                setIsAddLearnOpen(true);
              }
            }}
            className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{activeSubTab === 'teach' ? 'Add Teaching Skill' : 'Add Learning Goal'}</span>
          </button>
        </div>
      </div>

      {/* TEACHING SKILLS TAB */}
      {activeSubTab === 'teach' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Teaching Skills Portfolio ({currentUser.skillsToTeach.length})
            </span>
            <button
              type="button"
              onClick={() => {
                if (currentUser.skillsToTeach.length > 0) {
                  setVerifSkillId(currentUser.skillsToTeach[0].skillId);
                  setIsVerifModalOpen(true);
                }
              }}
              className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Submit Skill for Placement Cell Verification</span>
            </button>
          </div>

          {currentUser.skillsToTeach.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
              <p>You haven&apos;t added any teaching skills yet. Share what you know with fellow IMT Hyderabad students!</p>
              <button
                type="button"
                onClick={() => setIsAddTeachOpen(true)}
                className="px-4 py-2 bg-amber-400 text-slate-900 font-bold rounded-xl text-xs"
              >
                Add Your First Teaching Skill
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUser.skillsToTeach.map((st) => (
                <div
                  key={st.skillId}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {st.domain}
                        </span>
                        <h3 className="font-extrabold text-sm text-slate-900">
                          {st.skillName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="proficiency" level={st.proficiency} size="xs" />
                        {st.verified ? (
                          <Badge variant="verified" size="xs">
                            Verified
                          </Badge>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setVerifSkillId(st.skillId);
                              setIsVerifModalOpen(true);
                            }}
                            className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded hover:bg-amber-100 transition-colors"
                          >
                            Verify Badge →
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {st.experienceNote || 'Active peer mentor on campus.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 font-medium">
                      {st.sessionsHelped} peer sessions helped
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTeachingSkill(st.skillId)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove Skill"
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

      {/* LEARNING SKILLS TAB */}
      {activeSubTab === 'learn' && (
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Target Learning Goals ({currentUser.skillsToLearn.length})
          </span>

          {currentUser.skillsToLearn.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
              <p>You have not set any learning goals yet.</p>
              <button
                type="button"
                onClick={() => setIsAddLearnOpen(true)}
                className="px-4 py-2 bg-amber-400 text-slate-900 font-bold rounded-xl text-xs"
              >
                Add Target Skill to Learn
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUser.skillsToLearn.map((sl) => (
                <div
                  key={sl.skillId}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {sl.domain}
                        </span>
                        <h3 className="font-extrabold text-sm text-slate-900">
                          {sl.skillName}
                        </h3>
                      </div>
                      <Badge variant="priority" level={sl.priority} size="xs" />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span>Current: <strong className="text-slate-900">{sl.currentLevel}</strong></span>
                      <span>➔</span>
                      <span>Target: <strong className="text-amber-800">{sl.targetLevel}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSkillForMentorSearch(sl.skillName);
                        setActiveTab('find_mentor');
                      }}
                      className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1"
                    >
                      <Users className="w-3.5 h-3.5 text-amber-500" />
                      <span>Find Peer Mentors for this skill →</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => removeLearningSkill(sl.skillId)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove Goal"
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

      {/* ADD TEACH MODAL */}
      <Modal
        isOpen={isAddTeachOpen}
        onClose={() => setIsAddTeachOpen(false)}
        title="Add Skill to Teach"
        subtitle="Share your knowledge with juniors preparing for recruitment"
        maxWidth="md"
      >
        <form onSubmit={handleAddTeach} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Skill *
            </label>
            <select
              value={teachSkillId}
              onChange={(e) => setTeachSkillId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
            >
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.domain})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Proficiency Level *
            </label>
            <select
              value={teachProficiency}
              onChange={(e) => setTeachProficiency(e.target.value as ProficiencyLevel)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
            >
              <option value="Intermediate">Intermediate (Hands-on projects & coursework)</option>
              <option value="Advanced">Advanced (Internship PPO or 50+ case hours)</option>
              <option value="Expert">Expert (Certification + corporate project lead)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Experience Note / Credentials
            </label>
            <textarea
              value={teachNote}
              onChange={(e) => setTeachNote(e.target.value)}
              rows={3}
              placeholder="e.g. Led Python data analytics pipeline during Summer Internship at Deloitte..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddTeachOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-xl shadow-xs"
            >
              Save Teaching Skill
            </button>
          </div>
        </form>
      </Modal>

      {/* ADD LEARN MODAL */}
      <Modal
        isOpen={isAddLearnOpen}
        onClose={() => setIsAddLearnOpen(false)}
        title="Add Learning Goal"
        subtitle="Specify what competencies you want to acquire from campus mentors"
        maxWidth="md"
      >
        <form onSubmit={handleAddLearn} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Skill to Learn *
            </label>
            <select
              value={learnSkillId}
              onChange={(e) => setLearnSkillId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
            >
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.domain})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Current Level
              </label>
              <select
                value={learnCurrentLevel}
                onChange={(e) => setLearnCurrentLevel(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="None">None / Absolute Beginner</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Level
              </label>
              <select
                value={learnTargetLevel}
                onChange={(e) => setLearnTargetLevel(e.target.value as ProficiencyLevel)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
              >
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Urgency / Priority
            </label>
            <select
              value={learnPriority}
              onChange={(e) => setLearnPriority(e.target.value as PriorityLevel)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
            >
              <option value="High">High (Immediate Placement Need)</option>
              <option value="Medium">Medium (General Career Skill)</option>
              <option value="Low">Low (Future Interest)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddLearnOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-xl shadow-xs"
            >
              Save Learning Goal
            </button>
          </div>
        </form>
      </Modal>

      {/* VERIFICATION MODAL */}
      <Modal
        isOpen={isVerifModalOpen}
        onClose={() => setIsVerifModalOpen(false)}
        title="Request Placement Cell Verification"
        subtitle="Submit proof to get the official green verified badge"
        maxWidth="md"
      >
        <form onSubmit={handleRequestVerification} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Skill to Verify *
            </label>
            <select
              value={verifSkillId}
              onChange={(e) => setVerifSkillId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
            >
              {currentUser.skillsToTeach.map((st) => (
                <option key={st.skillId} value={st.skillId}>
                  {st.skillName} ({st.proficiency})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Claimed Proficiency Level *
            </label>
            <select
              value={verifProficiency}
              onChange={(e) => setVerifProficiency(e.target.value as ProficiencyLevel)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
            >
              <option value="Advanced">Advanced (Internship / Live Project)</option>
              <option value="Expert">Expert (Certification / PPO)</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Evidence & Internship Proof *
            </label>
            <textarea
              value={verifEvidence}
              onChange={(e) => setVerifEvidence(e.target.value)}
              rows={3}
              required
              placeholder="e.g. Certified Microsoft Power BI PL-300 credential ID #12345; Built sales dashboard during Deloitte summer internship."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsVerifModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0F2942] hover:bg-slate-900 text-amber-400 font-extrabold rounded-xl shadow-xs"
            >
              Submit to Placement Cell
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
