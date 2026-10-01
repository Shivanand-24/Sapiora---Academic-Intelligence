import React, { useState } from 'react';
import { INITIAL_CERTIFICATES } from '../../data/certificates';
import { Certificate } from '../../types';
import { CertificateModal } from '../../components/ui/CertificateModal';
import { useLMS } from '../../context/LMSContext';
import {
  Award,
  Calendar,
  Download,
  Eye,
  CheckCircle2,
  Share2,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const { showToast } = useLMS();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const handleDownload = (cert: Certificate, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCertificate(cert);
    showToast('Download Ready', `Prepared PDF certificate for "${cert.courseName}".`, 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Certificates & Accreditations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Industry and academically verified credentials issued upon 100% course mastery.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/70 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-purple-600" />
            <span>{INITIAL_CERTIFICATES.length} Verified Credentials</span>
          </span>
        </div>
      </div>

      {/* Certificate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INITIAL_CERTIFICATES.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCertificate(cert)}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col group cursor-pointer"
          >
            {/* Certificate Preview Card Header */}
            <div className="relative h-44 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 p-6 flex flex-col justify-between text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                    LearnHub Verified
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-black/30 px-2 py-0.5 rounded text-indigo-200">
                  {cert.credentialId.slice(-6)}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-bold tracking-tight text-white leading-tight">
                  {cert.courseName}
                </h3>
                <p className="text-xs text-indigo-200 mt-1">{cert.title}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Issued: {cert.issueDate}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                  </span>
                </div>

                <div className="text-xs text-slate-600">
                  <span className="text-slate-400 block text-[11px]">Instructor:</span>
                  <span className="font-semibold text-slate-800">{cert.instructor}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] mb-1">Competencies Verified:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(cert)}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDownload(cert, e)}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Credential Verification Banner */}
      <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100/90 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Cryptographically Verifiable</h4>
            <p className="text-xs text-slate-600">
              All LearnHub course completion credentials feature a permanent verification ID for inclusion in LinkedIn and academic resumes.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            showToast('Verification System', 'Public verification registry is online and operational.', 'info');
          }}
          className="text-xs font-bold text-indigo-700 hover:text-indigo-900 shrink-0 bg-white px-3.5 py-2 rounded-xl border border-indigo-200/80 shadow-xs cursor-pointer"
        >
          Verify Credential ID
        </button>
      </div>

      {/* Modal View */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
};
