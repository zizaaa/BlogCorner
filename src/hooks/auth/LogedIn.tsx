import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthenticated from './Authenticate';

interface LogedInProps {
    children?: ReactNode;
}

const LogedIn: React.FC<LogedInProps> = ({ children }) => {
    const isAuth = isAuthenticated();

    if (isAuth) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default LogedIn;