import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLMS } from '../../context/LMSContext';
import {
  Search,
  Star,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export const ExploreCoursesPage: React.FC = () => {
  const { courses } = useLMS();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(urlSearch);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [levelFilter, setLevelFilter] = useState<string>('All');

  useEffect(() => {
    if (urlSearch) {
      setSearchInput(urlSearch);
    }
  }, [urlSearch]);

  const categories = [
    'All',
    'Programming',
    'AI & ML',
    'Web Development',
    'Networking',
    'Database',
    'Cloud',
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Category filter
      if (activeCategory !== 'All' && course.category !== activeCategory) {
        return false;
      }

      // Level filter
      if (levelFilter !== 'All' && course.level !== levelFilter) {
        return false;
      }

      // Search filter
      const q = searchInput.trim().toLowerCase();
      if (q) {
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchSubtitle = (course.subtitle || '').toLowerCase().includes(q);
        const matchInstructor = course.instructor.name.toLowerCase().includes(q);
        const matchCategory = course.category.toLowerCase().includes(q);
        const matchDescription = course.description.toLowerCase().includes(q);
        const matchLearn = (course.whatYouWillLearn || []).some((item) =>
          item.toLowerCase().includes(q)
        );

        if (!matchTitle && !matchSubtitle && !matchInstructor && !matchCategory && !matchDescription && !matchLearn) {
          return false;
        }
      }

      return true;
    });
  }, [courses, activeCategory, levelFilter, searchInput]);

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    if (val.trim()) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-lg">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Computer Science Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Explore Courses
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Discover courses that help you build future-ready skills. Learn from top faculty and industry experts with hands-on projects.
          </p>

          {/* Search bar inside hero */}
          <div className="pt-2 max-w-lg">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by topic (e.g. React, Python, Cloud)..."
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-11 pr-10 py-3 text-sm bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 rounded-xl border border-white/20 focus:border-white focus:outline-none transition-all placeholder:text-slate-400 shadow-inner"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills & Level Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Level filter */}
        <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span className="font-medium">Level:</span>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Active Search/Filter summary */}
      {(searchInput || activeCategory !== 'All' || levelFilter !== 'All') && (
        <div className="flex items-center justify-between text-xs text-slate-500 bg-indigo-50/60 border border-indigo-100 px-4 py-2 rounded-xl">
          <span>
            Showing <strong>{filteredCourses.length}</strong> matching courses
            {searchInput && <span> for "<strong>{searchInput}</strong>"</span>}
            {activeCategory !== 'All' && <span> in <strong>{activeCategory}</strong></span>}
          </span>
          <button
            onClick={() => {
              handleSearchChange('');
              setActiveCategory('All');
              setLevelFilter('All');
            }}
            className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer underline"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No courses match your criteria</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try searching for terms like "React", "Python", "Networking", or "Machine Learning".
          </p>
          <button
            onClick={() => {
              handleSearchChange('');
              setActiveCategory('All');
              setLevelFilter('All');
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Browse All Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/courses/${course.id}`)}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col cursor-pointer group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 text-slate-800 backdrop-blur-xs shadow-xs">
                    {course.category}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-xs">
                    {course.level}
                  </span>
                </div>

                {course.isEnrolled && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    <CheckCircle className="w-3 h-3" /> Enrolled
                  </div>
                )}

                {/* Bottom stats overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-slate-200">
                    <Users className="w-3.5 h-3.5" />
                    {course.studentsCount.toLocaleString()} students
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {course.subtitle || course.description}
                  </p>

                  {/* Instructor */}
                  <div className="mt-3.5 flex items-center gap-2.5">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    />
                    <div className="min-w-0">
                      <span className="text-xs text-slate-700 font-semibold block truncate">
                        {course.instructor.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {course.instructor.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer / Meta info */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.duration}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-emerald-600">
                      {course.isEnrolled ? 'Enrolled' : course.price}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors">
                    <span>{course.isEnrolled ? 'Open' : 'Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
