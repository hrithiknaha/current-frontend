import { useState } from "react";
import axios from "axios";
import TMDBTVList from "../components/TMDBTVList";

const TV = () => {
    const [tvQuery, setTVQuery] = useState("");
    const [searchedTV, setSearchedTV] = useState();

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
            <h4>Movies</h4>
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
