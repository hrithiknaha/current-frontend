import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-hot-toast";
import CastList from "../components/lists/CastList";
import GuestList from "../components/lists/GuestList";
import CrewList from "../components/lists/CrewList";
import axios from "axios";
import { ArrowRight, ArrowLeft } from "react-feather";

import NotFound from "../components/configs/NotFound";
import LoadingSpinner from "../components/configs/LoadingSpinner";
import { extractSeriesIdFromURL, extractSeriesNameFromURL } from "../configs/helpers";
import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";

import RatingForm from "../components/forms/RatingForm";

import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";
import RatingDetails from "../components/configs/RatingDetails";

const Episode = () => {
    const { tvId, seasonNumber, episodeNumber } = useParams();

    const auth = useSelector((state) => state.auth.user);

    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState();
    const [tmdbEpisode, setTmdbEpisode] = useState();
    const [isDetailsLoading, setIsDetailsLoading] = useState(true);
    const [episodeDetails, setEpisodeDetails] = useState();
    const [hasRated, setHasRated] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [episodeCountDetails, setEpisodeCountDetails] = useState();
    const [hasPreviousEpisode, setHasPreviousEpisode] = useState(true);
    const [hasNextEpisode, setHasNextEpisode] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setRating();
        setTmdbEpisode();
        setIsDetailsLoading(true);
        setEpisodeDetails();
        setHasRated(false);
        setIsSending(false);
        setEpisodeCountDetails();
        setHasNextEpisode(true);
        setHasPreviousEpisode(true);

        const cancelTokenSource = axios.CancelToken.source();
        axiosPublicInstance
            .get(`/api/tmdb/series/${extractSeriesIdFromURL(tvId)}/season/${seasonNumber}/episode/${episodeNumber}`)
            .then(({ data }) => {
                setTmdbEpisode(data);
                setIsLoading(false);
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.log(error);
                    setIsLoading(false);
                }
            });

        return () => {
            cancelTokenSource.cancel("Request canceled due to component unmount or re-run");
        };
    }, [tvId, seasonNumber, episodeNumber]);

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        const axiosInstance = axiosPrivateInstance(auth);
        if (tmdbEpisode)
            axiosInstance
                .get(`/api/series/${extractSeriesIdFromURL(tvId)}/episodes/${tmdbEpisode.id}`)
                .then(({ data }) => {
                    setEpisodeDetails(data);
                    setIsDetailsLoading(false);
                    if (data?.rating) setHasRated(true);
                    setIsSending(false);
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        setIsDetailsLoading(false);
                        console.log(error);
                    }
                });

        return () => {
            cancelTokenSource.cancel("Request canceled due to component unmount or re-run");
        };
    }, [tvId, tmdbEpisode, hasRated]);

    useEffect(() => {
        setHasPreviousEpisode(true);
        setHasNextEpisode(true);

        axiosPublicInstance
            .get(`/api/tmdb/series/${extractSeriesIdFromURL(tvId)}/season/${seasonNumber}`)
            .then(({ data }) => {
                setEpisodeCountDetails(data.episodes);
                if (data?.episodes)
                    if (parseInt(episodeNumber) === 1) {
                        setHasPreviousEpisode(false);
                        setHasNextEpisode(true);
                    } else if (parseInt(episodeNumber) === data.episodes[data.episodes.length - 1].episode_number) {
                        setHasPreviousEpisode(true);
                        setHasNextEpisode(false);
                    }
            });
    }, [tvId, seasonNumber, episodeNumber]);

    const handleWatch = (e) => {
        e.preventDefault();
        setIsSending(true);
        const axiosInstance = axiosPrivateInstance(auth);

        const payload = {
            series_id: extractSeriesIdFromURL(tvId),
            date_watched: new Date(),
            rating,
            episode_number: episodeNumber,
            season_number: seasonNumber,
        };

        axiosInstance
            .post(`/api/series/watch`, payload)
            .then(() => {
                setHasRated(true);
                console.log("Saved");
            })
            .catch((err) => {
                toast.error(err.response.data.status_message);
                console.log(err);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            {isLoading ? (
                <LoadingSpinner />
            ) : !tmdbEpisode ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-8 lg:py-12">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <div className="flex items-center text-sm font-medium space-x-2 ">
                            <Link to={`/tv/${tvId}`} className="text-orange-500">
                                {extractSeriesNameFromURL(tvId)}
                            </Link>
                            <span className="text-orange-500">/</span>
                            <Link to={`/tv/${tvId}/season/${seasonNumber}`} className="text-orange-500">
                                S{seasonNumber}
                            </Link>
                            <span className="text-orange-500">/</span>
                            <span className="text-orange-500">E{episodeNumber}</span>
                        </div>
                        <div className="container mx-auto py-4">
                            {episodeCountDetails && (
                                <div className="pb-4 flex justify-between">
                                    {hasPreviousEpisode ? (
                                        <Link
                                            to={`/tv/${tvId}/season/${seasonNumber}/episode/${
                                                parseInt(episodeNumber) - 1
                                            }`}
                                            className="text-orange-500 pb-4 flex gap-2">
                                            <ArrowLeft />
                                            Previous Episode
                                        </Link>
                                    ) : (
                                        <div></div>
                                    )}
                                    {hasNextEpisode && (
                                        <Link
                                            to={`/tv/${tvId}/season/${seasonNumber}/episode/${
                                                parseInt(episodeNumber) + 1
                                            }`}
                                            className="text-orange-500 pb-4 flex gap-2">
                                            Next Episode
                                            <ArrowRight />
                                        </Link>
                                    )}
                                </div>
                            )}

                            <div className="text-center lg:text-left">
                                <h1 className="text-gray-600 text-sm">
                                    S{seasonNumber} | E{episodeNumber}
                                </h1>
                            </div>
                            <div className="flex flex-col gap-4 my-2 lg:flex-row lg:my-0 justify-between items-center">
                                <h1 className="text-center lg:text-left text-4xl my-1">{tmdbEpisode.name}</h1>

                                {isDetailsLoading ? (
                                    <SmallLoadingSpinner />
                                ) : hasRated && episodeDetails?.rating ? (
                                    <RatingDetails data={episodeDetails} />
                                ) : isSending ? (
                                    <SmallLoadingSpinner />
                                ) : (
                                    <RatingForm setRating={setRating} handleWatch={handleWatch} />
                                )}
                            </div>

                            <div className="flex flex-wrap gap-1 justify-center lg:justify-normal text-gray-600 text-sm">
                                <h1>{moment(tmdbEpisode.air_date).format("YYYY-MM-DD")}</h1>
                                <div>&#8226;</div>
                                <h1>{tmdbEpisode.runtime} min</h1>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-bold">Overview</h3>
                                <p className="text-gray-700 text-sm mb-4">{tmdbEpisode.overview}</p>
                            </div>

                            <div className="mt-4">
                                <CastList casts={tmdbEpisode.credits.cast} />
                                <GuestList guests={tmdbEpisode.guest_stars} />
                                <CrewList
                                    crews={tmdbEpisode.credits.crew.filter(
                                        (c) =>
                                            c.job === "Writer" ||
                                            c.job === "Director" ||
                                            c.job === "Screenplay" ||
                                            c.job === "Director of Photography" ||
                                            c.job === "Original Music Composer"
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Episode;
