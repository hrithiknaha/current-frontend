import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { extractSeriesIdFromURL, makeSeriesUrl } from "../configs/helpers";

import NotFound from "../components/configs/NotFound";
import EpisodeRow from "../components/TV/EpisodeRow";
import LoadingSpinner from "../components/configs/LoadingSpinner";
import WatchedEpisodeRow from "../components/TV/WatchedEpisodeRow";

import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";

const Season = () => {
    const { tvId, seasonNumber } = useParams();

    const auth = useSelector((state) => state.auth);

    const [isLoading, setIsLoading] = useState(true);

    const [seasonEpisodes, setSeasonEpisodes] = useState();
    const [watchedEpisodes, setWatchedEpisodes] = useState();

    const [seasonCountDetails, setSeasonCountDetails] = useState();
    const [hasPreviousSeason, setHasPreviousSeason] = useState(true);
    const [hasNextSeason, setHasNextSeason] = useState(true);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosPublicInstance
            .get(`/api/tmdb/series/${extractSeriesIdFromURL(tvId)}/season/${seasonNumber}`)
            .then(({ data }) => {
                setSeasonEpisodes(data);

                axiosInstance
                    .get(`/api/series/${extractSeriesIdFromURL(tvId)}/season/${seasonNumber}`)
                    .then(({ data }) => {
                        setWatchedEpisodes(data?.sort((a, b) => (a.episode_number > b.episode_number ? 1 : -1)));

                        setIsLoading(false);
                    });
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    }, [tvId, seasonNumber]);

    useEffect(() => {
        setHasNextSeason(true);
        setHasPreviousSeason(true);

        axiosPublicInstance.get(`/api/tmdb/series/${extractSeriesIdFromURL(tvId)}`).then(({ data }) => {
            setSeasonCountDetails(data.seasons);
            if (data?.seasons)
                if (parseInt(seasonNumber) === 1) {
                    setHasPreviousSeason(false);
                    setHasNextSeason(true);
                } else if (parseInt(seasonNumber) === data.seasons[data.seasons.length - 1].season_number) {
                    setHasPreviousSeason(true);
                    setHasNextSeason(false);
                }
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
                    {seasonCountDetails && (
                        <div className="pb-4 flex justify-between">
                            {hasPreviousSeason ? (
                                <Link
                                    to={`/tv/${tvId}/season/${parseInt(seasonNumber) - 1}`}
                                    className="text-blue-500  pb-4">
                                    ⬅️ Previous Season
                                </Link>
                            ) : (
                                <div></div>
                            )}
                            {hasNextSeason && (
                                <Link
                                    to={`/tv/${tvId}/season/${parseInt(seasonNumber) + 1}`}
                                    className="text-blue-500  pb-4">
                                    ➡️ Next Season
                                </Link>
                            )}
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl my-1">{seasonEpisodes.name}</h1>
                        <div className="flex gap-4 items-center justify-between text-2xl text-blue-500">
                            <div className="text-2xl text-blue-500">
                                {(
                                    watchedEpisodes.map((e) => e.rating).reduce((acc, co) => acc + co, 0) /
                                    watchedEpisodes.length
                                ).toFixed(2)}{" "}
                                / 10
                            </div>
                            <div>
                                {watchedEpisodes.map((e) => e.runtime).reduce((acc, co) => acc + co, 0)} /{" "}
                                {seasonEpisodes.episodes.map((e) => e.runtime).reduce((cur, ob) => cur + ob, 0)} mins
                            </div>
                        </div>
                    </div>

                    <div className="h-1 w-full bg-gray-300 mt-4">
                        <div
                            style={{ width: `${(watchedEpisodes.length / seasonEpisodes.episodes.length) * 100}%` }}
                            className={`h-full ${
                                watchedEpisodes.length / seasonEpisodes.episodes.length < 70
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                            }`}></div>
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
