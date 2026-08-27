'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, GraduationCap, ShieldCheck, ArrowRight, Trash2, CheckCircle2 } from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const MySkillsView: React.FC = () => {
  const { 
    currentUser, 
    skills, 
    addTeachingSkill, 
    addLearningSkill, 
    removeTeachingSkill, 
    removeLearningSkill,
    submitSkillVerification
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'teach' | 'learn'>('teach');

  // Add Teach State
  const [isAddTeachOpen, setIsAddTeachOpen] = useState(false);
  const [teachSkillId, setTeachSkillId] = useState('');
  const [teachProficiency, setTeachProficiency] = useState('Intermediate');
  const [teachExp, setTeachExp] = useState('');

  // Add Learn State
  const [isAddLearnOpen, setIsAddLearnOpen] = useState(false);
  const [learnSkillId, setLearnSkillId] = useState('');
  const [learnCurrent, setLearnCurrent] = useState('Beginner');
  const [learnTarget, setLearnTarget] = useState('Advanced');

  // Verify State
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [verifSkillId, setVerifSkillId] = useState('');
  const [verifNote, setVerifNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTeach = async () => {
    const sId = teachSkillId || (skills.length > 0 ? skills[0].id : '');
    if (!sId) return;
    setIsSubmitting(true);
    const success = await addTeachingSkill(sId, teachProficiency as any, teachExp);
    setIsSubmitting(false);
    if (success) {
      setIsAddTeachOpen(false);
      setTeachExp('');
    }
  };

  const handleAddLearn = async () => {
    const sId = learnSkillId || (skills.length > 0 ? skills[0].id : '');
    if (!sId) return;
    setIsSubmitting(true);
    const success = await addLearningSkill(sId, learnCurrent as any, learnTarget as any, 'High');
    setIsSubmitting(false);
    if (success) {
      setIsAddLearnOpen(false);
    }
  };

  const handleVerify = async () => {
    const sId = verifSkillId || (currentUser.skillsToTeach.filter(s => !s.verified)[0]?.skillId || '');
    if (!sId) return;
    const skill = currentUser.skillsToTeach.find(s => s.skillId === sId);
    setIsSubmitting(true);
    const success = await submitSkillVerification(sId, skill?.proficiency || 'Intermediate', verifNote);
    setIsSubmitting(false);
    if (success) {
      setIsVerifyOpen(false);
      setVerifNote('');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150 max-w-5xl">
      <div className="border-b border-slate-200 pb-6 pt-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          My Skills Profile
        </h1>
        <p className="text-sm text-slate-600">
          Manage the skills you can teach peers, and the skills you want to learn for placements.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex bg-slate-50 border border-slate-200 rounded p-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubTab('teach')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded transition-colors ${
              activeSubTab === 'teach' ? 'bg-white shadow-xs text-slate-900 border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Skills I Can Teach
          </button>
          <button
            onClick={() => setActiveSubTab('learn')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded transition-colors ${
              activeSubTab === 'learn' ? 'bg-white shadow-xs text-slate-900 border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Skills I Want to Learn
          </button>
        </div>

        <button
          onClick={() => {
            if (activeSubTab === 'teach') {
              if (skills.length > 0) setTeachSkillId(skills[0].id);
              setIsAddTeachOpen(true);
            } else {
              if (skills.length > 0) setLearnSkillId(skills[0].id);
              setIsAddLearnOpen(true);
            }
          }}
          className="px-4 py-2 text-xs font-bold text-white bg-[#0B192C] hover:bg-blue-900 rounded transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{activeSubTab === 'teach' ? 'Add Teaching Skill' : 'Add Learning Goal'}</span>
        </button>
      </div>

      {activeSubTab === 'teach' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Teaching Portfolio
            </span>
            <button
              onClick={() => {
                if (currentUser.skillsToTeach.length > 0) {
                  setVerifSkillId(currentUser.skillsToTeach[0].skillId);
                  setIsVerifyOpen(true);
                }
              }}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verify a Skill
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3 font-semibold">Skill</th>
                  <th className="px-4 py-3 font-semibold">Proficiency</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Students Helped</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {currentUser.skillsToTeach.map(st => (
                  <tr key={st.skillId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 align-middle">
                      <div className="font-bold text-slate-900">{st.skillName}</div>
                      <div className="text-[11px] text-slate-500">{st.domain}</div>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      {st.proficiency}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      {st.verified ? (
                        <span className="flex w-max items-center text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 uppercase tracking-wider">
                          Verified
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-middle hidden md:table-cell text-slate-600">
                      {st.sessionsHelped} sessions
                    </td>
                    <td className="px-4 py-3 align-middle text-right">
                      <button
                        onClick={() => removeTeachingSkill(st.skillId)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove Skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                
                {currentUser.skillsToTeach.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-sm">
                      You haven't added any skills to teach yet. Share your expertise with peers!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'learn' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Learning Goals
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3 font-semibold">Skill</th>
                  <th className="px-4 py-3 font-semibold">Current Level</th>
                  <th className="px-4 py-3 font-semibold">Target Level</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {currentUser.skillsToLearn.map(sl => (
                  <tr key={sl.skillId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 align-middle">
                      <div className="font-bold text-slate-900">{sl.skillName}</div>
                      <div className="text-[11px] text-slate-500">{sl.domain}</div>
                    </td>
                    <td className="px-4 py-3 align-middle text-slate-600">
                      {sl.currentLevel}
                    </td>
                    <td className="px-4 py-3 align-middle font-medium text-slate-900">
                      {sl.targetLevel}
                    </td>
                    <td className="px-4 py-3 align-middle text-right">
                      <button
                        onClick={() => removeLearningSkill(sl.skillId)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove Goal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                
                {currentUser.skillsToLearn.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500 text-sm">
                      No learning goals defined.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals for Add/Verify... [Keeping them minimal but functional] */}
      <Modal isOpen={isAddTeachOpen} onClose={() => setIsAddTeachOpen(false)} title="Add Teaching Skill">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Skill</label>
            <select value={teachSkillId} onChange={e => setTeachSkillId(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-[#0B192C]">
              {skills.map(s => <option key={s.id} value={s.id}>{s.name} ({s.domain})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Proficiency</label>
            <select value={teachProficiency} onChange={e => setTeachProficiency(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-[#0B192C]">
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Experience Note</label>
            <textarea value={teachExp} onChange={e => setTeachExp(e.target.value)} placeholder="E.g., Used in 2 live projects" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-[#0B192C] h-20" />
          </div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleAddTeach}
            className="w-full bg-[#0B192C] hover:bg-blue-900 disabled:opacity-50 text-white py-2 rounded text-sm font-bold transition-colors"
          >
            {isSubmitting ? 'Saving to Database...' : 'Add Skill'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={isAddLearnOpen} onClose={() => setIsAddLearnOpen(false)} title="Add Learning Goal">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Skill</label>
            <select value={learnSkillId} onChange={e => setLearnSkillId(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-[#0B192C]">
              {skills.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current Level</label>
            <select value={learnCurrent} onChange={e => setLearnCurrent(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-[#0B192C]">
              <option value="None">None</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Level</label>
            <select value={learnTarget} onChange={e => setLearnTarget(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-[#0B192C]">
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleAddLearn}
            className="w-full bg-[#0B192C] hover:bg-blue-900 disabled:opacity-50 text-white py-2 rounded text-sm font-bold transition-colors"
          >
            {isSubmitting ? 'Saving to Database...' : 'Add Goal'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={isVerifyOpen} onClose={() => setIsVerifyOpen(false)} title="Verify Skill Badge">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Skill to Verify</label>
            <select value={verifSkillId} onChange={e => setVerifSkillId(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-[#0B192C]">
              {currentUser.skillsToTeach.filter(s => !s.verified).map(s => (
                <option key={s.skillId} value={s.skillId}>{s.skillName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Evidence / Proof</label>
            <textarea value={verifNote} onChange={e => setVerifNote(e.target.value)} placeholder="Provide link to certification, project repo, or explanation..." className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-[#0B192C] h-24" />
          </div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleVerify}
            className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white py-2 rounded text-sm font-bold transition-colors"
          >
            {isSubmitting ? 'Submitting to Placement Cell...' : 'Submit for Verification'}
          </button>
        </div>
      </Modal>

    </div>
  );
};
