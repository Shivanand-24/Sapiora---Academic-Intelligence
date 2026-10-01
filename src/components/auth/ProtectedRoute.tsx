import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLMS } from '../../context/LMSContext';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useLMS();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useLMS();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
