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
  X,
  Sparkles
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { SapioraLogo } from '../ui/SapioraLogo';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { user, notifications } = useLMS();
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  const learningNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Courses', path: '/my-courses', icon: BookOpen },
    { label: 'Explore Courses', path: '/explore-courses', icon: Compass },
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

  const systemNavItems = [
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
        end={item.path === '/dashboard'}
        className={({ isActive }) =>
          `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all group ${
            isActive
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/90'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <div className="flex items-center gap-3">
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </div>
            {item.badge !== undefined && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
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
      {/* Brand Header with Custom Logo */}
      <div className="p-5 flex items-center justify-between border-b border-slate-100">
        <NavLink to="/dashboard" onClick={onCloseMobile} className="block">
          <SapioraLogo size="md" />
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

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
        {/* LEARNING */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            LEARNING
          </div>
          <nav className="space-y-1">{learningNavItems.map(renderNavLink)}</nav>
        </div>

        {/* COMMUNICATION */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            COMMUNICATION
          </div>
          <nav className="space-y-1">{commNavItems.map(renderNavLink)}</nav>
        </div>

        {/* SYSTEM */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            SYSTEM
          </div>
          <nav className="space-y-1">{systemNavItems.map(renderNavLink)}</nav>
        </div>
      </div>

      {/* Bottom Student Profile Card */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/50">
        <NavLink
          to="/profile"
          onClick={onCloseMobile}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-all border border-transparent hover:border-slate-200/80 group shadow-none hover:shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-700 flex items-center justify-center text-white text-xs font-bold shadow-xs">
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
