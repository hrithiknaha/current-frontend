import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { isTokenExpired } from "../configs/helpers";

import { refreshUser } from "../redux/features/auth/authSlice";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState();

    const auth = useSelector((state) => state.auth.user);
    const { exp } = auth;

    const dispatch = useDispatch();

    useEffect(() => {
        if (auth?.token) {
            if (isTokenExpired(exp)) {
                dispatch(refreshUser(setIsAuthenticated));
            } else {
                console.log("Token is valid");
                setIsAuthenticated(true);
            }
        } else {
            toast.success("Please login first!");
            console.log("User logged out");
            setIsAuthenticated(false);
        }
    }, [exp]);

    return { isAuthenticated };
};

export default useAuth;
