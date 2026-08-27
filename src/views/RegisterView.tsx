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
  ShieldCheck,
  Lock,
  Award,
  AlertCircle
} from 'lucide-react';

interface RegisterViewProps {
  onGoToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onGoToLogin }) => {
  const { registerUser, skills } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 1: Academic Profile Fields
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cgpa, setCgpa] = useState('8.50');
  const [program, setProgram] = useState('PGDM (General)');
  const [specialization, setSpecialization] = useState('Data Analytics & IT');
  const [academicYear, setAcademicYear] = useState('Year 1 (2026 - 2028)');
  const [graduationYear, setGraduationYear] = useState(2026);

  // Step 2: Career Goals Fields
  const [targetDomain, setTargetDomain] = useState('Data Analytics & IT');
  const [targetRole, setTargetRole] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState('Weekday Evenings (7 PM - 10 PM)');

  // Step 3: Skills to Teach
  const [skillsToTeach, setSkillsToTeach] = useState<SkillToTeach[]>([]);
  const [selectedTeachSkillId, setSelectedTeachSkillId] = useState('');
  const [teachProficiency, setTeachProficiency] = useState<ProficiencyLevel>('Intermediate');
  const [teachExperienceNote, setTeachExperienceNote] = useState('');

  // Step 4: Skills to Learn
  const [skillsToLearn, setSkillsToLearn] = useState<SkillToLearn[]>([]);
  const [selectedLearnSkillId, setSelectedLearnSkillId] = useState('');
  const [learnCurrentLevel, setLearnCurrentLevel] = useState<ProficiencyLevel | 'None'>('Beginner');
  const [learnTargetLevel, setLearnTargetLevel] = useState<ProficiencyLevel>('Advanced');
  const [learnPriority, setLearnPriority] = useState<PriorityLevel>('High');

  // Step 1 Validation
  const validateStep1 = (): boolean => {
    setErrorMessage(null);
    if (!name.trim()) {
      setErrorMessage('Full Name is required.');
      return false;
    }
    if (!studentId.trim()) {
      setErrorMessage('Student Roll ID is required (e.g. 25A3HP658).');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('A valid Institutional Email is required.');
      return false;
    }
    if (!password.trim() || password.length < 4) {
      setErrorMessage('Password is required (minimum 4 characters).');
      return false;
    }
    const numCgpa = parseFloat(cgpa);
    if (isNaN(numCgpa) || numCgpa < 0 || numCgpa > 10) {
      setErrorMessage('Please enter a valid CGPA between 0.00 and 10.00.');
      return false;
    }
    return true;
  };

  // Step 2 Validation
  const validateStep2 = (): boolean => {
    setErrorMessage(null);
    if (!targetRole.trim()) {
      setErrorMessage('Target Role is required (e.g. Business Analyst).');
      return false;
    }
    if (!careerGoal.trim()) {
      setErrorMessage('Career Goal / Target Companies is required.');
      return false;
    }
    if (!bio.trim() || bio.trim().length < 10) {
      setErrorMessage('Bio summary is required (at least 10 characters).');
      return false;
    }
    return true;
  };

  // Step 3 Validation
  const validateStep3 = (): boolean => {
    setErrorMessage(null);
    if (skillsToTeach.length === 0) {
      setErrorMessage('Please add at least 1 skill you can teach or mentor peers on.');
      return false;
    }
    return true;
  };

  // Step 4 Validation & Submission
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (skillsToLearn.length === 0) {
      setErrorMessage('Please add at least 1 skill you want to learn under peer mentorship.');
      return;
    }

    setIsSubmitting(true);
    const success = await registerUser({
      name: name.trim(),
      studentId: studentId.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      cgpa: parseFloat(cgpa) || 8.5,
      program,
      specialization,
      academicYear,
      graduationYear,
      bio: bio.trim(),
      targetDomain,
      targetRole: targetRole.trim(),
      careerGoal: careerGoal.trim(),
      availability,
      skillsToTeach,
      skillsToLearn
    });
    setIsSubmitting(false);
  };

  const handleAddTeachSkill = () => {
    if (!selectedTeachSkillId) return;
    const skillObj = skills.find((s) => s.id === selectedTeachSkillId);
    if (!skillObj) return;

    if (skillsToTeach.some((s) => s.skillId === skillObj.id)) {
      setErrorMessage(`${skillObj.name} is already in your teaching portfolio.`);
      return;
    }

    setSkillsToTeach([
      ...skillsToTeach,
      {
        skillId: skillObj.id,
        skillName: skillObj.name,
        domain: skillObj.domain,
        proficiency: teachProficiency,
        experienceNote: teachExperienceNote.trim() || 'Available for campus peer mentorship.',
        verified: false,
        sessionsHelped: 0,
        isAvailable: true
      }
    ]);
    setSelectedTeachSkillId('');
    setTeachExperienceNote('');
    setErrorMessage(null);
  };

  const handleRemoveTeachSkill = (skillId: string) => {
    setSkillsToTeach(skillsToTeach.filter((s) => s.skillId !== skillId));
  };

  const handleAddLearnSkill = () => {
    if (!selectedLearnSkillId) return;
    const skillObj = skills.find((s) => s.id === selectedLearnSkillId);
    if (!skillObj) return;

    if (skillsToLearn.some((s) => s.skillId === skillObj.id)) {
      setErrorMessage(`${skillObj.name} is already in your learning goals.`);
      return;
    }

    setSkillsToLearn([
      ...skillsToLearn,
      {
        skillId: skillObj.id,
        skillName: skillObj.name,
        domain: skillObj.domain,
        currentLevel: learnCurrentLevel,
        targetLevel: learnTargetLevel,
        priority: learnPriority
      }
    ]);
    setSelectedLearnSkillId('');
    setErrorMessage(null);
  };

  const handleRemoveLearnSkill = (skillId: string) => {
    setSkillsToLearn(skillsToLearn.filter((s) => s.skillId !== skillId));
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
            <span>
              Step {step} of 4:{' '}
              {step === 1
                ? 'Academic Information'
                : step === 2
                ? 'Career Goals & Preferences'
                : step === 3
                ? 'Skills You Can Teach'
                : 'Skills You Want to Learn'}
            </span>
            <span className="text-amber-600 font-extrabold">{step * 25}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-[#0F2942] rounded-full transition-all duration-300"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Academic Profile */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Academic & Identity Profile</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                All fields marked with an asterisk (<span className="text-rose-500 font-bold">*</span>) are compulsory.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tushar Goel"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  IMT Hyderabad Roll ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 25A3HP658"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium font-mono uppercase focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Institutional Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. tushar.goel@imthyderabad.edu.in"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Account Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 4 characters"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cumulative CGPA (out of 10.0) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="e.g. 8.45"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-amber-500 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Academic Program <span className="text-rose-500">*</span>
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                >
                  <option value="PGDM (General)">PGDM (General)</option>
                  <option value="PGDM (Analytics)">PGDM (Analytics)</option>
                  <option value="PGDM (Finance)">PGDM (Finance)</option>
                  <option value="PGDM (Marketing)">PGDM (Marketing)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Specialization Track <span className="text-rose-500">*</span>
                </label>
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                >
                  <option value="Data Analytics & IT">Data Analytics & IT</option>
                  <option value="Finance & Valuation">Finance & Valuation</option>
                  <option value="Consulting & Strategy">Consulting & Strategy</option>
                  <option value="Product & Marketing">Product & Marketing</option>
                  <option value="Operations & SCM">Operations & SCM</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Batch / Academic Year <span className="text-rose-500">*</span>
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                >
                  <option value="Year 1 (2026 - 2028)">Year 1 (2026 - 2028)</option>
                  <option value="Year 2 (2025-2027)">Year 2 (2025-2027)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-xl shadow-md flex items-center gap-1.5 text-xs transition-all cursor-pointer"
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
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Career Preferences & Goals</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tell us about your campus placement ambitions and target industry domains.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Domain <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={targetDomain}
                    onChange={(e) => setTargetDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  >
                    <option value="Data Analytics & IT">Data Analytics & IT</option>
                    <option value="Finance & Valuation">Finance & Investment Banking</option>
                    <option value="Consulting & Strategy">Consulting & Corporate Strategy</option>
                    <option value="Product & Marketing">Product & Marketing</option>
                    <option value="Operations & SCM">Operations & Supply Chain</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Campus Role <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Business Analyst / Financial Analyst"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Career Goal / Target Companies <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="e.g. Prepare for technical & case rounds at Deloitte, Amazon, and EY."
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Availability for Peer Mentoring <span className="text-rose-500">*</span>
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                >
                  <option value="Weekday Evenings (7 PM - 10 PM)">Weekday Evenings (7 PM - 10 PM)</option>
                  <option value="Late Evenings (8:30 PM - 10:30 PM)">Late Evenings (8:30 PM - 10:30 PM)</option>
                  <option value="Weekend Mornings (10 AM - 1 PM)">Weekend Mornings (10 AM - 1 PM)</option>
                  <option value="Weekend Afternoons (3 PM - 6 PM)">Weekend Afternoons (3 PM - 6 PM)</option>
                  <option value="Flexible Schedule">Flexible Schedule</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  About Me / Experience Summary <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Introduce your academic background, past internships, and topics you are enthusiastic about..."
                  required
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white resize-none"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold text-xs cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-xl shadow-md flex items-center gap-1.5 text-xs transition-all cursor-pointer"
              >
                <span>Continue to Teaching Skills</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Skills to Teach */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Skills You Can Teach</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Add skills in which you are comfortable mentoring peers on campus (<span className="text-rose-500 font-bold">at least 1 required</span>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Skill
                  </label>
                  <select
                    value={selectedTeachSkillId}
                    onChange={(e) => setSelectedTeachSkillId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="">-- Choose skill from repository --</option>
                    {skills.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.domain})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Proficiency Level
                  </label>
                  <select
                    value={teachProficiency}
                    onChange={(e) => setTeachProficiency(e.target.value as ProficiencyLevel)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Experience Note / Proof
                </label>
                <input
                  type="text"
                  value={teachExperienceNote}
                  onChange={(e) => setTeachExperienceNote(e.target.value)}
                  placeholder="e.g. Cleared technical rounds, completed live project, or scored A in course."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs"
                />
              </div>

              <button
                type="button"
                onClick={handleAddTeachSkill}
                disabled={!selectedTeachSkillId}
                className="px-4 py-2 bg-[#0F2942] hover:bg-slate-900 disabled:opacity-40 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Teaching Portfolio</span>
              </button>
            </div>

            {/* Teaching Skills List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Your Teaching Portfolio ({skillsToTeach.length})
              </span>
              {skillsToTeach.map((s) => (
                <div
                  key={s.skillId}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-xs shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{s.skillName}</span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-bold">
                        {s.proficiency}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">{s.experienceNote}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTeachSkill(s.skillId)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove skill"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {skillsToTeach.length === 0 && (
                <div className="p-4 rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                  No teaching skills added yet. Select a skill above and click &quot;Add to Teaching Portfolio&quot;.
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold text-xs cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep3()) setStep(4);
                }}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-xl shadow-md flex items-center gap-1.5 text-xs transition-all cursor-pointer"
              >
                <span>Continue to Learning Goals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Skills to Learn */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Skills You Want to Learn</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Select skills you need to prepare for campus placements (<span className="text-rose-500 font-bold">at least 1 required</span>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Skill
                  </label>
                  <select
                    value={selectedLearnSkillId}
                    onChange={(e) => setSelectedLearnSkillId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="">-- Choose skill --</option>
                    {skills.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.domain})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Current Level
                  </label>
                  <select
                    value={learnCurrentLevel}
                    onChange={(e) => setLearnCurrentLevel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="None">None (Beginner)</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Goal Level
                  </label>
                  <select
                    value={learnTargetLevel}
                    onChange={(e) => setLearnTargetLevel(e.target.value as ProficiencyLevel)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced (Interview Ready)</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddLearnSkill}
                disabled={!selectedLearnSkillId}
                className="px-4 py-2 bg-[#0F2942] hover:bg-slate-900 disabled:opacity-40 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Learning Goals</span>
              </button>
            </div>

            {/* Learning Goals List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Your Learning Goals ({skillsToLearn.length})
              </span>
              {skillsToLearn.map((s) => (
                <div
                  key={s.skillId}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-xs shadow-2xs"
                >
                  <div>
                    <span className="font-bold text-slate-900">{s.skillName}</span>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>Current: {s.currentLevel}</span>
                      <span>➔</span>
                      <span className="font-semibold text-blue-900">Target: {s.targetLevel}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        {s.priority} Priority
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLearnSkill(s.skillId)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove goal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {skillsToLearn.length === 0 && (
                <div className="p-4 rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                  No learning goals added yet. Select a skill above and click &quot;Add to Learning Goals&quot;.
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold text-xs cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black rounded-xl shadow-md text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isSubmitting ? 'Creating your profile...' : 'Complete Profile & Enter Platform'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
