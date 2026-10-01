import { NotificationItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Assignment Due Reminder',
    message: 'Your React Dashboard assignment is due in 2 days (Oct 3, 2026).',
    time: '2 hours ago',
    type: 'assignment',
    isRead: false,
    link: '/assignments'
  },
  {
    id: 'notif-2',
    title: 'Course Completed!',
    message: 'Congratulations! You completed Web Fundamentals with an A grade.',
    time: 'Yesterday',
    type: 'achievement',
    isRead: false,
    link: '/certificates'
  },
  {
    id: 'notif-3',
    title: 'New Course Available',
    message: 'New course available: Generative AI Essentials with industry certificates.',
    time: '2 days ago',
    type: 'course',
    isRead: false,
    link: '/explore'
  },
  {
    id: 'notif-4',
    title: 'Assignment Graded',
    message: 'Your assignment "SQL Query Optimization Challenge" has been graded: 92/100.',
    time: '3 days ago',
    type: 'grade',
    isRead: true,
    link: '/assignments'
  },
  {
    id: 'notif-5',
    title: 'Upcoming Midterm Exam',
    message: 'Midterm exams schedule for Semester 5 has been published on the Calendar.',
    time: '4 days ago',
    type: 'general',
    isRead: true,
    link: '/calendar'
  }
];
