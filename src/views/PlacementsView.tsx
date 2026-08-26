'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { PlacementJob, InternshipOpportunity } from '../types';
import { Search, ChevronLeft, ChevronRight, X, Briefcase, Users, ArrowRight } from 'lucide-react';

export const PlacementsView: React.FC = () => {
  const { currentUser, setActiveTab, setSelectedSkillForMentorSearch, students } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'placements' | 'internships'>('placements');

  // Placements state
  const [placementJobs, setPlacementJobs] = useState<PlacementJob[]>([]);
  const [totalPlacements, setTotalPlacements] = useState(0);
  const [placementPage, setPlacementPage] = useState(1);
  const [placementTotalPages, setPlacementTotalPages] = useState(1);
  const [placementSearch, setPlacementSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [sectorOptions, setSectorOptions] = useState<string[]>([]);
  const [domainOptions, setDomainOptions] = useState<string[]>([]);

  // Internships state
  const [internships, setInternships] = useState<InternshipOpportunity[]>([]);
  const [totalInternships, setTotalInternships] = useState(0);
  const [internshipPage, setInternshipPage] = useState(1);
  const [internshipTotalPages, setInternshipTotalPages] = useState(1);
  const [internshipSearch, setInternshipSearch] = useState('');

  // Selected Detail Modal
  const [selectedJob, setSelectedJob] = useState<PlacementJob | InternshipOpportunity | null>(null);

  const [isLoadingData, setIsLoadingData] = useState(false);

  // Fetch Placements from DB
  const fetchPlacements = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const q = new URLSearchParams();
      q.set('page', placementPage.toString());
      q.set('limit', '15');
      if (placementSearch) q.set('search', placementSearch);
      if (selectedSector !== 'all') q.set('sector', selectedSector);
      if (selectedDomain !== 'all') q.set('domain', selectedDomain);

      const res = await fetch(`/api/placements?${q.toString()}`);
      const data = await res.json();
      if (data.placements) {
        setPlacementJobs(data.placements);
        setTotalPlacements(data.total);
        setPlacementTotalPages(data.totalPages);

        if (sectorOptions.length === 0 && data.sectors) {
          setSectorOptions(data.sectors);
        }
        if (domainOptions.length === 0 && data.domains) {
          setDomainOptions(data.domains);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingData(false);
    }
  }, [placementPage, placementSearch, selectedSector, selectedDomain]);

  // Fetch Internships from DB
  const fetchInternships = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const q = new URLSearchParams();
      q.set('page', internshipPage.toString());
      q.set('limit', '15');
      if (internshipSearch) q.set('search', internshipSearch);

      const res = await fetch(`/api/internships?${q.toString()}`);
      const data = await res.json();
      if (data.internships) {
        setInternships(data.internships);
        setTotalInternships(data.total);
        setInternshipTotalPages(data.totalPages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingData(false);
    }
  }, [internshipPage, internshipSearch]);

  useEffect(() => {
    if (activeSubTab === 'placements') {
      fetchPlacements();
    } else {
      fetchInternships();
    }
  }, [activeSubTab, fetchPlacements, fetchInternships]);

  // UI Helpers
  const parseSkills = (skillStr: string) => {
    if (!skillStr) return [];
    return skillStr.split(',').map(s => s.trim()).filter(Boolean);
  };

  const hasSkill = (skillName: string) => {
    const teach = currentUser.skillsToTeach.some(s => s.skillName.toLowerCase() === skillName.toLowerCase());
    const learnAndHasIt = currentUser.skillsToLearn.some(s => 
      s.skillName.toLowerCase() === skillName.toLowerCase() && 
      (s.currentLevel === 'Intermediate' || s.currentLevel === 'Advanced' || s.currentLevel === 'Expert')
    );
    return teach || learnAndHasIt;
  };

  const countMentorsForSkill = (skillName: string) => {
    return students.filter(st => 
      st.id !== currentUser.id && 
      st.role !== 'admin' &&
      st.skillsToTeach.some(s => s.skillName.toLowerCase() === skillName.toLowerCase())
    ).length;
  };

  // Rendering Row Detail Side Panel (or Modal)
  const renderDetailPanel = () => {
    if (!selectedJob) return null;
    
    const isPlacement = 'ctcOffered' in selectedJob;
    const reqSkillsStr = 'skillsRequired' in selectedJob ? (selectedJob as any).skillsRequired : '';
    const reqSkills = parseSkills(reqSkillsStr);
    
    const missingSkills = reqSkills.filter(s => !hasSkill(s));
    const location = 'locations' in selectedJob ? (selectedJob as any).locations : (selectedJob as any).location;
    
    return (
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Opportunity Details</h2>
            <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">{selectedJob.role}</h1>
              <h2 className="text-lg text-slate-600 font-medium">{selectedJob.companyName}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <div className="text-slate-500 font-medium mb-0.5">Location</div>
                <div className="font-semibold text-slate-900">{location || 'Not specified'}</div>
              </div>
              {isPlacement && (
                <div>
                  <div className="text-slate-500 font-medium mb-0.5">Domain</div>
                  <div className="font-semibold text-slate-900">{(selectedJob as PlacementJob).domain}</div>
                </div>
              )}
              {isPlacement ? (
                <div>
                  <div className="text-slate-500 font-medium mb-0.5">CTC</div>
                  <div className="font-semibold text-slate-900">{(selectedJob as PlacementJob).ctcOffered || 'Not specified'}</div>
                </div>
              ) : (
                <div>
                  <div className="text-slate-500 font-medium mb-0.5">Stipend</div>
                  <div className="font-semibold text-slate-900">{(selectedJob as InternshipOpportunity).stipend || 'Not specified'}</div>
                </div>
              )}
            </div>
            
            <hr className="border-slate-100" />
            
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Required Skills</h3>
              <div className="space-y-2 text-sm">
                {reqSkills.length > 0 ? reqSkills.map(s => {
                  const userHas = hasSkill(s);
                  return (
                    <div key={s} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                      <span className="font-medium text-slate-700">{s}</span>
                      {userHas ? (
                        <span className="text-emerald-600 font-bold">✓</span>
                      ) : (
                        <span className="text-rose-600 font-bold">✕</span>
                      )}
                    </div>
                  );
                }) : (
                  <div className="text-slate-500 italic">No specific skills listed.</div>
                )}
              </div>
            </div>
            
            {missingSkills.length > 0 && (
              <div className="bg-rose-50 border border-rose-100 rounded p-4">
                <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2">Your Skill Gap</h3>
                <p className="text-sm text-rose-800 mb-4">
                  You are missing: <strong>{missingSkills.join(', ')}</strong>
                </p>
                
                <div className="space-y-2">
                  {missingSkills.map(s => {
                    const mentorsCount = countMentorsForSkill(s);
                    if (mentorsCount > 0) {
                      return (
                        <div key={s} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-white rounded border border-rose-100 text-sm">
                          <span className="text-slate-700 font-medium">{mentorsCount} peers can teach {s}</span>
                          <button
                            onClick={() => {
                              setSelectedJob(null);
                              setSelectedSkillForMentorSearch(s);
                              setActiveTab('find_mentor');
                            }}
                            className="text-xs font-bold text-white bg-[#0B192C] hover:bg-blue-900 px-3 py-1.5 rounded transition-colors whitespace-nowrap"
                          >
                            Find a peer
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
            
            {missingSkills.length === 0 && reqSkills.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-100 rounded p-4 flex items-start gap-3">
                <div className="text-emerald-700 font-medium text-sm">
                  You have the required skills for this role! 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150 max-w-6xl">
      <div className="border-b border-slate-200 pb-6 pt-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Placements & Internships
        </h1>
        <p className="text-sm text-slate-600">
          Browse actual historical placement data and identify the skills you need to succeed.
        </p>
      </div>

      <div className="flex bg-slate-50 border border-slate-200 rounded p-1 w-full sm:w-auto mb-6">
        <button
          onClick={() => { setActiveSubTab('placements'); setPlacementPage(1); }}
          className={`flex-1 sm:flex-none px-6 py-2 text-sm font-bold rounded transition-colors ${
            activeSubTab === 'placements' ? 'bg-white shadow-xs text-slate-900 border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Placements ({totalPlacements || '...'})
        </button>
        <button
          onClick={() => { setActiveSubTab('internships'); setInternshipPage(1); }}
          className={`flex-1 sm:flex-none px-6 py-2 text-sm font-bold rounded transition-colors ${
            activeSubTab === 'internships' ? 'bg-white shadow-xs text-slate-900 border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Internships ({totalInternships || '...'})
        </button>
      </div>

      {activeSubTab === 'placements' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative col-span-1 md:col-span-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={placementSearch}
                onChange={(e) => { setPlacementSearch(e.target.value); setPlacementPage(1); }}
                placeholder="Search company, role, skill..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
              />
            </div>
            <div>
              <select
                value={selectedDomain}
                onChange={(e) => { setSelectedDomain(e.target.value); setPlacementPage(1); }}
                className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
              >
                <option value="all">All Domains</option>
                {domainOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <select
                value={selectedSector}
                onChange={(e) => { setSelectedSector(e.target.value); setPlacementPage(1); }}
                className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
              >
                <option value="all">All Sectors</option>
                {sectorOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold hidden sm:table-cell">Domain</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Location</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {isLoadingData && placementJobs.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">Loading directory...</td></tr>
                ) : placementJobs.map(job => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedJob(job)}>
                    <td className="px-4 py-3 align-middle font-medium text-slate-900">{job.companyName}</td>
                    <td className="px-4 py-3 align-middle">{job.role}</td>
                    <td className="px-4 py-3 align-middle hidden sm:table-cell text-slate-600">{job.domain}</td>
                    <td className="px-4 py-3 align-middle hidden md:table-cell text-slate-600">{job.location}</td>
                    <td className="px-4 py-3 align-middle text-right">
                      <span className="text-[#0B192C] font-bold text-xs hover:underline">View Details</span>
                    </td>
                  </tr>
                ))}
                {!isLoadingData && placementJobs.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No placements found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {placementTotalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <span className="text-xs text-slate-500">Page {placementPage} of {placementTotalPages}</span>
              <div className="flex gap-2">
                <button 
                  disabled={placementPage === 1}
                  onClick={() => setPlacementPage(p => Math.max(1, p - 1))}
                  className="px-3 py-1.5 border border-slate-200 rounded bg-white text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <button 
                  disabled={placementPage === placementTotalPages}
                  onClick={() => setPlacementPage(p => Math.min(placementTotalPages, p + 1))}
                  className="px-3 py-1.5 border border-slate-200 rounded bg-white text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'internships' && (
        <div className="space-y-4">
          <div className="relative md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={internshipSearch}
              onChange={(e) => { setInternshipSearch(e.target.value); setInternshipPage(1); }}
              placeholder="Search company, role..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Location</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {isLoadingData && internships.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-500">Loading directory...</td></tr>
                ) : internships.map(job => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedJob(job)}>
                    <td className="px-4 py-3 align-middle font-medium text-slate-900">{job.companyName}</td>
                    <td className="px-4 py-3 align-middle">{job.role}</td>
                    <td className="px-4 py-3 align-middle hidden md:table-cell text-slate-600">{(job as any).locations}</td>
                    <td className="px-4 py-3 align-middle text-right">
                      <span className="text-[#0B192C] font-bold text-xs hover:underline">View Details</span>
                    </td>
                  </tr>
                ))}
                {!isLoadingData && internships.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-500">No internships found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {internshipTotalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <span className="text-xs text-slate-500">Page {internshipPage} of {internshipTotalPages}</span>
              <div className="flex gap-2">
                <button 
                  disabled={internshipPage === 1}
                  onClick={() => setInternshipPage(p => Math.max(1, p - 1))}
                  className="px-3 py-1.5 border border-slate-200 rounded bg-white text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <button 
                  disabled={internshipPage === internshipTotalPages}
                  onClick={() => setInternshipPage(p => Math.min(internshipTotalPages, p + 1))}
                  className="px-3 py-1.5 border border-slate-200 rounded bg-white text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {renderDetailPanel()}
    </div>
  );
};
