import React from 'react';
import { Student } from '../../types';
import { Badge } from '../common/Badge';
import { StarRating } from '../common/StarRating';
import { Clock, ArrowRight } from 'lucide-react';

interface MentorCardProps {
  mentor: Student;
  onViewProfile: (mentor: Student) => void;
  onRequestMentor: (mentor: Student, skillName?: string) => void;
  highlightSkill?: string | null;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  onViewProfile,
  onRequestMentor,
  highlightSkill
}) => {
  const highlightSkillObj = highlightSkill
    ? mentor.skillsToTeach.find(s => s.skillName.toLowerCase().includes(highlightSkill.toLowerCase()))
    : mentor.skillsToTeach[0];
    
  const primarySkill = highlightSkillObj || mentor.skillsToTeach[0];

  return (
    <div className="bg-white border-b border-slate-200 py-5 last:border-b-0 hover:bg-slate-50 transition-colors">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-sm font-bold text-slate-900">
              {mentor.name}
            </h3>
            <span className="text-[11px] text-slate-500">• {mentor.program}</span>
          </div>
          
          {primarySkill && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mb-2">
              <span className="font-semibold text-slate-800">{primarySkill.skillName}</span>
              <span>{primarySkill.domain}</span>
              <span className="text-slate-400">•</span>
              <span>{primarySkill.proficiency}</span>
              
              {primarySkill.verified && (
                <>
                  <span className="text-slate-400">•</span>
                  <span className="flex items-center text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded-sm border border-emerald-200 uppercase tracking-wider">
                    Verified
                  </span>
                </>
              )}
            </div>
          )}

          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1 font-medium text-amber-500">
              {mentor.rating} ★
            </span>
            <span className="text-slate-300">|</span>
            <span>{mentor.sessionsCompleted} sessions</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {mentor.availability}
            </span>
          </div>

          <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1">
            <span className="font-semibold text-slate-700">Can teach:</span>
            {mentor.skillsToTeach.map((s, i) => (
              <span key={s.skillId}>
                {s.skillName}{i < mentor.skillsToTeach.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:items-end justify-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onRequestMentor(mentor, primarySkill?.skillName)}
            className="text-xs font-bold text-white bg-[#0B192C] hover:bg-blue-900 px-4 py-2 rounded flex items-center justify-center gap-1 transition-colors w-full sm:w-auto"
          >
            <span>Request Mentoring</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => onViewProfile(mentor)}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded transition-colors w-full sm:w-auto text-center"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};
