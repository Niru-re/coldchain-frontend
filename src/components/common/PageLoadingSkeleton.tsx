import React from 'react';
import { Truck } from 'lucide-react';

export const PageLoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#F0EEEA] flex flex-col font-sans selection:bg-[#F2AE32]/20">
      {/* Top Telemetry Header Skeleton */}
      <div className="h-16 w-full border-b border-[#D0CEC9] bg-white/90 backdrop-blur-sm px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#06383D] flex items-center justify-center text-white">
            <Truck className="w-4 h-4 text-[#F2AE32]" />
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="font-bold text-[#292D2F]">ColdChain <span className="text-[#F2AE32]">360</span></span>
            <span className="text-[#D0CEC9]">/</span>
            <span className="text-[#A5A5A4] uppercase tracking-wider text-[10px]">INITIALIZING VIEW</span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-[#A5A5A4]">
          <span className="w-2 h-2 rounded-full bg-[#06383D] animate-pulse" />
          <span className="hidden sm:inline text-[11px] font-semibold text-[#292D2F]">TELEMETRY STREAM CONNECTED</span>
        </div>
      </div>

      {/* Main Workspace Skeleton */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-8 space-y-6">
        {/* Title row skeleton */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D0CEC9]/60">
          <div className="space-y-2">
            <div className="h-7 w-64 rounded-lg bg-[#E8E6E2] animate-pulse" />
            <div className="h-4 w-96 rounded bg-[#E8E6E2]/80 animate-pulse" />
          </div>
          <div className="h-9 w-32 rounded-lg bg-[#E8E6E2] animate-pulse" />
        </div>

        {/* 4 Metric KPI Cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-[#D0CEC9] bg-white shadow-2xs space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="h-3 w-24 rounded bg-[#E8E6E2] animate-pulse" />
                <div className="w-6 h-6 rounded-md bg-[#F0EEEA] animate-pulse" />
              </div>
              <div className="h-8 w-20 rounded bg-[#E8E6E2] animate-pulse" />
              <div className="h-3 w-32 rounded bg-[#E8E6E2]/70 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Large Data / Workspace Canvas skeleton */}
        <div className="w-full h-80 rounded-2xl border border-[#D0CEC9] bg-white shadow-2xs p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-[#E0DED9]">
            <div className="h-4 w-48 rounded bg-[#E8E6E2] animate-pulse" />
            <div className="h-8 w-60 rounded-lg bg-[#E8E6E2] animate-pulse" />
          </div>
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="h-8 w-full rounded-lg bg-[#F0EEEA] animate-pulse flex items-center px-4 justify-between">
                <div className="h-3 w-28 rounded bg-[#E8E6E2]" />
                <div className="h-3 w-40 rounded bg-[#E8E6E2]" />
                <div className="h-3 w-20 rounded bg-[#E8E6E2]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
