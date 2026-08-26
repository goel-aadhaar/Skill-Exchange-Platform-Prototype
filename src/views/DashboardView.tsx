'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { StatCards } from '../components/dashboard/StatCards';
import { IncomingRequestsBanner } from '../components/dashboard/IncomingRequestsBanner';
import { SkillGapCard } from '../components/dashboard/SkillGapCard';
import { RecommendedMentors } from '../components/dashboard/RecommendedMentors';

export const DashboardView: React.FC = () => {
  const { currentUser, skills, students, requests } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. Live Incoming Requests Callout for Mentor Persona */}
      <IncomingRequestsBanner />

      {/* 2. Welcome & Placement Readiness Banner */}
      <WelcomeBanner currentUser={currentUser} />

      {/* 3. Platform Key Metric KPI Cards */}
      <StatCards currentUser={currentUser} requests={requests} />

      {/* 4. Core Intelligence: Skill Gap Analysis & Urgent Learning Recommendations */}
      <SkillGapCard
        currentUser={currentUser}
        skills={skills}
        students={students}
      />

      {/* 5. Recommended Peer Mentors for Learner */}
      <RecommendedMentors currentUser={currentUser} students={students} />
    </div>
  );
};
