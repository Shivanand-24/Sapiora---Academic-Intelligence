import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User as UserIcon,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { user, notifications, searchQuery, setSearchQuery, markNotificationAsRead, resetToDefaults } = useLMS();
  const navigate = useNavigate();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter((n) => !n.isRead);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchDropdown(false);
    navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left Area: Mobile Menu + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div ref={searchRef} className="relative w-full max-w-md">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Search courses, instructors, topics..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-indigo-500/40 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Quick Search Preview Dropdown */}
          {showSearchDropdown && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2.5 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Quick Search Suggestion
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSearchDropdown(false);
                  navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
                }}
                className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-indigo-500" />
                <span>
                  Search courses for <strong className="text-slate-900">"{searchQuery}"</strong>
                </span>
              </button>

              <div className="mt-1 pt-1 border-t border-slate-100">
                <div className="px-2.5 py-1 text-[10px] text-slate-400">Popular suggestions:</div>
                <div className="flex flex-wrap gap-1 px-2 pb-1">
                  {['React', 'Full Stack', 'Machine Learning', 'Python', 'Networking'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        setShowSearchDropdown(false);
                        navigate(`/explore?search=${encodeURIComponent(tag)}`);
                      }}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Area: Actions + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Reset Demo State Button */}
        <button
          type="button"
          onClick={resetToDefaults}
          title="Reset demo data to initial defaults"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-indigo-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Reset Demo</span>
        </button>

        {/* Notifications Icon & Popover */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">Notifications</span>
                  {unreadNotifs.length > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      {unreadNotifs.length} new
                    </span>
                  )}
                </div>
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifMenu(false)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View all
                </Link>
              </div>

              <div className="py-2 max-h-72 overflow-y-auto space-y-1">
                {notifications.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      markNotificationAsRead(item.id);
                      if (item.link) {
                        setShowNotifMenu(false);
                        navigate(item.link);
                      }
                    }}
                    className={`p-2.5 rounded-xl cursor-pointer transition-colors text-left ${
                      !item.isRead ? 'bg-indigo-50/50 hover:bg-indigo-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-slate-900 leading-tight">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.message}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-center">
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifMenu(false)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Go to Notification Center →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Student Profile Badge */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
            {user.avatar || 'SK'}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {user.name}
            </div>
            <div className="text-[11px] text-slate-500 leading-tight">{user.role}</div>
          </div>
        </Link>
      </div>
    </header>
  );
};
