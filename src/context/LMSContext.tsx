import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Assignment, NotificationItem, UserProfile, ToastMessage } from '../types';
import { INITIAL_COURSES } from '../data/courses';
import { INITIAL_ASSIGNMENTS } from '../data/assignments';
import { INITIAL_NOTIFICATIONS } from '../data/notifications';
import { INITIAL_USER, INITIAL_SETTINGS, AppSettings } from '../data/user';

interface LMSContextType {
  user: UserProfile;
  courses: Course[];
  assignments: Assignment[];
  notifications: NotificationItem[];
  settings: AppSettings;
  toasts: ToastMessage[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  enrollCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  toggleLessonCompletion: (courseId: string, moduleId: string, lessonId: string) => void;
  submitAssignment: (assignmentId: string, notes?: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotification: (id: string) => void;
  updateUserProfile: (updated: Partial<UserProfile>) => void;
  updateSettings: (updated: Partial<AppSettings>) => void;
  resetToDefaults: () => void;
}

const LMSContext = createContext<LMSContextType | undefined>(undefined);

export const LMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Courses state with localStorage persistence
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem('learnhub_courses');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load courses from localStorage', e);
    }
    return INITIAL_COURSES;
  });

  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('learnhub_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
    return INITIAL_USER;
  });

  // Assignments state
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    try {
      const saved = localStorage.getItem('learnhub_assignments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load assignments from localStorage', e);
    }
    return INITIAL_ASSIGNMENTS;
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('learnhub_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load notifications from localStorage', e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Settings state
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('learnhub_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load settings from localStorage', e);
    }
    return INITIAL_SETTINGS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('learnhub_courses', JSON.stringify(courses));
    } catch (e) {
      console.error('Failed to persist courses', e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem('learnhub_user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to persist user', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('learnhub_assignments', JSON.stringify(assignments));
    } catch (e) {
      console.error('Failed to persist assignments', e);
    }
  }, [assignments]);

  useEffect(() => {
    try {
      localStorage.setItem('learnhub_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to persist notifications', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('learnhub_settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to persist settings', e);
    }
  }, [settings]);

  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const enrollCourse = (courseId: string) => {
    let enrolledCourseTitle = '';
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          enrolledCourseTitle = c.title;
          return {
            ...c,
            isEnrolled: true,
            // If it had 0 progress, give it 72% or starting progress
            progress: c.progress > 0 ? c.progress : (c.id === 'full-stack-web-dev' ? 72 : 15),
            completedLessons: c.completedLessons && c.completedLessons > 0 ? c.completedLessons : (c.id === 'full-stack-web-dev' ? 26 : 2),
            price: 'Enrolled'
          };
        }
        return c;
      })
    );

    // Update user enrolled count
    setUser((u) => ({
      ...u,
      enrolledCount: u.enrolledCount + 1
    }));

    showToast(
      'Enrollment Successful!',
      `You are now enrolled in "${enrolledCourseTitle || 'the course'}". Access all modules right away.`,
      'success'
    );

    // Add a real notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: 'Enrolled in New Course',
      message: `Welcome to ${enrolledCourseTitle}! Start with Module 1.`,
      time: 'Just now',
      type: 'course',
      isRead: false,
      link: `/courses/${courseId}`
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const unenrollCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              isEnrolled: false,
              progress: 0,
              completedLessons: 0,
              price: 'Free',
            }
          : c
      )
    );
    setUser((u) => ({
      ...u,
      enrolledCount: Math.max(0, u.enrolledCount - 1),
    }));
    showToast('Course Unenrolled', 'You have been unenrolled for demonstration testing.', 'info');
  };

  const updateCourseProgress = (courseId: string, progress: number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, progress: Math.min(100, Math.max(0, progress)) } : c))
    );
  };

  const toggleLessonCompletion = (courseId: string, moduleId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        let total = 0;
        let completed = 0;

        const updatedModules = c.modules.map((m) => {
          const updatedLessons = m.lessons.map((l) => {
            const isTarget = m.id === moduleId && l.id === lessonId;
            const isCompleted = isTarget ? !l.completed : !!l.completed;
            total++;
            if (isCompleted) completed++;
            return isTarget ? { ...l, completed: isCompleted } : l;
          });
          return { ...m, lessons: updatedLessons };
        });

        const newPercentage = total > 0 ? Math.round((completed / total) * 100) : c.progress;

        return {
          ...c,
          modules: updatedModules,
          completedLessons: completed,
          progress: newPercentage
        };
      })
    );
    showToast('Progress Updated', 'Lesson completion status recorded.', 'info');
  };

  const submitAssignment = (assignmentId: string, notes?: string) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === assignmentId) {
          return {
            ...a,
            status: 'Submitted',
            submittedAt: 'Just now',
            marks: 'Pending Review',
            feedback: notes ? `Student notes: "${notes}"` : 'Submission received and queued for grading.'
          };
        }
        return a;
      })
    );
    showToast('Assignment Submitted!', 'Your solution has been submitted for evaluation.', 'success');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('Notifications Updated', 'All notifications marked as read.', 'info');
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    showToast('Profile Updated', 'Your profile details have been saved successfully.', 'success');
  };

  const updateSettings = (updated: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
    showToast('Preferences Saved', 'Your system settings have been updated.', 'success');
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setCourses(INITIAL_COURSES);
    setUser(INITIAL_USER);
    setAssignments(INITIAL_ASSIGNMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSettings(INITIAL_SETTINGS);
    showToast('Demo State Reset', 'All LMS demo data has been refreshed.', 'info');
  };

  return (
    <LMSContext.Provider
      value={{
        user,
        courses,
        assignments,
        notifications,
        settings,
        toasts,
        searchQuery,
        setSearchQuery,
        sidebarOpen,
        setSidebarOpen,
        showToast,
        removeToast,
        enrollCourse,
        unenrollCourse,
        updateCourseProgress,
        toggleLessonCompletion,
        submitAssignment,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotification,
        updateUserProfile,
        updateSettings,
        resetToDefaults
      }}
    >
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = () => {
  const context = useContext(LMSContext);
  if (!context) {
    throw new Error('useLMS must be used within an LMSProvider');
  }
  return context;
};
