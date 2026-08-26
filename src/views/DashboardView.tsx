'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, BookOpen, AlertCircle, TrendingUp } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const DashboardView: React.FC = () => {
  const { currentUser, skills, students, setActiveTab, setSelectedSkillForMentorSearch } = useApp();

  // Find priority skill gaps based on learning goals
  const learningGoals = currentUser.skillsToLearn.map(sl => {
    // Find how many opportunities require this skill
    const skillMaster = skills.find(s => s.name.toLowerCase() === sl.skillName.toLowerCase());
    const demandCount = skillMaster?.associatedCompanies?.length || 0;
    
    return {
      ...sl,
      demandCount,
      master: skillMaster
    };
  }).sort((a, b) => b.demandCount - a.demandCount);

  const topGoal = learningGoals.length > 0 ? learningGoals[0] : null;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200 max-w-5xl">
      {/* 1. Header */}
      <div className="border-b border-slate-200 pb-6 pt-2">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Good morning, {currentUser.name.split(' ')[0]}
          </h1>
          <span className="text-[10px] font-bold text-[#0B192C] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wider">
            IMT Hyderabad
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Prepare for your next placement opportunity. You have {currentUser.skillsToLearn.length} skill gaps identified.
        </p>
      </div>

      {/* 2. Primary Action / Continue Preparation */}
      {topGoal && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Continue Your Preparation</h2>
          <div className="bg-white border border-slate-200 rounded p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-slate-900">{topGoal.skillName}</h3>
                {topGoal.demandCount > 0 && (
                  <span className="text-[10px] font-bold text-slate-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider">
                    High Demand
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600">
                You need this skill for {topGoal.demandCount || 'several'} relevant placement roles.
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs">
                <span className="text-slate-500">Your level: <strong className="text-slate-800">{topGoal.currentLevel}</strong></span>
                <span className="text-slate-500">Recommended: <strong className="text-slate-800">{topGoal.targetLevel}</strong></span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setSelectedSkillForMentorSearch(topGoal.skillName);
                setActiveTab('find_mentor');
              }}
              className="px-5 py-2.5 bg-[#0B192C] text-white text-sm font-bold rounded hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>Find someone who can teach this</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* 3. Skill Gap List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Skills You Should Work On</h2>
          <button 
            onClick={() => setActiveTab('my_skills')}
            className="text-xs font-bold text-[#0B192C] hover:underline"
          >
            Manage Skills →
          </button>
        </div>
        
        <div className="bg-white border border-slate-200 rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3 font-semibold">Skill</th>
                <th className="px-4 py-3 font-semibold hidden md:table-cell">Market Context</th>
                <th className="px-4 py-3 font-semibold">Your Status</th>
                <th className="px-4 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {learningGoals.map(sl => (
                <tr key={sl.skillId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 align-middle">
                    <div className="font-bold text-slate-900">{sl.skillName}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{sl.domain}</div>
                  </td>
                  <td className="px-4 py-4 align-middle hidden md:table-cell text-slate-600">
                    {sl.demandCount > 0 ? `Required by ${sl.demandCount} opportunities` : 'Recommended for your domain'}
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                      {sl.currentLevel === 'None' ? 'Not added' : sl.currentLevel}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle text-right">
                    <button 
                      onClick={() => {
                        setSelectedSkillForMentorSearch(sl.skillName);
                        setActiveTab('find_mentor');
                      }}
                      className="text-xs font-bold text-[#0B192C] hover:text-blue-700 hover:underline flex items-center justify-end gap-1 w-full"
                    >
                      <span>Find a peer</span>
                    </button>
                  </td>
                </tr>
              ))}
              
              {learningGoals.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500 text-sm">
                    No learning goals set. Start by exploring placement opportunities to identify skill gaps.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* 4. Secondary Action */}
      <div className="pt-4">
        <button 
          onClick={() => setActiveTab('placements')}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors"
        >
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Explore placement & internship directories to find more required skills</span>
          <ArrowRight className="w-3.5 h-3.5 opacity-50" />
        </button>
      </div>
    </div>
  );
};
