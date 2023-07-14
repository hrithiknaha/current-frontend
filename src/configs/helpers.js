import jwtDecode from "jwt-decode";

export const isTokenExpired = (exp) => {
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
};

export const retrieveAccessToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return {};

    const { username, exp } = jwtDecode(token);
    return { username, token, exp };
};
