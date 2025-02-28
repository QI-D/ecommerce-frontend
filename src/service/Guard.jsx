import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, isAdmin } from "./AuthService";

export const ProtectedRoute = ({element: Component}) => {
    const location = useLocation();
    
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace state={{ from: location }}/>;
    }
    return <Component />;

}

export const AdminRoute = ({element: Component}) => {
    const location = useLocation();
    
    if (!isAdmin()) {
        return <Navigate to="/login" replace state={{ from: location }}/>;
    }
    return <Component />;
}
