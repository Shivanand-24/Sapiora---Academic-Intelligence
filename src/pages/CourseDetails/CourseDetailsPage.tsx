import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLMS } from '../../context/LMSContext';
import {
  Star,
  Users,
  Clock,
  Award,
  CheckCircle,
  Play,
  FileText,
  HelpCircle,
  Code2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Share2,
  Bookmark,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import { Lesson } from '../../types';

export const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, enrollCourse, unenrollCourse, toggleLessonCompletion, showToast } = useLMS();

  // Find target course, or fallback to first course
  const course = courses.find((c) => c.id === courseId) || courses[0];

  // Accordion state for modules
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    'm1': true,
    'm2': true,
    'm3': true,
  });

  // Active lesson preview modal
  const [activeLesson, setActiveLesson] = useState<{
    lesson: Lesson;
    moduleId: string;
    moduleTitle: string;
  } | null>(null);

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-800">Course not found</h2>
        <Link to="/explore" className="text-sm text-indigo-600 hover:underline mt-2 inline-block">
          Return to Explore Courses
        </Link>
      </div>
    );
  }

  const toggleModule = (modId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleEnrollClick = () => {
    if (!course.isEnrolled) {
      enrollCourse(course.id);
    } else {
      showToast('Course Already Enrolled', `You are already enrolled in ${course.title}. Continue learning below.`, 'info');
    }
  };

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return <Play className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600/30" />;
      case 'code':
        return <Code2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'quiz':
        return <HelpCircle className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to courses</span>
        </button>
      </div>

      {/* Large Course Banner Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
        {/* Background gradient & art */}
        <div className={`absolute inset-0 bg-gradient-to-r ${course.bannerGradient} opacity-90`} />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-2xs" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-4xl space-y-5">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
              {course.category}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
              {course.level}
            </span>
            {course.isEnrolled && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500 text-white flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Enrolled
              </span>
            )}
          </div>

          {/* Title and Subtitle */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {course.title}
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed max-w-3xl">
            {course.subtitle || course.description}
          </p>

          {/* Meta Information Bar */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-indigo-100">
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-8 h-8 rounded-full border-2 border-white/50 object-cover"
              />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-indigo-200 block">Instructor</span>
                <span className="font-bold text-white">{course.instructor.name}</span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Star className="w-4 h-4 fill-amber-300" />
              <span>{course.rating}</span>
              <span className="text-indigo-200 font-normal">({course.studentsCount.toLocaleString()} ratings)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-300" />
              <span>{course.duration}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-300" />
              <span>Official Certificate included</span>
            </div>
          </div>

          {/* Action Call to Action */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {!course.isEnrolled ? (
              <button
                type="button"
                onClick={handleEnrollClick}
                className="px-8 py-3.5 rounded-2xl bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Enroll Now • Free
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const firstUncompleted = course.modules
                      .flatMap((m) => m.lessons.map((l) => ({ l, m })))
                      .find((item) => !item.l.completed);
                    if (firstUncompleted) {
                      setActiveLesson({
                        lesson: firstUncompleted.l,
                        moduleId: firstUncompleted.m.id,
                        moduleTitle: firstUncompleted.m.title,
                      });
                    } else {
                      showToast('Course Complete!', 'You have finished all modules in this course.', 'success');
                    }
                  }}
                  className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-xl transition-all cursor-pointer flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Learning</span>
                </button>

                <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20">
                  <div className="text-[11px] font-medium text-indigo-200">Current Progress</div>
                  <div className="text-sm font-bold text-white">{course.progress}% Completed</div>
                </div>

                <button
                  type="button"
                  onClick={() => unenrollCourse(course.id)}
                  className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-100 hover:text-white text-xs font-semibold backdrop-blur-md transition-colors border border-white/20 cursor-pointer"
                  title="Unenroll course so you can demonstrate the Enroll Now flow again"
                >
                  Demo: Unenroll
                </button>
              </div>
            )}

            <button
              onClick={() => {
                navigator.clipboard?.writeText?.(window.location.href);
                showToast('Link Copied', 'Course URL copied to clipboard.', 'info');
              }}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer border border-white/20"
              title="Share course"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Curriculum */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Overview & What you will learn */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Overview */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Course Overview</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {course.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Total Modules</span>
                <span className="text-base font-extrabold text-slate-900">{course.modules.length} Modules</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Total Lessons</span>
                <span className="text-base font-extrabold text-slate-900">{course.totalLessons} Topics</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Difficulty</span>
                <span className="text-base font-extrabold text-slate-900">{course.level}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Pacing</span>
                <span className="text-base font-extrabold text-slate-900">Self-Paced</span>
              </div>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">What You'll Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {course.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Curriculum */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Course Curriculum</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {course.modules.length} modules • {course.totalLessons} lessons • Interactive code labs
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const allOpen = Object.values(openModules).every(Boolean);
                  const next: Record<string, boolean> = {};
                  course.modules.forEach((m) => (next[m.id] = !allOpen));
                  setOpenModules(next);
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                Expand/Collapse All
              </button>
            </div>

            {/* Modules Accordion List */}
            <div className="space-y-3.5">
              {course.modules.map((mod, index) => {
                const isOpen = openModules[mod.id] ?? false;
                const completedCount = mod.lessons.filter((l) => l.completed).length;

                return (
                  <div
                    key={mod.id}
                    className="border border-slate-200/80 rounded-xl overflow-hidden transition-all"
                  >
                    {/* Module Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
                          <span className="text-[11px] text-slate-500">
                            {mod.lessons.length} lessons {course.isEnrolled && `• ${completedCount}/${mod.lessons.length} completed`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Lessons List */}
                    {isOpen && (
                      <div className="divide-y divide-slate-100 bg-white p-1">
                        {mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              {/* Completion toggle */}
                              {course.isEnrolled ? (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLessonCompletion(course.id, mod.id, lesson.id);
                                  }}
                                  className="text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer shrink-0"
                                  title={lesson.completed ? 'Mark uncompleted' : 'Mark completed'}
                                >
                                  {lesson.completed ? (
                                    <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-emerald-500" />
                                  )}
                                </button>
                              ) : (
                                <div className="p-1 rounded-md bg-slate-100">{getLessonIcon(lesson.type)}</div>
                              )}

                              <div
                                onClick={() =>
                                  setActiveLesson({
                                    lesson,
                                    moduleId: mod.id,
                                    moduleTitle: mod.title,
                                  })
                                }
                                className="cursor-pointer min-w-0 flex-1"
                              >
                                <span
                                  className={`text-xs sm:text-sm font-medium transition-colors block truncate ${
                                    lesson.completed
                                      ? 'text-slate-400 line-through'
                                      : 'text-slate-800 group-hover:text-indigo-600'
                                  }`}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 ml-2">
                              <span className="text-[11px] text-slate-400">{lesson.duration}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveLesson({
                                    lesson,
                                    moduleId: mod.id,
                                    moduleTitle: mod.title,
                                  })
                                }
                                className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                              >
                                Launch
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Instructor Card & Course Stats */}
        <div className="space-y-6">
          {/* Enrollment status card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Enrollment Status</h3>
            {course.isEnrolled ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Overall Progress</span>
                  <span className="font-bold text-indigo-700">{course.progress}%</span>
                </div>
                <ProgressBar progress={course.progress} color="primary" size="lg" />
                <p className="text-xs text-slate-500">
                  You have completed {course.completedLessons || 0} of {course.totalLessons} lessons.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  Join {course.studentsCount.toLocaleString()} other engineers mastering this track.
                </p>
                <button
                  type="button"
                  onClick={handleEnrollClick}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Enroll Now
                </button>
              </div>
            )}
          </div>

          {/* Instructor Bio Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Lead Faculty</h3>
            <div className="flex items-center gap-3">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{course.instructor.name}</h4>
                <p className="text-xs text-indigo-600 font-medium">{course.instructor.role}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>4.9 Instructor Rating • 45k+ Students</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Senior academic faculty specializing in high-performance distributed systems, scalable web applications, and interactive modern learning methodologies.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Lesson Launch Modal */}
      {activeLesson && (
        <Modal
          isOpen={!!activeLesson}
          onClose={() => setActiveLesson(null)}
          title={activeLesson.lesson.title}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
              <span className="font-semibold text-indigo-700">{activeLesson.moduleTitle}</span>
              <span>Duration: {activeLesson.lesson.duration}</span>
            </div>

            {/* Video player simulation */}
            <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center text-white shadow-inner">
              <div className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-600 flex items-center justify-center cursor-pointer shadow-lg transform hover:scale-105 transition-all">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-black/50 p-2 rounded-lg backdrop-blur-xs">
                <span>Lecture Stream (1080p 60fps)</span>
                <span>{activeLesson.lesson.duration}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">Lesson Objectives:</span>
              <p>
                Demonstrate core practical patterns, inspect browser developer tools, and review step-by-step code implementation for this topic.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  toggleLessonCompletion(course.id, activeLesson.moduleId, activeLesson.lesson.id);
                  setActiveLesson(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {activeLesson.lesson.completed ? 'Mark Incomplete' : 'Complete & Next Topic'}
              </button>
              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
