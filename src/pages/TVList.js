import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import TVTable from "../components/utils/TV/TVTable";

const TVList = () => {
    const [watchedSeries, setWatchedSeries] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get("/api/series")
            .then(({ data }) => {
                setWatchedSeries(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-16">
                <div>
                    <h1 className="pb-4 text-2xl">My Ratings</h1>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : watchedSeries ? (
                        <TVTable watchedSeries={watchedSeries} />
                    ) : (
                        <p>No Movies</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TVList;
