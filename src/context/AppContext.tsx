'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  Skill,
  Company,
  DomainInfo,
  MentoringRequest,
  RatingReview,
  NotificationItem,
  SkillVerificationRequest,
  ActiveTab,
  SkillToTeach,
  SkillToLearn,
  ProficiencyLevel
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_SKILLS,
  INITIAL_COMPANIES,
  INITIAL_DOMAINS,
  INITIAL_REQUESTS,
  INITIAL_RATINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_VERIFICATIONS
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}

interface AppContextType {
  // Auth & Persona
  currentUser: Student;
  isLoggedIn: boolean;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  switchPersona: (studentId: string) => void;
  login: (emailOrId: string) => boolean;
  logout: () => void;
  register: (studentData: Partial<Student>) => Student;

  // Data Collections
  students: Student[];
  skills: Skill[];
  companies: Company[];
  domains: DomainInfo[];
  requests: MentoringRequest[];
  ratings: RatingReview[];
  notifications: NotificationItem[];
  verifications: SkillVerificationRequest[];

  // Modals & Navigation Helpers
  selectedSkillForMentorSearch: string | null;
  setSelectedSkillForMentorSearch: (skillName: string | null) => void;
  selectedMentorForModal: Student | null;
  setSelectedMentorForModal: (student: Student | null) => void;
  selectedCompanyForModal: Company | null;
  setSelectedCompanyForModal: (company: Company | null) => void;
  isRequestModalOpen: boolean;
  setIsRequestModalOpen: (open: boolean) => void;
  requestModalMentor: Student | null;
  requestModalPreselectedSkill: string | null;
  openRequestModal: (mentor: Student, preselectedSkill?: string) => void;
  closeRequestModal: () => void;

  // Actions
  sendMentoringRequest: (data: {
    mentorId: string;
    skillId: string;
    skillName: string;
    skillDomain: string;
    reason: string;
    preferredDate: string;
    preferredTime: string;
    message: string;
  }) => void;
  acceptMentoringRequest: (requestId: string, meetingLink?: string, mentorNote?: string) => void;
  rejectMentoringRequest: (requestId: string, mentorNote?: string) => void;
  completeMentoringSession: (requestId: string) => void;
  submitRating: (data: {
    requestId: string;
    rating: number;
    tags: string[];
    review: string;
  }) => void;

  // Skill Management
  addSkillToTeach: (skillData: {
    skillId: string;
    skillName: string;
    domain: string;
    proficiency: ProficiencyLevel;
    experienceNote: string;
    isAvailable: boolean;
  }) => void;
  removeSkillToTeach: (skillId: string) => void;
  toggleSkillAvailability: (skillId: string) => void;
  addSkillToLearn: (skillData: SkillToLearn) => void;
  removeSkillToLearn: (skillId: string) => void;
  updateStudentProfile: (updates: Partial<Student>) => void;

  // Verification & Admin
  requestSkillVerification: (skillId: string, claimedProficiency: ProficiencyLevel, evidenceNote: string) => void;
  adminApproveVerification: (verificationId: string, remarks?: string) => void;
  adminRejectVerification: (verificationId: string, remarks?: string) => void;
  adminAddSkill: (skill: Partial<Skill>) => void;
  adminAddCompany: (company: Partial<Company>) => void;

  // Notifications
  markNotificationAsRead: (notifId: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning', title?: string) => void;
  removeToast: (id: string) => void;

  // Reset
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'imt_skill_current_user_id',
  IS_LOGGED_IN: 'imt_skill_logged_in',
  STUDENTS: 'imt_skill_students_v1',
  SKILLS: 'imt_skill_skills_v1',
  COMPANIES: 'imt_skill_companies_v1',
  REQUESTS: 'imt_skill_requests_v1',
  RATINGS: 'imt_skill_ratings_v1',
  NOTIFICATIONS: 'imt_skill_notifications_v1',
  VERIFICATIONS: 'imt_skill_verifications_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage fallbacks
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [domains] = useState<DomainInfo[]>(INITIAL_DOMAINS);
  const [requests, setRequests] = useState<MentoringRequest[]>(INITIAL_REQUESTS);
  const [ratings, setRatings] = useState<RatingReview[]>(INITIAL_RATINGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [verifications, setVerifications] = useState<SkillVerificationRequest[]>(INITIAL_VERIFICATIONS);

  const [currentUserId, setCurrentUserId] = useState<string>('student-aadhaar');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const [selectedSkillForMentorSearch, setSelectedSkillForMentorSearch] = useState<string | null>(null);
  const [selectedMentorForModal, setSelectedMentorForModal] = useState<Student | null>(null);
  const [selectedCompanyForModal, setSelectedCompanyForModal] = useState<Company | null>(null);

  // Mentorship Request Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [requestModalMentor, setRequestModalMentor] = useState<Student | null>(null);
  const [requestModalPreselectedSkill, setRequestModalPreselectedSkill] = useState<string | null>(null);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from localStorage on mount (Client-side)
  useEffect(() => {
    try {
      const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (savedStudents) setStudents(JSON.parse(savedStudents));

      const savedSkills = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (savedSkills) setSkills(JSON.parse(savedSkills));

      const savedCompanies = localStorage.getItem(STORAGE_KEYS.COMPANIES);
      if (savedCompanies) setCompanies(JSON.parse(savedCompanies));

      const savedRequests = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      if (savedRequests) setRequests(JSON.parse(savedRequests));

      const savedRatings = localStorage.getItem(STORAGE_KEYS.RATINGS);
      if (savedRatings) setRatings(JSON.parse(savedRatings));

      const savedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));

      const savedVerifs = localStorage.getItem(STORAGE_KEYS.VERIFICATIONS);
      if (savedVerifs) setVerifications(JSON.parse(savedVerifs));

      const savedUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      if (savedUserId) setCurrentUserId(savedUserId);

      const savedLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      if (savedLoggedIn !== null) setIsLoggedIn(savedLoggedIn === 'true');
    } catch (e) {
      console.warn('LocalStorage load error, using initial mock data:', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch (_) {}
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    } catch (_) {}
  }, [requests]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
    } catch (_) {}
  }, [ratings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (_) {}
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(verifications));
    } catch (_) {}
  }, [verifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, String(isLoggedIn));
    } catch (_) {}
  }, [currentUserId, isLoggedIn]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Find Current User object
  const currentUser: Student = students.find((s) => s.id === currentUserId) || students[0];

  const switchPersona = (studentId: string) => {
    const target = students.find((s) => s.id === studentId);
    if (target) {
      setCurrentUserId(target.id);
      setIsLoggedIn(true);
      if (target.role === 'admin') {
        setActiveTab('admin_portal');
      } else {
        setActiveTab('dashboard');
      }
      showToast(`Switched persona to ${target.name} (${target.role === 'admin' ? 'Placement Cell Admin' : target.targetRole || target.program})`, 'info', 'Persona Switched');
    }
  };

  const login = (emailOrId: string): boolean => {
    const user = students.find(
      (s) =>
        s.email.toLowerCase() === emailOrId.toLowerCase() ||
        s.studentId.toLowerCase() === emailOrId.toLowerCase() ||
        s.id.toLowerCase() === emailOrId.toLowerCase()
    );
    if (user) {
      setCurrentUserId(user.id);
      setIsLoggedIn(true);
      setActiveTab(user.role === 'admin' ? 'admin_portal' : 'dashboard');
      showToast(`Welcome back, ${user.name}!`, 'success', 'Login Successful');
      return true;
    }
    // Fallback: log in as Aadhaar
    setCurrentUserId('student-aadhaar');
    setIsLoggedIn(true);
    setActiveTab('dashboard');
    showToast('Signed in with default student account.', 'success');
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('You have been signed out successfully.', 'info');
  };

  const register = (studentData: Partial<Student>): Student => {
    const newId = `student-${Date.now()}`;
    const initials = studentData.name
      ? studentData.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'ST';

    const newStudent: Student = {
      id: newId,
      name: studentData.name || 'New Student',
      studentId: studentData.studentId || `IMT2024PGDM${Math.floor(100 + Math.random() * 900)}`,
      email: studentData.email || `${newId}@imt.edu`,
      avatar: initials,
      program: studentData.program || 'PGDM',
      specialization: studentData.specialization || 'General Management',
      academicYear: studentData.academicYear || 'Year 1 (Batch 2024–2026)',
      graduationYear: studentData.graduationYear || 2026,
      bio: studentData.bio || 'IMT student preparing for summer internships and campus placements.',
      targetDomain: studentData.targetDomain || 'Data Analytics',
      targetRole: studentData.targetRole || 'Business Analyst',
      careerGoal: studentData.careerGoal || 'Build industry-ready skills and secure top campus placement.',
      skillsToTeach: studentData.skillsToTeach || [],
      skillsToLearn: studentData.skillsToLearn || [],
      availability: studentData.availability || 'Weekday Evenings (6 PM - 9 PM)',
      rating: 5.0,
      ratingsCount: 0,
      sessionsCompleted: 0,
      isVerified: false,
      role: 'student',
      cgpa: studentData.cgpa || '7.5 / 10'
    };

    setStudents((prev) => [newStudent, ...prev]);
    setCurrentUserId(newStudent.id);
    setIsLoggedIn(true);
    setActiveTab('dashboard');

    // Add welcome notification
    const welcomeNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: newStudent.id,
      type: 'system',
      title: 'Welcome to IMT SkillConnect!',
      message: 'Explore domains, discover peer mentors, and identify missing skills for your dream company.',
      targetTab: 'dashboard',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);

    showToast(`Welcome to IMT SkillConnect, ${newStudent.name}!`, 'success', 'Account Created');
    return newStudent;
  };

  const openRequestModal = (mentor: Student, preselectedSkill?: string) => {
    setRequestModalMentor(mentor);
    setRequestModalPreselectedSkill(preselectedSkill || null);
    setIsRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setRequestModalMentor(null);
    setRequestModalPreselectedSkill(null);
  };

  const sendMentoringRequest = (data: {
    mentorId: string;
    skillId: string;
    skillName: string;
    skillDomain: string;
    reason: string;
    preferredDate: string;
    preferredTime: string;
    message: string;
  }) => {
    const mentor = students.find((s) => s.id === data.mentorId);
    if (!mentor) return;

    const newRequest: MentoringRequest = {
      id: `req-${Date.now()}`,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      requesterEmail: currentUser.email,
      requesterProgram: currentUser.program,
      requesterAvatar: currentUser.avatar,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorEmail: mentor.email,
      mentorAvatar: mentor.avatar,
      skillId: data.skillId,
      skillName: data.skillName,
      skillDomain: data.skillDomain,
      reason: data.reason,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      message: data.message,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setRequests((prev) => [newRequest, ...prev]);

    // Send notification to Mentor
    const mentorNotif: NotificationItem = {
      id: `notif-${Date.now()}-m`,
      userId: mentor.id,
      type: 'request_received',
      title: 'New Mentoring Request',
      message: `${currentUser.name} requested mentoring in "${data.skillName}" for ${data.preferredDate}.`,
      targetTab: 'my_requests',
      targetId: newRequest.id,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    // Send confirmation to Requester
    const requesterNotif: NotificationItem = {
      id: `notif-${Date.now()}-r`,
      userId: currentUser.id,
      type: 'system',
      title: 'Mentoring Request Sent',
      message: `Your request for "${data.skillName}" has been sent to ${mentor.name}.`,
      targetTab: 'my_requests',
      targetId: newRequest.id,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    setNotifications((prev) => [mentorNotif, requesterNotif, ...prev]);
    closeRequestModal();
    showToast(`Mentoring request sent to ${mentor.name}!`, 'success', 'Request Sent');
  };

  const acceptMentoringRequest = (requestId: string, meetingLink = 'https://meet.google.com/imt-peer-session', mentorNote = 'Request accepted! See you at the scheduled time.') => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'Accepted',
            acceptedAt: new Date().toISOString(),
            meetingLink,
            mentorResponseNote: mentorNote
          };
        }
        return r;
      })
    );

    const req = requests.find((r) => r.id === requestId);
    if (req) {
      const learnerNotif: NotificationItem = {
        id: `notif-${Date.now()}-acc`,
        userId: req.requesterId,
        type: 'request_accepted',
        title: 'Mentoring Request Accepted!',
        message: `${currentUser.name} accepted your request for "${req.skillName}". Meeting link is available in My Requests.`,
        targetTab: 'my_requests',
        targetId: requestId,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      setNotifications((prev) => [learnerNotif, ...prev]);
      showToast(`Mentoring request for ${req.requesterName} accepted.`, 'success', 'Session Confirmed');
    }
  };

  const rejectMentoringRequest = (requestId: string, mentorNote = 'Unable to accommodate due to schedule clash.') => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'Rejected',
            mentorResponseNote: mentorNote
          };
        }
        return r;
      })
    );

    const req = requests.find((r) => r.id === requestId);
    if (req) {
      const learnerNotif: NotificationItem = {
        id: `notif-${Date.now()}-rej`,
        userId: req.requesterId,
        type: 'request_rejected',
        title: 'Mentoring Request Update',
        message: `${currentUser.name} was unable to accept your request for "${req.skillName}". Note: ${mentorNote}`,
        targetTab: 'my_requests',
        targetId: requestId,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      setNotifications((prev) => [learnerNotif, ...prev]);
      showToast('Mentoring request declined.', 'info');
    }
  };

  const completeMentoringSession = (requestId: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'Completed',
            completedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );

    // Update mentor's completed sessions count
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === req.mentorId) {
          return {
            ...s,
            sessionsCompleted: s.sessionsCompleted + 1,
            skillsToTeach: s.skillsToTeach.map((st) =>
              st.skillId === req.skillId ? { ...st, sessionsHelped: st.sessionsHelped + 1 } : st
            )
          };
        }
        return s;
      })
    );

    // Notify requester to leave a rating
    const rateNotif: NotificationItem = {
      id: `notif-${Date.now()}-rate`,
      userId: req.requesterId,
      type: 'session_completed',
      title: 'Session Completed — Leave a Rating!',
      message: `Your mentoring session on "${req.skillName}" with ${req.mentorName} is marked complete. Please rate your experience!`,
      targetTab: 'my_requests',
      targetId: requestId,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    setNotifications((prev) => [rateNotif, ...prev]);
    showToast(`Session marked as Completed! Requester can now submit a rating.`, 'success', 'Session Completed');
  };

  const submitRating = (data: {
    requestId: string;
    rating: number;
    tags: string[];
    review: string;
  }) => {
    const req = requests.find((r) => r.id === data.requestId);
    if (!req) return;

    const newRating: RatingReview = {
      id: `rat-${Date.now()}`,
      requestId: data.requestId,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewerProgram: currentUser.program,
      reviewerAvatar: currentUser.avatar,
      mentorId: req.mentorId,
      mentorName: req.mentorName,
      skillName: req.skillName,
      rating: data.rating,
      tags: data.tags,
      review: data.review,
      createdAt: new Date().toISOString()
    };

    setRatings((prev) => [newRating, ...prev]);

    // Recalculate mentor's average rating
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === req.mentorId) {
          const mentorRatings = ratings.filter((r) => r.mentorId === s.id).map((r) => r.rating);
          const allRatings = [...mentorRatings, data.rating];
          const avg = Number((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1));
          return {
            ...s,
            rating: avg,
            ratingsCount: s.ratingsCount + 1
          };
        }
        return s;
      })
    );

    // Notify mentor about new review
    const mentorNotif: NotificationItem = {
      id: `notif-${Date.now()}-rev`,
      userId: req.mentorId,
      type: 'rating_received',
      title: 'New Rating & Review Received ⭐',
      message: `${currentUser.name} gave you a ${data.rating}★ rating for "${req.skillName}": "${data.review.slice(0, 60)}..."`,
      targetTab: 'profile',
      isRead: false,
      createdAt: new Date().toISOString()
    };

    setNotifications((prev) => [mentorNotif, ...prev]);
    showToast(`Rating and review submitted for ${req.mentorName}!`, 'success', 'Review Submitted');
  };

  const addSkillToTeach = (skillData: {
    skillId: string;
    skillName: string;
    domain: string;
    proficiency: ProficiencyLevel;
    experienceNote: string;
    isAvailable: boolean;
  }) => {
    const newSkillToTeach: SkillToTeach = {
      ...skillData,
      verified: false,
      sessionsHelped: 0
    };

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === currentUser.id) {
          // avoid duplicate
          const filtered = s.skillsToTeach.filter((st) => st.skillId !== skillData.skillId);
          return {
            ...s,
            skillsToTeach: [...filtered, newSkillToTeach]
          };
        }
        return s;
      })
    );

    showToast(`Added "${skillData.skillName}" to Skills You Can Teach.`, 'success');
  };

  const removeSkillToTeach = (skillId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === currentUser.id) {
          return {
            ...s,
            skillsToTeach: s.skillsToTeach.filter((st) => st.skillId !== skillId)
          };
        }
        return s;
      })
    );
    showToast('Skill removed from teaching list.', 'info');
  };

  const toggleSkillAvailability = (skillId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === currentUser.id) {
          return {
            ...s,
            skillsToTeach: s.skillsToTeach.map((st) =>
              st.skillId === skillId ? { ...st, isAvailable: !st.isAvailable } : st
            )
          };
        }
        return s;
      })
    );
  };

  const addSkillToLearn = (skillData: SkillToLearn) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === currentUser.id) {
          const filtered = s.skillsToLearn.filter((sl) => sl.skillId !== skillData.skillId);
          return {
            ...s,
            skillsToLearn: [...filtered, skillData]
          };
        }
        return s;
      })
    );
    showToast(`Added "${skillData.skillName}" to your Learning Goals.`, 'success');
  };

  const removeSkillToLearn = (skillId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === currentUser.id) {
          return {
            ...s,
            skillsToLearn: s.skillsToLearn.filter((sl) => sl.skillId !== skillId)
          };
        }
        return s;
      })
    );
    showToast('Skill removed from learning list.', 'info');
  };

  const updateStudentProfile = (updates: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === currentUser.id) {
          return { ...s, ...updates };
        }
        return s;
      })
    );
    showToast('Profile changes saved successfully.', 'success', 'Profile Updated');
  };

  const requestSkillVerification = (skillId: string, claimedProficiency: ProficiencyLevel, evidenceNote: string) => {
    const skill = skills.find((sk) => sk.id === skillId) || { name: 'Skill', domain: 'General' };
    const newVerif: SkillVerificationRequest = {
      id: `verif-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentProgram: currentUser.program,
      studentAvatar: currentUser.avatar,
      skillId,
      skillName: skill.name,
      domain: skill.domain,
      claimedProficiency,
      evidenceNote,
      submittedAt: new Date().toISOString(),
      status: 'Pending'
    };

    setVerifications((prev) => [newVerif, ...prev]);
    showToast(`Verification request submitted for "${skill.name}". Placement cell will review it shortly.`, 'info', 'Verification Queued');
  };

  const adminApproveVerification = (verificationId: string, remarks = 'Approved based on academic/internship credentials.') => {
    const verif = verifications.find((v) => v.id === verificationId);
    if (!verif) return;

    setVerifications((prev) =>
      prev.map((v) => (v.id === verificationId ? { ...v, status: 'Approved', adminRemarks: remarks } : v))
    );

    // Mark the skill as verified on the student's profile
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === verif.studentId) {
          return {
            ...s,
            skillsToTeach: s.skillsToTeach.map((st) =>
              st.skillId === verif.skillId ? { ...st, verified: true, proficiency: verif.claimedProficiency } : st
            )
          };
        }
        return s;
      })
    );

    // Notify the student
    const notif: NotificationItem = {
      id: `notif-${Date.now()}-vapp`,
      userId: verif.studentId,
      type: 'skill_verified',
      title: `Skill Endorsement Verified: ${verif.skillName} 🛡️`,
      message: `The Placement Cell has verified your proficiency in "${verif.skillName}". Your profile now displays the Verified Mentor badge.`,
      targetTab: 'my_skills',
      targetId: verif.skillId,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    setNotifications((prev) => [notif, ...prev]);
    showToast(`Endorsement approved for ${verif.studentName} in ${verif.skillName}.`, 'success', 'Endorsement Approved');
  };

  const adminRejectVerification = (verificationId: string, remarks = 'Insufficient verification proof provided.') => {
    const verif = verifications.find((v) => v.id === verificationId);
    if (!verif) return;

    setVerifications((prev) =>
      prev.map((v) => (v.id === verificationId ? { ...v, status: 'Rejected', adminRemarks: remarks } : v))
    );

    const notif: NotificationItem = {
      id: `notif-${Date.now()}-vrej`,
      userId: verif.studentId,
      type: 'system',
      title: `Verification Request Update: ${verif.skillName}`,
      message: `Placement Cell could not verify "${verif.skillName}". Remarks: ${remarks}`,
      targetTab: 'my_skills',
      targetId: verif.skillId,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    setNotifications((prev) => [notif, ...prev]);
    showToast(`Verification request for ${verif.skillName} declined.`, 'info');
  };

  const adminAddSkill = (skillData: Partial<Skill>) => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: skillData.name || 'New Skill',
      domain: skillData.domain || 'Data Analytics',
      category: skillData.category || 'Business & Analytics',
      description: skillData.description || '',
      demandLevel: skillData.demandLevel || 'High',
      associatedRoles: skillData.associatedRoles || [],
      associatedCompanies: skillData.associatedCompanies || []
    };

    setSkills((prev) => [...prev, newSkill]);
    showToast(`New skill "${newSkill.name}" added to catalog.`, 'success');
  };

  const adminAddCompany = (companyData: Partial<Company>) => {
    const newCompany: Company = {
      id: `comp-${Date.now()}`,
      name: companyData.name || 'New Recruiter',
      logo: companyData.name ? companyData.name.slice(0, 2).toUpperCase() : 'CO',
      industry: companyData.industry || 'Management Consulting',
      domain: companyData.domain || 'Consulting',
      description: companyData.description || '',
      roles: companyData.roles || [],
      requiredSkills: companyData.requiredSkills || [],
      preferredSkills: companyData.preferredSkills || [],
      eligibility: companyData.eligibility || 'PGDM candidates in good standing',
      location: companyData.location || 'Gurugram / Mumbai / Bengaluru',
      hiringSeason: companyData.hiringSeason || 'Phase 1 Placement Drive',
      tier: companyData.tier || 'Tier 1 Dream',
      applicationDeadline: companyData.applicationDeadline || '2026-10-15'
    };

    setCompanies((prev) => [newCompany, ...prev]);
    showToast(`New company "${newCompany.name}" added to Placement Directory.`, 'success');
  };

  const markNotificationAsRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (n.userId === currentUser.id || n.userId === 'all' ? { ...n, isRead: true } : n))
    );
    showToast('All notifications marked as read.', 'info');
  };

  const unreadNotificationsCount = notifications.filter(
    (n) => (n.userId === currentUser.id || n.userId === 'all') && !n.isRead
  ).length;

  const resetToDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setSkills(INITIAL_SKILLS);
    setCompanies(INITIAL_COMPANIES);
    setRequests(INITIAL_REQUESTS);
    setRatings(INITIAL_RATINGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setVerifications(INITIAL_VERIFICATIONS);
    setCurrentUserId('student-aadhaar');
    setIsLoggedIn(true);
    setActiveTab('dashboard');
    try {
      localStorage.clear();
    } catch (_) {}
    showToast('Platform reset to pristine initial demo state.', 'success', 'Data Reset');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        activeTab,
        setActiveTab,
        switchPersona,
        login,
        logout,
        register,
        students,
        skills,
        companies,
        domains,
        requests,
        ratings,
        notifications,
        verifications,
        selectedSkillForMentorSearch,
        setSelectedSkillForMentorSearch,
        selectedMentorForModal,
        setSelectedMentorForModal,
        selectedCompanyForModal,
        setSelectedCompanyForModal,
        isRequestModalOpen,
        setIsRequestModalOpen,
        requestModalMentor,
        requestModalPreselectedSkill,
        openRequestModal,
        closeRequestModal,
        sendMentoringRequest,
        acceptMentoringRequest,
        rejectMentoringRequest,
        completeMentoringSession,
        submitRating,
        addSkillToTeach,
        removeSkillToTeach,
        toggleSkillAvailability,
        addSkillToLearn,
        removeSkillToLearn,
        updateStudentProfile,
        requestSkillVerification,
        adminApproveVerification,
        adminRejectVerification,
        adminAddSkill,
        adminAddCompany,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        toasts,
        showToast,
        removeToast,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
