import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

import { REFRESH_USER } from "../redux/actions/types";
import { retrieveAccessToken, isTokenExpired } from "../configs/helpers";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState();

    const auth = useSelector((state) => state.auth);
    const { exp } = auth;

    const dispatch = useDispatch();

    useEffect(() => {
        if (auth?.token) {
            if (isTokenExpired(exp)) {
                console.log("Token is invalid. Refreshing token");
                axios
                    .get("http://localhost:5001/api/auth/refresh", { withCredentials: true })
                    .then(({ data }) => {
                        localStorage.setItem("token", data.accessToken);
                        setIsAuthenticated(true);
                        console.log("Token updated in localstorage");
                        const { username, token, exp } = retrieveAccessToken();
                        dispatch({ type: REFRESH_USER, payload: { username, token, exp } });
                    })
                    .catch((err) => console.log(err));
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
