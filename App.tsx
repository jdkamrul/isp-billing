import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Packages from './pages/Packages';
import Invoices from './pages/Invoices';
import RouterControls from './pages/RouterControls';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ManageMikrotikServer from './pages/ManageMikrotikServer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/router-controls" element={<RouterControls />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/mikrotik-servers/:serverId/manage" element={<ManageMikrotikServer />} />
                {/* Redirect any other nested path to dashboard */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
