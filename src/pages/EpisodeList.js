import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { axiosPrivateInstance } from "../configs/axios";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import EpisodeTable from "../components/episode/EpisodeTable";

const EpisodeList = () => {
    const { username } = useParams();

    const [watchedEpisodes, setWatchedEpisodes] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const auth = useSelector((state) => state.auth.user);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/episodes/${username}`)
            .then(({ data }) => {
                setWatchedEpisodes(data);
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
                    ) : watchedEpisodes ? (
                        <EpisodeTable watchedEpisodes={watchedEpisodes} />
                    ) : (
                        <p>No Episodes</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EpisodeList;
