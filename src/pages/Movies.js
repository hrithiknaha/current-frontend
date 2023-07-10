import { useState } from "react";
import axios from "axios";

import TMDBMovieList from "../components/TMDBMovieList";
import { searchMovies } from "../redux/actions/tmdb";

function Movies() {
    const [movieQueries, setMoviesQueries] = useState();
    const [searchedMovies, setSearchedMovies] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        searchMovies(movieQueries, setSearchedMovies);
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
