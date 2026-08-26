import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IMT SkillConnect — Student Skill-Exchange Platform for Internships & Placements',
  description: 'Connect with IMT peers to bridge skill gaps, practice case studies, and prepare for top tier campus placement drives.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#F8FAFC]">
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-slate-900 antialiased selection:bg-[#8B1E2D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
