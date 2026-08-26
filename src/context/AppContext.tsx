'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  Student,
  Skill,
  DomainInfo,
  MentoringRequest,
  RatingReview,
  NotificationItem,
  SkillVerificationRequest,
  ActiveTab,
  ProficiencyLevel,
  PriorityLevel,
  PlacementJob,
  InternshipOpportunity
} from '../types';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  // State
  currentUser: Student;
  students: Student[];
  skills: Skill[];
  domains: DomainInfo[];
  requests: MentoringRequest[];
  ratings: RatingReview[];
  notifications: NotificationItem[];
  verifications: SkillVerificationRequest[];
  isLoggedIn: boolean;
  activeTab: ActiveTab;
  unreadNotifsCount: number;
  toasts: ToastMessage[];
  isLoading: boolean;

  // Modals & Navigation
  selectedMentorForModal: Student | null;
  selectedCompanyForModal: any | null;
  isRequestModalOpen: boolean;
  requestModalMentor: Student | null;
  requestModalPreselectedSkill: string | null;
  selectedSkillForMentorSearch: string | null;

  // Actions
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedMentorForModal: (student: Student | null) => void;
  setSelectedCompanyForModal: (company: any | null) => void;
  openRequestModal: (mentor: Student, skillName?: string) => void;
  closeRequestModal: () => void;
  setSelectedSkillForMentorSearch: (skillName: string | null) => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Auth & Persona
  loginWithStudentId: (studentIdOrEmail: string) => Promise<boolean>;
  switchPersona: (studentIdOrEmail: string) => Promise<void>;
  logout: () => void;
  resetDatabaseData: () => Promise<void>;

  // Data Actions
  sendMentoringRequest: (data: {
    mentorId: string;
    skillId: string;
    reason: string;
    preferredDate: string;
    preferredTime: string;
    message: string;
  }) => Promise<boolean>;
  acceptMentoringRequest: (requestId: string, meetingLink?: string, note?: string) => Promise<boolean>;
  rejectMentoringRequest: (requestId: string, reason?: string) => Promise<boolean>;
  completeMentoringSession: (requestId: string, sessionNotes?: string) => Promise<boolean>;
  submitRatingReview: (data: {
    requestId: string;
    mentorId: string;
    skillName: string;
    rating: number;
    tags: string[];
    review: string;
  }) => Promise<boolean>;
  addTeachingSkill: (skillId: string, proficiency: ProficiencyLevel, experienceNote: string) => Promise<boolean>;
  removeTeachingSkill: (skillId: string) => Promise<boolean>;
  addLearningSkill: (skillId: string, currentLevel: ProficiencyLevel | 'None', targetLevel: ProficiencyLevel, priority: PriorityLevel) => Promise<boolean>;
  removeLearningSkill: (skillId: string) => Promise<boolean>;
  submitSkillVerification: (skillId: string, claimedProficiency: ProficiencyLevel, evidenceNote: string) => Promise<boolean>;
  processSkillVerification: (verificationId: string, status: 'Approved' | 'Rejected', adminRemarks?: string) => Promise<boolean>;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  refreshAllData: () => Promise<void>;
}

const DEFAULT_USER: Student = {
  id: 'user-tushar',
  name: 'Tushar Goel',
  studentId: '25A3HP658',
  email: 'tushar.goel@imthyderabad.edu.in',
  avatar: 'TG',
  program: 'PGDM (Analytics)',
  specialization: 'Data Analytics & IT',
  academicYear: 'Year 1 (Batch 2024–2026)',
  graduationYear: 2026,
  bio: 'First-year PGDM student at IMT Hyderabad targeting Business Analyst and Consulting roles.',
  targetDomain: 'Data Analytics',
  targetRole: 'Business Analyst / Analytics Consultant',
  careerGoal: 'Secure a Summer Internship at Deloitte USI or Amazon.',
  availability: 'Weekday Evenings (7 PM - 10 PM) & Weekends',
  rating: 4.8,
  ratingsCount: 5,
  sessionsCompleted: 5,
  isVerified: true,
  role: 'student',
  cgpa: '7.8 / 10',
  skillsToTeach: [],
  skillsToLearn: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Student>(DEFAULT_USER);
  const [students, setStudents] = useState<Student[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [domains, setDomains] = useState<DomainInfo[]>([]);
  const [requests, setRequests] = useState<MentoringRequest[]>([]);
  const [ratings, setRatings] = useState<RatingReview[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [verifications, setVerifications] = useState<SkillVerificationRequest[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modal states
  const [selectedMentorForModal, setSelectedMentorForModal] = useState<Student | null>(null);
  const [selectedCompanyForModal, setSelectedCompanyForModal] = useState<any | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [requestModalMentor, setRequestModalMentor] = useState<Student | null>(null);
  const [requestModalPreselectedSkill, setRequestModalPreselectedSkill] = useState<string | null>(null);
  const [selectedSkillForMentorSearch, setSelectedSkillForMentorSearch] = useState<string | null>(null);

  // Toast Helpers
  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch Skills & Domains
  const fetchSkillsAndDomains = useCallback(async () => {
    try {
      const res = await fetch('/api/skills');
      if (res.ok) {
        const data = await res.json();
        setSkills(data.skills || []);
        setDomains(data.domains || []);
      }
    } catch (err) {
      console.error('Error fetching skills/domains:', err);
    }
  }, []);

  // Fetch Students from DB
  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch('/api/students');
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);

        // Also update currentUser if in students list
        const updatedSelf = data.students?.find((s: Student) => s.id === currentUser.id);
        if (updatedSelf) {
          setCurrentUser(updatedSelf);
        }
      }
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  }, [currentUser.id]);

  // Fetch User-specific Requests from DB
  const fetchRequests = useCallback(async () => {
    try {
      const url = currentUser.role === 'admin' ? '/api/requests' : `/api/requests?userId=${currentUser.id}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  }, [currentUser.id, currentUser.role]);

  // Fetch Notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`/api/notifications?userId=${currentUser.id}`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }, [currentUser.id]);

  // Fetch Ratings
  const fetchRatings = useCallback(async () => {
    try {
      const res = await fetch('/api/ratings');
      if (res.ok) {
        const data = await res.json();
        setRatings(data.ratings || []);
      }
    } catch (err) {
      console.error('Error fetching ratings:', err);
    }
  }, []);

  // Fetch Verifications (for Admin or student)
  const fetchVerifications = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/verifications');
      if (res.ok) {
        const data = await res.json();
        setVerifications(data.verifications || []);
      }
    } catch (err) {
      console.error('Error fetching verifications:', err);
    }
  }, []);

  // Refresh all application data
  const refreshAllData = useCallback(async () => {
    await Promise.all([
      fetchSkillsAndDomains(),
      fetchStudents(),
      fetchRequests(),
      fetchNotifications(),
      fetchRatings(),
      fetchVerifications()
    ]);
  }, [fetchSkillsAndDomains, fetchStudents, fetchRequests, fetchNotifications, fetchRatings, fetchVerifications]);

  // Initial load
  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Real-time Background Polling Sync (every 4 seconds for live multi-user updates)
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      fetchRequests();
      fetchNotifications();
    }, 4000);

    return () => clearInterval(interval);
  }, [isLoggedIn, fetchRequests, fetchNotifications]);

  // Login with student ID or Email against Neon PostgreSQL
  const loginWithStudentId = async (studentIdOrEmail: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: studentIdOrEmail })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        addToast({
          type: 'success',
          title: 'Welcome to IMT Skill Exchange',
          message: `Logged in as ${data.user.name} (${data.user.studentId || data.user.program})`
        });
        return true;
      } else {
        addToast({
          type: 'error',
          title: 'Login Failed',
          message: data.error || 'Invalid Student ID or Email'
        });
        return false;
      }
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Connection Error',
        message: err.message || 'Failed to connect to Neon database'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Switch Persona between the 5 real seeded student accounts
  const switchPersona = async (studentIdOrEmail: string) => {
    setIsLoading(true);
    try {
      const success = await loginWithStudentId(studentIdOrEmail);
      if (success) {
        // re-fetch user specific requests & notifications
        await Promise.all([fetchRequests(), fetchNotifications(), fetchStudents()]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been logged out of IMT Skill Exchange.'
    });
  };

  const resetDatabaseData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      if (res.ok) {
        addToast({
          type: 'success',
          title: 'Database Reset Complete',
          message: 'All 226 placement jobs, 75 internships, and 5 student personas re-seeded in Neon PostgreSQL.'
        });
        await refreshAllData();
      }
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Reset Error',
        message: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Send Mentoring Request
  const sendMentoringRequest = async (data: {
    mentorId: string;
    skillId: string;
    reason: string;
    preferredDate: string;
    preferredTime: string;
    message: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesterId: currentUser.id,
          ...data
        })
      });
      const resData = await res.json();
      if (res.ok) {
        addToast({
          type: 'success',
          title: 'Request Sent Successfully!',
          message: 'Your peer mentoring request has been stored in Neon PostgreSQL and the mentor has been notified.'
        });
        await fetchRequests();
        return true;
      } else {
        addToast({
          type: 'error',
          title: 'Request Failed',
          message: resData.error || 'Could not send mentoring request.'
        });
        return false;
      }
    } catch (err: any) {
      addToast({ type: 'error', title: 'Network Error', message: err.message });
      return false;
    }
  };

  // Accept Mentoring Request
  const acceptMentoringRequest = async (requestId: string, meetingLink?: string, note?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          status: 'ACCEPTED',
          meetingLink: meetingLink || 'https://meet.google.com/imth-peer-session',
          mentorResponseNote: note || 'Accepted! Looking forward to our peer learning session.',
          userId: currentUser.id
        })
      });
      if (res.ok) {
        addToast({
          type: 'success',
          title: 'Mentoring Request Accepted!',
          message: 'The session has been confirmed and the student has received a notification.'
        });
        await fetchRequests();
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  // Reject Mentoring Request
  const rejectMentoringRequest = async (requestId: string, reason?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          status: 'REJECTED',
          mentorResponseNote: reason || 'Currently unavailable',
          userId: currentUser.id
        })
      });
      if (res.ok) {
        addToast({
          type: 'info',
          title: 'Request Declined',
          message: 'The student has been updated.'
        });
        await fetchRequests();
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  // Complete Mentoring Session
  const completeMentoringSession = async (requestId: string, sessionNotes?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          status: 'COMPLETED',
          sessionNotes: sessionNotes || null,
          userId: currentUser.id
        })
      });
      if (res.ok) {
        addToast({
          type: 'success',
          title: 'Session Marked as Completed!',
          message: 'Mentee has been prompted to submit a peer review rating.'
        });
        await fetchRequests();
        await fetchStudents();
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  // Submit Rating Review
  const submitRatingReview = async (data: {
    requestId: string;
    mentorId: string;
    skillName: string;
    rating: number;
    tags: string[];
    review: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewerId: currentUser.id,
          ...data
        })
      });
      if (res.ok) {
        addToast({
          type: 'success',
          title: 'Review Submitted!',
          message: `Thank you! Your ${data.rating}★ rating and feedback have updated the mentor's score in PostgreSQL.`
        });
        await fetchRatings();
        await fetchRequests();
        await fetchStudents();
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  // Skill Management
  const addTeachingSkill = async (skillId: string, proficiency: ProficiencyLevel, experienceNote: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentUser.id,
          skillId,
          skillType: 'TEACH',
          proficiency,
          experienceNote
        })
      });
      if (res.ok) {
        addToast({
          type: 'success',
          title: 'Teaching Skill Added',
          message: 'Skill added to your teaching portfolio.'
        });
        await fetchStudents();
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  const removeTeachingSkill = async (skillId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/skills?studentId=${currentUser.id}&skillId=${skillId}&skillType=TEACH`, {
        method: 'DELETE'
      });
      if (res.ok) {
        addToast({ type: 'info', title: 'Skill Removed', message: 'Removed from teaching skills.' });
        await fetchStudents();
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  const addLearningSkill = async (
    skillId: string,
    currentLevel: ProficiencyLevel | 'None',
    targetLevel: ProficiencyLevel,
    priority: PriorityLevel
  ): Promise<boolean> => {
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentUser.id,
          skillId,
          skillType: 'LEARN',
          currentLevel,
          targetLevel,
          priority
        })
      });
      if (res.ok) {
        addToast({
          type: 'success',
          title: 'Learning Goal Added',
          message: 'Skill added to your learning goals.'
        });
        await fetchStudents();
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  const removeLearningSkill = async (skillId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/skills?studentId=${currentUser.id}&skillId=${skillId}&skillType=LEARN`, {
        method: 'DELETE'
      });
      if (res.ok) {
        addToast({ type: 'info', title: 'Goal Removed', message: 'Removed from learning goals.' });
        await fetchStudents();
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  // Submit Skill Verification Claim
  const submitSkillVerification = async (skillId: string, claimedProficiency: ProficiencyLevel, evidenceNote: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/verifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentUser.id,
          skillId,
          claimedProficiency,
          evidenceNote
        })
      });
      if (res.ok) {
        addToast({
          type: 'success',
          title: 'Verification Submitted',
          message: 'Your credential claim has been forwarded to the IMT Hyderabad Placement Cell.'
        });
        await fetchVerifications();
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  // Process Skill Verification (Admin)
  const processSkillVerification = async (verificationId: string, status: 'Approved' | 'Rejected', adminRemarks?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/verifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verificationId,
          status,
          adminRemarks
        })
      });
      if (res.ok) {
        addToast({
          type: status === 'Approved' ? 'success' : 'info',
          title: status === 'Approved' ? 'Skill Badge Verified!' : 'Claim Declined',
          message: `The student's skill claim has been marked as ${status}.`
        });
        await fetchVerifications();
        await fetchStudents();
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  // Mark notification read
  const markNotificationAsRead = async (id: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: id })
      });
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    } catch (err) {
      console.error('Error marking notification read:', err);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true, userId: currentUser.id })
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      addToast({ type: 'info', title: 'Notifications', message: 'All notifications marked as read.' });
    } catch (err) {
      console.error('Error marking all notifications read:', err);
    }
  };

  // Request Modal controls
  const openRequestModal = (mentor: Student, skillName?: string) => {
    setRequestModalMentor(mentor);
    setRequestModalPreselectedSkill(skillName || null);
    setIsRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setRequestModalMentor(null);
    setRequestModalPreselectedSkill(null);
  };

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        students,
        skills,
        domains,
        requests,
        ratings,
        notifications,
        verifications,
        isLoggedIn,
        activeTab,
        unreadNotifsCount,
        toasts,
        isLoading,
        selectedMentorForModal,
        selectedCompanyForModal,
        isRequestModalOpen,
        requestModalMentor,
        requestModalPreselectedSkill,
        selectedSkillForMentorSearch,
        setActiveTab,
        setSelectedMentorForModal,
        setSelectedCompanyForModal,
        openRequestModal,
        closeRequestModal,
        setSelectedSkillForMentorSearch,
        addToast,
        removeToast,
        loginWithStudentId,
        switchPersona,
        logout,
        resetDatabaseData,
        sendMentoringRequest,
        acceptMentoringRequest,
        rejectMentoringRequest,
        completeMentoringSession,
        submitRatingReview,
        addTeachingSkill,
        removeTeachingSkill,
        addLearningSkill,
        removeLearningSkill,
        submitSkillVerification,
        processSkillVerification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        refreshAllData
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
