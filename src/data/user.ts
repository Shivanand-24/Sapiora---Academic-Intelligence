import { UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Shivanand K',
  role: 'Computer Science Student',
  department: 'Computer Science & Engineering',
  studentId: 'CSE2026XXX',
  email: 'student@sapiora.edu',
  avatar: 'SK',
  bio: 'Passionate Computer Science undergraduate focused on modern full-stack web architectures, distributed systems, and applied machine learning. Building scalable real-world digital solutions with academic excellence.',
  semester: 'Fall Semester 2026',
  skills: [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Python',
    'Machine Learning',
    'Networking'
  ],
  enrolledCount: 6,
  completedCount: 2,
  learningHours: 42,
  certificatesCount: 3,
  overallGpa: '3.82'
};

export interface AppSettings {
  emailNotifications: boolean;
  assignmentReminders: boolean;
  courseAnnouncements: boolean;
  marketingEmails: boolean;
  theme: 'light' | 'dark' | 'system';
  compactView: boolean;
  twoFactorAuth: boolean;
  language: string;
}

export const INITIAL_SETTINGS: AppSettings = {
  emailNotifications: true,
  assignmentReminders: true,
  courseAnnouncements: true,
  marketingEmails: false,
  theme: 'light',
  compactView: false,
  twoFactorAuth: true,
  language: 'English (US)'
};
