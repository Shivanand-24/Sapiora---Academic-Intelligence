import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SapioraLogo } from '../../components/ui/SapioraLogo';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50 font-sans">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <SapioraLogo size="md" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Forgot your password?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter your registered institutional email to receive recovery instructions.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200/80 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recovery Instructions Sent</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Password reset instructions have been sent to your email: <strong>{email}</strong>.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@sapiora.edu"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Send Reset Link</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
          Remembered your password?{' '}
          <Link
            to="/login"
            className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
