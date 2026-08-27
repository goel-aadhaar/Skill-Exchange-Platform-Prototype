import React from 'react';
import { Student } from '../../types';
import { Badge } from '../common/Badge';
import { StarRating } from '../common/StarRating';
import { Clock, ArrowRight, Bookmark } from 'lucide-react';

interface MentorCardProps {
  mentor: Student;
  onViewProfile: (mentor: Student) => void;
  onRequestMentor: (mentor: Student, skillName?: string) => void;
  highlightSkill?: string | null;
  isSaved?: boolean;
  onToggleSave?: (mentor: Student) => void;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  onViewProfile,
  onRequestMentor,
  highlightSkill,
  isSaved,
  onToggleSave
}) => {
  const highlightSkillObj = highlightSkill
    ? mentor.skillsToTeach.find(s => s.skillName.toLowerCase().includes(highlightSkill.toLowerCase()))
    : mentor.skillsToTeach[0];
    
  const primarySkill = highlightSkillObj || mentor.skillsToTeach[0];

  return (
    <div className="bg-white border-b border-slate-200 py-5 last:border-b-0 hover:bg-slate-50 transition-colors">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-start md:items-center">
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

        <div className="flex flex-row flex-wrap items-center justify-start sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
          {onToggleSave && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(mentor);
              }}
              className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
              title={isSaved ? "Remove from saved mentors" : "Save mentor"}
            >
              <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
            </button>
          )}
          <button
            type="button"
            onClick={() => onViewProfile(mentor)}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded transition-colors"
          >
            View Profile
          </button>
          <button
            type="button"
            onClick={() => primarySkill?.isAvailable !== false && onRequestMentor(mentor, primarySkill?.skillName)}
            disabled={primarySkill?.isAvailable === false}
            className={`text-xs font-bold text-white px-4 py-2 rounded flex items-center gap-1 transition-colors ${primarySkill?.isAvailable === false ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#0B192C] hover:bg-blue-900'}`}
          >
            <span>{primarySkill?.isAvailable === false ? 'Currently Unavailable' : 'Request Mentoring'}</span>
            {primarySkill?.isAvailable !== false && <ArrowRight className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
};
