import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { axiosPrivateInstance } from "../configs/axios";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import TVTable from "../components/TV/TVTable";

const TVList = () => {
    const { username } = useParams();

    const [watchedSeries, setWatchedSeries] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/series/user/${username}`)
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
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            <div className="container mx-auto py-8 lg:py-12">
                <div>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : watchedSeries ? (
                        <TVTable watchedSeries={watchedSeries} />
                    ) : (
                        <p>No Series</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TVList;
