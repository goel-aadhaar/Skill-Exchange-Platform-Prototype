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
      (r.status.toUpperCase() === 'PENDING' || r.status.toUpperCase() === 'ACCEPTED' || r.status.toUpperCase() === 'ACTIVE')
  ).length;

  const completedSessionsCount = currentUser.sessionsCompleted;

  const cards = [
    {
      title: 'Teaching Portfolio',
      value: skillsToTeachCount,
      subtext: `${verifiedSkillsCount} verified by placement cell`,
      icon: BookMarked,
      iconColor: 'text-[#0B192C]',
      bgColor: 'bg-white',
      accentColor: 'border-l-4 border-l-[#0B192C]',
      tab: 'my_skills' as const
    },
    {
      title: 'Target Learning Goals',
      value: skillsToLearnCount,
      subtext: `${highPriorityLearnCount} high-priority placement skills`,
      icon: GraduationCap,
      iconColor: 'text-amber-600',
      bgColor: 'bg-white',
      accentColor: 'border-l-4 border-l-amber-500',
      tab: 'my_skills' as const
    },
    {
      title: 'Active Requests',
      value: activeRequestsCount,
      subtext: 'Incoming bookings & pending sessions',
      icon: ArrowLeftRight,
      iconColor: 'text-blue-700',
      bgColor: 'bg-white',
      accentColor: 'border-l-4 border-l-blue-600',
      tab: 'my_requests' as const
    },
    {
      title: 'Completed Sessions',
      value: completedSessionsCount,
      subtext: 'Peer interactions conducted',
      icon: Sparkles,
      iconColor: 'text-emerald-700',
      bgColor: 'bg-white',
      accentColor: 'border-l-4 border-l-emerald-500',
      tab: 'my_requests' as const
    },
    {
      title: 'Peer Quality Rating',
      value: `${currentUser.rating.toFixed(1)} ★`,
      subtext: `From ${currentUser.ratingsCount} verified reviews`,
      icon: Star,
      iconColor: 'text-amber-500',
      bgColor: 'bg-white',
      accentColor: 'border-l-4 border-l-amber-400',
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
            className={`p-4 rounded-2xl border border-slate-200/90 ${card.bgColor} ${card.accentColor} shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 text-left flex flex-col justify-between group cursor-pointer`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider line-clamp-1">
                  {card.title}
                </span>
                <Icon className={`w-4 h-4 ${card.iconColor} shrink-0`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-data">
                {card.value}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="line-clamp-1 font-medium">{card.subtext}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>
          </button>
        );
      })}
    </div>
  );
};
