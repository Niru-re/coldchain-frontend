import React, { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle2, AlertTriangle, RefreshCw, Eye, Sparkles, FileImage, ShieldCheck } from 'lucide-react';
import { MOCK_INSPECTION_PRESETS, InspectionResult } from '../../../data/portalMockData';

interface Props {
  inspectionType: 'produce' | 'truck_seal' | 'rail_seal' | 'warehouse_pallet';
  role: 'farmer' | 'truck' | 'railway' | 'warehouse';
  customTitle?: string;
}

export const SharedOpenCVImageInspection: React.FC<Props> = ({ inspectionType, role, customTitle }) => {
  const defaultPreset = MOCK_INSPECTION_PRESETS[inspectionType] || MOCK_INSPECTION_PRESETS.produce;
  const [result, setResult] = useState<InspectionResult>(defaultPreset);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showBboxes, setShowBboxes] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setSelectedImage(dataUrl);
        simulateOpenCVScan(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateOpenCVScan = (imageUrl: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Generate realistic dynamic inspection result
      setResult({
        ...defaultPreset,
        timestamp: new Date().toLocaleTimeString(),
        confidence: Number((95 + Math.random() * 4.5).toFixed(1)),
        defectPercentage: Number((Math.random() * 4.5).toFixed(1)),
        verdict: 'PASS · Premium Grade',
      });
    }, 1000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(defaultPreset);
  };

  return (
    <div className="rounded-xl border border-[#D0CEC9] bg-white p-5 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0DED9] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#06383D] flex items-center justify-center text-white">
            <Camera className="w-4 h-4 text-[#F2AE32]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#292D2F]">
                {customTitle || result.title}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold">
                OPENCV VISION MODEL (SIMULATED DEMO)
              </span>
            </div>
            <p className="text-xs text-[#A5A5A4] font-mono">
              Optical edge detection, surface defect identification & tamper seal inspection
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBboxes(!showBboxes)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors cursor-pointer ${
              showBboxes
                ? 'bg-[#06383D] text-[#F2AE32] border-[#06383D]'
                : 'bg-[#F0EEEA] text-[#292D2F] border-[#D0CEC9]'
            }`}
          >
            {showBboxes ? 'Hide Bounding Boxes' : 'Show Bounding Boxes'}
          </button>
        </div>
      </div>

      {/* Main Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Image Canvas & Upload Box (Col 7) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative aspect-video rounded-xl bg-[#0a0b0c] border-2 border-[#D0CEC9] overflow-hidden flex items-center justify-center group shadow-inner">
            {/* Display Image or Placeholder Pattern */}
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded inspection"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#12161D] to-[#1C232E] text-white p-6 relative">
                {/* Simulated Computer Vision Grid Overlay */}
                <div className="absolute inset-0 bg-industrial-grid opacity-20 pointer-events-none" />
                
                {/* Center Camera UI */}
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                  <Camera className="w-8 h-8 text-[#F2AE32]" />
                </div>
                <div className="text-sm font-bold text-white text-center">
                  Preset Inspection Subject: {defaultPreset.title}
                </div>
                <div className="text-xs text-[#A5A5A4] font-mono mt-1 text-center">
                  Upload any produce, seal, or pallet image to simulate optical analysis
                </div>
              </div>
            )}

            {/* Simulated Bounding Boxes Overlay */}
            {showBboxes && !isProcessing && (
              <div className="absolute inset-0 pointer-events-none">
                {result.simulatedBboxes.map((box, idx) => (
                  <div
                    key={idx}
                    className={`absolute border-2 rounded transition-all duration-300 ${
                      box.severity === 'high'
                        ? 'border-red-500 bg-red-500/20 text-red-300'
                        : box.severity === 'med'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-200'
                        : 'border-[#16803C] bg-[#16803C]/20 text-emerald-200'
                    }`}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.w}%`,
                      height: `${box.h}%`,
                    }}
                  >
                    <span className="absolute -top-5 left-0 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#0a0b0c]/90 text-white whitespace-nowrap shadow-xs">
                      {box.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Processing Spinner */}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20">
                <RefreshCw className="w-8 h-8 text-[#F2AE32] animate-spin mb-3" />
                <span className="text-sm font-bold font-mono">Running OpenCV Optical Pipeline...</span>
                <span className="text-xs text-[#A5A5A4] font-mono">Contour matching · RGB histogram · Feature vectoring</span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#06383D] hover:bg-[#06383D]/90 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#F2AE32]" />
              <span>Upload Subject Photo</span>
            </button>

            {selectedImage && (
              <button
                onClick={handleReset}
                className="px-3 py-2 rounded-lg border border-[#D0CEC9] text-xs font-mono text-[#A5A5A4] hover:text-[#292D2F] cursor-pointer"
              >
                Reset to Preset
              </button>
            )}

            <span className="text-[11px] font-mono text-[#A5A5A4]">
              Supported: JPG, PNG, WEBP (Max 15MB)
            </span>
          </div>
        </div>

        {/* Right: Computer Vision Diagnostics & Verdict (Col 5) */}
        <div className="lg:col-span-5 rounded-xl border border-[#D0CEC9] bg-[#F0EEEA]/50 p-5 space-y-4 font-mono">
          {/* Verdict Banner */}
          <div className="p-3.5 rounded-lg bg-white border border-[#D0CEC9] space-y-1">
            <span className="text-[10px] text-[#A5A5A4] uppercase font-bold block">
              ANALYSIS VERDICT
            </span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#16803C]" />
              <span className="text-base font-black text-[#16803C]">
                {result.verdict}
              </span>
            </div>
            <span className="text-[10px] text-[#A5A5A4] block">
              Scan Timestamp: {result.timestamp} · ID: {result.inspectionId}
            </span>
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white border border-[#D0CEC9]">
              <span className="text-[10px] text-[#A5A5A4] block">CONFIDENCE</span>
              <span className="text-2xl font-black text-[#06383D]">
                {result.confidence}%
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-[#D0CEC9]">
              <span className="text-[10px] text-[#A5A5A4] block">DEFECT RATE</span>
              <span className="text-2xl font-black text-[#16803C]">
                {result.defectPercentage}%
              </span>
            </div>
          </div>

          {/* Features Detected List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#292D2F] block">
              Optical Features Extracted:
            </span>
            <div className="space-y-1.5">
              {result.featuresDetected.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded bg-white border border-[#D0CEC9]/60 text-xs text-[#292D2F]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16803C] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-[#A5A5A4] leading-relaxed border-t border-[#D0CEC9] pt-2">
            <strong>Transparency Notice:</strong> This computer-vision inspection demonstrates how an integrated OpenCV or Edge-AI model validates produce quality or tamper seal integrity in an automated cold chain.
          </div>
        </div>
      </div>
    </div>
  );
};
