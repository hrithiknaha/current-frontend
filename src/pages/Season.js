import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    extractSeriesIdFromURL,
    extractSeriesNameFromURL,
    computeSumAndWatchTime,
    computePercentageCompletion,
} from "../configs/helpers";
import { ArrowRight, ArrowLeft } from "react-feather";

import NotFound from "../components/configs/NotFound";
import EpisodeRow from "../components/TV/EpisodeRow";
import LoadingSpinner from "../components/configs/LoadingSpinner";
import WatchedEpisodeRow from "../components/TV/WatchedEpisodeRow";
import RatingAndTimeDetails from "../components/configs/RatingAndTimeDetails";

import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";
import SkeletonSeason from "../components/SkeletonSeason";

const Season = () => {
    const { tvId, seasonNumber } = useParams();

    const auth = useSelector((state) => state.auth.user);

    const [isLoading, setIsLoading] = useState(true);

    const [seasonEpisodes, setSeasonEpisodes] = useState();
    const [watchedEpisodes, setWatchedEpisodes] = useState();

    const [seasonCountDetails, setSeasonCountDetails] = useState();
    const [hasPreviousSeason, setHasPreviousSeason] = useState(true);
    const [hasNextSeason, setHasNextSeason] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setSeasonEpisodes();
        setWatchedEpisodes();
        setSeasonCountDetails();

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
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            {isLoading ? (
                <SkeletonSeason />
            ) : !seasonEpisodes && !watchedEpisodes ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-8 lg:py-12">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center text-sm font-medium space-x-2 ">
                            <Link to={`/tv/${tvId}`} className="text-orange-500">
                                {extractSeriesNameFromURL(tvId)}
                            </Link>
                            <span className="text-orange-500">/</span>
                            <div to={`/tv/${tvId}/season/${seasonNumber}`} className="text-orange-500">
                                S{seasonNumber}
                            </div>
                        </div>
                        {seasonCountDetails && (
                            <div className="pt-4 flex justify-between">
                                {hasPreviousSeason ? (
                                    <Link
                                        to={`/tv/${tvId}/season/${parseInt(seasonNumber) - 1}`}
                                        className="text-orange-500 pb-4 flex gap-2">
                                        <ArrowLeft /> Previous Season
                                    </Link>
                                ) : (
                                    <div></div>
                                )}
                                {hasNextSeason && (
                                    <Link
                                        to={`/tv/${tvId}/season/${parseInt(seasonNumber) + 1}`}
                                        className="text-orange-500 pb-4 flex gap-2">
                                        Next Season
                                        <ArrowRight />
                                    </Link>
                                )}
                            </div>
                        )}
                        <div className="flex flex-col gap-4 my-2 lg:flex-row lg:my-0 justify-between items-center">
                            <h1 className="text-4xl my-1">{seasonEpisodes.name}</h1>
                            <RatingAndTimeDetails
                                data={computeSumAndWatchTime(watchedEpisodes)}
                                completion={computePercentageCompletion(
                                    watchedEpisodes.length,
                                    seasonEpisodes.episodes.length
                                )}
                            />
                        </div>
                        {seasonEpisodes.overview && (
                            <div className="mt-4">
                                <h3 className="font-bold">Overview</h3>
                                <p className="text-gray-700 text-sm mb-4">{seasonEpisodes.overview}</p>
                            </div>
                        )}
                    </div>
                    {seasonEpisodes.episodes.length !== watchedEpisodes.length && (
                        <div className="my-8 ">
                            <h3 className="bg-gray-100 font-bold">Episodes</h3>
                            {seasonEpisodes.episodes
                                .filter((episode) => !watchedEpisodes.find((e) => e.episode_id === episode.id))
                                .map((episode) => {
                                    return <EpisodeRow key={episode.id} episode={episode} />;
                                })}
                        </div>
                    )}
                    <div className="my-8 ">
                        <h3 className="bg-gray-100 font-bold">Watched Episodes</h3>
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
