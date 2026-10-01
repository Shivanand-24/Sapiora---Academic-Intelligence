import React from 'react';
import { INITIAL_GRADES, GRADE_SUMMARY } from '../../data/grades';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Badge } from '../../components/ui/Badge';
import {
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle,
  FileSpreadsheet,
  Download,
  AlertCircle
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';

export const GradesPage: React.FC = () => {
  const { user, showToast } = useLMS();

  const getGradeBadge = (grade: string) => {
    if (grade.startsWith('A')) return <Badge variant="success">{grade}</Badge>;
    if (grade.startsWith('B')) return <Badge variant="primary">{grade}</Badge>;
    return <Badge variant="warning">{grade}</Badge>;
  };

  const getBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-emerald-500';
    if (percentage >= 80) return 'bg-indigo-600';
    return 'bg-amber-500';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Grades & Transcript
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Official semester performance metrics, subject scores, and credit distribution.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            showToast('Exporting Transcript', 'Official grade transcript generated and ready.', 'success');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Download Transcript (PDF)</span>
        </button>
      </div>

      {/* Overview Cards & Radial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Performance Card */}
        <div className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-200">
              Overall Performance
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">87%</span>
              <span className="text-sm text-indigo-200 font-semibold">Grade A</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-indigo-500/40 relative z-10 flex items-center justify-between text-xs text-indigo-100">
            <span>Cumulative GPA: <strong>{GRADE_SUMMARY.gpa}</strong></span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
              {GRADE_SUMMARY.classRank}
            </span>
          </div>
          {/* Subtle watermark circle */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Total Credits */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Completed Credits
            </span>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">
              {GRADE_SUMMARY.completedCredits} / {GRADE_SUMMARY.totalCredits}
            </div>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-3 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> 82% of degree requirements met
          </p>
        </div>

        {/* Academic Standing */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Academic Standing
            </span>
            <div className="text-3xl font-extrabold text-indigo-600 mt-2">Dean's List</div>
          </div>
          <p className="text-xs text-slate-500 mt-3">High Distinction Honors candidate</p>
        </div>

        {/* Attendance Rate */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Lecture Attendance
            </span>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">
              {GRADE_SUMMARY.attendanceRate}
            </div>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-3 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Above 75% mandatory threshold
          </p>
        </div>
      </div>

      {/* Visual Course Performance Bars (CSS Bar Chart as requested) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Course Performance Visualization
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative benchmark across registered semester courses
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">Target: 80%+</span>
        </div>

        <div className="space-y-5">
          {INITIAL_GRADES.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{item.courseName}</span>
                  <span className="text-[11px] text-slate-400 font-mono">({item.courseCode})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900">{item.percentage}%</span>
                  {getGradeBadge(item.grade)}
                </div>
              </div>

              {/* Custom CSS Bar visualization with benchmark marker at 80% */}
              <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(
                    item.percentage
                  )}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Grade Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Component Score Breakdown</h3>
          <span className="text-xs text-slate-500 font-medium">Current Semester 5</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-6">Course Name</th>
                <th className="py-3 px-4">Credits</th>
                <th className="py-3 px-4">Quizzes (20%)</th>
                <th className="py-3 px-4">Assignments (30%)</th>
                <th className="py-3 px-4">Midterm (25%)</th>
                <th className="py-3 px-4">Final Exam (25%)</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4 sm:px-6 text-right">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_GRADES.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                    {item.courseName}
                    <div className="text-[10px] text-slate-400 font-normal">{item.instructor}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{item.credits}</td>
                  <td className="py-3.5 px-4 text-slate-700">{item.quizzes}%</td>
                  <td className="py-3.5 px-4 text-slate-700">{item.assignments}%</td>
                  <td className="py-3.5 px-4 text-slate-700">{item.midterm}%</td>
                  <td className="py-3.5 px-4 text-slate-700">{item.finalExam}%</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.percentage}%</td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">{getGradeBadge(item.grade)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
