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
  const { register, skills } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState('Devendra Joshi');
  const [studentId, setStudentId] = useState('IMT2024PGDM235');
  const [email, setEmail] = useState('devendra.joshi@imt.edu');
  const [password, setPassword] = useState('imt2024');
  const [program, setProgram] = useState('PGDM (Analytics)');
  const [specialization, setSpecialization] = useState('Data Science & BI');
  const [academicYear, setAcademicYear] = useState('Year 1 (Batch 2024–2026)');
  const [graduationYear, setGraduationYear] = useState(2026);

  // Step 2 Fields
  const [targetDomain, setTargetDomain] = useState('Data Analytics');
  const [targetRole, setTargetRole] = useState('Data Analyst / BI Consultant');
  const [careerGoal, setCareerGoal] = useState('Crack Tier-1 Analytics and Consulting placement drives.');
  const [bio, setBio] = useState(
    'Passionate about data visualization and SQL querying. Looking to connect with peers for technical interview practice.'
  );
  const [availability, setAvailability] = useState('Weekday Evenings (7 PM - 9:30 PM)');

  // Step 3: Skills to Teach
  const [skillsToTeach, setSkillsToTeach] = useState<SkillToTeach[]>([
    {
      skillId: 'skill-python-data',
      skillName: 'Python for Data Analysis',
      domain: 'Data Analytics',
      proficiency: 'Intermediate',
      experienceNote: 'Completed Python certification; Pandas & NumPy project work.',
      verified: false,
      sessionsHelped: 0,
      isAvailable: true
    }
  ]);

  // Step 4: Skills to Learn
  const [skillsToLearn, setSkillsToLearn] = useState<SkillToLearn[]>([
    {
      skillId: 'skill-sql',
      skillName: 'SQL & Database Querying',
      domain: 'Data Analytics',
      currentLevel: 'Beginner',
      targetLevel: 'Advanced',
      priority: 'High'
    },
    {
      skillId: 'skill-powerbi',
      skillName: 'Power BI & DAX',
      domain: 'Data Analytics',
      currentLevel: 'None',
      targetLevel: 'Intermediate',
      priority: 'High'
    }
  ]);

  // Search helpers
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

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      register({
        name,
        studentId,
        email,
        program,
        specialization,
        academicYear,
        graduationYear,
        targetDomain,
        targetRole,
        careerGoal,
        bio,
        availability,
        skillsToTeach,
        skillsToLearn
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <ImtLogo variant="compact" />
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium">
              Step {step} of 4:
            </span>
            <div className="text-xs font-bold text-slate-900">
              {step === 1 && 'Academic & Login Information'}
              {step === 2 && 'Placement & Career Aspirations'}
              {step === 3 && 'Skills I Can Teach'}
              {step === 4 && 'Skills I Want to Learn'}
            </div>
          </div>
        </div>

        {/* Stepper indicators */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-colors ${
                s <= step ? 'bg-[#8B1E2D]' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleFinalSubmit} className="space-y-6">
          {/* STEP 1: Academic & Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h2 className="text-base font-bold text-slate-900">
                1. Basic Academic Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student Roll ID *
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                    placeholder="IMT2024PGDM..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Institute Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your.name@imt.edu"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic Program *
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  >
                    <option value="PGDM">PGDM (General Management)</option>
                    <option value="PGDM (Analytics)">PGDM (Analytics)</option>
                    <option value="PGDM (Finance)">PGDM (Finance)</option>
                    <option value="PGDM (Marketing)">PGDM (Marketing)</option>
                    <option value="PGDM (HR)">PGDM (Human Resources)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="e.g. Business Analytics / Valuation"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Career Goals & Target Roles */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h2 className="text-base font-bold text-slate-900">
                2. Career Direction & Placement Goals
              </h2>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Preferred Career Domain *
                    </label>
                    <select
                      value={targetDomain}
                      onChange={(e) => setTargetDomain(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                    >
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Finance">Finance</option>
                      <option value="Product Management">Product Management</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Technology">Technology</option>
                      <option value="Operations">Operations & Supply Chain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Target Role / Aspiration *
                    </label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g. Business Analyst at Deloitte"
                      required
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Short Bio for Peer Mentors
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Weekly Mentoring / Learning Availability
                  </label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="e.g. Weekdays (7 PM - 10 PM) & Weekend Afternoons"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Skills I Can Teach */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  3. Skills I Can Teach to Peers
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Specify skills you have prior work experience or coursework in that you are open to mentoring others on.
                </p>
              </div>

              {/* Skill quick selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Add a Skill You Can Teach
                </label>
                <div className="flex gap-2">
                  <select
                    value={teachSearch}
                    onChange={(e) => setTeachSearch(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  >
                    <option value="">-- Select a skill from platform catalog --</option>
                    {skills.map((sk) => (
                      <option key={sk.id} value={sk.id}>
                        {sk.name} ({sk.domain})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      const found = skills.find((s) => s.id === teachSearch);
                      if (found) addTeachSkill(found);
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* Selected teaching skills */}
              <div className="space-y-2 pt-2">
                {skillsToTeach.map((st) => (
                  <div
                    key={st.skillId}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{st.skillName}</div>
                      <div className="text-[11px] text-slate-500">
                        {st.domain} • Proficiency: {st.proficiency}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeTeachSkill(st.skillId)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Skills I Want to Learn */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  4. Skills I Want to Learn
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  The system will automatically match you with top-rated peer mentors on campus for these topics.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Add a Skill to Your Learning Goals
                </label>
                <div className="flex gap-2">
                  <select
                    value={learnSearch}
                    onChange={(e) => setLearnSearch(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  >
                    <option value="">-- Select a skill to learn --</option>
                    {skills.map((sk) => (
                      <option key={sk.id} value={sk.id}>
                        {sk.name} ({sk.domain})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      const found = skills.find((s) => s.id === learnSearch);
                      if (found) addLearnSkill(found);
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* Selected learning skills */}
              <div className="space-y-2 pt-2">
                {skillsToLearn.map((sl) => (
                  <div
                    key={sl.skillId}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{sl.skillName}</div>
                      <div className="text-[11px] text-slate-500">
                        {sl.domain} • Target: {sl.targetLevel} • Priority: {sl.priority}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeLearnSkill(sl.skillId)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Step
              </button>
            ) : (
              <button
                type="button"
                onClick={onGoToLogin}
                className="text-xs font-bold text-slate-600 hover:underline"
              >
                ← Back to Login
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 ml-auto"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center gap-2 ml-auto disabled:opacity-50"
              >
                {isSubmitting ? 'Creating Profile...' : 'Complete Registration & Open Dashboard'}
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
