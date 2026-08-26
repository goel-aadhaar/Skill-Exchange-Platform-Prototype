import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IMT Skill Exchange — Student Skill-Exchange Platform | IMT Hyderabad',
  description: 'Connect with IMT Hyderabad peers to bridge summer internship & placement skill gaps, practice case studies, and prepare for top tier campus drives.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#F8FAFC]">
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
