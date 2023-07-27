import { useState, useEffect } from "react";

import TMDBMovieList from "../components/lists/TMDBMovieList";
import SearchMovie from "../components/utils/movie/SearchMovieForm";
import MovieCard from "../components/utils/movie/MovieCard";
import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";

import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";
import SearchMovieForm from "../components/utils/movie/SearchMovieForm";

function SearchMovies() {
    const [searchQuery, setSearchQuery] = useState();
    const [searchedMovies, setSearchedMovies] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            query: searchQuery,
            language: "en-US",
            page: 1,
        };

        axiosPublicInstance
            .post("/api/tmdb/movies/search", payload)
            .then(({ data }) => {
                setSearchedMovies(data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="min-h-screen  bg-gray-100">
            <div className="container mx-auto">
                <div className="text-2xl pt-16">Search Movies</div>
                <SearchMovieForm handleSubmit={handleSubmit} setSearchQuery={setSearchQuery} />

                {searchedMovies && <TMDBMovieList movies={searchedMovies} />}
            </div>
        </div>
    );
}

export default SearchMovies;