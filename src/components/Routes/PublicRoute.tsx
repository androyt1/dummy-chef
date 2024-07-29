import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Adjust this import path as needed

interface PublicRouteProps {
    redirectPath?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ redirectPath = "/dashboard" }) => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (user) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
