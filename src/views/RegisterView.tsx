'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ImtLogo } from '../data/imtBranding';
import { Skill, SkillToTeach, SkillToLearn, ProficiencyLevel, PriorityLevel } from '../types';
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  BookOpen,
  Check,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface RegisterViewProps {
  onGoToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onGoToLogin }) => {
  const { registerUser, skills } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('PGDM (General)');
  const [specialization, setSpecialization] = useState('Data Analytics & IT');
  const [academicYear, setAcademicYear] = useState('Year 1 (Batch 2024–2026)');
  const [graduationYear, setGraduationYear] = useState(2026);

  // Step 2 Fields
  const [targetDomain, setTargetDomain] = useState('Data Analytics');
  const [targetRole, setTargetRole] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState('Weekday Evenings (7 PM - 10 PM)');

  // Step 3: Skills to Teach
  const [skillsToTeach, setSkillsToTeach] = useState<SkillToTeach[]>([]);

  // Step 4: Skills to Learn
  const [skillsToLearn, setSkillsToLearn] = useState<SkillToLearn[]>([]);

  const [teachSearch, setTeachSearch] = useState('');
  const [learnSearch, setLearnSearch] = useState('');

  const addTeachSkill = (skill: Skill) => {
    if (skillsToTeach.some((s) => s.skillId === skill.id)) return;
    setSkillsToTeach([
      ...skillsToTeach,
      {
        skillId: skill.id,
        skillName: skill.name,
        domain: skill.domain,
        proficiency: 'Intermediate',
        experienceNote: 'Eager to mentor peers on this topic.',
        verified: false,
        sessionsHelped: 0,
        isAvailable: true
      }
    ]);
    setTeachSearch('');
  };

  const removeTeachSkill = (skillId: string) => {
    setSkillsToTeach(skillsToTeach.filter((s) => s.skillId !== skillId));
  };

  const addLearnSkill = (skill: Skill) => {
    if (skillsToLearn.some((s) => s.skillId === skill.id)) return;
    setSkillsToLearn([
      ...skillsToLearn,
      {
        skillId: skill.id,
        skillName: skill.name,
        domain: skill.domain,
        currentLevel: 'Beginner',
        targetLevel: 'Advanced',
        priority: 'High'
      }
    ]);
    setLearnSearch('');
  };

  const removeLearnSkill = (skillId: string) => {
    setSkillsToLearn(skillsToLearn.filter((s) => s.skillId !== skillId));
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !studentId || !email) {
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    const success = await registerUser({
      name,
      studentId,
      email,
      password: password || 'demo123',
      program,
      specialization,
      academicYear,
      graduationYear,
      bio,
      targetDomain,
      targetRole: targetRole || 'Business Analyst',
      careerGoal: careerGoal || 'Prepare for campus placement drives.',
      availability,
      skillsToTeach,
      skillsToLearn
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <ImtLogo variant="compact" />

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Already registered?</span>
            <button
              type="button"
              onClick={onGoToLogin}
              className="font-extrabold text-blue-900 hover:text-amber-600 underline"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Stepper Wizard Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Step {step} of 4: {step === 1 ? 'Academic Info' : step === 2 ? 'Career Goals' : step === 3 ? 'Skills You Teach' : 'Skills to Learn'}</span>
            <span className="text-amber-600">{step * 25}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-[#0F2942] rounded-full transition-all duration-300"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Academic Profile */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900">Academic & Identity Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  IMT Hyderabad Student Roll ID *
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 25A3HP658"
                  required
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Institutional Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Academic Program *
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                >
                  <option value="PGDM (General)">PGDM (General)</option>
                  <option value="PGDM (Analytics)">PGDM (Analytics)</option>
                  <option value="PGDM (Finance)">PGDM (Finance)</option>
                  <option value="PGDM (Marketing)">PGDM (Marketing)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-xl shadow-md flex items-center gap-1.5 text-xs"
              >
                <span>Continue to Career Goals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Career Goals */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900">Career Goals & Preferences</h3>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Domain *
                  </label>
                  <select
                    value={targetDomain}
                    onChange={(e) => setTargetDomain(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="Data Analytics">Data Analytics & IT</option>
                    <option value="Finance">Finance & Investment Banking</option>
                    <option value="Consulting">Consulting & Corporate Strategy</option>
                    <option value="Marketing">Product & Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Role *
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Business Analyst / Financial Analyst"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  About Me / Peer Mentorship Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold text-xs"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-xl shadow-md flex items-center gap-1.5 text-xs"
              >
                <span>Continue to Teaching Skills</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 & 4 */}
        {(step === 3 || step === 4) && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900">
              {step === 3 ? 'Skills You Can Teach Peers' : 'Skills You Want to Learn'}
            </h3>

            <div className="space-y-3">
              {/* Skill Selector Row */}
              <div className="flex gap-2">
                <select
                  value={step === 3 ? teachSearch : learnSearch}
                  onChange={(e) => (step === 3 ? setTeachSearch(e.target.value) : setLearnSearch(e.target.value))}
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                >
                  <option value="">-- Choose a skill to {step === 3 ? 'teach' : 'learn'} --</option>
                  {skills.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.domain})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    const selId = step === 3 ? teachSearch : learnSearch;
                    const sk = skills.find((s) => s.id === selId);
                    if (sk) {
                      if (step === 3) addTeachSkill(sk);
                      else addLearnSkill(sk);
                    }
                  }}
                  className="px-4 py-2 bg-[#0F2942] hover:bg-slate-900 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {step === 3 ? (
                <div className="space-y-2">
                  {skillsToTeach.map((s) => (
                    <div
                      key={s.skillId}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-slate-900">{s.skillName} ({s.proficiency})</span>
                      <button
                        type="button"
                        onClick={() => removeTeachSkill(s.skillId)}
                        className="text-rose-600 font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {skillsToTeach.length === 0 && (
                    <p className="text-xs text-slate-400 italic py-2">
                      No teaching skills added yet. Select from the dropdown above.
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {skillsToLearn.map((s) => (
                    <div
                      key={s.skillId}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-slate-900">{s.skillName} ({s.priority} Priority)</span>
                      <button
                        type="button"
                        onClick={() => removeLearnSkill(s.skillId)}
                        className="text-rose-600 font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {skillsToLearn.length === 0 && (
                    <p className="text-xs text-slate-400 italic py-2">
                      No learning goals added yet. Select from the dropdown above.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold text-xs"
              >
                Back
              </button>
              {step === 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-xl shadow-md text-xs"
                >
                  Next: Learning Goals →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black rounded-xl shadow-md text-xs"
                >
                  {isSubmitting ? 'Registering...' : 'Complete Profile & Enter Hub'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
