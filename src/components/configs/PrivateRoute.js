import { Outlet, Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../configs/LoadingSpinner";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === undefined) return <LoadingSpinner />;

    return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />;
};
export default PrivateRoute;
