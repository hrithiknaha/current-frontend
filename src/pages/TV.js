import { useState, useEffect } from "react";
import axios from "axios";
import TMDBTVList from "../components/TMDBTVList";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const TV = () => {
    const [tvQuery, setTVQuery] = useState("");
    const [searchedTV, setSearchedTV] = useState();

    const [watchedSeries, setWatchedSeries] = useState();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/series`, { headers: { Authorization: `Bearer ${auth.token}` } })
            .then(({ data }) => {
                console.log(data);
                setWatchedSeries(data);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchTV = (tvQuery) => {
            axios
                .post("http://localhost:5001/api/tmdb/series/search", {
                    query: tvQuery,
                    language: "en-US",
                    page: 1,
                })
                .then(({ data }) => {
                    setSearchedTV(data.results);
                });
        };
        searchTV(tvQuery);
    };

    return (
        <div className="min-h-screen bg-gray-100 ">
            <div className="container mx-auto">
                <div>
                    <h1 className="pt-8 pb-4 text-2xl ">Series Added</h1>
                    <div className="flex flex-wrap gap-4">
                        {watchedSeries &&
                            watchedSeries.map((series) => {
                                return (
                                    <Link
                                        to={`/tv/${series.series_id}`}
                                        key={series.series_id}
                                        class="bg-white rounded-lg shadow-md p-4"
                                    >
                                        <h2 class="text-lg font-semibold mb-2">{series.name}</h2>
                                        <p class="text-gray-600 mb-2">{series.status}</p>
                                        <p class="text-gray-600 mt-2">
                                            {series.episodes.length === series.number_of_episodes
                                                ? "Completed"
                                                : "Currently Watching"}
                                        </p>
                                    </Link>
                                );
                            })}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col w-96 mt-8">
                    <input
                        type="text"
                        name="search-movies"
                        id="search-movies"
                        placeholder="Search TV"
                        onChange={(e) => setTVQuery(e.target.value)}
                        className="mt-1 px-4 py-2 w-full border rounded"
                    />
                    <button
                        class="text-center bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 mt-4 rounded outline"
                        type="submit"
                    >
                        Search TV
                    </button>
                </form>

                {searchedTV && <TMDBTVList series={searchedTV} />}
            </div>
        </div>
    );
};

export default TV;
