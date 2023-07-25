import { useState, useEffect } from "react";
import axios from "axios";

import TMDBTVList from "../components/lists/TMDBTVList";
import SearchTV from "../components/utils/TV/SearchTV";

import { axiosPublicInstance } from "../configs/axios";

const TV = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedTV, setSearchedTV] = useState();

    useEffect(() => {}, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            query: searchQuery,
            language: "en-US",
            page: 1,
        };

        axiosPublicInstance.post("/api/tmdb/series/search", payload).then(({ data }) => {
            setSearchedTV(data.results);
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 ">
            <div className="container mx-auto">
                <div className="text-2xl pt-16">Search TV</div>
                <SearchTV setSearchQuery={setSearchQuery} handleSubmit={handleSubmit} />

                {searchedTV && <TMDBTVList series={searchedTV} />}
            </div>
        </div>
    );
};

export default TV;
