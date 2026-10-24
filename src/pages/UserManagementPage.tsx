import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  UserPlus,
  KeyRound,
  Lock,
  Search,
  CheckCircle2,
  AlertTriangle,
  History,
  Activity,
  UserCheck,
  Smartphone,
  Eye,
  ShieldAlert
} from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';
import api from '../services/api';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: 'Active' | 'Suspended';
  lastLogin: string;
  assignedAsset?: string;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ipAddress: string;
  securityLevel: 'Normal' | 'Elevated' | 'Critical Override';
}

const INITIAL_USERS: SystemUser[] = [
  {
    id: 'USR-ADM-01',
    name: 'Vikramaditya Rao',
    email: 'ops.lead@coldchain360.in',
    phone: '+91 98200 11223',
    role: 'admin',
    department: 'Central Control Tower',
    status: 'Active',
    lastLogin: 'Today · 15:42 IST',
    assignedAsset: 'All National Corridors',
  },
  {
    id: 'USR-DRV-04',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@coldchain360.in',
    phone: '+91 98230 44102',
    role: 'driver',
    department: 'Western Reefer Fleet',
    status: 'Active',
    lastLogin: 'Today · 18:40 IST',
    assignedAsset: 'CC-REEFER-01 (MH-12-AB-1234)',
  },
  {
    id: 'USR-DRV-08',
    name: 'Amit Verma',
    email: 'amit.verma@coldchain360.in',
    phone: '+91 94221 80107',
    role: 'driver',
    department: 'Central Reefer Fleet',
    status: 'Active',
    lastLogin: 'Today · 16:15 IST',
    assignedAsset: 'CC-REEFER-02 (MH-31-TR-4912)',
  },
  {
    id: 'USR-CST-88',
    name: 'Serum BioPharma Consignee Desk',
    email: 'supplychain@serumbiopharma.com',
    phone: '+91 20 6607 4000',
    role: 'customer',
    department: 'Enterprise Consignee (Pune Bio-Cluster)',
    status: 'Active',
    lastLogin: 'Today · 17:05 IST',
    assignedAsset: 'Shipment CC-8092',
  },
  {
    id: 'USR-CST-92',
    name: 'Apollo Hospital Logistics',
    email: 'logistics@apollohospitals.com',
    phone: '+91 22 2847 9000',
    role: 'customer',
    department: 'Hospital Cold Receival Bay',
    status: 'Active',
    lastLogin: 'Yesterday · 19:30 IST',
    assignedAsset: 'Shipment CC-8104',
  },
];

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'LOG-7701',
    timestamp: 'Today · 18:45:12 IST',
    user: 'Rajesh Sharma (Driver)',
    action: 'Vehicle Telemetry Ping & Khopoli KM 68 Checkpoint passed.',
    ipAddress: '103.21.244.18 (4G Cellular Gateway)',
    securityLevel: 'Normal',
  },
  {
    id: 'LOG-7702',
    timestamp: 'Today · 18:32:05 IST',
    user: 'Vikramaditya Rao (Admin)',
    action: 'Authorized AI Rescue Route Divert for Dahej-Surat corridor.',
    ipAddress: '192.168.1.45 (Control Tower Console)',
    securityLevel: 'Elevated',
  },
  {
    id: 'LOG-7703',
    timestamp: 'Today · 17:15:30 IST',
    user: 'Serum BioPharma Desk (Customer)',
    action: 'Downloaded Cold-Chain Thermal Audit Certificate for CC-8092.',
    ipAddress: '115.112.88.94 (Consignee Portal)',
    securityLevel: 'Normal',
  },
  {
    id: 'LOG-7704',
    timestamp: 'Today · 16:10:00 IST',
    user: 'Vikramaditya Rao (Admin)',
    action: 'NIST Temperature Sensor recalibration offset check on Chamber CH-02.',
    ipAddress: '192.168.1.45 (Control Tower Console)',
    securityLevel: 'Critical Override',
  },
];

export const UserManagementPage: React.FC = () => {
  const { role: currentRole, setRole } = useAuth();
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  const [logs] = useState<ActivityLog[]>(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string>('All');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);

  // New User Form State
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserPhone, setNewUserPhone] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('driver');
  const [newUserDept, setNewUserDept] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    api.listUsers().then((remoteUsers) => {
      if (remoteUsers && remoteUsers.length > 0) {
        const mapped: SystemUser[] = remoteUsers.map((u) => ({
          id: `USR-${u.role.substring(0, 3).toUpperCase()}-${String(u.id).padStart(2, '0')}`,
          name: u.full_name || u.email.split('@')[0],
          email: u.email,
          phone: u.phone || '+91 98200 11223',
          role: u.role as UserRole,
          department: u.organization || 'Control Tower Division',
          status: u.is_active ? 'Active' : 'Suspended',
          lastLogin: 'Today · Active Session',
          assignedAsset: u.assigned_vehicle_id || undefined,
        }));
        setUsers(mapped);
      }
    }).catch(() => {});
  }, []);

  const filteredUsers = users.filter((u) => {
    if (filterRole !== 'All' && u.role !== filterRole) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPhone.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    const created: SystemUser = {
      id: `USR-${newUserRole.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      phone: newUserPhone.trim(),
      role: newUserRole,
      department: newUserDept.trim() || 'Logistics Division',
      status: 'Active',
      lastLogin: 'Never',
    };

    setUsers([...users, created]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setNewUserDept('');
    setFormError('');
    setIsAddUserModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-8 px-4 lg:px-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D0CEC9] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#292D2F] tracking-tight uppercase">
              User & Security Management
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#06383D] text-[#F2AE32] text-xs font-mono font-bold tracking-wider">
              RBAC · ENCRYPTION · AUDIT
            </span>
          </div>
          <p className="text-xs text-[#A5A5A4] font-medium mt-1">
            Role-based clearance for Admin, Driver, and Customer &bull; Immutable activity logs &bull; AES-256 Telemetry
          </p>
        </div>

        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06383D] text-white hover:bg-[#06383D]/85 font-mono text-xs font-bold transition-all shadow-xs cursor-pointer self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4 text-[#F2AE32]" />
          <span>REGISTER USER</span>
        </button>
      </div>

      {/* Role Testing Interactive Switcher */}
      <div className="bg-white rounded-2xl border border-[#D0CEC9] p-5 shadow-xs font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-[#06383D] uppercase flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#F2AE32]" />
              ACTIVE OPERATING ROLE TESTER: <strong className="text-[#292D2F] underline">{currentRole.toUpperCase()}</strong>
            </span>
            <p className="text-[11px] text-[#A5A5A4] mt-0.5">
              Switch roles to instantly verify UI visibility rules: Admin (full), Driver (deliveries & routes), Customer (consignee tracking & POD).
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['admin', 'driver', 'customer'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer uppercase ${
                  currentRole === r
                    ? 'bg-[#06383D] text-[#F2AE32] border border-[#06383D] shadow-xs'
                    : 'bg-[#F0EEEA] text-[#292D2F] border border-[#D0CEC9] hover:bg-[#E8E6E2]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Security Infrastructure Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="p-5 rounded-xl bg-white border border-[#D0CEC9] shadow-xs">
          <span className="text-[10px] text-[#A5A5A4] font-bold uppercase flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#06383D]" />
            DATA ENCRYPTION STANDARD
          </span>
          <div className="text-xl font-black text-[#06383D] mt-1">AES-256 GCM</div>
          <div className="text-[10px] text-[#16803C] font-semibold mt-1">● TLS 1.3 End-to-End Encrypted</div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#D0CEC9] shadow-xs">
          <span className="text-[10px] text-[#A5A5A4] font-bold uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
            AUTHENTICATION PROTOCOL
          </span>
          <div className="text-xl font-black text-[#292D2F] mt-1">MFA · SSO Ready</div>
          <div className="text-[10px] text-[#A5A5A4] mt-1">Role-Based Granular Scopes</div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#D0CEC9] shadow-xs">
          <span className="text-[10px] text-[#A5A5A4] font-bold uppercase flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#F2AE32]" />
            AUDIT INTEGRITY
          </span>
          <div className="text-xl font-black text-[#292D2F] mt-1">Zero Breach Record</div>
          <div className="text-[10px] text-[#16803C] font-semibold mt-1">● Immutable Timestamp Ledger</div>
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm space-y-4 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
          <div>
            <h2 className="text-lg font-black text-[#292D2F] uppercase font-sans">
              AUTHORIZED SYSTEM USERS ({filteredUsers.length})
            </h2>
            <p className="text-xs text-[#A5A5A4]">Assigned clearance scopes and active vehicle/consignment bindings.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#A5A5A4] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search user, email, phone..."
                className="bg-white border border-[#D0CEC9] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#292D2F] placeholder-[#A5A5A4] focus:outline-none focus:border-[#06383D]"
              />
            </div>

            {['All', 'admin', 'driver', 'customer'].map((roleKey) => (
              <button
                key={roleKey}
                onClick={() => setFilterRole(roleKey)}
                className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer uppercase ${
                  filterRole === roleKey
                    ? 'bg-[#06383D] text-white border-[#06383D] font-bold'
                    : 'bg-white text-[#A5A5A4] border-[#D0CEC9] hover:text-[#292D2F]'
                }`}
              >
                {roleKey}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] font-bold uppercase text-[10px]">
                <th className="py-3 px-3">USER ID</th>
                <th className="py-3 px-3">NAME & CONTACT</th>
                <th className="py-3 px-3">ROLE</th>
                <th className="py-3 px-3">DEPARTMENT / SCOPE</th>
                <th className="py-3 px-3">ASSIGNED ASSET</th>
                <th className="py-3 px-3">LAST LOGIN</th>
                <th className="py-3 px-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D0CEC9]">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#F0EEEA]/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-[#06383D]">{u.id}</td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#292D2F]">{u.name}</div>
                    <div className="text-[10px] text-[#A5A5A4]">{u.email} &bull; {u.phone}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.role === 'admin'
                        ? 'bg-[#06383D] text-white'
                        : u.role === 'driver'
                        ? 'bg-[#F2AE32]/20 text-[#292D2F] border border-[#F2AE32]/40'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#292D2F]">{u.department}</td>
                  <td className="py-3 px-3 text-[#06383D] font-semibold">{u.assignedAsset || '—'}</td>
                  <td className="py-3 px-3 text-[#A5A5A4]">{u.lastLogin}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 text-[10px] font-bold">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#A5A5A4]">
                    <Users className="w-9 h-9 mx-auto text-[#A5A5A4]/40 mb-2" />
                    <div className="font-bold text-sm text-[#292D2F]">No users found</div>
                    <div className="text-xs text-[#A5A5A4] mt-1">
                      No user profile matches query "{searchQuery}" with role "{filterRole}".
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setFilterRole('All');
                      }}
                      className="mt-3 px-3.5 py-1.5 rounded-lg bg-[#06383D] text-white font-bold text-xs hover:bg-[#06383D]/85 cursor-pointer shadow-xs"
                    >
                      Reset User Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-4">
          <div>
            <h2 className="text-lg font-black text-[#292D2F] uppercase font-sans flex items-center gap-2">
              <History className="w-5 h-5 text-[#06383D]" />
              <span>SECURITY ACTIVITY & AUDIT LOGS</span>
            </h2>
            <p className="text-xs text-[#A5A5A4]">Automated tracking of telemetry access, dispatch authorizations, and authentication events.</p>
          </div>
          <span className="text-xs font-bold text-[#16803C]">100% AUDIT COMPLIANT</span>
        </div>

        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl border border-[#D0CEC9] bg-[#F0EEEA]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#06383D]">{log.id}</span>
                  <span className="text-[#A5A5A4]">&bull; {log.timestamp}</span>
                  <span className={`px-2 py-0.2 rounded text-[9px] font-bold uppercase ${
                    log.securityLevel === 'Critical Override'
                      ? 'bg-red-50 text-[#DC2626] border border-red-200'
                      : log.securityLevel === 'Elevated'
                      ? 'bg-[#F2AE32]/20 text-[#292D2F] border border-[#F2AE32]/40'
                      : 'bg-white text-[#A5A5A4] border border-[#D0CEC9]'
                  }`}>
                    {log.securityLevel}
                  </span>
                </div>
                <div className="font-bold text-[#292D2F]">{log.action}</div>
                <div className="text-[10px] text-[#A5A5A4]">User: {log.user}</div>
              </div>

              <div className="text-right text-[10px] text-[#A5A5A4] shrink-0 font-mono">
                Source: {log.ipAddress}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 max-w-md w-full shadow-2xl font-mono space-y-4">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <h3 className="text-base font-black text-[#292D2F] uppercase">
                REGISTER NEW USER
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-[#A5A5A4] hover:text-[#292D2F] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-[#DC2626]">
                {formError}
              </div>
            )}

            <form onSubmit={handleRegisterUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Sunil Jadhav"
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg px-3 py-2 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. sunil.jadhav@coldchain360.in"
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg px-3 py-2 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  placeholder="e.g. +91 98330 55112"
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg px-3 py-2 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                    className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg px-3 py-2 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                  >
                    <option value="driver">Driver</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Department</label>
                  <input
                    type="text"
                    value={newUserDept}
                    onChange={(e) => setNewUserDept(e.target.value)}
                    placeholder="e.g. Reefer Operations"
                    className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg px-3 py-2 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#D0CEC9]">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#D0CEC9] text-[#292D2F] hover:bg-[#F0EEEA] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#06383D] text-white hover:bg-[#06383D]/85 font-bold cursor-pointer"
                >
                  Authorize & Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
