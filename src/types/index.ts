export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type RequestStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Completed' | 'Cancelled';
export type UserRole = 'student' | 'admin';

export interface SkillToTeach {
  skillId: string;
  skillName: string;
  domain: string;
  proficiency: ProficiencyLevel;
  experienceNote: string;
  verified: boolean;
  sessionsHelped: number;
  isAvailable: boolean;
}

export interface SkillToLearn {
  skillId: string;
  skillName: string;
  domain: string;
  currentLevel: ProficiencyLevel | 'None';
  targetLevel: ProficiencyLevel;
  priority: PriorityLevel;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  avatar: string;
  program: string;
  specialization: string;
  academicYear: string;
  graduationYear: number;
  bio: string;
  targetDomain: string;
  targetRole: string;
  careerGoal: string;
  skillsToTeach: SkillToTeach[];
  skillsToLearn: SkillToLearn[];
  availability: string;
  rating: number;
  ratingsCount: number;
  sessionsCompleted: number;
  isVerified: boolean;
  role: UserRole;
  cgpa?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  domain: string;
  category: 'Technical' | 'Business & Analytics' | 'Finance' | 'Strategy & Consulting' | 'Product' | 'Soft Skills & Interview';
  description: string;
  demandLevel: 'Very High' | 'High' | 'Moderate';
  associatedRoles: string[];
  associatedCompanies: string[];
}

export interface CompanyRole {
  title: string;
  type: 'Summer Internship' | 'Final Placement';
  location: string;
  ctcOrStipend: string;
  eligibility: string;
  deadline: string;
  requiredSkills: string[];
  preferredSkills: string[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  domain: string;
  description: string;
  roles: CompanyRole[];
  requiredSkills: string[];
  preferredSkills: string[];
  eligibility: string;
  location: string;
  hiringSeason: string;
  tier: 'Tier 1 Dream' | 'Super Dream' | 'Core Marquee';
  applicationDeadline: string;
}

export interface DomainInfo {
  id: string;
  name: string;
  iconName: string;
  description: string;
  popularRoles: string[];
  keySkills: string[];
  topRecruiters: string[];
  avgPackage: string;
  marketInsight: string;
}

export interface MentoringRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  requesterProgram: string;
  requesterAvatar: string;
  mentorId: string;
  mentorName: string;
  mentorEmail: string;
  mentorAvatar: string;
  skillId: string;
  skillName: string;
  skillDomain: string;
  reason: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  meetingLink?: string;
  status: RequestStatus;
  createdAt: string;
  acceptedAt?: string;
  completedAt?: string;
  mentorResponseNote?: string;
  sessionNotes?: string;
}

export interface RatingReview {
  id: string;
  requestId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerProgram: string;
  reviewerAvatar: string;
  mentorId: string;
  mentorName: string;
  skillName: string;
  rating: number;
  tags: string[];
  review: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'request_received' | 'request_accepted' | 'request_rejected' | 'session_completed' | 'rating_received' | 'skill_verified' | 'placement_alert' | 'system';
  title: string;
  message: string;
  targetTab?: string;
  targetId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface SkillVerificationRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentProgram: string;
  studentAvatar: string;
  skillId: string;
  skillName: string;
  domain: string;
  claimedProficiency: ProficiencyLevel;
  evidenceNote: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  adminRemarks?: string;
}

export type ActiveTab =
  | 'dashboard'
  | 'find_mentor'
  | 'domains'
  | 'placements'
  | 'my_skills'
  | 'my_requests'
  | 'notifications'
  | 'profile'
  | 'admin_portal';
