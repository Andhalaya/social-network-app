import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = ({ element, ...rest }) => {
    const { isLoggedIn } = useAuth();
    
    if (!isLoggedIn) return <Navigate to="/" />;
    return <Outlet />;
   
  };
  

export default ProtectedRoute;

