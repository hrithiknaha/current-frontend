import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === undefined) return <p>loading</p>;

    return isAuthenticated ? <Outlet /> : <Navigate to={"/auth"} replace />;
};
export default PrivateRoute;
