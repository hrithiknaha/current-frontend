import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import NotFound from "../components/configs/NotFound";
import EpisodeRow from "../components/utils/TV/EpisodeRow";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";
import WatchedEpisodeRow from "../components/utils/TV/WatchedEpisodeRow";
import { getAverageEpisodesRating } from "../configs/helpers";

const Season = () => {
    const { tvId, seasonNumber } = useParams();

    const auth = useSelector((state) => state.auth);

    const [isLoading, setIsLoading] = useState(true);

    const [seasonEpisodes, setSeasonEpisodes] = useState();
    const [watchedEpisodes, setWatchedEpisodes] = useState();

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosPublicInstance
            .get(`/api/tmdb/series/${tvId}/season/${seasonNumber}`)
            .then(({ data }) => {
                setSeasonEpisodes(data);

                axiosInstance.get(`/api/series/${tvId}/season/${seasonNumber}`).then(({ data }) => {
                    setWatchedEpisodes(data?.sort((a, b) => (a.episode_number > b.episode_number ? 1 : -1)));

                    setIsLoading(false);
                });
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    }, [tvId, seasonNumber]);

    return (
        <div className="min-h-screen bg-gray-100">
            {isLoading ? (
                <LoadingSpinner />
            ) : !seasonEpisodes && !watchedEpisodes ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl my-1">{seasonEpisodes.name}</h1>
                        <div className="flex gap-4 items-center justify-between text-2xl text-blue-500">
                            <div className="text-2xl text-blue-500">
                                {getAverageEpisodesRating(watchedEpisodes, seasonEpisodes)}
                            </div>
                            <div>{watchedEpisodes.map((e) => e.runtime).reduce((acc, co) => acc + co, 0)} mins</div>
                        </div>
                    </div>

                    <div className="h-1 w-full bg-gray-300 mt-4">
                        <div
                            style={{ width: `${(watchedEpisodes.length / seasonEpisodes.episodes.length) * 100}%` }}
                            className={`h-full ${
                                watchedEpisodes.length / seasonEpisodes.episodes.length < 70
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                            }`}
                        ></div>
                    </div>

                    <h3 className="mt-8">Overview</h3>
                    <p className="text-gray-700 text-sm mb-4">{seasonEpisodes.overview}</p>

                    <div className="my-8 ">
                        <h1 className="text-2xl">Episodes Yet To Watch</h1>
                        {seasonEpisodes.episodes
                            .filter((episode) => !watchedEpisodes.find((e) => e.episode_id === episode.id))
                            .map((episode) => {
                                return <EpisodeRow key={episode.id} episode={episode} />;
                            })}
                    </div>

                    <div className="my-8 ">
                        <h1 className="text-2xl">Watched Episodes</h1>
                        {watchedEpisodes.length ? (
                            watchedEpisodes.map((episode) => (
                                <WatchedEpisodeRow key={episode.episode_id} episode={episode} />
                            ))
                        ) : (
                            <p>No Watched episodes</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Season;
