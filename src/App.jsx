import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, memo } from "react";
import { Spinner } from "react-bootstrap";
import "./App.css";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Lazy load pages with performance optimizations
// Using dynamic imports with prefetch hints for better performance
const Dashboard = lazy(() => {
  // Prefetch other important routes after Dashboard loads
  return import("./pages/Dashboard").then((module) => {
    // Prefetch most commonly accessed routes
    import("./pages/restaurants/RestaurantList");
    import("./pages/advertisements/AdvertisementManagement");
    return module;
  });
});

const RestaurantList = lazy(() => import("./pages/restaurants/RestaurantList"));
const RestaurantProfile = lazy(() =>
  import("./pages/restaurants/RestaurantProfile")
);
const UserList = lazy(() => import("./pages/users/UserList"));
const UserProfile = lazy(() => import("./pages/users/UserProfile"));
const AdvertisementManagement = lazy(() =>
  import("./pages/advertisements/AdvertisementManagement")
);
const NotificationManagement = lazy(() =>
  import("./pages/notifications/NotificationManagement")
);
const HelpSupport = lazy(() => import("./pages/support/HelpSupport"));
const DeliveryPersonnel = lazy(() =>
  import("./pages/delivery/DeliveryPersonnel")
);
const LiveTracking = lazy(() => import("./pages/orders/LiveTracking"));

// Loading component for suspense fallback - memoized for better performance
const LoadingSpinner = memo(() => (
  <div
    className="d-flex justify-content-center align-items-center transition-optimized"
    style={{ height: "100vh" }}
  >
    <Spinner
      animation="border"
      variant="primary"
      role="status"
      className="transition-optimized"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
));

// Custom CSS variables can be added to index.css for theming
// Bootstrap theme customization can be done via Sass variables if needed

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="restaurants" element={<RestaurantList />} />
            <Route path="restaurants/:id" element={<RestaurantProfile />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserProfile />} />
            <Route
              path="advertisements"
              element={<AdvertisementManagement />}
            />
            <Route path="notifications" element={<NotificationManagement />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="delivery" element={<DeliveryPersonnel />} />
            <Route path="orders" element={<LiveTracking />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default memo(App);
