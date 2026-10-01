import React from 'react';
import { Modal } from './Modal';
import { Certificate } from '../../types';
import { Award, CheckCircle, Download, Printer, Share2 } from 'lucide-react';
import { useLMS } from '../../context/LMSContext';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  const { user, showToast } = useLMS();

  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(`https://learnhub.edu/verify/${certificate.credentialId}`);
    showToast('Link Copied', 'Credential verification URL copied to clipboard.', 'success');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="flex flex-col gap-6">
        {/* Certificate Canvas / Container */}
        <div
          id="printable-certificate"
          className="relative bg-gradient-to-br from-amber-50/60 via-white to-slate-50 border-8 border-double border-indigo-900/20 p-8 sm:p-12 rounded-2xl shadow-inner text-center overflow-hidden"
        >
          {/* Subtle watermark / seal icon in background */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-50/50 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-50/50 rounded-full blur-2xl pointer-events-none" />

          {/* Header Branding */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-xl font-bold tracking-tight text-slate-900 leading-none">LearnHub</div>
              <div className="text-[10px] tracking-widest uppercase font-semibold text-indigo-600">
                Academy of Computing
              </div>
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-slate-400 mt-2">
            Official Credential of Completion
          </p>

          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900 mt-4 mb-2 tracking-tight">
            {certificate.title}
          </h2>

          <p className="text-sm text-slate-500 max-w-md mx-auto">
            This certifies that the candidate has successfully demonstrated proficiency and met all rigorous academic standards in
          </p>

          <div className="my-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 tracking-tight">
              {certificate.courseName}
            </h1>
            <div className="mt-3 text-lg font-semibold text-slate-900 border-b-2 border-indigo-300 inline-block px-8 pb-1">
              Awarded to: {user.name}
            </div>
            <p className="text-xs text-slate-400 mt-1">Student ID: {user.studentId}</p>
          </div>

          {/* Skills Covered */}
          <div className="flex flex-wrap justify-center gap-2 my-4">
            {certificate.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-indigo-50/80 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-medium border border-indigo-100"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end mt-8 pt-6 border-t border-slate-200">
            {/* Instructor Signature */}
            <div className="text-center">
              <div className="font-serif italic text-lg text-slate-800 font-bold mb-1">
                {certificate.instructor}
              </div>
              <div className="border-t border-slate-300 pt-1 text-xs text-slate-500">
                Course Lead & Instructor
              </div>
            </div>

            {/* Gold Certified Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-white flex flex-col items-center justify-center shadow-lg border-2 border-amber-200">
                <CheckCircle className="w-6 h-6 stroke-[2.5]" />
                <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">Verified</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-2 font-mono">
                ID: {certificate.credentialId}
              </span>
            </div>

            {/* Issued Date */}
            <div className="text-center">
              <div className="font-medium text-sm text-slate-800 mb-1">{certificate.issueDate}</div>
              <div className="border-t border-slate-300 pt-1 text-xs text-slate-500">
                Date of Issuance
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500">
            Official verifiable digital certificate for academic & professional credit.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Share Link
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={() => {
                showToast('Downloading Certificate', `Downloading PDF for ${certificate.title}...`, 'success');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
