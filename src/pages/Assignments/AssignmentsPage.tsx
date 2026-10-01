import React, { useState, useMemo } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Assignment } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { AssignmentSubmitModal } from '../../components/ui/AssignmentSubmitModal';
import {
  FileCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Send,
  Award
} from 'lucide-react';

export const AssignmentsPage: React.FC = () => {
  const { assignments } = useLMS();

  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Submitted' | 'Graded'>('All');
  const [search, setSearch] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const pendingCount = assignments.filter((a) => a.status === 'Pending').length;
  const submittedCount = assignments.filter((a) => a.status === 'Submitted').length;
  const gradedCount = assignments.filter((a) => a.status === 'Graded').length;

  const filteredAssignments = useMemo(() => {
    return assignments.filter((asg) => {
      if (activeTab !== 'All' && asg.status !== activeTab) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = asg.title.toLowerCase().includes(q);
        const matchCourse = asg.course.toLowerCase().includes(q);
        if (!matchTitle && !matchCourse) return false;
      }
      return true;
    });
  }, [assignments, activeTab, search]);

  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'Submitted':
        return <Badge variant="primary">Submitted</Badge>;
      case 'Graded':
        return <Badge variant="success">Graded</Badge>;
      default:
        return <Badge variant="warning">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assignments
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Submit coursework, track evaluation statuses, and review faculty remarks.
          </p>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center p-1 bg-slate-200/70 rounded-xl text-xs font-semibold self-start sm:self-auto">
          {(['All', 'Pending', 'Submitted', 'Graded'] as const).map((tab) => {
            const count =
              tab === 'All'
                ? assignments.length
                : tab === 'Pending'
                ? pendingCount
                : tab === 'Submitted'
                ? submittedCount
                : gradedCount;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by assignment title or course name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="text-xs text-slate-500 shrink-0">
          Showing <strong>{filteredAssignments.length}</strong> assignments
        </div>
      </div>

      {/* Assignments Table (Desktop) & Cards (Mobile) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
        {filteredAssignments.length === 0 ? (
          <div className="p-12 text-center">
            <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No assignments found</h3>
            <p className="text-xs text-slate-500 mt-1">
              There are no assignments matching your current filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 sm:px-6">Assignment</th>
                  <th className="py-3.5 px-4">Course</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Marks</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssignments.map((asg) => (
                  <tr
                    key={asg.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => setSelectedAssignment(asg)}
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                        {asg.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {asg.description}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {asg.course}
                    </td>
                    <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{asg.dueDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">{getStatusBadge(asg.status)}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {asg.status === 'Graded' ? (
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {asg.marks}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">{asg.marks || '-'}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAssignment(asg);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          asg.status === 'Pending'
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                            : asg.status === 'Graded'
                            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {asg.status === 'Pending' ? (
                          <>
                            <Send className="w-3.5 h-3.5" /> Submit / View
                          </>
                        ) : asg.status === 'Graded' ? (
                          <>
                            <Award className="w-3.5 h-3.5" /> View Result
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" /> View Details
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assignment Modal */}
      <AssignmentSubmitModal
        assignment={selectedAssignment}
        isOpen={!!selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
      />
    </div>
  );
};
