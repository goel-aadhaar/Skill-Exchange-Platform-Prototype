'use client';

import React from 'react';
import { Student, MentoringRequest } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  BookMarked,
  GraduationCap,
  ArrowLeftRight,
  Sparkles,
  Star,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface StatCardsProps {
  currentUser: Student;
  requests: MentoringRequest[];
}

export const StatCards: React.FC<StatCardsProps> = ({ currentUser, requests }) => {
  const { setActiveTab } = useApp();

  const skillsToTeachCount = currentUser.skillsToTeach.length;
  const verifiedSkillsCount = currentUser.skillsToTeach.filter((s) => s.verified).length;
  const skillsToLearnCount = currentUser.skillsToLearn.length;
  const highPriorityLearnCount = currentUser.skillsToLearn.filter((s) => s.priority === 'High').length;

  const activeRequestsCount = requests.filter(
    (r) =>
      (r.mentorId === currentUser.id || r.requesterId === currentUser.id) &&
      (r.status === 'Pending' || r.status === 'Accepted' || r.status === 'Active')
  ).length;

  const completedSessionsCount = currentUser.sessionsCompleted;

  const cards = [
    {
      title: 'Skills I Can Teach',
      value: skillsToTeachCount,
      subtext: `${verifiedSkillsCount} verified by placement cell`,
      icon: BookMarked,
      iconColor: 'text-[#8B1E2D]',
      bgColor: 'bg-rose-50/50',
      borderColor: 'border-rose-100',
      tab: 'my_skills' as const
    },
    {
      title: 'Skills I Need to Learn',
      value: skillsToLearnCount,
      subtext: `${highPriorityLearnCount} marked high priority`,
      icon: GraduationCap,
      iconColor: 'text-amber-700',
      bgColor: 'bg-amber-50/50',
      borderColor: 'border-amber-100',
      tab: 'my_skills' as const
    },
    {
      title: 'Active Mentoring Requests',
      value: activeRequestsCount,
      subtext: 'Incoming & outgoing bookings',
      icon: ArrowLeftRight,
      iconColor: 'text-sky-700',
      bgColor: 'bg-sky-50/50',
      borderColor: 'border-sky-100',
      tab: 'my_requests' as const
    },
    {
      title: 'Completed Sessions',
      value: completedSessionsCount,
      subtext: 'Peer interactions on campus',
      icon: Sparkles,
      iconColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50/50',
      borderColor: 'border-emerald-100',
      tab: 'my_requests' as const
    },
    {
      title: 'My Peer Rating',
      value: `${currentUser.rating.toFixed(1)} ★`,
      subtext: `Based on ${currentUser.ratingsCount} peer reviews`,
      icon: Star,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50/30',
      borderColor: 'border-amber-200/60',
      tab: 'profile' as const
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(card.tab)}
            className={`p-4 rounded-xl border ${card.borderColor} ${card.bgColor} bg-white shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all text-left flex flex-col justify-between group`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider line-clamp-1">
                {card.title}
              </span>
              <Icon className={`w-4 h-4 ${card.iconColor} shrink-0`} />
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {card.value}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1 line-clamp-1">
                {card.subtext}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
