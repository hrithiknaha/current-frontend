import axios from "axios";

export const fetchUser = (username, token, setUser) => {
    axios
        .get(`http://localhost:5001/api/users/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(({ data }) => {
            setUser(data);
        })
        .catch((err) => console.log(err));
};

export const fetchSavedMovie = (movieId, token, setUserSavedMovie) => {
    console.log("Requesting");
    axios
        .get(`http://localhost:5001/api/users/added/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(({ data }) => {
            setUserSavedMovie(data);
        })
        .catch((err) => console.log(err));
};
