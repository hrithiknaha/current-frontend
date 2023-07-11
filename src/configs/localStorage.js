import jwtDecode from "jwt-decode";

export const retrieveAccessToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return {};

    const { username, exp } = jwtDecode(token);
    return { username, token, exp };
};
