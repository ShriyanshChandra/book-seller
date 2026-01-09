import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        // Optional: Render a spinner or simpler loading state
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!user) {
        // User is not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // User is logged in but doesn't have the required role
        // Redirect to home or specific unauthorized page
        // For now, redirecting to home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
