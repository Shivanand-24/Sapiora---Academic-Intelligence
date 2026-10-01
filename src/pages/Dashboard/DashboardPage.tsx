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
  Flame,
  Sparkles,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Badge } from '../../components/ui/Badge';
import { AssignmentSubmitModal } from '../../components/ui/AssignmentSubmitModal';
import { Assignment } from '../../types';

export const DashboardPage: React.FC = () => {
  const { user, courses, assignments } = useLMS();
  const navigate = useNavigate();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // Filter enrolled courses that are in progress
  const enrolledCourses = courses.filter((c) => c.isEnrolled);

  // The 3 continue learning courses as requested in prompt
  const continueLearningIds = ['full-stack-web-dev', 'machine-learning-fundamentals', 'computer-networks'];
  const continueCourses = courses.filter((c) => continueLearningIds.includes(c.id));

  // Upcoming assignments specified in prompt
  const upcomingAssignments = assignments.slice(0, 3);

  const stats = [
    {
      label: 'Enrolled Courses',
      value: enrolledCourses.length || 6,
      icon: BookOpen,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50/70',
      change: '+2 this month',
    },
    {
      label: 'Completed',
      value: user.completedCount || 2,
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/70',
      change: '100% pass rate',
    },
    {
      label: 'Learning Hours',
      value: `${user.learningHours || 42}h`,
      icon: Clock,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50/70',
      change: 'Top 10% learner',
    },
    {
      label: 'Certificates',
      value: user.certificatesCount || 3,
      icon: Award,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50/70',
      change: 'Verified academic credentials',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      text: 'Completed "HTML Semantic Elements"',
      category: 'Lesson Completed',
      time: 'Today at 09:15 AM',
      icon: CheckCircle2,
      color: 'text-emerald-500 bg-emerald-50',
    },
    {
      id: 2,
      text: 'Earned certificate in Web Fundamentals',
      category: 'Achievement',
      time: 'Yesterday',
      icon: Award,
      color: 'text-purple-500 bg-purple-50',
    },
    {
      id: 3,
      text: 'Submitted React Dashboard Assignment',
      category: 'Assignment',
      time: '2 days ago',
      icon: FileCheck,
      color: 'text-indigo-500 bg-indigo-50',
    },
    {
      id: 4,
      text: 'Completed Machine Learning Quiz',
      category: 'Quiz',
      time: '3 days ago',
      icon: Sparkles,
      color: 'text-amber-500 bg-amber-50',
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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white p-6 sm:p-8 shadow-xl shadow-indigo-950/5">
        <div className="absolute right-0 top-0 w-96 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/15 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-xs">
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Fall Semester 2026 • CSE Department</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Good morning, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
              Ready to continue your learning journey? You are on a 7-day study streak with 2 upcoming assignment milestones.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-indigo-700 font-bold text-sm shadow-md hover:bg-indigo-50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={`p-2.5 rounded-xl ${stat.bgColor} ${stat.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid: Continue Learning + Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Continue Learning</h2>
              <p className="text-xs text-slate-500 mt-0.5">Pick up directly from your most recent topic</p>
            </div>
            <Link
              to="/my-courses"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              View all ({enrolledCourses.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {continueCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold text-white px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs">
                      {course.category}
                    </span>
                  </div>

                  {/* Course Details */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                        {course.title}
                      </h3>
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md shrink-0">
                        {course.progress}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">
                      Instructor: <span className="font-medium text-slate-700">{course.instructor.name}</span>
                    </p>

                    <div className="mt-2.5">
                      <div className="flex justify-between items-center text-[11px] mb-1">
                        <span className="text-slate-500">
                          Next: <strong className="text-slate-800 font-semibold">{course.nextLesson || 'Next Topic'}</strong>
                        </span>
                        <span className="text-slate-400 font-medium">
                          {course.completedLessons || 0} / {course.totalLessons} lessons
                        </span>
                      </div>
                      <ProgressBar progress={course.progress} size="md" color="primary" />
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      type="button"
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-semibold text-xs transition-all shadow-xs cursor-pointer group-hover:bg-indigo-600 group-hover:text-white"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Academic Milestone Alert */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                🎯
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Semester 5 Milestone Check
                </h4>
                <p className="text-xs text-slate-600">
                  You have completed 72% of all requirements before the October midterm break.
                </p>
              </div>
            </div>
            <Link
              to="/grades"
              className="text-xs font-bold text-amber-700 hover:text-amber-900 shrink-0 underline decoration-amber-400 underline-offset-4"
            >
              View Report Card
            </Link>
          </div>
        </div>

        {/* Right Column (1 Col): Upcoming Assignments & Recent Activity */}
        <div className="space-y-6">
          {/* Upcoming Assignments Card */}
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
                  className="p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50/70 transition-all cursor-pointer group"
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
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
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

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
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
                      <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug">
                        {act.text}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-400">{act.time}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[10px] font-medium text-slate-500">{act.category}</span>
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
