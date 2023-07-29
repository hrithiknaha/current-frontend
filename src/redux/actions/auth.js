import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";

import { LOGIN_USER, LOGOUT_USER } from "./types";
import { axiosPublicInstance } from "../../configs/axios";

export const registerUser = (firstname, lastname, username, password, navigate) => (dispatch) => {
    const payload = {
        firstname,
        lastname,
        username,
        password,
    };

    axiosPublicInstance.post("/api/auth/register", payload).then(({ data }) => {
        const token = data.data.accessToken;

        localStorage.setItem("token", token);
        const { username, exp } = jwtDecode(token);

        dispatch({
            type: LOGIN_USER,
            payload: { username, token, exp },
        });
        navigate(`/profile/${username}`);
    });
    console.log({ firstname, lastname, username, password });
};

export const loginUser = (username, password, navigate) => (dispatch) => {
    const payload = {
        username,
        password,
    };

    axiosPublicInstance
        .post("/api/auth/login", payload)
        .then((response) => {
            console.log(response);
            const token = response.data.accessToken;

            localStorage.setItem("token", token);
            const { username, exp } = jwtDecode(token);

            dispatch({
                type: LOGIN_USER,
                payload: { username, token, exp },
            });
            navigate(`/profile/${username}`);
            toast.success("Sweet!");
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.response.data.status_message);
        });
};

export const logoutUser = (navigate) => (dispatch) => {
    axiosPublicInstance
        .get("/api/auth/logout")
        .then(() => {
            localStorage.removeItem("token");
            dispatch({
                type: LOGOUT_USER,
            });
            navigate(`/`);
        })
        .catch((err) => console.log(err));
};
