import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLMS } from '../../context/LMSContext';
import { SapioraLogo } from '../../components/ui/SapioraLogo';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, showToast } = useLMS();
  const navigate = useNavigate();

  const [email, setEmail] = useState('student@sapiora.edu');
  const [password, setPassword] = useState('student123');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid email or password. Please verify your credentials or use the demo login.');
      }
    }, 450);
  };

  const handleQuickDemoLogin = () => {
    setEmail('student@sapiora.edu');
    setPassword('student123');
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      login('student@sapiora.edu', 'student123');
      setIsLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 font-sans">
      {/* LEFT SIDE: Brand/Academic Visual Section */}
      <div className="lg:w-1/2 bg-slate-900 text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Soft abstract technology/academic background graphics */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/25 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-indigo-900/40 via-purple-900/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#312E81_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

        {/* Top Branding */}
        <div className="relative z-10">
          <SapioraLogo variant="light" size="lg" />
        </div>

        {/* Center Academic Manifesto & Graphics */}
        <div className="relative z-10 my-12 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Modern University Learning Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Learn with purpose.<br />
            <span className="text-indigo-400">Build your future.</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A modern academic learning platform designed to help students learn, track progress, and achieve more through curriculum-driven intelligence.
          </p>

          {/* Academic Highlights Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300">Continuous Assessment & GPA Analytics</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300">Faculty-Led Hands-on Engineering Labs</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300">Cryptographically Verified Credentials</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300">Structured Academic Milestones</span>
            </div>
          </div>
        </div>

        {/* Bottom Institutional Info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-slate-800/60">
          <span>SAPIORA Academic Intelligence v2.4</span>
          <span>Fall Semester 2026</span>
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Form Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-7">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500">
              Sign in to continue your learning journey.
            </p>
          </div>

          {/* Demo Login Alert / Quick Autofill */}
          <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Demo Credentials
              </span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline underline-offset-2 cursor-pointer"
              >
                1-Click Demo Login
              </button>
            </div>
            <div className="text-slate-600 font-mono text-[11px] space-y-0.5">
              <div>Email: <strong className="text-slate-900">student@sapiora.edu</strong></div>
              <div>Password: <strong className="text-slate-900">student123</strong></div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Institutional Email
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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-600 font-medium">Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating credentials...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social or SSO Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-3 text-slate-400 font-bold tracking-wider">
                OR
              </span>
            </div>
          </div>

          {/* Continue with Google button */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-100/80 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 transition-colors flex items-center justify-center gap-2.5 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google / Institutional SSO</span>
          </button>

          {/* Bottom link to Register */}
          <div className="text-center pt-2 text-xs text-slate-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
