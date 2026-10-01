import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  FileCheck,
  GraduationCap,
  Award,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  User,
  GraduationCap as LogoIcon,
  X,
  Sparkles,
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { user, notifications } = useLMS();
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  const mainNavItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'My Courses', path: '/my-courses', icon: BookOpen },
    { label: 'Explore Courses', path: '/explore', icon: Compass },
    { label: 'Assignments', path: '/assignments', icon: FileCheck },
    { label: 'Grades', path: '/grades', icon: GraduationCap },
    { label: 'Certificates', path: '/certificates', icon: Award },
    { label: 'Calendar', path: '/calendar', icon: Calendar },
  ];

  const commNavItems = [
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: Bell,
      badge: unreadNotifsCount > 0 ? unreadNotifsCount : undefined,
    },
  ];

  const bottomNavItems = [
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Student Profile', path: '/profile', icon: User },
  ];

  const renderNavLink = (item: {
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={onCloseMobile}
        end={item.path === '/'}
        className={({ isActive }) =>
          `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
            isActive
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <div className="flex items-center gap-3">
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                }`}
              />
              <span>{item.label}</span>
            </div>
            {item.badge !== undefined && (
              <span
                className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-white text-indigo-700'
                    : 'bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200'
                }`}
              >
                {item.badge}
              </span>
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside className="w-64 h-full flex flex-col bg-white border-r border-slate-200/90 select-none">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-100">
        <NavLink to="/" onClick={onCloseMobile} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <LogoIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                LearnHub
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5 tracking-wide">
              Learn. Grow. Achieve.
            </p>
          </div>
        </NavLink>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Area */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
        {/* Main Section */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Learning Portal
          </div>
          <nav className="space-y-1">{mainNavItems.map(renderNavLink)}</nav>
        </div>

        {/* Communication Section */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Updates & Chat
          </div>
          <nav className="space-y-1">{commNavItems.map(renderNavLink)}</nav>
        </div>

        {/* Quick Semester Info Card */}
        <div className="mx-1 p-3.5 rounded-xl bg-gradient-to-br from-indigo-50/70 to-purple-50/50 border border-indigo-100/80">
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>MWP Mini-Project</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            E-Learning Management System demo ready for faculty review.
          </p>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="p-3.5 border-t border-slate-100 space-y-1 bg-slate-50/40">
        {bottomNavItems.map(renderNavLink)}

        {/* Student Mini Avatar Card */}
        <NavLink
          to="/profile"
          onClick={onCloseMobile}
          className="mt-2 flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/90 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
            {user.avatar || 'SK'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
              {user.name}
            </div>
            <div className="text-[11px] text-slate-500 truncate">{user.role}</div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
