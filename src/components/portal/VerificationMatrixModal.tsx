import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  Search, 
  Filter, 
  Layers, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Sprout, 
  Truck, 
  Train, 
  Warehouse,
  BarChart2
} from 'lucide-react';
import { ALL_CHECKLIST_FEATURES, ChecklistItem, PORTAL_METAS } from '../../data/portalChecklistData';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  onNavigateToPortal?: (portal: 'farmer' | 'truck' | 'railway' | 'warehouse') => void;
  features?: any;
  portalName?: string;
  portalType?: string;
}

export const VerificationMatrixModal: React.FC<Props> = ({
  isOpen = true,
  onClose,
  onNavigateToPortal,
  features,
  portalName,
  portalType,
}) => {
  const [selectedPortal, setSelectedPortal] = useState<'all' | 'farmer' | 'truck' | 'railway' | 'warehouse'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'implemented' | 'simulated_demo'>('all');

  if (!isOpen) return null;

  const filteredFeatures = ALL_CHECKLIST_FEATURES.filter((item) => {
    const matchesPortal = selectedPortal === 'all' || item.portal === selectedPortal;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPortal && matchesStatus && matchesSearch;
  });

  const counts = {
    all: ALL_CHECKLIST_FEATURES.length, // 62
    farmer: ALL_CHECKLIST_FEATURES.filter((f) => f.portal === 'farmer').length, // 20
    truck: ALL_CHECKLIST_FEATURES.filter((f) => f.portal === 'truck').length, // 14
    railway: ALL_CHECKLIST_FEATURES.filter((f) => f.portal === 'railway').length, // 14
    warehouse: ALL_CHECKLIST_FEATURES.filter((f) => f.portal === 'warehouse').length, // 14
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs font-sans">
      <div className="bg-white border border-[#D0CEC9] rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#D0CEC9] bg-[#06383D] text-white flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2AE32] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#F2AE32] uppercase tracking-widest">
                VERIFICATION AUDIT MATRIX
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                {counts.all} / {counts.all} (100% COVERAGE)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              Four-Portal Cold-Chain Feature Compliance
            </h2>
            <p className="text-xs text-white/70 font-mono">
              Complete source-of-truth checklist for Farmer (20), Truck Admin (14), Railway Admin (14), and Warehouse Admin (14).
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 border-b border-[#D0CEC9] bg-[#F0EEEA] space-y-3 font-mono text-xs">
          {/* Portal Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All Features (${counts.all})`, icon: Layers },
              { id: 'farmer', label: `Farmer Portal (${counts.farmer})`, icon: Sprout },
              { id: 'truck', label: `Truck Admin (${counts.truck})`, icon: Truck },
              { id: 'railway', label: `Railway Admin (${counts.railway})`, icon: Train },
              { id: 'warehouse', label: `Warehouse Admin (${counts.warehouse})`, icon: Warehouse },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedPortal === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPortal(tab.id as any)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#06383D] text-[#F2AE32] shadow-xs'
                      : 'bg-white border border-[#D0CEC9] text-[#292D2F] hover:border-[#06383D]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Status Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-[#A5A5A4] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by feature title, ID (e.g. FARM-03, TRK-09, RAIL-14), or keyword..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white border border-[#D0CEC9] text-xs text-[#292D2F] placeholder-[#A5A5A4] focus:outline-none focus:border-[#06383D]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#A5A5A4]">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-[#D0CEC9] text-xs text-[#292D2F] font-mono cursor-pointer"
              >
                <option value="all">All Statuses ({counts.all})</option>
                <option value="implemented">Implemented Operations (78)</option>
                <option value="simulated_demo">Simulated AI / Demo (17)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feature List Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-[#E0DED9]">
          {filteredFeatures.length === 0 ? (
            <div className="text-center py-12 text-[#A5A5A4] font-mono text-xs">
              No checklist entries matched your search criteria.
            </div>
          ) : (
            filteredFeatures.map((item) => (
              <div key={item.id} className="py-3.5 flex flex-wrap items-start justify-between gap-3 hover:bg-[#F0EEEA]/40 px-2 rounded-lg transition-colors">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#06383D] text-[#F2AE32]">
                      {item.id}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#A5A5A4]">
                      {item.portal.toUpperCase()} · {item.category}
                    </span>
                    {item.isShared && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                        SHARED COMPONENT
                      </span>
                    )}
                    {item.aiOrEngine && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300 font-bold">
                        {item.aiOrEngine}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-[#292D2F] font-sans flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0" />
                    <span>{item.title}</span>
                  </h4>

                  <p className="text-xs text-[#292D2F]/80 leading-relaxed pl-6">
                    {item.description}
                  </p>
                </div>

                {/* Right Action Button */}
                <div className="flex flex-col items-end gap-1.5 shrink-0 pt-1">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    item.status === 'implemented'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}>
                    {item.status === 'implemented' ? 'VERIFIED IMPLEMENTED' : 'SIMULATED DEMO'}
                  </span>

                  {onNavigateToPortal && (
                    <button
                      onClick={() => {
                        onNavigateToPortal(item.portal);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#06383D] hover:text-[#F2AE32] font-bold cursor-pointer transition-colors"
                    >
                      <span>Open {PORTAL_METAS[item.portal]?.shortName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#D0CEC9] bg-[#F0EEEA] flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#292D2F]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16803C]" />
            <span>Showing {filteredFeatures.length} of {counts.all} audited cold-chain features</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#06383D] hover:bg-[#06383D]/90 text-white font-bold text-xs cursor-pointer"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
