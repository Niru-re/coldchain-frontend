/**
 * ColdChain 360 API Client
 * Centralized service module connecting frontend to FastAPI backend.
 */

import { Shipment, WarehouseNode, FleetVehicle } from '../types';
import { CropBatch, MandiRate, RailwayTrainRake, InspectionResult } from '../data/portalMockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface AuthTokens {
  access_token: string;
  token_type: string;
}

export interface UserAccount {
  id: number;
  email: string;
  role: string;
  full_name?: string;
  phone?: string;
  organization?: string;
  location?: string;
  avatar?: string;
  clearance_level?: string;
  assigned_vehicle_id?: string;
  is_active: boolean;
  created_at: string;
}

export interface DashboardKPIs {
  active_shipments: number;
  critical_alerts: number;
  fleet_active_count: number;
  fleet_total_count: number;
  avg_temperature: number;
  temp_compliance_pct: number;
  total_co2_saved_kg: number;
  shelf_life_protected_hours: number;
  total_economic_value_secured: string;
  warehouse_capacity_used_pct: number;
  recent_alerts: Array<{
    id: string;
    title: string;
    severity: string;
    alert_type: string;
    created_at?: string;
  }>;
  category_distribution: Record<string, number>;
  mode_distribution: Record<string, number>;
}

export interface DatabaseHealthResponse {
  database: 'connected' | 'unconfigured' | 'unavailable';
  status: 'healthy' | 'unhealthy';
  message?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private getToken(): string | null {
    return localStorage.getItem('cc360_access_token');
  }

  private getHeaders(customHeaders: Record<string, string> = {}): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: this.getHeaders(options.headers as Record<string, string>),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(errorBody.detail || `Request failed with status ${response.status}`);
    }

    return response.json();
  }

  // ================= Auth Endpoints =================
  async login(email: string, password: string): Promise<AuthTokens> {
    const data = await this.request<AuthTokens>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.access_token) {
      localStorage.setItem('cc360_access_token', data.access_token);
    }
    return data;
  }

  async getCurrentUser(): Promise<UserAccount> {
    return this.request<UserAccount>('/auth/me');
  }

  async listUsers(): Promise<UserAccount[]> {
    return this.request<UserAccount[]>('/auth/users');
  }

  async updateUserRole(userId: number, role: string): Promise<UserAccount> {
    return this.request<UserAccount>(`/auth/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  }

  logout(): void {
    localStorage.removeItem('cc360_access_token');
  }

  // ================= Shipments Endpoints =================
  async getShipments(params?: {
    status?: string;
    category?: string;
    search?: string;
    skip?: number;
    limit?: number;
  }): Promise<{ items: Shipment[]; total: number }> {
    const query = new URLSearchParams();
    if (params?.status) query.append('status', params.status);
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.skip !== undefined) query.append('skip', String(params.skip));
    if (params?.limit !== undefined) query.append('limit', String(params.limit));

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.request<{ items: Shipment[]; total: number }>(`/shipments${queryString}`);
  }

  async getShipment(id: string): Promise<Shipment> {
    return this.request<Shipment>(`/shipments/${id}`);
  }

  async createShipment(shipment: Partial<Shipment>): Promise<Shipment> {
    return this.request<Shipment>('/shipments', {
      method: 'POST',
      body: JSON.stringify(shipment),
    });
  }

  async updateShipment(id: string, updates: Partial<Shipment>): Promise<Shipment> {
    return this.request<Shipment>(`/shipments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async recordPositionPing(ping: {
    shipment_id: string;
    latitude: number;
    longitude: number;
    speed?: number;
    ambient_temp?: number;
    cargo_temp?: number;
  }): Promise<any> {
    return this.request('/shipments/telematics/ping', {
      method: 'POST',
      body: JSON.stringify(ping),
    });
  }

  async getShipmentPositions(shipmentId: string, limit: number = 50): Promise<Array<{
    id: number;
    shipment_id?: string;
    truck_id?: string;
    latitude: number;
    longitude: number;
    speed_kmh?: number;
    heading_deg?: number;
    temperature?: number;
    ambient_temp?: number;
    humidity?: number;
    battery_level?: number;
    door_status?: string;
    reefer_status?: string;
    recorded_at: string;
  }>> {
    return this.request<any[]>(`/shipments/${shipmentId}/positions?limit=${limit}`);
  }

  // ================= Fleet Endpoints =================
  async getTrucks(status?: string): Promise<any[]> {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return this.request<any[]>(`/fleet/trucks${query}`);
  }

  async getTruck(id: string): Promise<any> {
    return this.request<any>(`/fleet/trucks/${id}`);
  }

  async getDrivers(status?: string): Promise<any[]> {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return this.request<any[]>(`/fleet/drivers${query}`);
  }

  async getAssignments(status?: string): Promise<any[]> {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return this.request<any[]>(`/fleet/assignments${query}`);
  }

  // ================= Alerts Endpoints =================
  async getAlerts(params?: { severity?: string; is_resolved?: boolean }): Promise<any[]> {
    const query = new URLSearchParams();
    if (params?.severity) query.append('severity', params.severity);
    if (params?.is_resolved !== undefined) query.append('is_resolved', String(params.is_resolved));

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.request<any[]>(`/alerts${queryString}`);
  }

  async acknowledgeAlert(alertId: string, acknowledgedBy?: string): Promise<any> {
    return this.request<any>(`/alerts/${alertId}/acknowledge`, {
      method: 'POST',
      body: JSON.stringify({ acknowledged_by: acknowledgedBy || 'Operator' }),
    });
  }

  async resolveAlert(alertId: string, notes: string): Promise<any> {
    return this.request<any>(`/alerts/${alertId}/resolve`, {
      method: 'POST',
      body: JSON.stringify({ resolution_notes: notes }),
    });
  }

  // ================= Warehouse Endpoints =================
  async getWarehouseNodes(): Promise<WarehouseNode[]> {
    return this.request<WarehouseNode[]>('/warehouses/nodes');
  }

  async getWarehouseChambers(warehouseId?: string): Promise<any[]> {
    const query = warehouseId ? `?warehouse_id=${encodeURIComponent(warehouseId)}` : '';
    return this.request<any[]>(`/warehouses/chambers${query}`);
  }

  // ================= Portals & Multimodal =================
  async getFarmerBatches(status?: string): Promise<CropBatch[]> {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return this.request<CropBatch[]>(`/portals/farmer/batches${query}`);
  }

  async createFarmerBatch(batch: Partial<CropBatch>): Promise<CropBatch> {
    return this.request<CropBatch>('/portals/farmer/batches', {
      method: 'POST',
      body: JSON.stringify(batch),
    });
  }

  async getMandiRates(): Promise<MandiRate[]> {
    return this.request<MandiRate[]>('/portals/farmer/mandi-rates');
  }

  async getRailwayTrains(): Promise<RailwayTrainRake[]> {
    return this.request<RailwayTrainRake[]>('/portals/railway/trains');
  }

  async getInspections(): Promise<Record<string, InspectionResult>> {
    return this.request<Record<string, InspectionResult>>('/portals/inspections');
  }

  // ================= Analytics & Health =================
  async getDashboardKPIs(): Promise<DashboardKPIs> {
    return this.request<DashboardKPIs>('/analytics/dashboard');
  }

  async checkHealth(): Promise<{ status: string; service?: string; version?: string }> {
    const url = `${this.baseUrl.replace(/\/api\/v1$/, '')}/health`;
    const res = await fetch(url);
    return res.json();
  }

  async checkDatabaseHealth(): Promise<DatabaseHealthResponse> {
    const url = `${this.baseUrl.replace(/\/api\/v1$/, '')}/health/db`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch {
      return {
        database: 'unavailable',
        status: 'unhealthy',
        message: 'Database health check endpoint is unreachable',
      };
    }
  }
}

export const api = new ApiService();
export default api;
