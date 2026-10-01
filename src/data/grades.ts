import { GradeItem } from '../types';

export const INITIAL_GRADES: GradeItem[] = [
  {
    id: 'grd-1',
    courseName: 'Web Development',
    courseCode: 'CS501',
    instructor: 'Arun Kumar',
    grade: 'A',
    percentage: 92,
    credits: 4,
    quizzes: 94,
    assignments: 95,
    midterm: 90,
    finalExam: 91
  },
  {
    id: 'grd-2',
    courseName: 'Computer Networks',
    courseCode: 'CS502',
    instructor: 'Rahul Menon',
    grade: 'A-',
    percentage: 88,
    credits: 4,
    quizzes: 86,
    assignments: 90,
    midterm: 88,
    finalExam: 89
  },
  {
    id: 'grd-3',
    courseName: 'Machine Learning',
    courseCode: 'CS503',
    instructor: 'Priya Sharma',
    grade: 'B+',
    percentage: 84,
    credits: 3,
    quizzes: 82,
    assignments: 85,
    midterm: 83,
    finalExam: 86
  },
  {
    id: 'grd-4',
    courseName: 'Database Management Systems (DBMS)',
    courseCode: 'CS504',
    instructor: 'Sunita Narang',
    grade: 'B',
    percentage: 81,
    credits: 4,
    quizzes: 80,
    assignments: 84,
    midterm: 78,
    finalExam: 82
  },
  {
    id: 'grd-5',
    courseName: 'Data Structures & Algorithms',
    courseCode: 'CS505',
    instructor: 'Vikas Deshmukh',
    grade: 'A',
    percentage: 90,
    credits: 4,
    quizzes: 92,
    assignments: 91,
    midterm: 89,
    finalExam: 90
  }
];

export const GRADE_SUMMARY = {
  overallPercentage: 87,
  gpa: '3.82 / 4.0',
  letterGrade: 'A',
  completedCredits: 19,
  totalCredits: 23,
  classRank: 'Top 5%',
  attendanceRate: '96%'
};
