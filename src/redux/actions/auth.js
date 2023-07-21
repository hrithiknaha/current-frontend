import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";

import { LOGIN_USER, LOGOUT_USER } from "./types";

export const registerUser = (firstname, lastname, username, password, navigate) => (dispatch) => {
    const payload = {
        firstname,
        lastname,
        username,
        password,
    };

    axios.post("http://localhost:5001/api/auth/register", payload).then(({ data }) => {
        const token = data.data.accessToken;

        localStorage.setItem("token", token);
        const { username, exp } = jwtDecode(token);

        dispatch({
            type: LOGIN_USER,
            payload: { username, token, exp },
        });
        navigate("/");
    });
    console.log({ firstname, lastname, username, password });
};

export const loginUser = (username, password, navigate) => (dispatch) => {
    const payload = {
        username,
        password,
    };

    axios
        .post("http://localhost:5001/api/auth/login", payload, { withCredentials: true })
        .then((response) => {
            console.log(response);
            const token = response.data.accessToken;

            localStorage.setItem("token", token);
            const { username, exp } = jwtDecode(token);

            dispatch({
                type: LOGIN_USER,
                payload: { username, token, exp },
            });
            navigate("/");
            toast.success("Sweet!");
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.response.data.status_message);
        });
};

export const logoutUser = () => (dispatch) => {
    axios
        .get("http://localhost:5001/api/auth/logout")
        .then(() => {
            localStorage.removeItem("token");
            dispatch({
                type: LOGOUT_USER,
            });
        })
        .catch((err) => console.log(err));
};
