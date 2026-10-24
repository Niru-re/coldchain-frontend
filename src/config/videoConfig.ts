export interface VideoItem {
  id: string;
  name: string;
  path: string;
  purpose: string;
  title: string;
  description: string;
  resolution: string;
  aspectRatio: '16:9' | '9:16';
  ariaLabel: string;
}

export interface VideoMappingConfig {
  hero: VideoItem;              // Video 2: Highway Freight Transit
  logisticsNetwork: VideoItem;  // Video 4: Aerial National Highway Corridor
  warehouseOperations: VideoItem; // Video 6: Forklift Freight Truck Loading
  custodyHandling: VideoItem;   // Video 3: Secure Consignment Movement
  cargoHandling: VideoItem;     // Video 3: Alias for cargo handling
  fleetTransit: VideoItem;      // Video 5: Night Aerial Highway Freight
  controlTower: VideoItem;      // Video 1: Mission Operations Command Room
}

export const LOCAL_VIDEOS: Record<string, VideoItem> = {
  video1: {
    id: 'video1',
    name: 'video1.mp4',
    path: '/videos/video1.mp4',
    purpose: 'Control Tower / Technology',
    title: 'Mission Operations Control Room',
    description: 'Enterprise multi-screen operations center with dispatch pilots monitoring highway cameras, telemetry walls, and live traffic.',
    resolution: '1920x1080 (1080p, 25fps)',
    aspectRatio: '16:9',
    ariaLabel: 'Control room dispatch operators monitoring traffic and telemetry walls',
  },
  video2: {
    id: 'video2',
    name: 'video2.mp4',
    path: '/videos/video2.mp4',
    purpose: 'Hero / Cinematic Transit',
    title: 'Inland Freight Expressway Transit',
    description: 'Epic aerial tracking shot of heavy ColdChain 360 container haulers cruising in convoy down the open inland expressway.',
    resolution: '3840x2160 (4K UHD, 60fps)',
    aspectRatio: '16:9',
    ariaLabel: 'Aerial tracking of freight container trucks moving on the highway',
  },
  video3: {
    id: 'video3',
    name: 'video3.mp4',
    path: '/videos/video3.mp4',
    purpose: 'Chain of Custody / Safe Handling',
    title: 'Secured Consignment Handling',
    description: 'Warehouse personnel in protective gear wheeling boxed freight on transport hand-trucks into a secure loading terminal.',
    resolution: '3840x2160 (4K UHD, 25fps)',
    aspectRatio: '16:9',
    ariaLabel: 'Logistics crew transporting packaged consignment boxes into warehouse',
  },
  video4: {
    id: 'video4',
    name: 'video4.mp4',
    path: '/videos/video4.mp4',
    purpose: 'Logistics Network / Corridors',
    title: 'National Freight Corridor Flow',
    description: 'High-angle aerial drone view of a multi-lane expressway corridor with continuous freight traffic moving through inland corridors.',
    resolution: '3840x2160 (4K UHD, 24fps)',
    aspectRatio: '16:9',
    ariaLabel: 'Drone view of multi-lane national freight highway with moving trucks',
  },
  video5: {
    id: 'video5',
    name: 'video5.mp4',
    path: '/videos/video5.mp4',
    purpose: 'Fleet / 24/7 Operations / Final CTA',
    title: 'Night Fleet Navigation',
    description: 'Moody top-down night aerial view of a heavy commercial truck with glowing amber warning and cab lights rounding a highway curve.',
    resolution: '2160x3840 (Vertical 4K / Top-down, 30fps)',
    aspectRatio: '9:16',
    ariaLabel: 'Top-down aerial view of heavy freight truck driving at night with glowing amber lights',
  },
  video6: {
    id: 'video6',
    name: 'video6.mp4',
    path: '/videos/video6.mp4',
    purpose: 'Warehouse / Operations Loading',
    title: 'ColdChain 360 Truck Dock Loading Operations',
    description: 'Forklift loading wrapped palletized cargo into a heavy white freight carrier trailer outside an industrial logistics warehouse.',
    resolution: '3840x2160 (4K UHD, 30fps)',
    aspectRatio: '16:9',
    ariaLabel: 'Forklift loading pallet cargo into a heavy freight truck trailer at warehouse dock',
  },
};

// Semantic mapping for structured frontend section usage
export const VIDEO_MAPPING: VideoMappingConfig = {
  hero: LOCAL_VIDEOS.video2,               // Video 2 → Hero (4K aerial highway convoy)
  logisticsNetwork: LOCAL_VIDEOS.video4,   // Video 4 → Logistics Network (aerial corridor flow)
  warehouseOperations: LOCAL_VIDEOS.video6,// Video 6 → Warehouse / Operations (forklift dock loading)
  custodyHandling: LOCAL_VIDEOS.video3,    // Video 3 → Custody / Verification (cargo handling)
  cargoHandling: LOCAL_VIDEOS.video3,      // Video 3 → Alias for cargo handling
  fleetTransit: LOCAL_VIDEOS.video5,       // Video 5 → Fleet / 24/7 Transit / Final CTA (night highway truck)
  controlTower: LOCAL_VIDEOS.video1,       // Video 1 → Control Tower / Technology (multi-screen operations room)
};

// Compatibility adapter for existing components
export const VIDEO_CONFIG = {
  heroVideo: {
    src: VIDEO_MAPPING.hero.path,
    title: VIDEO_MAPPING.hero.title,
    caption: VIDEO_MAPPING.hero.description,
    ariaLabel: VIDEO_MAPPING.hero.ariaLabel,
  },
  journeyVideo: {
    src: VIDEO_MAPPING.logisticsNetwork.path,
    title: VIDEO_MAPPING.logisticsNetwork.title,
    caption: VIDEO_MAPPING.logisticsNetwork.description,
    ariaLabel: VIDEO_MAPPING.logisticsNetwork.ariaLabel,
  },
  warehouseVideo: {
    src: VIDEO_MAPPING.warehouseOperations.path,
    title: VIDEO_MAPPING.warehouseOperations.title,
    caption: VIDEO_MAPPING.warehouseOperations.description,
    ariaLabel: VIDEO_MAPPING.warehouseOperations.ariaLabel,
  },
  controlTowerVideo: {
    src: VIDEO_MAPPING.controlTower.path,
    title: VIDEO_MAPPING.controlTower.title,
    caption: VIDEO_MAPPING.controlTower.description,
    ariaLabel: VIDEO_MAPPING.controlTower.ariaLabel,
  },
};
