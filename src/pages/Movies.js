import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import TMDBMovieList from "../components/lists/TMDBMovieList";
import SearchMovie from "../components/forms/movie/SearchMovie";
import Movie from "../components/forms/movie/Movie";
import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";

function Movies() {
    const [watchedMovies, setWatchedMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState();
    const [searchedMovies, setSearchedMovies] = useState();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/movies", {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then(({ data }) => {
                setWatchedMovies(data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

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
        <div className="min-h-screen  bg-gray-100">
            <div className="container mx-auto">
                <div>
                    <h1 className="pt-8 pb-4 text-2xl ">Movies Added</h1>
                    {isLoading ? (
                        <SmallLoadingSpinner />
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {watchedMovies &&
                                watchedMovies.map((movie) => {
                                    return <Movie movie={movie} />;
                                })}
                        </div>
                    )}
                </div>
                <SearchMovie handleSubmit={handleSubmit} setSearchQuery={setSearchQuery} />

                {searchedMovies && <TMDBMovieList movies={searchedMovies} />}
            </div>
        </div>
    );
}

export default Movies;
