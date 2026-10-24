import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Compass, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Plus, 
  Minus, 
  Thermometer, 
  Truck, 
  Navigation, 
  MapPin, 
  ShieldCheck,
  AlertTriangle,
  Layers,
  RefreshCw,
  Clock,
  WifiOff,
  CheckCircle2
} from 'lucide-react';

export interface MapVehiclePoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  plateNumber?: string;
  driverName?: string;
  driverPhone?: string;
  cargo?: string;
  origin?: string;
  destination?: string;
  currentLocation?: string;
  temp?: number;
  targetTemp?: string;
  tempStatus?: 'normal' | 'warning' | 'critical';
  speedKmH: number;
  status: string;
  eta?: string;
  reeferUnit?: string;
  reeferStatus?: string;
  fuelPct?: number;
  routeCoordinates?: [number, number][];
  lastUpdated?: string;
  dataSource?: 'real' | 'simulated';
  shipmentId?: string;
  heading?: number;
  routeProgress?: number;
}

export interface MapGeofence {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  category: 'Origin' | 'Delivery Zone' | 'Restricted Area';
  status: 'Active' | 'Breached';
  alertTrigger?: string;
}

export interface MapThermalZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  ambientTemp: string;
  riskLevel: 'Moderate' | 'Severe' | 'Critical';
}

export interface MapCityNode {
  name: string;
  lat: number;
  lng: number;
  state?: string;
  role?: string;
}

export interface RealLeafletMapProps {
  vehicles: MapVehiclePoint[];
  selectedVehicleId?: string;
  onSelectVehicle?: (id: string) => void;
  activeLayer?: 'corridors' | 'geofences' | 'thermal' | 'routes' | 'traffic' | 'weather';
  geofences?: MapGeofence[];
  thermalZones?: MapThermalZone[];
  cities?: MapCityNode[];
  initialCenter?: [number, number];
  initialZoom?: number;
  heightClass?: string;
  showOverlayControls?: boolean;
  className?: string;
  isLoading?: boolean;
  apiError?: string | null;
  onRetry?: () => void;
  emptyStateMessage?: string;
  dataSourceLabel?: string;
  followSelectedVehicle?: boolean;
  basemapStyle?: 'positron' | 'darkmatter' | 'voyager';
  onBasemapStyleChange?: (style: 'positron' | 'darkmatter' | 'voyager') => void;
}

/**
 * Strict validator to guarantee coordinates are valid numbers and within geodetic bounds.
 * Excludes (0,0) which typically denotes uninitialized GPS null-island.
 */
export function isValidCoordinate(lat: unknown, lng: unknown): boolean {
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  if (isNaN(lat) || isNaN(lng)) return false;
  if (!isFinite(lat) || !isFinite(lng)) return false;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return false;
  if (lat === 0 && lng === 0) return false;
  return true;
}

// Major National Freight Corridors (Real Coordinates)
export const NATIONAL_CORRIDORS: { name: string; points: [number, number][] }[] = [
  {
    name: 'Western Freight Spine (NH-48 / WDFC)',
    points: [
      [28.6139, 77.2090], // Delhi
      [27.7050, 76.1990], // Kotputli
      [26.9124, 75.7873], // Jaipur
      [24.5854, 73.7125], // Udaipur
      [23.0225, 72.5714], // Ahmedabad
      [21.6260, 73.0030], // Ankleshwar / Dahej Link
      [21.1702, 72.8311], // Surat
      [20.3890, 72.9100], // Vapi
      [19.2967, 73.0631], // Bhiwandi
      [19.0760, 72.8777], // Mumbai
      [18.7880, 73.3440], // Khopoli / Expressway
      [18.5204, 73.8567], // Pune
    ],
  },
  {
    name: 'Southern Logistics Spine (Pune - Bengaluru - Chennai)',
    points: [
      [18.5204, 73.8567], // Pune
      [16.8524, 74.5815], // Kolhapur
      [15.8497, 74.4977], // Belagavi
      [15.3647, 75.1240], // Hubballi
      [12.9716, 77.5946], // Bengaluru
      [12.9270, 79.3330], // Ranipet
      [13.0827, 80.2707], // Chennai
    ],
  },
  {
    name: 'Central Multi-Modal Spine (Delhi - Nagpur - Hyderabad - Bengaluru)',
    points: [
      [28.6139, 77.2090], // Delhi
      [27.1767, 78.0081], // Agra
      [26.2183, 78.1828], // Gwalior
      [23.2599, 77.4126], // Bhopal
      [21.1458, 79.0882], // Nagpur Zero Mile
      [18.8074, 78.5582], // Nizamabad
      [17.3850, 78.4867], // Hyderabad
      [15.8280, 78.0370], // Kurnool
      [14.6819, 77.6006], // Anantapur
      [12.9716, 77.5946], // Bengaluru
    ],
  },
  {
    name: 'East-West Industrial Artery (Mumbai - Nagpur - Kolkata)',
    points: [
      [19.0760, 72.8777], // Mumbai
      [19.9975, 73.7898], // Nashik
      [20.9980, 75.5660], // Jalgaon
      [20.7002, 77.0082], // Akola
      [21.1458, 79.0882], // Nagpur
      [21.2514, 81.6296], // Raipur
      [22.5726, 88.3639], // Kolkata
    ],
  },
  {
    name: 'Samruddhi Mahamarg Super Expressway',
    points: [
      [21.1458, 79.0882], // Nagpur
      [20.7002, 77.0082], // Karanja Lad
      [19.8762, 75.3433], // Aurangabad / Chhatrapati Sambhajinagar
      [19.7660, 74.4780], // Shirdi
      [19.6750, 73.4830], // Igatpuri
      [19.2967, 73.0631], // Bhiwandi
    ],
  },
];

export const RealLeafletMap: React.FC<RealLeafletMapProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  activeLayer = 'corridors',
  geofences = [],
  thermalZones = [],
  cities = [],
  initialCenter = [21.5, 78.5],
  initialZoom = 5,
  heightClass = 'h-[460px] sm:h-[500px]',
  showOverlayControls = true,
  className = '',
  isLoading = false,
  apiError = null,
  onRetry,
  emptyStateMessage,
  dataSourceLabel,
  followSelectedVehicle = false,
  basemapStyle = 'positron',
  onBasemapStyleChange,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const corridorsLayerRef = useRef<L.LayerGroup | null>(null);
  const geofencesLayerRef = useRef<L.LayerGroup | null>(null);
  const thermalLayerRef = useRef<L.LayerGroup | null>(null);
  const citiesLayerRef = useRef<L.LayerGroup | null>(null);
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map());
  const originMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const traveledRouteLayerRef = useRef<L.Polyline | null>(null);
  const remainingRouteLayerRef = useRef<L.Polyline | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(initialZoom);
  const [tileError, setTileError] = useState(false);
  const [internalBasemap, setInternalBasemap] = useState<'positron' | 'darkmatter' | 'voyager'>(basemapStyle);
  const prevSelectedIdRef = useRef<string | undefined>(selectedVehicleId);

  // Filter only vehicles with valid, non-zero geodetic coordinates
  const validVehicles = useMemo(() => {
    return vehicles.filter((v) => isValidCoordinate(v.lat, v.lng));
  }, [vehicles]);

  // Initialize Map Once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    // Create Map Instance
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
    });

    mapRef.current = map;

    // Create Layer Groups
    corridorsLayerRef.current = L.layerGroup().addTo(map);
    geofencesLayerRef.current = L.layerGroup().addTo(map);
    thermalLayerRef.current = L.layerGroup().addTo(map);
    citiesLayerRef.current = L.layerGroup().addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);

    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    // Invalidate size shortly after mounting to avoid tile glitch
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    // ResizeObserver to ensure responsiveness upon tab switch or container layout changes
    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Invalidate map size on fullscreen toggles
  useEffect(() => {
    const timer = setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  // Dynamic CARTO Basemap Layer Switcher (Positron, Dark Matter, Voyager)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    const cartoUrls: Record<'positron' | 'darkmatter' | 'voyager', string> = {
      positron: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      darkmatter: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      voyager: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    };

    const selectedUrl = cartoUrls[internalBasemap] || cartoUrls.positron;

    const layer = L.tileLayer(selectedUrl, {
      subdomains: 'abcd',
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>',
    });

    let hasSwitchedToFallback = false;
    layer.on('tileerror', () => {
      setTileError(true);
      if (!hasSwitchedToFallback) {
        hasSwitchedToFallback = true;
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);
      }
    });

    layer.addTo(map);
    tileLayerRef.current = layer;
  }, [internalBasemap]);

  // Update Corridors Layer
  useEffect(() => {
    const layer = corridorsLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    const showCorridors = activeLayer === 'corridors' || activeLayer === 'routes' || activeLayer === 'traffic';

    if (showCorridors) {
      NATIONAL_CORRIDORS.forEach((corridor) => {
        // Shadow/glow line
        L.polyline(corridor.points, {
          color: '#A5A5A4',
          weight: 4,
          opacity: 0.35,
          dashArray: '4, 6',
          lineCap: 'round',
        }).addTo(layer);

        // Core corridor line
        const isTrafficMode = activeLayer === 'traffic';
        const corridorColor = isTrafficMode ? '#06383D' : '#06383D';

        L.polyline(corridor.points, {
          color: corridorColor,
          weight: 2,
          opacity: 0.75,
          lineCap: 'round',
        }).bindTooltip(`<div class="font-mono text-xs font-bold text-[#06383D]">${corridor.name}</div>`, {
          sticky: true,
          className: 'bg-white/95 border border-[#D0CEC9] rounded px-2 py-1 shadow-sm',
        }).addTo(layer);
      });
    }
  }, [activeLayer]);

  // Update Cities Layer
  useEffect(() => {
    const layer = citiesLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    cities.forEach((city) => {
      if (!isValidCoordinate(city.lat, city.lng)) return;

      const cityIcon = L.divIcon({
        className: 'city-node-marker',
        html: `
          <div style="display: flex; align-items: center; gap: 4px; pointer-events: none;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #06383D; border: 2px solid #FFFFFF; box-shadow: 0 1px 3px rgba(0,0,0,0.25);"></div>
            <span style="font-family: Inter, sans-serif; font-size: 10px; font-weight: 700; color: #292D2F; text-shadow: 0 0 3px #FFFFFF, 0 0 6px #FFFFFF; white-space: nowrap;">${city.name}</span>
          </div>
        `,
        iconSize: [80, 14],
        iconAnchor: [4, 7],
      });

      L.marker([city.lat, city.lng], { icon: cityIcon, interactive: false }).addTo(layer);
    });
  }, [cities]);

  // Update Geofences Layer
  useEffect(() => {
    const layer = geofencesLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    const showGeofences = activeLayer === 'geofences';
    if (!showGeofences && geofences.length > 0) return;

    if (showGeofences) {
      geofences.forEach((zone) => {
        if (!isValidCoordinate(zone.lat, zone.lng)) return;

        const isBreached = zone.status === 'Breached';
        const isDelivery = zone.category === 'Delivery Zone';
        const color = isBreached ? '#DC2626' : isDelivery ? '#16803C' : '#06383D';
        const fillColor = isBreached
          ? 'rgba(220, 38, 38, 0.15)'
          : isDelivery
          ? 'rgba(22, 128, 60, 0.14)'
          : 'rgba(6, 56, 61, 0.12)';

        const circle = L.circle([zone.lat, zone.lng], {
          radius: zone.radiusMeters,
          color: color,
          weight: 1.5,
          dashArray: isBreached ? undefined : '5, 5',
          fillColor: fillColor,
          fillOpacity: 0.6,
        }).addTo(layer);

        circle.bindPopup(`
          <div style="padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="background: ${color}; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: bold; text-transform: uppercase;">
                ${zone.category}
              </span>
              <span style="color: ${isBreached ? '#DC2626' : '#16803C'}; font-weight: bold; margin-left: 8px;">
                ${zone.status}
              </span>
            </div>
            <div style="font-size: 12px; font-weight: bold; color: #292D2F; margin-bottom: 4px;">
              ${zone.name}
            </div>
            <div style="color: #A5A5A4; font-size: 10px; margin-bottom: 6px;">
              Radius: ${(zone.radiusMeters / 1000).toFixed(1)} km
            </div>
            ${zone.alertTrigger ? `
              <div style="padding: 6px; background: #F0EEEA; border-radius: 6px; border-left: 3px solid ${color}; font-size: 10px; color: #292D2F;">
                <strong>Policy:</strong> ${zone.alertTrigger}
              </div>
            ` : ''}
          </div>
        `);
      });
    }
  }, [activeLayer, geofences]);

  // Update Thermal Layer
  useEffect(() => {
    const layer = thermalLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    const showThermal = activeLayer === 'thermal' || activeLayer === 'weather';
    if (!showThermal && thermalZones.length > 0) return;

    if (showThermal) {
      thermalZones.forEach((zone) => {
        if (!isValidCoordinate(zone.lat, zone.lng)) return;

        const isCritical = zone.riskLevel === 'Critical';
        const color = isCritical ? '#DC2626' : '#F2AE32';
        const fillColor = isCritical ? 'rgba(220, 38, 38, 0.22)' : 'rgba(242, 174, 50, 0.20)';

        const circle = L.circle([zone.lat, zone.lng], {
          radius: zone.radiusMeters,
          color: color,
          weight: 1.5,
          fillColor: fillColor,
          fillOpacity: 0.65,
        }).addTo(layer);

        circle.bindTooltip(`
          <div style="font-family: monospace; font-size: 10px;">
            <div style="font-weight: bold; color: ${color};">⚠️ ${zone.name}</div>
            <div>Ambient Heat: <strong>${zone.ambientTemp}</strong></div>
          </div>
        `, { sticky: true });
      });
    }
  }, [activeLayer, thermalZones]);

  // Update Dynamic Active Route for Selected Vehicle (Traveled vs Remaining + Origin/Dest Pins)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing route polylines and endpoint pins
    if (traveledRouteLayerRef.current) {
      map.removeLayer(traveledRouteLayerRef.current);
      traveledRouteLayerRef.current = null;
    }
    if (remainingRouteLayerRef.current) {
      map.removeLayer(remainingRouteLayerRef.current);
      remainingRouteLayerRef.current = null;
    }
    if (originMarkerRef.current) {
      map.removeLayer(originMarkerRef.current);
      originMarkerRef.current = null;
    }
    if (destMarkerRef.current) {
      map.removeLayer(destMarkerRef.current);
      destMarkerRef.current = null;
    }

    const selectedVehicle = validVehicles.find((v) => v.id === selectedVehicleId);
    if (!selectedVehicle) return;

    // Filter valid route coordinates strictly
    const validRoutePoints = (selectedVehicle.routeCoordinates || []).filter(
      (pt) => Array.isArray(pt) && pt.length >= 2 && isValidCoordinate(pt[0], pt[1])
    );

    if (validRoutePoints.length > 1) {
      // Find closest segment point to vehicle's current position
      let bestIdx = 0;
      let minD = Infinity;
      for (let i = 0; i < validRoutePoints.length - 1; i++) {
        const midLat = (validRoutePoints[i][0] + validRoutePoints[i + 1][0]) / 2;
        const midLng = (validRoutePoints[i][1] + validRoutePoints[i + 1][1]) / 2;
        const d = Math.hypot(selectedVehicle.lat - midLat, selectedVehicle.lng - midLng);
        if (d < minD) {
          minD = d;
          bestIdx = i;
        }
      }

      const traveledPoints: [number, number][] = [
        ...validRoutePoints.slice(0, bestIdx + 1),
        [selectedVehicle.lat, selectedVehicle.lng],
      ];
      const remainingPoints: [number, number][] = [
        [selectedVehicle.lat, selectedVehicle.lng],
        ...validRoutePoints.slice(bestIdx + 1),
      ];

      // Traveled route: Solid Emerald Line (Completed Path)
      traveledRouteLayerRef.current = L.polyline(traveledPoints, {
        color: '#16803C',
        weight: 4,
        opacity: 0.9,
        lineCap: 'round',
      }).addTo(map);

      // Remaining route: Dashed Amber Line (Target Path)
      remainingRouteLayerRef.current = L.polyline(remainingPoints, {
        color: '#F2AE32',
        weight: 3.5,
        opacity: 0.85,
        lineCap: 'round',
        dashArray: '6, 6',
      }).addTo(map);

      // Origin Pin
      const originName = selectedVehicle.origin?.split(',')[0] || 'Origin';
      const originIcon = L.divIcon({
        className: 'origin-marker',
        html: `
          <div style="background: #06383D; color: #FFFFFF; border: 2px solid #16803C; border-radius: 6px; padding: 2px 6px; font-family: monospace; font-size: 9px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 4px;">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: #16803C;"></span>
            <span>ORIGIN: ${originName}</span>
          </div>
        `,
        iconSize: [110, 20],
        iconAnchor: [55, 22],
      });
      originMarkerRef.current = L.marker(validRoutePoints[0], { icon: originIcon, interactive: false }).addTo(map);

      // Destination Pin
      const destName = selectedVehicle.destination?.split(',')[0] || 'Destination';
      const destIcon = L.divIcon({
        className: 'destination-marker',
        html: `
          <div style="background: #06383D; color: #F2AE32; border: 2px solid #F2AE32; border-radius: 6px; padding: 2px 6px; font-family: monospace; font-size: 9px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 4px;">
            <span>🏁</span>
            <span>DEST: ${destName}</span>
          </div>
        `,
        iconSize: [110, 20],
        iconAnchor: [55, 22],
      });
      destMarkerRef.current = L.marker(validRoutePoints[validRoutePoints.length - 1], { icon: destIcon, interactive: false }).addTo(map);
    }
  }, [validVehicles, selectedVehicleId]);

  // Update Vehicle Markers (In-Place Relocation for 60fps Smooth Moving Tracking)
  useEffect(() => {
    const layer = markersLayerRef.current;
    const map = mapRef.current;
    if (!layer || !map) return;

    const currentVehicleIds = new Set(validVehicles.map((v) => v.id));

    // Remove any marker that no longer exists
    markersMapRef.current.forEach((marker, id) => {
      if (!currentVehicleIds.has(id)) {
        layer.removeLayer(marker);
        markersMapRef.current.delete(id);
      }
    });

    validVehicles.forEach((vehicle) => {
      const isSelected = vehicle.id === selectedVehicleId;
      const isCritical =
        vehicle.tempStatus === 'critical' ||
        vehicle.status === 'Alert' ||
        vehicle.status === 'Off Route' ||
        vehicle.status === 'Critical Alert';

      const mainColor = isCritical ? '#DC2626' : isSelected ? '#F2AE32' : '#06383D';
      const badgeText = vehicle.temp !== undefined ? `${vehicle.temp > 0 ? '+' : ''}${vehicle.temp}°C` : vehicle.label;
      const headingDeg = vehicle.heading ?? 0;

      const markerHtml = `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          
          <!-- Pulsing Radar Halo for Selected or Critical Vehicle -->
          ${(isSelected || isCritical) ? `
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 38px;
              height: 38px;
              border-radius: 50%;
              background: ${isCritical ? 'rgba(220, 38, 38, 0.25)' : 'rgba(242, 174, 50, 0.35)'};
              border: 1.5px solid ${mainColor};
              animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
              pointer-events: none;
            "></div>
          ` : ''}

          <!-- Floating Pill Badge -->
          <div style="
            background: #FFFFFF;
            color: #292D2F;
            border: 1.5px solid ${mainColor};
            border-radius: 6px;
            padding: 2px 6px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            font-weight: 800;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 2px;
            transform: translateY(${isSelected ? '-2px' : '0'});
            transition: all 0.2s ease;
          ">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${mainColor};"></span>
            <span>${vehicle.label}</span>
            ${vehicle.temp !== undefined ? `
              <span style="color: ${mainColor}; border-left: 1px solid #D0CEC9; padding-left: 4px; font-weight: 900;">
                ${badgeText}
              </span>
            ` : ''}
          </div>

          <!-- Directional Navigation Pointer Core with Heading Angle -->
          <div style="
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${mainColor};
            border: 2px solid #FFFFFF;
            box-shadow: 0 2px 8px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(${headingDeg}deg);
            transition: transform 0.4s ease;
          ">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
            </svg>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: `vehicle-marker-${vehicle.id}`,
        html: markerHtml,
        iconSize: [120, 46],
        iconAnchor: [60, 38],
        popupAnchor: [0, -32],
      });

      const isSimulated = vehicle.dataSource === 'simulated';
      const dataSourceBadge = isSimulated
        ? `<span style="background: #FEF3C7; color: #92400E; border: 1px solid #F59E0B; padding: 1px 5px; border-radius: 4px; font-size: 8px; font-weight: 800;">SIMULATED DATA</span>`
        : `<span style="background: #DCFCE7; color: #166534; border: 1px solid #22C55E; padding: 1px 5px; border-radius: 4px; font-size: 8px; font-weight: 800;">REAL GPS TELEMETRY</span>`;

      const popupContent = `
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 12px; min-width: 240px; max-width: 280px;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #D0CEC9; padding-bottom: 6px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${mainColor};"></span>
              <strong style="font-size: 13px; color: #06383D;">${vehicle.label}</strong>
            </div>
            <span style="
              font-size: 9px;
              font-weight: bold;
              padding: 2px 6px;
              border-radius: 4px;
              background: ${isCritical ? '#FEE2E2' : '#E6F4EA'};
              color: ${isCritical ? '#DC2626' : '#16803C'};
              text-transform: uppercase;
            ">
              ${vehicle.status}
            </span>
          </div>

          <div style="margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
            ${dataSourceBadge}
            ${vehicle.plateNumber ? `<span style="font-size: 10px; color: #292D2F; font-weight: bold;">${vehicle.plateNumber}</span>` : ''}
          </div>

          ${vehicle.cargo ? `
            <div style="margin-bottom: 6px; color: #292D2F;">
              <span style="color: #A5A5A4; font-size: 9px; display: block;">CARGO / CONSIGNMENT</span>
              <div style="font-weight: bold; font-size: 11px; color: #06383D;">${vehicle.cargo}</div>
            </div>
          ` : ''}

          <div style="margin-bottom: 6px; color: #292D2F;">
            <span style="color: #A5A5A4; font-size: 9px; display: block;">LIVE GPS COORDINATES</span>
            <div style="font-size: 10px; color: #06383D; font-weight: bold;">
              ${vehicle.lat.toFixed(5)}°N, ${vehicle.lng.toFixed(5)}°E
            </div>
          </div>

          ${vehicle.currentLocation ? `
            <div style="margin-bottom: 8px; color: #292D2F;">
              <span style="color: #A5A5A4; font-size: 9px; display: block;">TELEMETRY LOCATION</span>
              <div style="font-size: 10px; color: #292D2F; white-space: normal;">${vehicle.currentLocation}</div>
            </div>
          ` : ''}

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; background: #F0EEEA; padding: 6px 8px; border-radius: 6px; margin-bottom: 8px;">
            ${vehicle.temp !== undefined ? `
              <div>
                <span style="font-size: 8px; color: #A5A5A4; display: block;">CORE TEMP</span>
                <strong style="font-size: 11px; color: ${mainColor};">${vehicle.temp > 0 ? '+' : ''}${vehicle.temp}°C</strong>
              </div>
            ` : ''}
            <div>
              <span style="font-size: 8px; color: #A5A5A4; display: block;">SPEED</span>
              <strong style="font-size: 11px; color: #292D2F;">${vehicle.speedKmH} <span style="font-size: 8px; font-weight: normal;">km/h</span></strong>
            </div>
            ${vehicle.eta ? `
              <div style="grid-column: span 2;">
                <span style="font-size: 8px; color: #A5A5A4; display: block;">ESTIMATED ARRIVAL</span>
                <strong style="font-size: 9px; color: #F2AE32;">${vehicle.eta}</strong>
              </div>
            ` : ''}
          </div>

          ${vehicle.driverName ? `
            <div style="border-top: 1px solid #D0CEC9; padding-top: 6px; font-size: 9px; color: #A5A5A4; display: flex; justify-content: space-between;">
              <span>Driver: <strong style="color: #292D2F;">${vehicle.driverName}</strong></span>
              ${vehicle.reeferUnit ? `<span style="color: #06383D; font-weight: bold;">${vehicle.reeferUnit}</span>` : ''}
            </div>
          ` : ''}

          ${vehicle.lastUpdated ? `
            <div style="margin-top: 4px; font-size: 8px; color: #A5A5A4; text-align: right;">
              Last Ping: ${vehicle.lastUpdated}
            </div>
          ` : ''}
        </div>
      `;

      const existingMarker = markersMapRef.current.get(vehicle.id);
      if (existingMarker) {
        existingMarker.setLatLng([vehicle.lat, vehicle.lng]);
        existingMarker.setIcon(customIcon);
        existingMarker.setPopupContent(popupContent);
      } else {
        const marker = L.marker([vehicle.lat, vehicle.lng], { icon: customIcon }).addTo(layer);
        marker.bindPopup(popupContent, { maxWidth: 300 });
        marker.on('click', () => {
          onSelectVehicle?.(vehicle.id);
        });
        markersMapRef.current.set(vehicle.id, marker);
      }
    });

    // Camera Lock: pan smoothly to followed vehicle
    if (followSelectedVehicle && selectedVehicleId) {
      const target = validVehicles.find((v) => v.id === selectedVehicleId);
      if (target) {
        map.panTo([target.lat, target.lng], { animate: true, duration: 0.6 });
      }
    }
  }, [validVehicles, selectedVehicleId, onSelectVehicle, followSelectedVehicle]);

  // Smooth Pan to selected vehicle only when selectedVehicleId actually changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedVehicleId) return;

    if (prevSelectedIdRef.current !== selectedVehicleId) {
      prevSelectedIdRef.current = selectedVehicleId;
      const target = validVehicles.find((v) => v.id === selectedVehicleId);
      if (target) {
        map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 8), {
          duration: 1.0,
          easeLinearity: 0.25,
        });
      }
    }
  }, [selectedVehicleId, validVehicles]);

  // Map Controls Handlers
  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    if (validVehicles.length > 0 && mapRef.current) {
      const bounds = L.latLngBounds(validVehicles.map((v) => [v.lat, v.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    } else {
      mapRef.current?.flyTo(initialCenter, initialZoom, { duration: 1.0 });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div 
      className={`relative w-full ${isFullscreen ? 'fixed inset-0 z-50 h-screen bg-[#F0EEEA]' : heightClass} rounded-xl overflow-hidden border border-[#D0CEC9] shadow-inner bg-[#F0EEEA] ${className}`}
    >
      {/* Real Leaflet Map DOM Root */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Left Live Status Pill */}
      {showOverlayControls && (
        <div className="absolute top-3 left-3 z-[1000] pointer-events-auto flex flex-col gap-1.5">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#D0CEC9] shadow-sm flex items-center gap-2 text-xs font-mono font-bold text-[#06383D]">
            <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-[#F2AE32] animate-spin' : validVehicles.length > 0 ? 'bg-[#16803C] animate-pulse' : 'bg-[#A5A5A4]'}`} />
            <span>{dataSourceLabel || (validVehicles.length > 0 ? `${validVehicles.length} ASSETS PLOTTED` : 'RADAR STANDBY')}</span>
            <span className="text-[10px] text-[#A5A5A4] border-l border-[#D0CEC9] pl-2 font-normal">
              Z{currentZoom}
            </span>
          </div>

          {/* Fallback Tile Indicator */}
          {tileError && (
            <div className="bg-amber-50/95 border border-amber-300 text-amber-800 text-[10px] font-mono px-2 py-1 rounded shadow-xs flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>OSM fallback tile layer active</span>
            </div>
          )}
        </div>
      )}

      {/* Top Right Map Control Buttons */}
      <div className="absolute top-3 right-3 z-[1000] pointer-events-auto flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          aria-label="Zoom in on map"
          className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md border border-[#D0CEC9] text-[#292D2F] hover:text-[#06383D] hover:bg-[#F0EEEA] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          aria-label="Zoom out on map"
          className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md border border-[#D0CEC9] text-[#292D2F] hover:text-[#06383D] hover:bg-[#F0EEEA] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleRecenter}
          title="Recenter Map Bounds"
          aria-label="Recenter map to all vehicles"
          className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md border border-[#D0CEC9] text-[#292D2F] hover:text-[#06383D] hover:bg-[#F0EEEA] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Expand Map'}
          aria-label={isFullscreen ? 'Exit fullscreen map' : 'Expand map fullscreen'}
          className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md border border-[#D0CEC9] text-[#292D2F] hover:text-[#06383D] hover:bg-[#F0EEEA] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>

        {/* CARTO Basemap Style Switcher */}
        <div className="bg-white/95 backdrop-blur-md border border-[#D0CEC9] rounded-lg p-1 shadow-sm flex flex-col gap-0.5 text-[9px] font-mono font-bold text-[#292D2F]">
          <span className="text-[8px] text-[#A5A5A4] px-1 uppercase tracking-wider">CARTO</span>
          {(['positron', 'darkmatter', 'voyager'] as const).map((style) => (
            <button
              key={style}
              onClick={() => {
                setInternalBasemap(style);
                onBasemapStyleChange?.(style);
              }}
              title={`Switch to CARTO ${style.toUpperCase()}`}
              className={`px-1.5 py-0.5 rounded transition cursor-pointer text-left ${
                internalBasemap === style ? 'bg-[#06383D] text-[#F2AE32]' : 'hover:bg-[#F0EEEA]'
              }`}
            >
              {style === 'positron' ? 'Light' : style === 'darkmatter' ? 'Dark' : 'Voyager'}
            </button>
          ))}
        </div>
      </div>

      {/* API Error State Overlay Banner */}
      {apiError && (
        <div className="absolute top-14 left-3 right-3 sm:right-auto sm:max-w-md z-[1001] bg-red-50/95 backdrop-blur-md border border-red-200 text-red-900 rounded-xl p-3 shadow-md flex items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span className="truncate">{apiError}</span>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-wider shrink-0 cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          )}
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-[1002] bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 font-mono text-xs text-[#06383D]">
          <div className="w-7 h-7 border-2 border-[#06383D] border-t-transparent rounded-full animate-spin" />
          <span className="font-bold">Syncing Telematics &amp; GPS Coordinates...</span>
        </div>
      )}

      {/* Empty Data State Overlay (Only shown when not loading, no error, and 0 valid markers) */}
      {!isLoading && !apiError && validVehicles.length === 0 && (
        <div className="absolute bottom-10 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-xs z-[1000] pointer-events-auto bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#D0CEC9] shadow-md font-mono text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-[#06383D] font-bold">
            <WifiOff className="w-4 h-4 text-[#F2AE32]" />
            <span>{emptyStateMessage || 'No Active GPS Coordinates'}</span>
          </div>
          <p className="text-[11px] text-[#A5A5A4] leading-relaxed">
            Registered fleet vehicles are awaiting live latitude/longitude pings. Regional corridors remain mapped.
          </p>
        </div>
      )}

      {/* Bottom Right OpenStreetMap Attribution */}
      <div className="absolute bottom-2 right-3 z-[1000] pointer-events-auto bg-white/85 backdrop-blur-xs px-2.5 py-1 rounded text-[9px] font-mono text-[#292D2F] border border-[#D0CEC9]/70 shadow-2xs">
        Map data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline hover:text-[#06383D]">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer" className="underline hover:text-[#06383D]">CARTO</a>
      </div>
    </div>
  );
};
