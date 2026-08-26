import React from 'react';
import { Student } from '../../types';
import { Badge } from '../common/Badge';
import { StarRating } from '../common/StarRating';
import { UserCheck, Sparkles, Clock, Calendar } from 'lucide-react';

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
  const topTeachingSkills = mentor.skillsToTeach.slice(0, 3);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all p-5 flex flex-col justify-between group">
      <div>
        {/* Header: Avatar, Name, Verified Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              {mentor.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {mentor.name}
                </h3>
                {mentor.isVerified && (
                  <Badge variant="verified" size="xs">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {mentor.program} • {mentor.academicYear.split(' ')[0]}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="text-right shrink-0">
            <StarRating rating={mentor.rating} size="xs" ratingsCount={mentor.ratingsCount} />
            <div className="text-[10px] text-slate-500 mt-0.5">
              {mentor.sessionsCompleted} sessions helped
            </div>
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3.5">
          {mentor.bio}
        </p>

        {/* Skills I Can Teach */}
        <div className="space-y-1.5 mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Skills They Teach
          </div>
          <div className="flex flex-wrap gap-1.5">
            {topTeachingSkills.map((st) => {
              const isMatch = highlightSkill && st.skillName.toLowerCase().includes(highlightSkill.toLowerCase());
              return (
                <span
                  key={st.skillId}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                    isMatch
                      ? 'bg-amber-100/80 text-amber-900 border-amber-300 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80'
                  }`}
                >
                  <span>{st.skillName}</span>
                  <span className="text-[9px] text-slate-400 font-normal">
                    ({st.proficiency})
                  </span>
                  {st.verified && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Verified Skill" />
                  )}
                </span>
              );
            })}
            {mentor.skillsToTeach.length > 3 && (
              <span className="text-[10px] text-slate-500 self-center px-1">
                +{mentor.skillsToTeach.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg mb-4">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{mentor.availability}</span>
        </div>
      </div>

      {/* Card Actions */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onViewProfile(mentor)}
          className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
        >
          View Profile
        </button>
        <button
          type="button"
          onClick={() => onRequestMentor(mentor, highlightSkill || undefined)}
          className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg shadow-xs transition-colors text-center inline-flex items-center justify-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Request
        </button>
      </div>
    </div>
  );
};
