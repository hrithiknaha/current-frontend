import { useState } from "react";
import axios from "axios";

import TMDBMovieList from "../components/lists/TMDBMovieList";
import SearchMovie from "../components/forms/movie/SearchMovie";

function Movies() {
    const [searchQuery, setSearchQuery] = useState();
    const [searchedMovies, setSearchedMovies] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            query: searchQuery,
            language: "en-US",
            page: 1,
        };

        axios
            .post("http://localhost:5001/api/tmdb/movies/search", payload)
            .then(({ data }) => {
                setSearchedMovies(data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl p-8">Movies</h1>
            <SearchMovie handleSubmit={handleSubmit} setSearchQuery={setSearchQuery} />

            {searchedMovies && <TMDBMovieList movies={searchedMovies} />}
        </div>
    );
}

export default Movies;
