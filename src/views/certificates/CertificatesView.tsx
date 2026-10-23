import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { translations, Language } from '../../lib/i18n';
import { Certificate } from '../../types';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Search,
  ExternalLink,
  QrCode,
  FileCheck
} from 'lucide-react';

interface CertificatesViewProps {
  currentLang: Language;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({ currentLang }) => {
  const { user } = useAuth();

  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 'cert_sc_2026_01',
      code: 'SC-SOD-883921',
      studentName: 'Thierry Ishimwe',
      studentId: 'usr_student_1',
      courseTitle: 'Full-Stack Software Development & Modern APIs',
      issueDate: 'October 15, 2026',
      issuerName: 'Eric Manzi, Senior Lead Faculty',
      issuerOrg: 'Kigali Tech Innovation Academy & SmartClass Council',
      grade: 'Distinction (96%)',
      verificationHash: 'e7f82b19c4d9a30281b6c8914f6e',
      isValid: true
    }
  ]);

  const [verifyCode, setVerifyCode] = useState('');
  const [verifyResult, setVerifyResult] = useState<Certificate | null>(null);
  const [verifySearched, setVerifySearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifySearched(true);
    const matched = certificates.find(c => c.code.toLowerCase() === verifyCode.trim().toLowerCase());
    setVerifyResult(matched || null);
  };

  const handlePrint = () => {
    window.print();
  };

  const cert = certificates[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-400" />
          <span>Academic Certificates & Cryptographic Verification</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Accredited credentials awarded upon verified classroom attendance, practical project approvals, and assessment mastery.
        </p>
      </div>

      {/* Verification Tool */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Public Certificate Verification Registry</span>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            placeholder="Enter Certificate ID (e.g. SC-SOD-883921)..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30"
          >
            <Search className="w-4 h-4" />
            <span>Verify Authenticity</span>
          </button>
        </form>

        {verifySearched && (
          <div className="pt-2">
            {verifyResult ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold">Authentic Certificate Verified!</div>
                  <div className="text-[11px] text-emerald-200 mt-0.5">
                    Issued to <strong>{verifyResult.studentName}</strong> for <em>{verifyResult.courseTitle}</em> on {verifyResult.issueDate}. Grade: {verifyResult.grade}.
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-300">
                No matching certificate found for the code provided. Please check the identifier.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Printable Certificate Showcase */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-200">Your Official Certificate</h2>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-blue-400" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Certificate Parchment Frame */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-4 border-amber-500/40 shadow-2xl relative overflow-hidden text-center space-y-6">
          {/* Ornamental corner accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/80" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/80" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/80" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/80" />

          {/* Org Header */}
          <div className="space-y-1">
            <div className="text-amber-400 font-extrabold tracking-widest text-xs uppercase">
              Republic of Rwanda • Technical & Vocational Education (TVET)
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Kigali Tech Innovation Academy & SmartClass Council
            </h3>
            <p className="text-xs text-slate-400">Department of Software Development & Network Engineering</p>
          </div>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

          {/* Recipient */}
          <div className="space-y-1">
            <p className="text-xs text-slate-400 italic">This is to officially certify that</p>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-amber-200">
              {cert.studentName}
            </h4>
            <p className="text-xs text-slate-400">Student ID: {cert.studentId} • Senior 5 SOD</p>
          </div>

          {/* Achievement Description */}
          <div className="max-w-xl mx-auto text-xs text-slate-300 leading-relaxed">
            has successfully fulfilled all curricular requirements, attended live online classrooms, completed sandboxed practical coding projects, and demonstrated distinguished mastery in
            <div className="font-bold text-sm text-amber-300 mt-1">
              {cert.courseTitle}
            </div>
          </div>

          {/* Grade Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs">
            Academic Performance: {cert.grade}
          </div>

          {/* Signatures & Security Hash */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left items-end">
            <div>
              <div className="font-serif italic text-base text-slate-300">{cert.issuerName}</div>
              <div className="w-full h-0.5 bg-slate-700 my-1" />
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Authorized Faculty Dean</div>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="p-2 rounded-xl bg-white p-1.5 inline-block shadow-md">
                <QrCode className="w-12 h-12 text-slate-900" />
              </div>
              <div className="text-[9px] font-mono text-slate-400 mt-1">ID: {cert.code}</div>
            </div>

            <div className="sm:text-right">
              <div className="text-xs text-slate-300 font-medium">{cert.issueDate}</div>
              <div className="w-full h-0.5 bg-slate-700 my-1" />
              <div className="text-[10px] text-slate-400 font-mono">Hash: {cert.verificationHash.slice(0, 16)}...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
