import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AppLayout } from './components/layout/AppLayout';
import { GlobalCommandPalette } from './components/common/GlobalCommandPalette';
import { PageLoadingSkeleton } from './components/common/PageLoadingSkeleton';
import { AuthProvider } from './context/AuthContext';

// Code-Split Secondary Application Pages to minimize initial bundle download
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const LiveTrackingPage = lazy(() => import('./pages/LiveTrackingPage').then(m => ({ default: m.LiveTrackingPage })));
const ShipmentsPage = lazy(() => import('./pages/ShipmentsPage').then(m => ({ default: m.ShipmentsPage })));
const ShipmentDetailPage = lazy(() => import('./pages/ShipmentDetailPage').then(m => ({ default: m.ShipmentDetailPage })));
const FleetPage = lazy(() => import('./pages/FleetPage').then(m => ({ default: m.FleetPage })));
const RoutesPage = lazy(() => import('./pages/RoutesPage').then(m => ({ default: m.RoutesPage })));
const WarehousePage = lazy(() => import('./pages/WarehousePage').then(m => ({ default: m.WarehousePage })));
const AlertsPage = lazy(() => import('./pages/AlertsPage').then(m => ({ default: m.AlertsPage })));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const AIIntelligencePage = lazy(() => import('./pages/AIIntelligencePage').then(m => ({ default: m.AIIntelligencePage })));
const CustomerTrackingPage = lazy(() => import('./pages/CustomerTrackingPage').then(m => ({ default: m.CustomerTrackingPage })));
const UserManagementPage = lazy(() => import('./pages/UserManagementPage').then(m => ({ default: m.UserManagementPage })));
const SupportPage = lazy(() => import('./pages/SupportPage').then(m => ({ default: m.SupportPage })));

// 4 Specialized Role-Based Portals (95 Features Total)
const FarmerPortalPage = lazy(() => import('./pages/portal/FarmerPortalPage').then(m => ({ default: m.FarmerPortalPage })));
const TruckAdminPortalPage = lazy(() => import('./pages/portal/TruckAdminPortalPage').then(m => ({ default: m.TruckAdminPortalPage })));
const RailwayAdminPortalPage = lazy(() => import('./pages/portal/RailwayAdminPortalPage').then(m => ({ default: m.RailwayAdminPortalPage })));
const WarehouseAdminPortalPage = lazy(() => import('./pages/portal/WarehouseAdminPortalPage').then(m => ({ default: m.WarehouseAdminPortalPage })));

export function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Keyboard Listener for Ctrl+K (Windows/Linux) and Cmd+K (macOS)
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K' || e.code === 'KeyK')) {
        e.preventDefault();
        e.stopPropagation();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => {
      setIsCommandPaletteOpen(true);
    };

    window.addEventListener('keydown', handleGlobalKeyDown, true);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown, true);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Global Command Palette (Ctrl+K / Cmd+K accessible from any route) */}
        <GlobalCommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpen={() => setIsCommandPaletteOpen(true)}
        />

        <Suspense fallback={<PageLoadingSkeleton />}>
          <Routes>
            {/* PUBLIC LANDING EXPERIENCE */}
            <Route 
              path="/" 
              element={
                <LandingPage onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
              } 
            />

            {/* AUTHENTICATION PORTAL */}
            <Route path="/login" element={<LoginPage />} />

            {/* 1. DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <DashboardPage />
                </AppLayout>
              }
            />

            {/* 2. SHIPMENTS & ORDERS */}
            <Route
              path="/shipments"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <ShipmentsPage />
                </AppLayout>
              }
            />

            {/* SHIPMENT DETAIL */}
            <Route
              path="/shipments/:id"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <ShipmentDetailPage />
                </AppLayout>
              }
            />

            {/* 3. LIVE TRACKING */}
            <Route
              path="/tracking"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <LiveTrackingPage />
                </AppLayout>
              }
            />

            {/* 4. FLEET & DRIVERS */}
            <Route
              path="/fleet"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <FleetPage />
                </AppLayout>
              }
            />

            {/* Drivers alias to Fleet & Drivers */}
            <Route
              path="/drivers"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <FleetPage />
                </AppLayout>
              }
            />

            {/* 5. ROUTES & DELIVERY SCHEDULING */}
            <Route
              path="/routes"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <RoutesPage />
                </AppLayout>
              }
            />

            {/* 6. WAREHOUSE & INVENTORY */}
            <Route
              path="/warehouse"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <WarehousePage />
                </AppLayout>
              }
            />

            {/* 7. ALERTS & NOTIFICATIONS */}
            <Route
              path="/alerts"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <AlertsPage />
                </AppLayout>
              }
            />

            {/* 8. REPORTS & ANALYTICS */}
            <Route
              path="/analytics"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <AnalyticsPage />
                </AppLayout>
              }
            />

            {/* 9. AI INTELLIGENCE (8 EXACT ENGINES) */}
            <Route
              path="/ai-intelligence"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <AIIntelligencePage />
                </AppLayout>
              }
            />

            {/* 10. CUSTOMER TRACKING */}
            <Route
              path="/customer-tracking"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <CustomerTrackingPage />
                </AppLayout>
              }
            />

            {/* 11. USER MANAGEMENT & SECURITY */}
            <Route
              path="/users"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <UserManagementPage />
                </AppLayout>
              }
            />

            {/* 12. SUPPORT / CONTACT */}
            <Route
              path="/support"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <SupportPage />
                </AppLayout>
              }
            />

            {/* ============================================================== */}
            {/* 4 SPECIALIZED ROLE-BASED PORTALS (95 FEATURES SOURCE OF TRUTH) */}
            {/* ============================================================== */}

            {/* PORTAL 1: FARMER PORTAL (20 FEATURES) */}
            <Route
              path="/portal/farmer"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <FarmerPortalPage />
                </AppLayout>
              }
            />
            <Route path="/farmer" element={<Navigate to="/portal/farmer" replace />} />

            {/* PORTAL 2: TRUCK ADMINISTRATION PORTAL (31 FEATURES) */}
            <Route
              path="/portal/truck"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <TruckAdminPortalPage />
                </AppLayout>
              }
            />
            <Route path="/truck-admin" element={<Navigate to="/portal/truck" replace />} />

            {/* PORTAL 3: RAILWAY ADMINISTRATION PORTAL (30 FEATURES) */}
            <Route
              path="/portal/railway"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <RailwayAdminPortalPage />
                </AppLayout>
              }
            />
            <Route path="/railway" element={<Navigate to="/portal/railway" replace />} />

            {/* PORTAL 4: WAREHOUSE ADMINISTRATION PORTAL (14 FEATURES) */}
            <Route
              path="/portal/warehouse"
              element={
                <AppLayout onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
                  <WarehouseAdminPortalPage />
                </AppLayout>
              }
            />
            <Route path="/warehouse-admin" element={<Navigate to="/portal/warehouse" replace />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
