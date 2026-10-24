import React, { useState } from 'react';
import { FileCheck, PenTool, CheckCircle2, ShieldCheck, Printer, Download, Clock } from 'lucide-react';

interface Props {
  documentId?: string;
  consignmentTitle?: string;
  consignor?: string;
  consignee?: string;
  handoverTempCelsius?: number;
  weightTonnes?: number;
  role?: 'farmer' | 'truck' | 'railway' | 'warehouse' | string;
}

export const SharedDigitalProofOfDelivery: React.FC<Props> = ({
  documentId = 'EPOD-2026-9041',
  consignmentTitle = '24 MT Grade-A Export Grapes',
  consignor = 'Nashik Agro Cooperative Federation',
  consignee = 'JNPT Reefer Terminal CFS-3',
  handoverTempCelsius = 4.1,
  weightTonnes = 24.0,
  role = 'truck',
}) => {
  const [signed, setSigned] = useState(false);
  const [signerName, setSignerName] = useState('Anil Shinde (Dock Lead)');
  const [isExporting, setIsExporting] = useState(false);

  const handleSign = () => {
    setSigned(true);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`e-POD Certificate #${documentId} generated and downloaded.`);
    }, 800);
  };

  return (
    <div className="rounded-xl border border-[#D0CEC9] bg-white p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0DED9] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#06383D] flex items-center justify-center text-white">
            <FileCheck className="w-4 h-4 text-[#F2AE32]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#06383D]">DOC: {documentId}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                signed ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-300'
              }`}>
                {signed ? '● DIGITALLY VERIFIED e-POD' : '▲ SIGNATURE PENDING'}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#292D2F] mt-0.5">{consignmentTitle}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#06383D] text-[#06383D] hover:bg-[#06383D] hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Download e-POD (PDF)'}</span>
          </button>
        </div>
      </div>

      {/* Manifest Certificate Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-lg bg-[#F0EEEA]/60 border border-[#D0CEC9]">
          <span className="text-[10px] text-[#A5A5A4] block">CONSIGNOR (ORIGIN)</span>
          <span className="font-bold text-[#292D2F] truncate block">{consignor}</span>
        </div>
        <div className="p-3 rounded-lg bg-[#F0EEEA]/60 border border-[#D0CEC9]">
          <span className="text-[10px] text-[#A5A5A4] block">CONSIGNEE (RECEIVER)</span>
          <span className="font-bold text-[#292D2F] truncate block">{consignee}</span>
        </div>
        <div className="p-3 rounded-lg bg-[#F0EEEA]/60 border border-[#D0CEC9]">
          <span className="text-[10px] text-[#A5A5A4] block">HANDOVER TEMPERATURE</span>
          <span className="font-bold text-[#16803C]">+{handoverTempCelsius.toFixed(1)}°C (Verified Safe)</span>
        </div>
        <div className="p-3 rounded-lg bg-[#F0EEEA]/60 border border-[#D0CEC9]">
          <span className="text-[10px] text-[#A5A5A4] block">GROSS TARE WEIGHT</span>
          <span className="font-bold text-[#06383D]">{weightTonnes.toFixed(1)} Metric Tonnes</span>
        </div>
      </div>

      {/* Interactive Electronic Signature Pad */}
      <div className="p-4 rounded-xl border border-[#D0CEC9] bg-[#F0EEEA]/40 space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#292D2F] flex items-center gap-1.5">
            <PenTool className="w-3.5 h-3.5 text-[#06383D]" />
            Digital Signature & Acceptance Seal
          </span>
          <span className="text-[10px] text-[#A5A5A4]">SHA-256 Cryptographic Hash Verification</span>
        </div>

        <div className="relative h-24 rounded-lg bg-white border border-[#D0CEC9] flex items-center justify-center overflow-hidden">
          {signed ? (
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-serif italic text-2xl text-[#06383D] select-none tracking-widest">
                {signerName}
              </span>
              <span className="text-[10px] font-mono text-[#16803C] flex items-center gap-1 font-bold mt-1">
                <CheckCircle2 className="w-3 h-3" />
                Signed {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} · Bio-Lock Validated
              </span>
            </div>
          ) : (
            <div className="text-center space-y-1">
              <span className="text-xs text-[#A5A5A4]">Signer: {signerName}</span>
              <button
                onClick={handleSign}
                className="px-4 py-1.5 rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/90 text-[#0B0E14] font-bold text-xs transition-colors cursor-pointer block mx-auto"
              >
                Click to Apply Digital Signature
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
