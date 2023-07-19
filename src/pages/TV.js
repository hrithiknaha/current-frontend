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
        <div>
            <Outlet />
            <h4>TV</h4>
            {watchedSeries ? (
                watchedSeries.map((series) => {
                    return (
                        <div key={series.series_id}>
                            <Link to={`${series.series_id}`}>{series.name}</Link>
                            <p>{series.status}</p>
                            <p>{series.episodes.length === series.number_of_episodes ? "Completed" : "watching"}</p>
                        </div>
                    );
                })
            ) : (
                <p>Loading...</p>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="search-movies">Search TV</label>
                <input
                    type="text"
                    name="search-movies"
                    id="search-movies"
                    placeholder="Search Movies"
                    onChange={(e) => setTVQuery(e.target.value)}
                />

                <button type="submit">Search TV</button>
            </form>

            {searchedTV ? <TMDBTVList series={searchedTV} /> : <p>Beautiful Day</p>}
        </div>
    );
};

export default TV;
