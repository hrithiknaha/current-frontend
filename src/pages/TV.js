import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import TMDBTVList from "../components/lists/TMDBTVList";
import SearchTV from "../components/forms/TV/SearchTV";
import Series from "../components/forms/TV/Series";

const TV = () => {
    const auth = useSelector((state) => state.auth);

    const [isLoading, setIsLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchedTV, setSearchedTV] = useState();

    const [watchedSeries, setWatchedSeries] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/series`, { headers: { Authorization: `Bearer ${auth.token}` } })
            .then(({ data }) => {
                setWatchedSeries(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setWatchedSeries([]);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            query: searchQuery,
            language: "en-US",
            page: 1,
        };

        axios.post("http://localhost:5001/api/tmdb/series/search", payload).then(({ data }) => {
            setSearchedTV(data.results);
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 ">
            <div className="container mx-auto">
                <div>
                    <h1 className="pt-8 pb-4 text-2xl ">Series Added</h1>
                    {isLoading ? (
                        <p>Loading..</p>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {watchedSeries &&
                                watchedSeries.map((series) => {
                                    return <Series series={series} />;
                                })}
                        </div>
                    )}
                </div>
                <SearchTV setSearchQuery={setSearchQuery} handleSubmit={handleSubmit} />

                {searchedTV && <TMDBTVList series={searchedTV} />}
            </div>
        </div>
    );
};

export default TV;
