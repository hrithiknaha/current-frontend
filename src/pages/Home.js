import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tv } from "react-feather";

import { axiosPublicInstance, axiosPrivateInstance } from "../configs/axios";
import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";
import NextEpisodeList from "../components/lists/NextEpisodeList";
import TrendingList from "../components/lists/TrendingList";
import SearchEntity from "../components/forms/SearchEntity";

function Home() {
    const [trending, setTrending] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [query, setQuery] = useState("");

    const [nextDetails, setNextDetails] = useState([]);
    const [isSeriesLoading, setIsSeriesLoading] = useState(true);

    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth.user);

    useEffect(() => {
        axiosPublicInstance.get("/api/tmdb/trending").then(({ data }) => {
            setTrending(data.results);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);

        axiosInstance
            .get(`/api/episodes/${auth.username}/continue/watching`)
            .then(({ data }) => {
                setNextDetails(data);
                setIsSeriesLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsSeriesLoading(false);
            });
    }, [auth.username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${query}`);
    };

    return (
        <div className="min-h-screen  bg-gray-100">
            <div>
                <div className="bg-gradient-to-r from-red-500 to-orange-500 py-20">
                    <div className="mx-auto container flex flex-col items-center lg:items-start">
                        <h1 className="text-2xl lg:text-5xl font-bold text-white mb-2 lg:mb-4 flex items-center justify-center gap-4">
                            <Tv size={48} />
                            This is your archive.
                        </h1>
                        <p className="text-xl  text-white">Do what you want!</p>
                        <SearchEntity handleSubmit={handleSubmit} setQuery={setQuery} />
                    </div>
                </div>
                {nextDetails && (
                    <div className="container mx-auto pt-12 lg:pt-8 px-4 lg:px-0">
                        <h1 className="text-center lg:text-left text-2xl pb-2">Currently Watching</h1>
                        <div className="pt-2 flex overflow-x-auto gap-4">
                            {isSeriesLoading ? <SmallLoadingSpinner /> : <NextEpisodeList nextDetails={nextDetails} />}
                        </div>
                    </div>
                )}

                <div className="container mx-auto pt-12 lg:pt-8 px-4 lg:px-0">
                    <h1 className="text-center lg:text-left text-2xl pb-2">Trending this week</h1>
                    {isLoading ? <SmallLoadingSpinner /> : <TrendingList trending={trending} />}
                </div>
            </div>
        </div>
    );
}

export default Home;
