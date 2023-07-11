import { useState } from "react";
import axios from "axios";

import TMDBMovieList from "../components/TMDBMovieList";

function Movies() {
    const [movieQueries, setMoviesQueries] = useState();
    const [searchedMovies, setSearchedMovies] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchMovies = (movieQueries) => {
            axios.post("http://localhost:5001/api/tmdb/movies/search", { query: movieQueries, language: "en-US", page: 1 }).then(({ data }) => {
                setSearchedMovies(data.results);
            });
        };
        searchMovies(movieQueries);
    };
    return (
        <div>
            <h4>Movies</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search-movies">Search Movies</label>
                <input type="text" name="search-movies" id="search-movies" placeholder="Search Movies" onChange={(e) => setMoviesQueries(e.target.value)} />

                <button type="submit">Search Movies</button>
            </form>

            {searchedMovies ? <TMDBMovieList movies={searchedMovies} /> : <p>Beautiful Day</p>}
        </div>
    );
}

export default Movies;
