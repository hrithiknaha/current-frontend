import axios from "axios";

export const searchMovies = (movieQueries, setSearchedMovies) => {
    axios.post("http://localhost:5001/api/tmdb/movies/search", { query: movieQueries, language: "en-US", page: 1 }).then(({ data }) => {
        setSearchedMovies(data.results);
    });
};

export const getMovieDetails = (movieId, setMovie) => {
    axios.get(`http://localhost:5001/api/tmdb/movies/${movieId}`).then(({ data }) => {
        setMovie(data);
    });
};
