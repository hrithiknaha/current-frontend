import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import { getRatingAsStars } from "../configs/helpers";

import NotFound from "../components/configs/NotFound";
import EpisodeRow from "../components/utils/TV/EpisodeRow";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";

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
                    <p className="text-4xl my-1">{seasonEpisodes.name}</p>

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
                                return <EpisodeRow episode={episode} />;
                            })}
                    </div>

                    <div className="my-8 ">
                        <h1 className="text-2xl">Watched Episodes</h1>
                        {watchedEpisodes.length ? (
                            watchedEpisodes.map((episode) => {
                                return (
                                    <Link key={episode.episode_id} to={`episode/${episode.episode_number}`}>
                                        <div
                                            key={episode.episode_id}
                                            className="bg-white rounded-lg shadow-md p-4 mt-3"
                                        >
                                            <h2 className="text-lg font-semibold mb-2">{episode.name}</h2>
                                            <div className="flex items-center justify-between">
                                                <div className="mr-4">
                                                    <p className="text-gray-600">Episdoe Number:</p>
                                                    <p className="text-2xl font-semibold">{episode.episode_number}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">Watch Date:</p>
                                                    <p className="text-2xl font-semibold">
                                                        {moment(episode.date_watched).format("YYYY-MM-DD")}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 float-right">Rating:</p>
                                                    {watchedEpisodes && (
                                                        <p className="text-2xl font-semibold">
                                                            {getRatingAsStars(episode.rating)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
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
