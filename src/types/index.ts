export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'code';
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  thumbnail: string;
  category: string;
  rating: number;
  studentsCount: number;
  duration: string;
  level: CourseLevel;
  price: string;
  isEnrolled: boolean;
  progress: number;
  completedLessons?: number;
  totalLessons: number;
  nextLesson?: string;
  whatYouWillLearn: string[];
  modules: CourseModule[];
  bannerGradient: string;
}

export type AssignmentStatus = 'Pending' | 'Submitted' | 'Graded';

export interface Assignment {
  id: string;
  title: string;
  course: string;
  courseId: string;
  dueDate: string;
  status: AssignmentStatus;
  marks?: string;
  totalMarks?: number;
  score?: number;
  description?: string;
  submittedAt?: string;
  feedback?: string;
}

export interface GradeItem {
  id: string;
  courseName: string;
  courseCode: string;
  instructor: string;
  grade: string;
  percentage: number;
  credits: number;
  quizzes: number;
  assignments: number;
  midterm: number;
  finalExam: number;
}

export interface Certificate {
  id: string;
  title: string;
  courseName: string;
  issueDate: string;
  credentialId: string;
  instructor: string;
  skills: string[];
  thumbnail: string;
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  day: number;
  title: string;
  type: 'assignment' | 'exam' | 'class';
  time: string;
  course: string;
  location?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'assignment' | 'achievement' | 'course' | 'grade' | 'general';
  isRead: boolean;
  link?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  department: string;
  studentId: string;
  email: string;
  avatar: string;
  bio: string;
  semester: string;
  skills: string[];
  enrolledCount: number;
  completedCount: number;
  learningHours: number;
  certificatesCount: number;
  overallGpa: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
