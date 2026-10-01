import React from 'react';

interface SapioraLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const SapioraLogo: React.FC<SapioraLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  variant = 'dark',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const subtitleClasses = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Custom Academic Intelligence Symbol: Open book with rising knowledge nexus */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-950/20 shrink-0 border border-indigo-400/20`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-indigo-200"
        >
          {/* Left page */}
          <path
            d="M3.5 18C5.5 16.5 8.5 16.5 12 18V6C8.5 4.5 5.5 4.5 3.5 6V18Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right page */}
          <path
            d="M20.5 18C18.5 16.5 15.5 16.5 12 18V6C15.5 4.5 18.5 4.5 20.5 6V18Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center upward progress spire / intellect beacon */}
          <path
            d="M12 4.5V10.5"
            stroke="#6366F1"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="3" r="1.25" fill="#A5B4FC" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-extrabold tracking-tight ${textClasses[size]} ${
                isLight ? 'text-white' : 'text-slate-900'
              }`}
            >
              SAPIORA
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60 uppercase tracking-wider">
              LMS
            </span>
          </div>
          <span
            className={`font-semibold uppercase tracking-[0.18em] ${subtitleClasses[size]} ${
              isLight ? 'text-indigo-200' : 'text-slate-500'
            } mt-0.5`}
          >
            Academic Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
