import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  AlertTriangle,
  CheckCircle2,
  LifeBuoy,
  MessageSquare,
  ShieldCheck,
  Headphones,
  FileQuestion
} from 'lucide-react';

interface SupportTicket {
  id: string;
  subject: string;
  category: 'Thermal Excursion' | 'Delivery Delay' | 'Proof of Delivery' | 'General Inquiry';
  priority: 'Critical Emergency' | 'High' | 'Normal';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdTime: string;
}

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-9901',
    subject: 'Compressor check verification on CC-REEFER-03 Dahej-Surat',
    category: 'Thermal Excursion',
    priority: 'Critical Emergency',
    status: 'In Progress',
    createdTime: 'Today · 17:40 IST',
  },
  {
    id: 'TCK-9884',
    subject: 'Request signed proof of delivery copy for Shipment CC-8077',
    category: 'Proof of Delivery',
    priority: 'Normal',
    status: 'Resolved',
    createdTime: 'Today · 14:30 IST',
  },
  {
    id: 'TCK-9860',
    subject: 'Chamber CH-02 humidity sensor NIST calibration inquiry',
    category: 'General Inquiry',
    priority: 'High',
    status: 'Resolved',
    createdTime: 'Yesterday · 11:15 IST',
  },
];

export const SupportPage: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [shipmentId, setShipmentId] = useState<string>('');
  const [category, setCategory] = useState<SupportTicket['category']>('Thermal Excursion');
  const [priority, setPriority] = useState<SupportTicket['priority']>('High');
  const [message, setMessage] = useState<string>('');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, email, and message details.');
      return;
    }

    const ticketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      id: ticketId,
      subject: `${category} request: ${shipmentId ? `Shipment ${shipmentId}` : name}`,
      category,
      priority,
      status: 'Open',
      createdTime: 'Just now',
    };

    setTickets([newTicket, ...tickets]);
    setSubmittedTicketId(ticketId);
    setName('');
    setEmail('');
    setPhone('');
    setShipmentId('');
    setMessage('');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-8 px-4 lg:px-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D0CEC9] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#292D2F] tracking-tight uppercase">
              Support & Contact
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#06383D] text-[#F2AE32] text-xs font-mono font-bold tracking-wider">
              24/7 COLD-CHAIN DISPATCH HELPDESK
            </span>
          </div>
          <p className="text-xs text-[#A5A5A4] font-medium mt-1">
            Emergency thermal rescue hotline &bull; Driver road assistance &bull; Consignee delivery coordination
          </p>
        </div>
      </div>

      {/* Emergency Hotline Banner */}
      <div className="p-6 rounded-2xl bg-[#06383D] text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F2AE32] text-[#292D2F] flex items-center justify-center shrink-0">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-[#F2AE32] font-bold uppercase tracking-wider">
              EMERGENCY COLD-CHAIN RESCUE TOLL-FREE
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
              +91 1800-COLD-360 <span className="text-sm font-mono text-[#F0EEEA]/70 font-normal">/ (1800-2653-360)</span>
            </div>
            <p className="text-xs text-[#F0EEEA]/80 mt-1">
              Immediate escalation to Regional Control Towers for reefer breakdown, thermal diversion, or security support.
            </p>
          </div>
        </div>

        <a
          href="tel:+9118002653360"
          className="px-6 py-3 rounded-xl bg-[#F2AE32] text-[#292D2F] hover:bg-[#F2AE32]/90 font-bold text-xs font-mono transition-all shadow-sm shrink-0 self-start md:self-auto"
        >
          CALL DISPATCH HOTLINE
        </a>
      </div>

      {/* Main Split: Contact Form + Helpdesk / Hub Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-mono">
        
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D0CEC9] p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-[#D0CEC9] pb-4">
            <h2 className="text-xl font-black text-[#292D2F] uppercase font-sans">
              SUBMIT SUPPORT INQUIRY / INCIDENT
            </h2>
            <p className="text-xs text-[#A5A5A4]">Our dispatch team responds within 15 minutes for critical temperature alerts.</p>
          </div>

          {submittedTicketId && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#16803C] space-y-1">
              <strong className="block text-sm">✓ Support Ticket Logged: {submittedTicketId}</strong>
              <p>Your inquiry has been assigned to the active duty Regional Dispatcher. A confirmation SMS/Email has been dispatched.</p>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#DC2626]">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anand Deshmukh"
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-xl px-3.5 py-2.5 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. anand@pharma-logistics.com"
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-xl px-3.5 py-2.5 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98200 44551"
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-xl px-3.5 py-2.5 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Shipment / Waybill ID (Optional)</label>
                <input
                  type="text"
                  value={shipmentId}
                  onChange={(e) => setShipmentId(e.target.value)}
                  placeholder="e.g. CC-8092"
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-xl px-3.5 py-2.5 text-[#292D2F] focus:outline-none focus:border-[#06383D] uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-xl px-3.5 py-2.5 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                >
                  <option value="Thermal Excursion">Thermal Excursion / Temperature Spike</option>
                  <option value="Delivery Delay">Delivery Delay / Traffic Stuck</option>
                  <option value="Proof of Delivery">Proof of Delivery / Invoice Audit</option>
                  <option value="General Inquiry">General Cold-Chain Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Priority Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-xl px-3.5 py-2.5 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                >
                  <option value="Critical Emergency">Critical Emergency (Immediate Spoilage Risk)</option>
                  <option value="High">High Priority</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Detailed Message / Instructions</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe current reefer issue, route coordinate, or recipient dock requirement..."
                className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-xl px-3.5 py-2.5 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-[#06383D] text-white hover:bg-[#06383D]/85 text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#F2AE32]" />
              <span>SUBMIT DISPATCH INQUIRY</span>
            </button>
          </form>
        </div>

        {/* Right Directory & Recent Tickets (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Regional Control Hubs Contact Directory */}
          <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-[#292D2F] uppercase font-sans border-b border-[#D0CEC9] pb-3">
              REGIONAL CONTROL TOWERS
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] space-y-1">
                <div className="font-bold text-[#06383D]">Mumbai & Western Fleet Tower</div>
                <div className="text-[#292D2F]">Bhiwandi Cold Logistics Park Gate 3, MH</div>
                <div className="text-[11px] text-[#A5A5A4]">Direct: +91 22 2849 1100 &bull; west@coldchain360.in</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] space-y-1">
                <div className="font-bold text-[#06383D]">Nagpur Zero-Mile Heartland Tower</div>
                <div className="text-[#292D2F]">MIHAN Industrial SEZ, Nagpur</div>
                <div className="text-[11px] text-[#A5A5A4]">Direct: +91 712 2580 440 &bull; central@coldchain360.in</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] space-y-1">
                <div className="font-bold text-[#06383D]">Northern Pharma Staging Depot</div>
                <div className="text-[#292D2F]">Baddi Industrial Area, Himachal Pradesh</div>
                <div className="text-[11px] text-[#A5A5A4]">Direct: +91 1795 244 890 &bull; north@coldchain360.in</div>
              </div>
            </div>
          </div>

          {/* Active Support Tickets */}
          <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <h3 className="text-sm font-black text-[#292D2F] uppercase font-sans">
                ACTIVE INCIDENT TICKETS
              </h3>
              <span className="text-xs text-[#06383D] font-bold">{tickets.length} Registered</span>
            </div>

            <div className="space-y-2.5">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl border border-[#D0CEC9] bg-[#F0EEEA]/40 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#06383D]">{t.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      t.status === 'Resolved'
                        ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                        : 'bg-[#F2AE32]/20 text-[#292D2F] border border-[#F2AE32]/40'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <div className="font-bold text-[#292D2F] truncate">{t.subject}</div>
                  <div className="flex justify-between text-[10px] text-[#A5A5A4]">
                    <span>Priority: {t.priority}</span>
                    <span>{t.createdTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
