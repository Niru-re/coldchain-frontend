import React, { useState } from 'react';
import { QrCode, Copy, Check, Printer, ShieldCheck, Sparkles, Scan } from 'lucide-react';

interface Props {
  cargoId: string;
  title: string;
  payload: string;
  metaFields: { label: string; value: string }[];
  role: 'farmer' | 'truck' | 'railway' | 'warehouse';
}

export const SharedQRCargoId: React.FC<Props> = ({ cargoId, title, payload, metaFields, role }) => {
  const [copied, setCopied] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateScan = () => {
    setScanned(true);
    setTimeout(() => setScanned(false), 3000);
  };

  return (
    <div className="rounded-xl border border-[#D0CEC9] bg-white p-5 shadow-2xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0DED9] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#06383D] flex items-center justify-center text-white">
            <QrCode className="w-4 h-4 text-[#F2AE32]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#06383D]">ID: {cargoId}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                ENCRYPTED TAMPER SEAL
              </span>
            </div>
            <h3 className="text-base font-bold text-[#292D2F] mt-0.5">{title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateScan}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/90 text-[#0B0E14] text-xs font-bold transition-colors cursor-pointer"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Simulate Gate Scan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        {/* QR Visual Canvas */}
        <div className="sm:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-[#F0EEEA]/60 border border-[#D0CEC9]">
          {/* Stylized High-Density QR Simulation */}
          <div className="w-36 h-36 bg-white p-3 rounded-lg border-2 border-[#06383D] flex flex-col justify-between shadow-xs relative">
            <div className="flex justify-between">
              <div className="w-8 h-8 bg-[#06383D] rounded-xs flex items-center justify-center p-1">
                <div className="w-4 h-4 bg-white rounded-2xs flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#F2AE32]" />
                </div>
              </div>
              <div className="w-8 h-8 bg-[#06383D] rounded-xs flex items-center justify-center p-1">
                <div className="w-4 h-4 bg-white rounded-2xs flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#F2AE32]" />
                </div>
              </div>
            </div>

            {/* Middle QR Noise Matrix */}
            <div className="grid grid-cols-6 gap-1 p-1">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-2xs ${
                    i % 2 === 0 || i % 5 === 0 ? 'bg-[#06383D]' : 'bg-[#D0CEC9]'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between items-end">
              <div className="w-8 h-8 bg-[#06383D] rounded-xs flex items-center justify-center p-1">
                <div className="w-4 h-4 bg-white rounded-2xs flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#F2AE32]" />
                </div>
              </div>
              <span className="text-[8px] font-mono font-bold text-[#A5A5A4]">CC360</span>
            </div>

            {scanned && (
              <div className="absolute inset-0 bg-[#06383D]/90 backdrop-blur-2xs rounded-lg flex flex-col items-center justify-center text-white text-center p-2">
                <ShieldCheck className="w-7 h-7 text-[#F2AE32] mb-1 animate-bounce" />
                <span className="text-[10px] font-mono font-bold">MATCH VERIFIED</span>
                <span className="text-[8px] opacity-80">Tamper Seal Intact</span>
              </div>
            )}
          </div>

          <span className="text-[10px] font-mono text-[#A5A5A4] mt-2 text-center">
            Scan at gate or packhouse terminal
          </span>
        </div>

        {/* Metadata Fields & Payload (Col 8) */}
        <div className="sm:col-span-8 space-y-3 font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {metaFields.map((field, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[#F0EEEA]/60 border border-[#D0CEC9]">
                <span className="text-[10px] text-[#A5A5A4] block uppercase">{field.label}</span>
                <span className="text-xs font-bold text-[#292D2F] truncate block">{field.value}</span>
              </div>
            ))}
          </div>

          {/* Raw Payload Bar */}
          <div className="p-2.5 rounded-lg bg-[#06383D] text-[#F0EEEA] flex items-center justify-between gap-2 text-xs">
            <span className="truncate font-mono text-[11px] text-[#F2AE32]">{payload}</span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
              title="Copy payload"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
