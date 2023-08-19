import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosPublicInstance } from "../configs/axios";

import TMDBMovieList from "../components/lists/TMDBMovieList";
import TMDBTVList from "../components/lists/TMDBTVList";

import LoadingSpinner from "../components/configs/LoadingSpinner";

const Search = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query"));
    const [movies, setMovies] = useState();
    const [shows, setShows] = useState();
    const [selected, setSelected] = useState("movies");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            query,
            language: "en-US",
            page: 1,
        };

        axiosPublicInstance
            .post("/api/tmdb/movies/search", payload)
            .then(({ data }) => {
                setMovies(data.results);
                navigate({ search: `query=${query.toString()}` });
            })
            .catch((err) => console.log(err));

        axiosPublicInstance
            .post("/api/tmdb/series/search", payload)
            .then(({ data }) => {
                setShows(data.results);
                navigate({ search: `query=${query.toString()}` });
            })
            .catch((err) => console.log(err));
    };

    const selectMovies = (e) => {
        setSelected("movies");
    };

    const selectShows = (e) => {
        setSelected("series");
    };

    useEffect(() => {
        const payload = {
            query,
            language: "en-US",
            page: 1,
        };

        axiosPublicInstance
            .post("/api/tmdb/movies/search", payload)
            .then(({ data }) => {
                setMovies(data.results);
            })
            .catch((err) => console.log(err));

        axiosPublicInstance
            .post("/api/tmdb/series/search", payload)
            .then(({ data }) => {
                setShows(data.results);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            <div className="container mx-auto">
                <form className="flex gap-4 items-center justify-center py-8 rounded" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="query"
                        name="query"
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Search Entities"
                        onChange={(e) => setQuery(e.target.value)}
                        defaultValue={query}
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 text-white hover:bg-orange-600 font-semibold py-2 px-4 rounded outline">
                        Submit
                    </button>
                </form>
                {movies && shows ? (
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex flex-col justify-between w-full lg:w-80 h-full shadow rounded">
                            <h1 className="text-lg lg:text-xl p-3 lg:p-4 bg-orange-500 text-white rounded-t">
                                Search Results
                            </h1>
                            <div>
                                <div
                                    onClick={selectMovies}
                                    className={`flex items-center justify-between ${
                                        selected === "movies"
                                            ? "bg-gray-200 "
                                            : "hover:bg-gray-200 hover:cursor-pointer"
                                    } pt-4 p-2 lg:p-3`}>
                                    <p>Movies</p>
                                    <p className="bg-orange-500 px-2 rounded text-white">{movies.length}</p>
                                </div>
                                <div
                                    onClick={selectShows}
                                    className={`flex items-center justify-between ${
                                        selected === "series" ? "bg-gray-200" : "hover:bg-gray-200 hover:cursor-pointer"
                                    } pt-4 p-2 lg:p-3`}>
                                    <p>TV Shows</p>
                                    <p className="bg-orange-500 px-2 rounded text-white">{shows.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            {selected === "movies" ? <TMDBMovieList movies={movies} /> : <TMDBTVList series={shows} />}
                        </div>
                    </div>
                ) : (
                    <LoadingSpinner />
                )}
            </div>
        </div>
    );
};

export default Search;
