import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import TMDBMovieList from "../components/lists/TMDBMovieList";
import SearchMovie from "../components/utils/movie/SearchMovie";
import Movie from "../components/utils/movie/Movie";
import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";

import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";

function Movies() {
    const [watchedMovies, setWatchedMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState();
    const [searchedMovies, setSearchedMovies] = useState();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get("/api/movies")
            .then(({ data }) => {
                setWatchedMovies(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

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
                <div>
                    <h1 className="pt-8 pb-4 text-2xl ">Movies Added</h1>
                    {isLoading ? (
                        <SmallLoadingSpinner />
                    ) : watchedMovies ? (
                        <div className="flex flex-wrap gap-4">
                            {watchedMovies.map((movie) => {
                                return <Movie movie={movie} />;
                            })}
                        </div>
                    ) : (
                        <p>No Movies</p>
                    )}
                </div>
                <SearchMovie handleSubmit={handleSubmit} setSearchQuery={setSearchQuery} />

                {searchedMovies && <TMDBMovieList movies={searchedMovies} />}
            </div>
        </div>
    );
}

export default Movies;
