import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  Bell,
  Moon,
  Shield,
  User,
  Save,
  RotateCcw,
  CheckCircle,
  Eye,
  Key,
  Globe,
  Sliders
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, settings, updateSettings, updateUserProfile, resetToDefaults, showToast } = useLMS();

  const [passwordState, setPasswordState] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const handleToggle = (key: keyof typeof settings) => {
    const updatedVal = !settings[key];
    updateSettings({ [key]: updatedVal });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordState.current) {
      showToast('Password Error', 'Please enter your current password.', 'warning');
      return;
    }
    if (passwordState.newPass !== passwordState.confirm) {
      showToast('Password Error', 'New passwords do not match.', 'error');
      return;
    }
    showToast('Security Updated', 'Your LMS portal password was changed successfully.', 'success');
    setPasswordState({ current: '', newPass: '', confirm: '' });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Account & System Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your personal preferences, alerts, system appearance, and authentication security.
          </p>
        </div>

        <button
          type="button"
          onClick={resetToDefaults}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer border border-rose-200 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Section 1: Profile Settings */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <User className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Profile Settings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Student Legal Name</label>
              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred Language</label>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold cursor-pointer"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Registered Department</label>
              <input
                type="text"
                value={user.department}
                readOnly
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Notifications */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Notification Preferences</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="font-bold text-slate-800 block text-sm">
                  Email Notifications for Grades & Results
                </span>
                <p className="text-slate-500 text-xs">
                  Receive email alerts when faculty grade your submitted project.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('emailNotifications')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  settings.emailNotifications ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-1 border-t border-slate-100">
              <div>
                <span className="font-bold text-slate-800 block text-sm">
                  Assignment Due Reminders
                </span>
                <p className="text-slate-500 text-xs">
                  Trigger automated reminders 48 hours before project submission deadlines.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('assignmentReminders')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  settings.assignmentReminders ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.assignmentReminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-1 border-t border-slate-100">
              <div>
                <span className="font-bold text-slate-800 block text-sm">
                  Course Announcements
                </span>
                <p className="text-slate-500 text-xs">
                  Get notified when instructors post new lab material or discussion threads.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('courseAnnouncements')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  settings.courseAnnouncements ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.courseAnnouncements ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Appearance */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <Moon className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Appearance & Layout</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="font-bold text-slate-800 block text-sm">Compact Course Card View</span>
                <p className="text-slate-500 text-xs">
                  Condense spacing across course catalogs to display more items per row.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('compactView')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  settings.compactView ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.compactView ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-1 border-t border-slate-100">
              <div>
                <span className="font-bold text-slate-800 block text-sm">Display Theme</span>
                <p className="text-slate-500 text-xs">Modern educational high-contrast palette.</p>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                {(['light', 'dark', 'system'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      updateSettings({ theme: t });
                      showToast('Theme Changed', `Display theme updated to ${t}.`, 'info');
                    }}
                    className={`px-3 py-1 rounded-lg font-bold text-xs capitalize cursor-pointer transition-all ${
                      settings.theme === t
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Security */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Security & Authentication</h2>
          </div>

          <div className="space-y-4 text-xs">
            {/* 2FA Toggle */}
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="font-bold text-slate-800 block text-sm">Two-Factor Authentication (2FA)</span>
                <p className="text-slate-500 text-xs">
                  Enforce an authenticator code prompt upon student login.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('twoFactorAuth')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  settings.twoFactorAuth ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Change password form */}
            <form onSubmit={handlePasswordSubmit} className="pt-3 border-t border-slate-100 space-y-3">
              <span className="font-bold text-slate-800 block text-sm">Change Portal Password</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordState.current}
                  onChange={(e) =>
                    setPasswordState((p) => ({ ...p, current: e.target.value }))
                  }
                  className="p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordState.newPass}
                  onChange={(e) =>
                    setPasswordState((p) => ({ ...p, newPass: e.target.value }))
                  }
                  className="p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordState.confirm}
                  onChange={(e) =>
                    setPasswordState((p) => ({ ...p, confirm: e.target.value }))
                  }
                  className="p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
