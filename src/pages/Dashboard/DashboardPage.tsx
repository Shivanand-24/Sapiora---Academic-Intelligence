import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLMS } from '../../context/LMSContext';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  PlayCircle,
  Calendar,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Flame
} from 'lucide-react';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Badge } from '../../components/ui/Badge';
import { AssignmentSubmitModal } from '../../components/ui/AssignmentSubmitModal';
import { Assignment } from '../../types';

export const DashboardPage: React.FC = () => {
  const { user, courses, assignments } = useLMS();
  const navigate = useNavigate();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // Filter enrolled courses
  const enrolledCourses = courses.filter((c) => c.isEnrolled);

  // The 3 continue learning courses with consistent horizontal layout
  const continueLearningIds = ['full-stack-web-dev', 'machine-learning-fundamentals', 'computer-networks'];
  const continueCourses = courses.filter((c) => continueLearningIds.includes(c.id));

  // Upcoming assignments
  const upcomingAssignments = assignments.slice(0, 3);

  // Refined Statistics Cards as specified
  const stats = [
    {
      label: 'Enrolled Courses',
      value: '6',
      supporting: '+2 this semester',
      icon: BookOpen,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50/80',
    },
    {
      label: 'Courses Completed',
      value: '2',
      supporting: '2 completed this semester',
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/80',
    },
    {
      label: 'Learning Hours',
      value: '42h',
      supporting: '+8h this month',
      icon: Clock,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50/80',
    },
    {
      label: 'Certificates',
      value: '3',
      supporting: '3 credentials earned',
      icon: Award,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-slate-100',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      text: 'Completed "HTML Semantic Elements"',
      category: 'Curriculum Progress',
      time: 'Today at 09:15 AM',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 2,
      text: 'Earned certificate in Web Fundamentals',
      category: 'Verified Credential',
      time: 'Yesterday',
      icon: Award,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      id: 3,
      text: 'Submitted React Dashboard Assignment',
      category: 'Coursework Evaluation',
      time: '2 days ago',
      icon: FileCheck,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      id: 4,
      text: 'Completed Machine Learning Quiz',
      category: 'Assessment',
      time: '3 days ago',
      icon: Sparkles,
      color: 'text-amber-600 bg-amber-50',
    },
  ];

  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'Submitted':
        return <Badge variant="primary">Submitted</Badge>;
      case 'Graded':
        return <Badge variant="success">Graded</Badge>;
      default:
        return <Badge variant="warning">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      {/* Refined, Elegant Compact Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-lg border border-slate-800">
        {/* Soft background shapes */}
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-bl from-indigo-500/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-10 right-20 w-48 h-48 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            {/* Subtle academic status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
              <span>Fall Semester 2026 · CSE Department</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Good morning, {user.name.split(' ')[0]}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Continue building your knowledge today. You have maintained a 7-day academic study streak.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/explore-courses"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer group"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/my-courses"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all cursor-pointer"
            >
              <span>View My Learning</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Refined Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={`p-2 rounded-xl ${stat.bgColor} ${stat.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-slate-500 font-medium">
                {stat.supporting}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Continue Learning + Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Left Column (2 Cols): Continue Learning */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Continue Learning</h2>
              <p className="text-xs text-slate-500 mt-0.5">Pick up directly from your current academic lessons</p>
            </div>
            <Link
              to="/my-courses"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              View all ({enrolledCourses.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Premium Horizontal Cards with Consistent Heights */}
          <div className="space-y-3.5">
            {continueCourses.map((course) => {
              const currentLesson =
                course.id === 'full-stack-web-dev'
                  ? 'React Hooks & State Architecture'
                  : course.nextLesson || 'Curriculum Module';
              
              const progressVal =
                course.id === 'full-stack-web-dev' && !course.isEnrolled
                  ? 43
                  : course.progress || 43;

              const completedLessonsCount =
                course.id === 'full-stack-web-dev'
                  ? 9
                  : course.completedLessons || 8;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:border-indigo-300/80 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group min-h-[110px]"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/60">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {course.category}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 font-medium">
                          Instructor: <strong className="text-slate-800">{course.instructor.name}</strong>
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                        {course.title}
                      </h3>

                      <div className="text-xs text-slate-500 truncate">
                        Continue: <strong className="text-slate-800 font-semibold">{currentLesson}</strong>
                      </div>

                      {/* Progress bar + counts */}
                      <div className="pt-1.5 flex items-center gap-3 max-w-md">
                        <div className="flex-1">
                          <ProgressBar progress={progressVal} size="sm" color="primary" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 shrink-0">
                          {progressVal}%
                        </span>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          ({completedLessonsCount} / {course.totalLessons} lessons)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 group-hover:bg-indigo-600 text-slate-700 group-hover:text-white font-bold text-xs transition-colors border border-slate-200/80 group-hover:border-transparent cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (1 Col): Upcoming Assignments & Recent Activity */}
        <div className="space-y-6">
          {/* Upcoming Assignments Panel */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Upcoming Assignments</h3>
              </div>
              <Link
                to="/assignments"
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
              >
                All ({assignments.length})
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingAssignments.map((asg) => (
                <div
                  key={asg.id}
                  onClick={() => setSelectedAssignment(asg)}
                  className="p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                        {asg.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{asg.course}</p>
                    </div>
                    {getStatusBadge(asg.status)}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Due: {asg.dueDate}
                    </span>
                    <span className="text-indigo-600 font-semibold group-hover:underline">
                      {asg.status === 'Pending' ? 'Submit →' : 'View →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
              <span className="text-[11px] text-slate-400 font-medium">Last 7 days</span>
            </div>

            <div className="relative pl-6 space-y-3.5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="relative group">
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${act.color} ring-4 ring-white`}
                    >
                      <Icon className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                        {act.text}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                        <span>{act.time}</span>
                        <span>•</span>
                        <span className="font-medium text-slate-500">{act.category}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Submit / View Modal */}
      <AssignmentSubmitModal
        assignment={selectedAssignment}
        isOpen={!!selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
      />
    </div>
  );
};
