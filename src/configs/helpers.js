export const isTokenExpired = (exp) => {
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
};
