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
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 max-w-6xl mx-auto">
      <WelcomeBanner currentUser={currentUser} />
      <StatCards currentUser={currentUser} requests={requests} />
      <IncomingRequestsBanner />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <SkillGapCard currentUser={currentUser} skills={skills} students={students} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          {/* Note: Omit UpcomingDrives because it needs companies which isn't directly in AppContext right now */}
          <RecommendedMentors currentUser={currentUser} students={students} />
        </div>
      </div>
    </div>
  );
};
