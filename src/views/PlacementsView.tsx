'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { PlacementJob, InternshipOpportunity } from '../types';
import {
  Briefcase,
  Search,
  Building2,
  MapPin,
  DollarSign,
  GraduationCap,
  Calendar,
  CheckCircle2,
  XCircle,
  Users,
  Filter,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Award
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const PlacementsView: React.FC = () => {
  const { currentUser, setActiveTab, setSelectedSkillForMentorSearch } = useApp();

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
  const [selectedPlacementJob, setSelectedPlacementJob] = useState<PlacementJob | null>(null);
  const [selectedInternship, setSelectedInternship] = useState<InternshipOpportunity | null>(null);

  const [isLoadingData, setIsLoadingData] = useState(false);

  // Fetch Placements from DB
  const fetchPlacements = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const params = new URLSearchParams({
        page: placementPage.toString(),
        limit: '15',
        search: placementSearch,
        sector: selectedSector,
        domain: selectedDomain
      });
      const res = await fetch(`/api/placements?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPlacementJobs(data.jobs || []);
        setTotalPlacements(data.total || 0);
        setPlacementTotalPages(data.totalPages || 1);
        if (data.filters?.sectors) setSectorOptions(data.filters.sectors);
        if (data.filters?.domains) setDomainOptions(data.filters.domains);
      }
    } catch (err) {
      console.error('Error fetching placements:', err);
    } finally {
      setIsLoadingData(false);
    }
  }, [placementPage, placementSearch, selectedSector, selectedDomain]);

  // Fetch Internships from DB
  const fetchInternships = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const params = new URLSearchParams({
        page: internshipPage.toString(),
        limit: '15',
        search: internshipSearch
      });
      const res = await fetch(`/api/internships?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setInternships(data.internships || []);
        setTotalInternships(data.total || 0);
        setInternshipTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error('Error fetching internships:', err);
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

  // Skill Matching Helper
  const getSkillMatchBreakdown = (skillsText: string) => {
    if (!skillsText || skillsText === '-') {
      return { matched: [], missing: [], score: 50 };
    }

    const studentKnownSkillNames = currentUser.skillsToTeach.map((s) => s.skillName.toLowerCase());

    // Extract potential skill keywords from text
    const lowerText = skillsText.toLowerCase();
    const commonKeywords = [
      { name: 'Python for Data Analysis', matchTerm: 'python' },
      { name: 'SQL & Database Querying', matchTerm: 'sql' },
      { name: 'Power BI & DAX', matchTerm: 'power bi' },
      { name: 'Tableau Visual Analytics', matchTerm: 'tableau' },
      { name: 'Advanced Excel & VBA Macros', matchTerm: 'excel' },
      { name: 'Financial Modeling & 3-Statement Forecast', matchTerm: 'financial model' },
      { name: 'DCF & Relative Valuation', matchTerm: 'valuation' },
      { name: 'Case Study Frameworks', matchTerm: 'case' },
      { name: 'Guesstimates & Market Sizing', matchTerm: 'guesstimate' },
      { name: 'Product Strategy & Vision', matchTerm: 'product' },
      { name: 'PRD Writing & User Story Mapping', matchTerm: 'prd' },
      { name: 'UI/UX Wireframing in Figma', matchTerm: 'figma' },
      { name: 'Performance Marketing & Digital Analytics', matchTerm: 'marketing' },
      { name: 'Supply Chain Optimization', matchTerm: 'supply chain' },
      { name: 'Resume Building & ATS Optimization', matchTerm: 'resume' },
      { name: 'STAR Technique for Behavioral Rounds', matchTerm: 'communication' }
    ];

    const presentRequirements: string[] = [];
    commonKeywords.forEach((k) => {
      if (lowerText.includes(k.matchTerm)) {
        presentRequirements.push(k.name);
      }
    });

    if (presentRequirements.length === 0) {
      return { matched: ['General Management Aptitude'], missing: [], score: 75 };
    }

    const matched = presentRequirements.filter((req) =>
      studentKnownSkillNames.some((sk) => sk.includes(req.toLowerCase()) || req.toLowerCase().includes(sk))
    );
    const missing = presentRequirements.filter((req) => !matched.includes(req));
    const score = Math.round((matched.length / presentRequirements.length) * 100);

    return { matched, missing, score: Math.max(score, 20) };
  };

  const handleFindPeerMentorForSkill = (skillName: string) => {
    setSelectedSkillForMentorSearch(skillName);
    setActiveTab('find_mentor');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0F2942] text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold shadow-xs">
              <Briefcase className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Placements & Summer Internships Directory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse official IMT Hyderabad recruitment repository. Analyze your skill matches and bridge gaps with peer mentors.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveSubTab('placements')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'placements'
                ? 'bg-[#0F2942] text-amber-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Final Placements (226 JDs)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('internships')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'internships'
                ? 'bg-[#0F2942] text-amber-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Summer Internships (75 SIPs)</span>
          </button>
        </div>
      </div>

      {/* PLACEMENTS TAB VIEW */}
      {activeSubTab === 'placements' && (
        <div className="space-y-4">
          {/* Filters and Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search company name, role, or skills (e.g. Deloitte, SQL, Finance)..."
                value={placementSearch}
                onChange={(e) => {
                  setPlacementSearch(e.target.value);
                  setPlacementPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedSector}
                onChange={(e) => {
                  setSelectedSector(e.target.value);
                  setPlacementPage(1);
                }}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Sectors ({sectorOptions.length})</option>
                {sectorOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedDomain}
                onChange={(e) => {
                  setSelectedDomain(e.target.value);
                  setPlacementPage(1);
                }}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Domains ({domainOptions.length})</option>
                {domainOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Placement Results Table / Cards */}
          {isLoadingData ? (
            <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
              <div className="w-6 h-6 border-2 border-[#0F2942] border-t-amber-400 rounded-full animate-spin mx-auto mb-2" />
              Loading records from Neon PostgreSQL...
            </div>
          ) : placementJobs.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
              No placement records match your search criteria. Try clearing filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {placementJobs.map((job) => {
                const matchInfo = getSkillMatchBreakdown(job.skillsRequired);
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                            {job.domain || job.sector || 'Management'}
                          </span>
                          <h3 className="font-extrabold text-sm text-slate-900 mt-1 line-clamp-1">
                            {job.companyName}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-extrabold text-blue-900 block font-mono">
                            {job.ctcOffered}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-slate-700 line-clamp-1 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{job.role}</span>
                      </div>

                      <div className="text-[11px] text-slate-500 line-clamp-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{job.location || 'Pan India'}</span>
                      </div>

                      {/* Intelligent Skill Match Bar */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-700 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            Skill Match:
                          </span>
                          <span className="font-extrabold text-blue-900">{matchInfo.score}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-[#0F2942] rounded-full"
                            style={{ width: `${matchInfo.score}%` }}
                          />
                        </div>
                        {matchInfo.missing.length > 0 ? (
                          <div className="text-[10px] text-rose-700 flex items-center justify-between pt-0.5">
                            <span>Gap: {matchInfo.missing[0]}</span>
                            <button
                              type="button"
                              onClick={() => handleFindPeerMentorForSkill(matchInfo.missing[0])}
                              className="font-bold text-amber-800 hover:underline inline-flex items-center gap-0.5"
                            >
                              Find Mentor →
                            </button>
                          </div>
                        ) : (
                          <div className="text-[10px] text-emerald-700 font-medium">
                            ✓ Great alignment with your profile!
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPlacementJob(job)}
                      className="w-full py-2 px-3 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-amber-100 hover:text-amber-900 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Full JD & Eligibility</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-500">
              Showing {(placementPage - 1) * 15 + 1} to {Math.min(placementPage * 15, totalPlacements)} of {totalPlacements} records
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={placementPage <= 1}
                onClick={() => setPlacementPage((p) => Math.max(p - 1, 1))}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-slate-900">
                Page {placementPage} of {placementTotalPages}
              </span>
              <button
                type="button"
                disabled={placementPage >= placementTotalPages}
                onClick={() => setPlacementPage((p) => Math.min(p + 1, placementTotalPages))}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUMMER INTERNSHIPS TAB VIEW */}
      {activeSubTab === 'internships' && (
        <div className="space-y-4">
          {/* Internship Search Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search internship company, role, or skill requirements..."
                value={internshipSearch}
                onChange={(e) => {
                  setInternshipSearch(e.target.value);
                  setInternshipPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Internship Cards */}
          {isLoadingData ? (
            <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
              <div className="w-6 h-6 border-2 border-[#0F2942] border-t-amber-400 rounded-full animate-spin mx-auto mb-2" />
              Loading internship records from Neon PostgreSQL...
            </div>
          ) : internships.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
              No internship opportunities match your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {internships.map((sip) => {
                const matchInfo = getSkillMatchBreakdown(sip.skillsRequired);
                return (
                  <div
                    key={sip.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                            Summer Internship
                          </span>
                          <h3 className="font-extrabold text-sm text-slate-900 mt-1 line-clamp-1">
                            {sip.companyName}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-extrabold text-emerald-700 block font-mono">
                            {sip.stipend}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-slate-700 line-clamp-1 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{sip.role}</span>
                      </div>

                      <div className="text-[11px] text-slate-500 line-clamp-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{sip.locations || 'Hyderabad'}</span>
                      </div>

                      {/* Skill match */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-700">Skill Alignment:</span>
                          <span className="font-extrabold text-blue-900">{matchInfo.score}%</span>
                        </div>
                        {matchInfo.missing.length > 0 ? (
                          <div className="text-[10px] text-rose-700 flex items-center justify-between pt-0.5">
                            <span>Gap: {matchInfo.missing[0]}</span>
                            <button
                              type="button"
                              onClick={() => handleFindPeerMentorForSkill(matchInfo.missing[0])}
                              className="font-bold text-amber-800 hover:underline"
                            >
                              Bridge Gap →
                            </button>
                          </div>
                        ) : (
                          <div className="text-[10px] text-emerald-700 font-medium">
                            ✓ Ready for application
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedInternship(sip)}
                      className="w-full py-2 px-3 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-amber-100 hover:text-amber-900 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Full SIP Opportunity</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-500">
              Showing {(internshipPage - 1) * 15 + 1} to {Math.min(internshipPage * 15, totalInternships)} of {totalInternships} records
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={internshipPage <= 1}
                onClick={() => setInternshipPage((p) => Math.max(p - 1, 1))}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-slate-900">
                Page {internshipPage} of {internshipTotalPages}
              </span>
              <button
                type="button"
                disabled={internshipPage >= internshipTotalPages}
                onClick={() => setInternshipPage((p) => Math.min(p + 1, internshipTotalPages))}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PLACEMENT JOB DETAIL MODAL */}
      {selectedPlacementJob && (
        <Modal
          isOpen={!!selectedPlacementJob}
          onClose={() => setSelectedPlacementJob(null)}
          maxWidth="3xl"
          title={selectedPlacementJob.companyName}
          subtitle={`Placement JD #${selectedPlacementJob.srNo} • ${selectedPlacementJob.role}`}
        >
          <div className="space-y-5 text-xs">
            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">CTC Offered</span>
                <span className="font-bold text-blue-900 text-sm">{selectedPlacementJob.ctcOffered}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Fixed Pay</span>
                <span className="font-semibold text-slate-800">{selectedPlacementJob.fixedPay || '-'}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Domain / Sector</span>
                <span className="font-semibold text-slate-800">{selectedPlacementJob.domain || selectedPlacementJob.sector}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Location</span>
                <span className="font-semibold text-slate-800">{selectedPlacementJob.location || 'Pan India'}</span>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-900" />
                Eligibility & Academic Criteria
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-700">CGPA / Cutoff: </span>
                  <span className="text-slate-600">{selectedPlacementJob.cgpaCriteria || 'As per norms'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Experience: </span>
                  <span className="text-slate-600">{selectedPlacementJob.experienceRequirements || 'Fresher'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Preferred UG: </span>
                  <span className="text-slate-600">{selectedPlacementJob.undergraduatePreferredDegree || 'Any Graduate'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Major/Minor: </span>
                  <span className="text-slate-600">{selectedPlacementJob.majorMinorRequired || 'All specializations'}</span>
                </div>
              </div>
            </div>

            {/* Original Skill Requirements */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                Required Skills Set (Source JD)
              </h4>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedPlacementJob.skillsRequired || 'General analytical and problem-solving skills.'}
              </div>
            </div>

            {/* Student Skill Match & Peer Mentorship Bridge */}
            {(() => {
              const match = getSkillMatchBreakdown(selectedPlacementJob.skillsRequired);
              return (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Your Personalized Skill Gap Analysis ({currentUser.name})
                    </h4>
                    <span className="text-xs font-extrabold text-blue-900 bg-white px-2 py-0.5 rounded border border-blue-200">
                      {match.score}% Readiness Match
                    </span>
                  </div>

                  {match.missing.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-700 font-medium">
                        You have skill gaps for this opportunity. Find an IMT Hyderabad senior peer mentor to prepare:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {match.missing.map((sk) => (
                          <button
                            key={sk}
                            type="button"
                            onClick={() => {
                              setSelectedPlacementJob(null);
                              handleFindPeerMentorForSkill(sk);
                            }}
                            className="px-3 py-1.5 bg-[#0F2942] hover:bg-slate-900 text-amber-400 rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                          >
                            <Users className="w-3 h-3" />
                            <span>Find Mentor for {sk}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedPlacementJob(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* INTERNSHIP DETAIL MODAL */}
      {selectedInternship && (
        <Modal
          isOpen={!!selectedInternship}
          onClose={() => setSelectedInternship(null)}
          maxWidth="2xl"
          title={selectedInternship.companyName}
          subtitle={`Summer Internship • ${selectedInternship.role}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Stipend</span>
                <span className="font-bold text-emerald-700 text-sm">{selectedInternship.stipend}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Location</span>
                <span className="font-semibold text-slate-800">{selectedInternship.locations || 'Hyderabad'}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block">Skills Required:</span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                {selectedInternship.skillsRequired}
              </div>
            </div>

            {/* Gap Bridge */}
            {(() => {
              const match = getSkillMatchBreakdown(selectedInternship.skillsRequired);
              if (match.missing.length > 0) {
                return (
                  <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-300 space-y-2">
                    <span className="font-bold text-slate-900 block text-xs">
                      Need preparation in {match.missing[0]}?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedInternship(null);
                        handleFindPeerMentorForSkill(match.missing[0]);
                      }}
                      className="px-3 py-1.5 bg-[#0F2942] text-amber-400 rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <Users className="w-3 h-3" />
                      Find a peer who can teach {match.missing[0]} →
                    </button>
                  </div>
                );
              }
              return null;
            })()}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedInternship(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
