import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Compass, 
  Radio, 
  Navigation, 
  Truck,
  CheckCircle2
} from 'lucide-react';

// Real geographic coordinates for the corridor
const CORRIDOR_POINTS: [number, number][] = [
  [21.1458, 79.0882], // Nagpur (Zero Mile Origin)
  [20.7453, 78.6022], // Wardha Interchange
  [20.4850, 77.4900], // Karanja Lad
  [20.7002, 77.0082], // Akola
  [19.8410, 75.8860], // Jalna
  [19.8762, 75.3433], // Chhatrapati Sambhajinagar
  [19.7660, 74.4780], // Shirdi Link
  [19.6975, 73.5580], // Igatpuri
  [19.6450, 73.4830], // Kasara Ghat Approach (Current Location of CC-102)
  [19.2967, 73.0631], // Bhiwandi Cold Hub
  [19.0760, 72.8777], // Mumbai (JNPT Destination)
];

const FEEDER_ROUTE: [number, number][] = [
  [21.1458, 79.0882], // Nagpur
  [21.9014, 77.9015], // Betul
  [23.2599, 77.4126], // Bhopal
  [22.7196, 75.8577], // Indore
  [20.9042, 74.7749], // Dhule
  [19.9975, 73.7898], // Nashik
  [19.6450, 73.4830], // Kasara
  [19.0760, 72.8777], // Mumbai
];

interface Waypoint {
  name: string;
  coords: [number, number];
  role: 'origin' | 'dest' | 'hub';
  sub: string;
}

const WAYPOINTS: Waypoint[] = [
  { name: 'NAGPUR', coords: [21.1458, 79.0882], role: 'origin', sub: 'ORIGIN · ZERO MILE' },
  { name: 'BHOPAL', coords: [23.2599, 77.4126], role: 'hub', sub: 'INTERCHANGE' },
  { name: 'INDORE', coords: [22.7196, 75.8577], role: 'hub', sub: 'FREIGHT PLAZA' },
  { name: 'MUMBAI', coords: [19.0760, 72.8777], role: 'dest', sub: 'DESTINATION · JNPT' },
];

export const HeroRealMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Bounds covering Nagpur to Mumbai with padding
    const bounds = L.latLngBounds(
      [18.6, 72.4], // South-West (Mumbai area)
      [23.6, 79.6]  // North-East (Bhopal/Nagpur area)
    );

    const map = L.map(mapContainerRef.current, {
      center: [20.8, 75.8],
      zoom: 6.8,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false, // Prevents intercepting page scroll
      doubleClickZoom: true,
      dragging: true,
      maxBounds: L.latLngBounds([16.5, 70.0], [25.5, 82.5]),
      minZoom: 6,
      maxZoom: 12,
    });

    mapRef.current = map;

    // CartoDB Positron Light Tiles — matches the warm off-white industrial logistics palette
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Feeder Route (Secondary connection via Bhopal & Indore)
    L.polyline(FEEDER_ROUTE, {
      color: '#A5A5A4',
      weight: 2,
      opacity: 0.55,
      dashArray: '5, 6',
      lineCap: 'round',
    }).addTo(map);

    // Primary Expressway Corridor Outer Glow
    L.polyline(CORRIDOR_POINTS, {
      color: '#F2AE32',
      weight: 8,
      opacity: 0.25,
      lineCap: 'round',
    }).addTo(map);

    // Primary Expressway Corridor Solid Active Line
    const corridorLine = L.polyline(CORRIDOR_POINTS, {
      color: '#F2AE32',
      weight: 3.5,
      opacity: 0.95,
      lineCap: 'round',
      dashArray: '8, 5',
    }).addTo(map);

    corridorLine.bindTooltip(
      '<div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #06383D;">NH-53 / Samruddhi Expressway Corridor</div>',
      { sticky: true }
    );

    // Waypoint Markers
    WAYPOINTS.forEach((wp) => {
      const isOrigin = wp.role === 'origin';
      const isDest = wp.role === 'dest';
      const badgeBg = isOrigin ? '#16803C' : isDest ? '#06383D' : '#FFFFFF';
      const badgeText = isOrigin || isDest ? '#FFFFFF' : '#292D2F';
      const dotColor = isOrigin ? '#16803C' : isDest ? '#06383D' : '#F2AE32';

      const iconHtml = `
        <div style="display: flex; flex-direction: column; align-items: center; pointer-events: auto;">
          <div style="
            background: ${badgeBg};
            color: ${badgeText};
            border: 1.5px solid #06383D;
            border-radius: 4px;
            padding: 2px 6px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            font-weight: 800;
            white-space: nowrap;
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
            margin-bottom: 3px;
          ">
            ${wp.name}
          </div>
          <div style="
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${dotColor};
            border: 2px solid #FFFFFF;
            box-shadow: 0 0 0 1.5px #06383D;
          "></div>
        </div>
      `;

      const marker = L.marker(wp.coords, {
        icon: L.divIcon({
          html: iconHtml,
          className: 'hero-waypoint-marker',
          iconSize: [60, 36],
          iconAnchor: [30, 28],
        }),
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: monospace; font-size: 11px; padding: 4px; color: #292D2F;">
          <strong style="color: #06383D; font-size: 12px;">${wp.name}</strong><br/>
          <span style="color: #A5A5A4; font-size: 10px;">${wp.sub}</span>
        </div>
      `);
    });

    // Active Live Truck Marker CC-102 at Kasara Ghat Approach
    const truckCoords: [number, number] = [19.6450, 73.4830];

    const truckIconHtml = `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <!-- Pulsing Radar Ring -->
        <div style="
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(242, 174, 50, 0.35);
          border: 1.5px solid #F2AE32;
          animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
          pointer-events: none;
        "></div>

        <!-- Floating Info Pill -->
        <div style="
          background: #06383D;
          color: #FFFFFF;
          border: 1px solid #F2AE32;
          border-radius: 4px;
          padding: 2px 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(6, 56, 61, 0.3);
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span style="width: 5px; height: 5px; border-radius: 50%; background: #F2AE32;"></span>
          CC-102 &bull; 78.4 km/h
        </div>

        <!-- Center Vehicle Pin -->
        <div style="
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: #F2AE32;
          border: 2px solid #FFFFFF;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #292D2F;
          font-weight: bold;
        ">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#292D2F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        </div>
      </div>
    `;

    const truckMarker = L.marker(truckCoords, {
      icon: L.divIcon({
        html: truckIconHtml,
        className: 'hero-truck-marker',
        iconSize: [110, 48],
        iconAnchor: [55, 34],
      }),
      zIndexOffset: 1000,
    }).addTo(map);

    truckMarker.bindPopup(`
      <div style="font-family: monospace; font-size: 11px; padding: 6px; color: #292D2F; min-width: 180px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-weight: bold; color: #06383D; font-size: 12px;">CC-102 (Carrier Reefer)</span>
          <span style="background: #F2AE32; color: #292D2F; padding: 1px 4px; border-radius: 3px; font-size: 9px; font-weight: bold;">EN ROUTE</span>
        </div>
        <div style="color: #A5A5A4; font-size: 10px; margin-bottom: 4px;">Nagpur Zero Mile &rarr; Mumbai JNPT</div>
        <div style="background: #F0EEEA; border-radius: 4px; padding: 4px 6px; margin-top: 4px; border-left: 2px solid #F2AE32;">
          <div>Location: <strong>Kasara Ghat Approach (NH-160)</strong></div>
          <div>Speed: <strong>78.4 km/h</strong></div>
          <div>Cargo Temp: <strong style="color: #16803C;">+3.8&deg;C (Target +4&deg;C)</strong></div>
        </div>
      </div>
    `);

    // Invalidate size shortly after mounting to eliminate gray tiles
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
        mapRef.current.fitBounds(bounds, { padding: [25, 25] });
      }
    }, 200);

    setIsMapReady(true);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    if (!mapRef.current) return;
    const bounds = L.latLngBounds(
      [18.6, 72.4],
      [23.6, 79.6]
    );
    mapRef.current.fitBounds(bounds, { padding: [25, 25] });
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#F0EEEA] select-none">
      {/* Real Map Leaflet Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full z-0" 
        style={{ minHeight: '280px' }}
      />

      {/* Floating Map Controls — 5-Color System */}
      <div className="absolute top-3 right-3 z-400 flex flex-col gap-1.5 shadow-md">
        <button
          onClick={handleZoomIn}
          title="Zoom in"
          className="w-7 h-7 rounded-md bg-white border border-[#D0CEC9] text-[#292D2F] hover:bg-[#F0EEEA] hover:text-[#06383D] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom out"
          className="w-7 h-7 rounded-md bg-white border border-[#D0CEC9] text-[#292D2F] hover:bg-[#F0EEEA] hover:text-[#06383D] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleRecenter}
          title="Fit full corridor"
          className="w-7 h-7 rounded-md bg-white border border-[#D0CEC9] text-[#292D2F] hover:bg-[#F0EEEA] hover:text-[#06383D] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top Left Live GPS Badge */}
      <div className="absolute top-3 left-3 z-400 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/90 backdrop-blur-xs border border-[#D0CEC9] font-mono text-[9px] font-bold text-[#06383D] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F2AE32] animate-ping" />
          <span>REAL-TIME GPS TELEMETRY</span>
        </div>
      </div>

      {/* Bottom Right Carto / OSM Tile Notice */}
      <div className="absolute bottom-1 right-2 z-400 pointer-events-none">
        <span className="text-[8px] font-mono text-[#A5A5A4] bg-white/70 px-1 rounded">
          &copy; OpenStreetMap &bull; &copy; CARTO
        </span>
      </div>
    </div>
  );
};
