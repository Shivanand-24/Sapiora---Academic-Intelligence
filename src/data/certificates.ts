import { Certificate } from '../types';

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Certificate of Excellence',
    courseName: 'Web Fundamentals',
    issueDate: 'August 18, 2026',
    credentialId: 'LH-CERT-2026-88421',
    instructor: 'Arun Kumar',
    skills: ['HTML5', 'CSS3', 'Responsive Design', 'Web Accessibility'],
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'cert-2',
    title: 'Professional Certificate',
    courseName: 'Python Programming',
    issueDate: 'July 24, 2026',
    credentialId: 'LH-CERT-2026-77319',
    instructor: 'Ananya Rao',
    skills: ['Python 3', 'Object-Oriented Programming', 'Data Structures', 'File I/O'],
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'cert-3',
    title: 'Foundational Specialization',
    courseName: 'AI Fundamentals',
    issueDate: 'June 15, 2026',
    credentialId: 'LH-CERT-2026-66102',
    instructor: 'Priya Sharma',
    skills: ['Machine Learning', 'Linear Algebra', 'Model Evaluation', 'Scikit-Learn'],
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&q=80'
  }
];
