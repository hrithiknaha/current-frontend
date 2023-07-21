import { useState } from "react";
import axios from "axios";

import TMDBMovieList from "../components/TMDBMovieList";

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
            <form onSubmit={handleSubmit} className="flex flex-col w-96">
                <input
                    className="mt-1 px-4 py-2 w-full border rounded"
                    type="text"
                    name="search-movies"
                    id="search-movies"
                    placeholder="Search Movies"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                    class="text-center bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 mt-4 rounded outline"
                    type="submit"
                >
                    Search Movies
                </button>
            </form>

            {searchedMovies && <TMDBMovieList movies={searchedMovies} />}
        </div>
    );
}

export default Movies;
