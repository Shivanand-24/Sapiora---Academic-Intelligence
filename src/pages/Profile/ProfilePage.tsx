import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { EditProfileModal } from '../../components/ui/EditProfileModal';
import {
  User,
  Mail,
  GraduationCap,
  Hash,
  BookOpen,
  Award,
  Clock,
  Edit3,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, courses } = useLMS();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const completedCourses = courses.filter((c) => c.progress >= 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Cover Gradient */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        </div>

        {/* Profile Info Overlay */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              {/* Avatar Initials Circle */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-extrabold text-3xl sm:text-4xl flex items-center justify-center border-4 border-white shadow-xl">
                {user.avatar || 'SK'}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {user.name}
                  </h1>
                  <span className="p-1 rounded-full bg-emerald-50 text-emerald-600" title="Verified Student">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-sm font-semibold text-indigo-600">{user.role}</p>
                <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  {user.department} • {user.semester}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer self-center sm:self-auto"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Bio statement */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1 text-xs uppercase tracking-wider text-slate-400">
              Student Statement
            </span>
            {user.bio}
          </div>
        </div>
      </div>

      {/* 3 Core Stats (As required: Courses Completed: 6, Certificates: 3, Learning Hours: 42) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Courses Completed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {user.completedCount || 6}
            </span>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Across CS tracks</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Certificates
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {user.certificatesCount || 3}
            </span>
            <p className="text-[11px] text-purple-600 font-medium mt-0.5">Verified Credentials</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Learning Hours
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {user.learningHours || 42}h
            </span>
            <p className="text-[11px] text-amber-600 font-medium mt-0.5">Active Study Time</p>
          </div>
        </div>
      </div>

      {/* Grid: Academic Identity & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Academic Identity Details */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span>Academic Credentials</span>
          </h3>

          <div className="space-y-3 divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500">Student Roll / ID</span>
              <span className="font-mono font-bold text-slate-900">{user.studentId}</span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-slate-500">Institutional Email</span>
              <span className="font-medium text-slate-800">{user.email}</span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-slate-500">Department</span>
              <span className="font-medium text-slate-800">{user.department}</span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-slate-500">Academic Standing</span>
              <span className="font-bold text-emerald-600">Dean's Honor List (GPA {user.overallGpa})</span>
            </div>
          </div>
        </div>

        {/* Technical Skills & Competencies */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Skills & Competencies</span>
            </h3>
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              + Add Skill
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Course-verified skills demonstrating theoretical and project proficiency.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1.5 rounded-xl font-semibold border border-indigo-100 shadow-2xs hover:bg-indigo-100 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </div>
  );
};
