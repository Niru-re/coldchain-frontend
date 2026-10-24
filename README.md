# ColdChain 360 — Multi-Modal Cold-Chain Logistics & Telematics Platform

ColdChain 360 is an enterprise-grade cold-chain monitoring, predictive shelf-life modeling, and autonomous cargo rescue platform designed for agricultural produce, pharmaceuticals, vaccines, dairy, and seafood.

The system combines:
- **FastAPI Backend**: Python 3.10+, SQLAlchemy 2.0 ORM, Pydantic v2 schemas, JWT Bearer security, and Alembic database versioning.
- **Supabase PostgreSQL Database**: Hosted cloud relational database with 15 tables supporting multi-modal consignment tracking, fleet telematics, automated alerts, warehouse chambers, agricultural batches, and immutable audit logs.
- **React 19 + Vite + TypeScript Frontend**: Modern responsive operations console with real-time charts (Recharts), mapping, OpenCV inspection simulations, and 4 specialized role portals (Farmer, Truck Fleet, Kisan Rail, and Warehouse).

---

## Architecture Overview

```
                                      +-------------------------------+
                                      |   React 19 + TypeScript UI    |
                                      |  (Vite, Tailwind, Recharts)   |
                                      +---------------+---------------+
                                                      |
                                                      | HTTP / REST (JWT Bearer)
                                                      v
+---------------------------------------------------------------------------------------------------+
|                                      FastAPI 1.0 Backend Engine                                   |
|                                                                                                   |
|  /api/v1/auth        /api/v1/shipments      /api/v1/fleet         /api/v1/alerts                  |
|  (RBAC, JWT tokens)  (Tracking, Telematics) (Trucks, Drivers)     (Thermal excursions)            |
|                                                                                                   |
|  /api/v1/warehouses  /api/v1/portals        /api/v1/analytics     /health                         |
|  (Chambers & Nodes)  (Farmer, Rail, Mandi)  (Live Dashboard KPIs) (Database connectivity)         |
+---------------------------------------------------------------------------------------------------+
                                                      |
                                                      | SQLAlchemy 2.0 (psycopg2)
                                                      v
                                      +-------------------------------+
                                      |   Supabase PostgreSQL Cloud   |
                                      |   (15 Tables, Alembic Head)   |
                                      +-------------------------------+
```

---

## Database Schema (15 Tables)

The remote PostgreSQL database on Supabase is fully tracked by Alembic (`fb9437a89a0d`):

1. **`users`**: System accounts, password hashes, role-based access control, profile data, assigned vehicle.
2. **`locations`**: Physical sites, origin orchards, air cargo hubs, rail sidings, and ports.
3. **`trucks`**: Reefer fleet vehicles, compressor pressures, refrigerant levels, telematics coordinates.
4. **`drivers`**: Fleet haulers, license numbers, ratings, safety scores, assigned vehicles.
5. **`shipments`**: Canonical hybrid cold-chain consignments, temperature bounds, shelf life, risk scores.
6. **`assignments`**: Dispatch links connecting shipments, trucks, and drivers.
7. **`positions`**: Time-series GPS breadcrumbs, speed, ambient temperature, and cargo telematics.
8. **`events`**: Milestone log of transit events, customs clearance, cross-docking, and handovers.
9. **`alerts`**: Real-time and predictive excursion alerts, resolution tracking, operator audit.
10. **`warehouse_nodes`**: Cold storage facilities, temperature zones, pallet capacities, risk statuses.
11. **`warehouse_chambers`**: Temperature-controlled rooms (Deep Freeze, Chilled, CA Produce, Blast Tunnel).
12. **`crop_batches`**: Agricultural harvest batches, PMKSY/MIDH subsidies, APMC mandi rates, escrow payouts.
13. **`operational_rules`**: Telematics rule engine for automated threshold evaluation.
14. **`audit_logs`**: Immutable compliance audit trail tracking security overrides and data changes.
15. **`alembic_version`**: Migration revision state tracking.

---

## Quick Start Guide

### Prerequisites
- Python 3.10 or higher
- Node.js 18+ and npm
- PostgreSQL client tools (optional)

### 1. Backend Setup & Run

```bash
# Navigate to project root
cd C:\Users\nirma\Downloads\FTL2-main

# Install backend dependencies
pip install -r backend/requirements.txt

# Run database migrations to apply latest schema
python -m alembic -c backend/alembic.ini upgrade head

# Seed demo data (idempotent, skips already existing records)
python backend/seed.py

# Start the FastAPI server (Port 8000)
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Interactive API documentation will be available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- Health check: `http://localhost:8000/health`
- Database health: `http://localhost:8000/health/db`

### 2. Frontend Setup & Run

```bash
# In another terminal window:
cd C:\Users\nirma\Downloads\FTL2-main

# Install frontend dependencies
npm install

# Start Vite dev server (Port 5173)
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## Seed Accounts & Role Gateways

The demo environment comes pre-seeded with accounts for all operational roles (default password: `ColdChain2026!`):

| Role | Demo Email | Portal / Function |
|---|---|---|
| **Admin** | `ops.lead@coldchain360.in` | Central Control Tower, Fleet Oversight, User Management |
| **Truck Admin** | `truck.admin@coldchain360.in` | Highway Fleet Ops, Reefer Health, Relay Dispatch |
| **Railway Admin** | `kisan.rail@coldchain360.in` | Kisan Rail Network, DFC Corridors, Wagon Allotment |
| **Warehouse Admin** | `warehouse.lead@coldchain360.in` | Cold Storage Facilities, CA Chambers, Blast Tunnels |
| **Farmer** | `ramesh.deshmukh@agrocoop.in` | Producer Portal, APMC Mandi Rates, Subsidies |
| **Driver** | `rajesh.sharma@coldchain360.in` | Mobile Route Guidance, Reefer Status, E-Sign POD |
| **Customer** | `supplychain@serumbiopharma.com` | Consignee Tracking Bay, Temperature Certificates |

---

## Automated Verification & Testing

### Backend Unit & Integration Tests (36 Tests)
```bash
python -m pytest backend/tests -v
```
- 24 Core authentication, JWT tokens, password hashing, and health tests.
- 12 End-to-end domain tests (Shipments, Fleet, Alerts, Warehouses, Portals, Analytics, User Management).

### Frontend Build & Typecheck
```bash
# Production bundle compilation
npm run build

# TypeScript strict validation
npx tsc --noEmit
```

---

## API Endpoints Reference

### Authentication & Users
- `POST /api/v1/auth/register` — Public registration (default user role)
- `POST /api/v1/auth/login` — Authenticate and receive JWT access token
- `GET /api/v1/auth/me` — Retrieve active user profile
- `GET /api/v1/auth/users` — List all registered system users
- `PATCH /api/v1/auth/users/{user_id}/role` — Admin role assignment
- `PATCH /api/v1/auth/users/{user_id}` — Update user profile

### Consignments & Tracking
- `GET /api/v1/shipments` — List shipments with status, category, and text search
- `POST /api/v1/shipments` — Create a new cold-chain consignment
- `GET /api/v1/shipments/{id}` — Retrieve detailed shipment record
- `PATCH /api/v1/shipments/{id}` — Update status, temperature, or vehicle link
- `POST /api/v1/shipments/telematics/ping` — Ingest live GPS breadcrumb and sensor telemetry
- `GET /api/v1/shipments/{id}/positions` — Time-series GPS and temperature history
- `GET /api/v1/shipments/{id}/events` — Consignment lifecycle event log

### Fleet & Personnel
- `GET /api/v1/fleet/trucks` — List reefer vehicles with status filtering
- `POST /api/v1/fleet/trucks` — Register a vehicle in the fleet
- `GET /api/v1/fleet/trucks/{id}` — Retrieve truck details by plate or ID
- `PATCH /api/v1/fleet/trucks/{id}` — Update telemetry or operational status
- `GET /api/v1/fleet/drivers` — List verified fleet drivers
- `POST /api/v1/fleet/drivers` — Add a new driver record
- `GET /api/v1/fleet/assignments` — List dispatch assignments
- `POST /api/v1/fleet/assignments` — Link shipment, vehicle, and driver

### Alerts & Incidents
- `GET /api/v1/alerts` — Query active and historical thermal/security alerts
- `POST /api/v1/alerts` — Create an operational or predictive excursion alert
- `GET /api/v1/alerts/{id}` — Retrieve alert details and recommendations
- `POST /api/v1/alerts/{id}/acknowledge` — Operator acknowledgment
- `POST /api/v1/alerts/{id}/resolve` — Resolve incident with closing notes

### Facilities & Storage
- `GET /api/v1/warehouses/nodes` — List regional cold hub terminals
- `POST /api/v1/warehouses/nodes` — Register a new cold terminal
- `GET /api/v1/warehouses/nodes/{id}` — Get single terminal facility
- `GET /api/v1/warehouses/chambers` — List storage chambers (Deep Freeze, CA, Chilled)
- `POST /api/v1/warehouses/chambers` — Create a storage chamber

### Portals & Multimodal
- `GET /api/v1/portals/farmer/batches` — List agricultural harvest batches
- `POST /api/v1/portals/farmer/batches` — Register a new harvest consignment
- `PATCH /api/v1/portals/farmer/batches/{id}` — Update batch status or payout
- `GET /api/v1/portals/farmer/mandi-rates` — Live APMC wholesale mandi rates
- `GET /api/v1/portals/railway/trains` — Active Kisan Rail rakes and schedule
- `GET /api/v1/portals/inspections` — Computer vision produce and e-seal presets

### Analytics & System Health
- `GET /api/v1/analytics/dashboard` — Aggregated KPIs, economic value, compliance rate
- `GET /health` — Service health check
- `GET /health/db` — Live database connectivity ping
