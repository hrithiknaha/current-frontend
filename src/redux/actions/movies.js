import axios from "axios";

export const saveMovieToCollection = ({ user, movieId, rating, dateWatched, theatre }) => {
    const payload = {
        movie_id: movieId,
        rating,
        date_watched: dateWatched,
        theatre,
    };

    const token = user.token;

    axios
        .post("http://localhost:5001/api/movies/add", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(({ data }) => console.log(data))
        .catch((err) => console.log(err));
};
