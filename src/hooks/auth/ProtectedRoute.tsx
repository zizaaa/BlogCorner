import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthenticated from './Authenticate';

interface ProtectedRouteProps {
    children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuth = isAuthenticated();

    if (!isAuth) {
        return <Navigate to="/form/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;