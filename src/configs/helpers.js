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

export const getRatingAsStars = (rating) => {
    const star = "⭐️";
    return star.repeat(rating);
};

export const compileGender = (key) => {
    switch (key) {
        case 0:
            return "Not set / not specified";
        case 1:
            return "Female";
        case 2:
            return "Male";
        case 2:
            return "Non-Binary";
        default:
            break;
    }
};
