'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { StatCards } from '../components/dashboard/StatCards';
import { SkillGapCard } from '../components/dashboard/SkillGapCard';
import { RecommendedMentors } from '../components/dashboard/RecommendedMentors';
import { UpcomingDrives } from '../components/dashboard/UpcomingDrives';

export const DashboardView: React.FC = () => {
  const { currentUser, skills, companies, students, requests } = useApp();

  return (
    <div className="space-y-7 pb-12 animate-in fade-in duration-200">
      {/* 1. Welcome & Readiness Banner */}
      <WelcomeBanner currentUser={currentUser} />

      {/* 2. Platform Key Metric KPI Cards */}
      <StatCards currentUser={currentUser} requests={requests} />

      {/* 3. Core Intelligence: Skill Gap Analysis & Urgent Learning Recommendations */}
      <SkillGapCard
        currentUser={currentUser}
        skills={skills}
        companies={companies}
        students={students}
      />

      {/* 4. Recommended Peer Mentors for Learner */}
      <RecommendedMentors currentUser={currentUser} students={students} />

      {/* 5. Top Placement & Internship Drives with Match Indicators */}
      <UpcomingDrives companies={companies} currentUser={currentUser} />
    </div>
  );
};
