import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { axiosPublicInstance } from "../configs/axios";
import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";

function Home() {
    const [trending, setTrending] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axiosPublicInstance.get("/api/tmdb/trending").then(({ data }) => {
            setTrending(data.results);
            setIsLoading(false);
        });
    }, []);
    return (
        <div className="min-h-screen  bg-gray-100">
            <div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-500 py-20">
                    <div className="mx-auto container">
                        <h1 className="text-5xl  font-bold text-white mb-4">This is your archive.</h1>
                        <p className="text-xl  text-white">Do what you want with it!</p>
                    </div>
                </div>
                <div className="container mx-auto pt-8">
                    <h1 className="text-2xl">Trending this week</h1>
                    {isLoading ? (
                        <SmallLoadingSpinner />
                    ) : (
                        <div className="flex overflow-x-auto pt-1">
                            {trending.map((e) => {
                                return (
                                    <Link
                                        key={e.id}
                                        to={e.media_type === "movie" ? `movies/${e.id}` : `tv/${e.id}`}
                                        className="rounded-lg shadow-md overflow-hidden flex-none w-40 h-64 m-2"
                                    >
                                        <img
                                            className="w-full h-full object-cover"
                                            src={`https://image.tmdb.org/t/p/w300/${e.poster_path}`}
                                            alt={`${e.title}`}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
