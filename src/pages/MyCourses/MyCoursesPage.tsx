import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLMS } from '../../context/LMSContext';
import {
  Search,
  Filter,
  PlayCircle,
  Star,
  BookOpen,
  CheckCircle,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Badge } from '../../components/ui/Badge';

export const MyCoursesPage: React.FC = () => {
  const { courses } = useLMS();
  const navigate = useNavigate();

  // Active tab: 'all' | 'in-progress' | 'completed'
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [progressSort, setProgressSort] = useState<'default' | 'highest' | 'lowest'>('default');

  // Filter only enrolled courses for "My Courses"
  const enrolledCourses = useMemo(() => {
    return courses.filter((c) => c.isEnrolled);
  }, [courses]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    enrolledCourses.forEach((c) => cats.add(c.category));
    return ['All', ...Array.from(cats)];
  }, [enrolledCourses]);

  // Filtered and sorted courses
  const filteredCourses = useMemo(() => {
    return enrolledCourses.filter((course) => {
      // Tab filter
      if (activeTab === 'in-progress' && (course.progress >= 100 || course.progress === 0)) return false;
      if (activeTab === 'completed' && course.progress < 100) return false;

      // Category filter
      if (selectedCategory !== 'All' && course.category !== selectedCategory) return false;

      // Search term
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchTitle = course.title.toLowerCase().includes(query);
        const matchInstructor = course.instructor.name.toLowerCase().includes(query);
        const matchCategory = course.category.toLowerCase().includes(query);
        if (!matchTitle && !matchInstructor && !matchCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (progressSort === 'highest') return b.progress - a.progress;
      if (progressSort === 'lowest') return a.progress - b.progress;
      return 0;
    });
  }, [enrolledCourses, activeTab, selectedCategory, search, progressSort]);

  const inProgressCount = enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100).length;
  const completedCount = enrolledCourses.filter((c) => c.progress >= 100).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Courses
          </h1>
          <p className="text-sm text-slate-500 mt-1">Continue where you left off.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-200/70 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'in-progress'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search enrolled courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Category Pills & Sort */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Progress Sorting */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={progressSort}
              onChange={(e) => setProgressSort(e.target.value as any)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="default">Sort by Default</option>
              <option value="highest">Progress: High to Low</option>
              <option value="lowest">Progress: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No courses match your filter</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or resetting your category filter to view enrolled subjects.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setActiveTab('all');
            }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isCompleted = course.progress >= 100;
            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-slate-800 backdrop-blur-xs shadow-xs">
                      {course.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600/90 text-white backdrop-blur-xs">
                      {course.level}
                    </span>
                  </div>

                  {isCompleted && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      <CheckCircle className="w-3 h-3" /> Completed
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold">{course.completedLessons || 0} / {course.totalLessons} Lessons</span>
                    <span className="flex items-center gap-1 font-bold text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      {course.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {course.subtitle || course.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2.5">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-6 h-6 rounded-full object-cover border border-slate-200"
                      />
                      <span className="text-xs text-slate-600 font-medium">
                        Instructor: <strong className="text-slate-800 font-semibold">{course.instructor.name}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Progress and Continue Button */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="mb-3">
                      <ProgressBar
                        progress={course.progress}
                        showText={true}
                        size="md"
                        color={isCompleted ? 'success' : 'primary'}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition-all shadow-xs cursor-pointer group-hover:bg-indigo-600 group-hover:text-white"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>{isCompleted ? 'Review Course' : 'Continue Learning'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
