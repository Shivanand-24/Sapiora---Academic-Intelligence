import React, { useState } from 'react';
import { Modal } from './Modal';
import { Assignment } from '../../types';
import { useLMS } from '../../context/LMSContext';
import { Badge } from './Badge';
import { Calendar, CheckCircle2, Clock, FileText, Send, UploadCloud } from 'lucide-react';

interface AssignmentSubmitModalProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AssignmentSubmitModal: React.FC<AssignmentSubmitModalProps> = ({
  assignment,
  isOpen,
  onClose,
}) => {
  const { submitAssignment } = useLMS();
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!assignment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitAssignment(assignment.id, submissionNotes || fileName || 'Project files submitted');
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const getStatusVariant = (status: Assignment['status']) => {
    switch (status) {
      case 'Graded':
        return 'success';
      case 'Submitted':
        return 'primary';
      default:
        return 'warning';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={assignment.title} maxWidth="lg">
      <div className="space-y-5">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
          <Badge variant={getStatusVariant(assignment.status)}>{assignment.status}</Badge>
          <span className="font-semibold text-slate-700">{assignment.course}</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Due: {assignment.dueDate}
          </span>
          <span className="text-slate-300">•</span>
          <span className="font-medium text-slate-700">Max Marks: {assignment.totalMarks || 100}</span>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Assignment Brief & Requirements
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            {assignment.description || 'Complete the assigned task and submit your working solution along with source files or GitHub repository link.'}
          </p>
        </div>

        {/* Graded Details */}
        {assignment.status === 'Graded' && (
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                Evaluation Result
              </span>
              <span className="text-lg font-bold text-emerald-700 bg-white px-3 py-0.5 rounded-lg border border-emerald-200 shadow-xs">
                {assignment.marks}
              </span>
            </div>
            {assignment.feedback && (
              <div className="text-xs text-emerald-900 bg-white/60 p-2.5 rounded-lg border border-emerald-100">
                <span className="font-semibold block mb-0.5">Instructor Feedback:</span>
                {assignment.feedback}
              </div>
            )}
          </div>
        )}

        {/* Submitted Details */}
        {assignment.status === 'Submitted' && (
          <div className="bg-indigo-50/70 border border-indigo-200/70 rounded-xl p-4 text-xs space-y-2 text-indigo-900">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Submission Received
            </div>
            <p className="text-indigo-700">
              Submitted on: <span className="font-medium">{assignment.submittedAt || 'Recently'}</span>
            </p>
            <p className="text-slate-500 italic">
              Status: Under evaluation by faculty. Results will appear under the Grades section.
            </p>
          </div>
        )}

        {/* Submission Form (for Pending) */}
        {assignment.status === 'Pending' && (
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Upload Solution Archive / Document
              </label>
              <div
                onClick={() => {
                  const simulatedFile = 'solution-submission-v1.zip';
                  setFileName(simulatedFile);
                }}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
                  fileName
                    ? 'border-emerald-300 bg-emerald-50/40 text-emerald-800'
                    : 'border-slate-200 hover:border-indigo-400 bg-slate-50/60'
                }`}
              >
                <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${fileName ? 'text-emerald-600' : 'text-slate-400'}`} />
                {fileName ? (
                  <div className="text-xs">
                    <p className="font-semibold text-emerald-800 flex items-center justify-center gap-1">
                      <FileText className="w-4 h-4" /> {fileName}
                    </p>
                    <p className="text-emerald-600 text-[11px] mt-0.5">Ready to submit (Click to replace)</p>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-indigo-600">Click to attach file</span> or drag & drop
                    <p className="text-[11px] text-slate-400 mt-1">ZIP, PDF, DOCX, or TAR.GZ up to 50MB</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                GitHub Repository / Online Demo URL or Comments
              </label>
              <textarea
                rows={3}
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                placeholder="e.g. GitHub URL: https://github.com/shivanand/react-dashboard, live link or notes for the reviewer..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-3.5 h-3.5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Submit Assignment
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {assignment.status !== 'Pending' && (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
