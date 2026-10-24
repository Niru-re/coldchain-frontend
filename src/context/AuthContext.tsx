import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

export type UserRole = 
  | 'farmer' 
  | 'truck_admin' 
  | 'railway_admin' 
  | 'warehouse_admin' 
  | 'admin' 
  | 'driver' 
  | 'customer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  clearanceLevel: string;
  organization?: string;
  location?: string;
  assignedVehicleId?: string;
  assignedShipmentId?: string;
}

interface AuthContextType {
  role: UserRole;
  user: UserProfile;
  setRole: (role: UserRole) => void;
  login: (role: UserRole, email?: string, password?: string) => Promise<boolean> | void;
  logout: () => void;
}

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  farmer: {
    id: 'USR-FAR-01',
    name: 'Ramesh Deshmukh',
    email: 'ramesh.deshmukh@agrocoop.in',
    phone: '+91 98221 55678',
    role: 'farmer',
    avatar: 'RD',
    clearanceLevel: 'Verified Agro Producer · Class A1',
    organization: 'Deshmukh Agro Producer Cooperative',
    location: 'Ratnagiri, Maharashtra',
  },
  truck_admin: {
    id: 'USR-TRK-01',
    name: 'Vikramaditya Rao',
    email: 'truck.admin@coldchain360.in',
    phone: '+91 98200 11223',
    role: 'truck_admin',
    avatar: 'VR',
    clearanceLevel: 'National Fleet Director · Reefer Division',
    organization: 'ColdChain 360 Highway Logistics',
    location: 'Nagpur Multi-Modal Hub',
  },
  railway_admin: {
    id: 'USR-RAIL-01',
    name: 'Ashok Meena',
    email: 'kisan.rail@coldchain360.in',
    phone: '+91 94140 22334',
    role: 'railway_admin',
    avatar: 'AM',
    clearanceLevel: 'Chief Freight Controller · Kisan Rail Network',
    organization: 'Western & Central DFC Logistics Division',
    location: 'Bhusawal & JNPT Rail Terminal',
  },
  warehouse_admin: {
    id: 'USR-WHS-01',
    name: 'Sunita Kulkarni',
    email: 'warehouse.lead@coldchain360.in',
    phone: '+91 98212 99881',
    role: 'warehouse_admin',
    avatar: 'SK',
    clearanceLevel: 'General Manager · Cold Storage & CA Chambers',
    organization: 'Apex Mega Cold Chain Terminal',
    location: 'Bhiwandi Cold Logistics Park',
  },
  admin: {
    id: 'USR-ADM-01',
    name: 'Vikramaditya Rao',
    email: 'ops.lead@coldchain360.in',
    phone: '+91 98200 11223',
    role: 'admin',
    avatar: 'VR',
    clearanceLevel: 'Chief Dispatcher · National Ops',
    organization: 'ColdChain 360 HQ',
    location: 'Mumbai Command Center',
  },
  driver: {
    id: 'USR-DRV-04',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@coldchain360.in',
    phone: '+91 98230 44102',
    role: 'driver',
    avatar: 'RS',
    clearanceLevel: 'Master Heavy Hauler · Cold Reefer',
    organization: 'ColdChain 360 Express',
    location: 'NH-48 Corridor',
    assignedVehicleId: 'CC-REEFER-01',
    assignedShipmentId: 'CC-8092',
  },
  customer: {
    id: 'USR-CST-88',
    name: 'Serum BioPharma Logistics Desk',
    email: 'supplychain@serumbiopharma.com',
    phone: '+91 20 6607 4000',
    role: 'customer',
    avatar: 'SB',
    clearanceLevel: 'Enterprise Consignee (Pune Bio-Cluster)',
    organization: 'Serum BioPharma Ltd.',
    location: 'Pune Bio Park',
    assignedShipmentId: 'CC-8092',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('cc360_user_role') as UserRole | null;
    if (saved && saved in DEFAULT_USERS) {
      return saved;
    }
    return 'admin';
  });

  const [user, setUser] = useState<UserProfile>(DEFAULT_USERS[role]);

  useEffect(() => {
    setUser(DEFAULT_USERS[role]);
    localStorage.setItem('cc360_user_role', role);
  }, [role]);

  useEffect(() => {
    const token = localStorage.getItem('cc360_access_token');
    if (token) {
      api.getCurrentUser().then((me) => {
        if (me && me.role) {
          const validatedRole = (me.role in DEFAULT_USERS ? me.role : 'admin') as UserRole;
          setRoleState(validatedRole);
          setUser({
            id: `USR-${validatedRole.substring(0, 3).toUpperCase()}-${String(me.id).padStart(2, '0')}`,
            name: me.full_name || me.email.split('@')[0],
            email: me.email,
            role: validatedRole,
            phone: me.phone || '+91 98200 11223',
            avatar: (me.full_name ? me.full_name.substring(0, 2) : me.email.substring(0, 2)).toUpperCase(),
            clearanceLevel: me.clearance_level || 'System Administrator',
            organization: me.organization || 'ColdChain 360 HQ',
            location: me.location || 'Central Operations',
          });
        }
      }).catch(() => {
        // Token may be expired or offline
      });
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole in DEFAULT_USERS) {
      setUser(DEFAULT_USERS[newRole]);
    }
  };

  const login = async (newRole: UserRole, email?: string, password?: string) => {
    if (email) {
      try {
        const authData = await api.login(email, password || 'ColdChain2026!');
        if (authData && authData.access_token) {
          try {
            const me = await api.getCurrentUser();
            if (me && me.role) {
              const validatedRole = (me.role in DEFAULT_USERS ? me.role : 'admin') as UserRole;
              setRoleState(validatedRole);
              setUser({
                id: `USR-${validatedRole.substring(0, 3).toUpperCase()}-${String(me.id).padStart(2, '0')}`,
                name: me.full_name || me.email.split('@')[0],
                email: me.email,
                role: validatedRole,
                phone: me.phone || '+91 98200 11223',
                avatar: (me.full_name ? me.full_name.substring(0, 2) : me.email.substring(0, 2)).toUpperCase(),
                clearanceLevel: me.clearance_level || 'System Administrator',
                organization: me.organization || 'ColdChain 360 HQ',
                location: me.location || 'Central Operations',
              });
              localStorage.setItem('cc360_user_role', validatedRole);
              return true;
            }
          } catch {
            setRoleState(newRole);
            if (newRole in DEFAULT_USERS) setUser(DEFAULT_USERS[newRole]);
            return true;
          }
        }
      } catch (err: any) {
        console.warn('Backend authentication error:', err);
        throw err;
      }
    } else {
      setRoleState(newRole);
      if (newRole in DEFAULT_USERS) setUser(DEFAULT_USERS[newRole]);
      return true;
    }
    return false;
  };

  const logout = () => {
    api.logout();
    setRoleState('admin');
  };

  return (
    <AuthContext.Provider value={{ role, user, setRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
