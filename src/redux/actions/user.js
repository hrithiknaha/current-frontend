import axios from "axios";

export const fetchSavedMovie = (movieId, token, setUserSavedMovie) => {
    console.log("Requesting");
    axios
        .get(`http://localhost:5001/api/users/added/${movieId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(({ data }) => {
            setUserSavedMovie(data);
        })
        .catch((err) => console.log(err));
};
