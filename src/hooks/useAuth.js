import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import moment from "moment";

import { isTokenExpired } from "../configs/helpers";

import { refreshUser, logoutUser } from "../redux/features/auth/authSlice";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState();

    const auth = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.token) {
            if (isTokenExpired(auth.exp)) {
                dispatch(logoutUser());
            } else {
                setIsAuthenticated(true);
            }
        } else {
            toast.success("Please login first!");
            setIsAuthenticated(false);
        }
    }, [auth.exp]);

    return { isAuthenticated };
};

export default useAuth;
