import cv2
import numpy as np
import os
import math

os.makedirs('public/videos', exist_ok=True)

width, height = 1280, 720
fps = 30
duration_sec = 4  # 4-second seamless loop = 120 frames
total_frames = fps * duration_sec
fourcc = cv2.VideoWriter_fourcc(*'mp4v')

def create_hero_logistics_video():
    """Night highway aerial freight logistics with fast motion light trails & freight vehicles"""
    out = cv2.VideoWriter('public/videos/hero-logistics.mp4', fourcc, fps, (width, height))
    for f in range(total_frames):
        img = np.zeros((height, width, 3), dtype=np.uint8)
        # Deep dark navy background
        img[:] = (18, 10, 3) # BGR
        
        # Horizon & perspective road lines
        cx, cy = width // 2, int(height * 0.35)
        # Sky glow
        cv2.ellipse(img, (cx, cy), (600, 150), 0, 0, 360, (40, 25, 8), -1)

        # Draw highway lanes expanding in perspective
        for lane_offset in [-320, -160, 0, 160, 320]:
            pts = np.array([
                [cx + int(lane_offset * 0.1), cy],
                [cx + int((lane_offset - 80) * 1.8), height],
                [cx + int((lane_offset + 80) * 1.8), height],
                [cx + int(lane_offset * 0.1), cy]
            ], np.int32)
            cv2.fillPoly(img, [pts], (28, 18, 8))

        # Moving dashed lane lines
        dash_progress = (f / total_frames)
        for i in range(12):
            t = (i / 12.0 + dash_progress) % 1.0
            y1 = int(cy + (height - cy) * (t ** 1.8))
            y2 = int(cy + (height - cy) * ((t + 0.04) ** 1.8))
            w = int(2 + 16 * (t ** 1.5))
            if y2 < height:
                cv2.line(img, (cx - w*2, y1), (cx - w*2, y2), (180, 180, 180), max(1, int(w*0.3)))
                cv2.line(img, (cx + w*2, y1), (cx + w*2, y2), (180, 180, 180), max(1, int(w*0.3)))

        # Moving Freight Trucks with Red taillight trails & White headlight beams
        for truck_idx in range(6):
            # Speed parameter
            speed = 1.0 + (truck_idx % 3) * 0.2
            t = (f * speed / total_frames + truck_idx * 0.16) % 1.0
            is_oncoming = (truck_idx % 2 == 0)
            
            # Perspective scaling
            y = int(cy + (height - cy) * (t ** 1.6))
            scale = max(0.1, t ** 1.6)
            
            lane_x = cx - int(180 * scale) if is_oncoming else cx + int(180 * scale)
            truck_w = int(50 * scale)
            truck_h = int(140 * scale)
            
            # Draw truck body (dark industrial container)
            cv2.rectangle(img, (lane_x - truck_w//2, y - truck_h), (lane_x + truck_w//2, y), (50, 40, 30), -1)
            cv2.rectangle(img, (lane_x - truck_w//2, y - truck_h), (lane_x + truck_w//2, y), (120, 90, 40), max(1, int(2 * scale)))
            
            # Draw lights
            if is_oncoming:
                # White headlights
                cv2.circle(img, (lane_x - int(16 * scale), y), max(1, int(4 * scale)), (255, 255, 255), -1)
                cv2.circle(img, (lane_x + int(16 * scale), y), max(1, int(4 * scale)), (255, 255, 255), -1)
            else:
                # Red taillight trails
                cv2.circle(img, (lane_x - int(16 * scale), y), max(1, int(5 * scale)), (30, 30, 240), -1)
                cv2.circle(img, (lane_x + int(16 * scale), y), max(1, int(5 * scale)), (30, 30, 240), -1)
                # Light trail streak
                cv2.line(img, (lane_x - int(16 * scale), y), (lane_x - int(16 * scale), y + int(40 * scale)), (20, 20, 200), max(1, int(2 * scale)))
                cv2.line(img, (lane_x + int(16 * scale), y), (lane_x + int(16 * scale), y + int(40 * scale)), (20, 20, 200), max(1, int(2 * scale)))

        # Ambient roadside light poles & overhead gantries
        gantry_y = int(cy + (height - cy) * (((f / total_frames) % 0.5) * 2) ** 1.6)
        if gantry_y > cy + 40 and gantry_y < height - 20:
            cv2.line(img, (cx - 400, gantry_y), (cx + 400, gantry_y), (80, 70, 60), 2)
            cv2.circle(img, (cx, gantry_y), 4, (0, 240, 255), -1)

        out.write(img)
    out.release()
    print("hero-logistics.mp4 created")

def create_truck_highway_video():
    """Cinematic side/rear tracking shot of an inland FTL cargo truck cruising on expressway"""
    out = cv2.VideoWriter('public/videos/truck-highway.mp4', fourcc, fps, (width, height))
    for f in range(total_frames):
        img = np.zeros((height, width, 3), dtype=np.uint8)
        img[:] = (16, 12, 6) # Dark asphalt night ambience

        # Road surface moving horizontally
        offset = int((f / total_frames) * 200) % 50
        for x in range(-50, width + 50, 50):
            cv2.line(img, (x + offset, int(height * 0.72)), (x + offset + 30, int(height * 0.72)), (140, 140, 140), 4)

        # Distant mountain silhouettes
        for x in range(0, width, 20):
            h_val = int(height * 0.45 + 30 * math.sin(x * 0.005))
            cv2.line(img, (x, h_val), (x, int(height * 0.7)), (35, 25, 15), 20)

        # Heavy FTL Truck in 3/4 view
        # Cab + 32-ton Container
        cab_x, cab_y = int(width * 0.35), int(height * 0.55)
        # Gentle road bounce
        bounce = int(2 * math.sin(f * 0.5))
        cab_y += bounce

        # Trailer Body (Aerodynamic FTL carrier)
        cv2.rectangle(img, (cab_x, cab_y - 140), (cab_x + 480, cab_y + 40), (45, 35, 25), -1)
        cv2.rectangle(img, (cab_x, cab_y - 140), (cab_x + 480, cab_y + 40), (100, 80, 50), 2)
        # FTL360 styling on container
        cv2.putText(img, "FTL 360", (cab_x + 120, cab_y - 50), cv2.FONT_HERSHEY_SIMPLEX, 1.8, (0, 210, 255), 3)

        # Cabin front
        cv2.rectangle(img, (cab_x - 120, cab_y - 100), (cab_x, cab_y + 40), (60, 48, 35), -1)
        # Windshield
        cv2.rectangle(img, (cab_x - 110, cab_y - 90), (cab_x - 20, cab_y - 30), (120, 100, 60), -1)
        
        # Heavy Wheels with spin effect
        wheel_rot = (f * 15) % 360
        for wx in [cab_x - 80, cab_x + 80, cab_x + 140, cab_x + 380, cab_x + 440]:
            cv2.circle(img, (wx, cab_y + 45), 32, (10, 10, 10), -1)
            cv2.circle(img, (wx, cab_y + 45), 32, (70, 70, 70), 3)
            cv2.circle(img, (wx, cab_y + 45), 14, (140, 140, 140), -1)
            # Wheel spokes
            rad = math.radians(wheel_rot)
            cv2.line(img, (wx, cab_y + 45), (int(wx + 18 * math.cos(rad)), int(cab_y + 45 + 18 * math.sin(rad))), (200, 200, 200), 2)

        # Glowing Headlight Cone projecting forward
        cone_pts = np.array([
            [cab_x - 120, cab_y + 10],
            [0, cab_y - 20],
            [0, cab_y + 120],
            [cab_x - 120, cab_y + 25]
        ], np.int32)
        overlay = img.copy()
        cv2.fillPoly(overlay, [cone_pts], (220, 240, 255))
        cv2.addWeighted(overlay, 0.15, img, 0.85, 0, img)

        out.write(img)
    out.release()
    print("truck-highway.mp4 created")

def create_warehouse_video():
    """Modern automated inland logistics hub with cross-dock conveyor & laser telemetry"""
    out = cv2.VideoWriter('public/videos/warehouse.mp4', fourcc, fps, (width, height))
    for f in range(total_frames):
        img = np.zeros((height, width, 3), dtype=np.uint8)
        img[:] = (12, 10, 8) # Dark industrial warehouse

        # Storage rack vertical pillars
        for x in range(100, width, 180):
            cv2.line(img, (x, 80), (x, height - 100), (45, 40, 35), 6)
            for y in range(120, height - 100, 90):
                cv2.line(img, (x - 80, y), (x + 80, y), (55, 50, 40), 3)
                # Pallet cargo on racks
                cv2.rectangle(img, (x - 70, y - 55), (x + 70, y - 5), (35, 45, 55), -1)
                cv2.rectangle(img, (x - 70, y - 55), (x + 70, y - 5), (80, 120, 140), 1)

        # Automated guided vehicle (AGV) moving across foreground
        agv_x = int((f / total_frames) * (width + 300) - 150)
        agv_y = height - 140
        cv2.rectangle(img, (agv_x - 80, agv_y - 40), (agv_x + 80, agv_y + 20), (30, 60, 90), -1)
        cv2.rectangle(img, (agv_x - 80, agv_y - 40), (agv_x + 80, agv_y + 20), (0, 210, 255), 2)
        # Laser scanning sweep line
        laser_y = int(agv_y - 80 + 40 * math.sin(f * 0.2))
        cv2.line(img, (agv_x - 120, laser_y), (agv_x + 120, laser_y), (0, 240, 255), 2)

        out.write(img)
    out.release()
    print("warehouse.mp4 created")

def create_logistics_network_video():
    """Satellite / Aerial telemetry map network with pulsing nodes and high-speed cargo data pulses"""
    out = cv2.VideoWriter('public/videos/logistics-network.mp4', fourcc, fps, (width, height))
    
    # Hub locations in 1280x720 space
    hubs = [
        ("NAGPUR", 680, 380),
        ("MUMBAI", 360, 460),
        ("INDORE", 480, 300),
        ("BHOPAL", 580, 280),
        ("DELHI", 520, 140),
        ("HYDERABAD", 660, 520),
        ("BENGALURU", 560, 620)
    ]
    
    for f in range(total_frames):
        img = np.zeros((height, width, 3), dtype=np.uint8)
        img[:] = (15, 8, 4)

        # Grid lines
        for x in range(0, width, 80):
            cv2.line(img, (x, 0), (x, height), (25, 18, 10), 1)
        for y in range(0, height, 80):
            cv2.line(img, (0, y), (width, y), (25, 18, 10), 1)

        # Draw connecting routes
        routes = [
            (0, 1), # Nagpur - Mumbai
            (0, 2), # Nagpur - Indore
            (2, 3), # Indore - Bhopal
            (3, 4), # Bhopal - Delhi
            (0, 5), # Nagpur - Hyderabad
            (5, 6), # Hyderabad - Bengaluru
            (1, 6), # Mumbai - Bengaluru
        ]

        for idx1, idx2 in routes:
            _, x1, y1 = hubs[idx1]
            _, x2, y2 = hubs[idx2]
            cv2.line(img, (x1, y1), (x2, y2), (60, 45, 20), 2)
            
            # Data pulses traveling along route
            pulse_t = (f / total_frames * 2.0 + idx1 * 0.25) % 1.0
            px = int(x1 + (x2 - x1) * pulse_t)
            py = int(y1 + (y2 - y1) * pulse_t)
            cv2.circle(img, (px, py), 4, (0, 220, 255), -1)
            cv2.circle(img, (px, py), 8, (0, 150, 200), 1)

        # Draw hubs with pulse rings
        for name, hx, hy in hubs:
            pulse_r = max(2, int(15 + 10 * math.sin(f * 0.15)))
            cv2.circle(img, (hx, hy), pulse_r, (40, 70, 90), 1)
            cv2.circle(img, (hx, hy), 6, (0, 210, 255), -1)
            cv2.putText(img, name, (hx + 12, hy + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (220, 220, 220), 1)

        out.write(img)
    out.release()
    print("logistics-network.mp4 created")

create_hero_logistics_video()
create_truck_highway_video()
create_warehouse_video()
create_logistics_network_video()
print("All 4 cinematic videos successfully rendered!")
