import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-hot-toast";
import CastList from "../components/lists/CastList";
import GuestList from "../components/lists/GuestList";
import CrewList from "../components/lists/CrewList";

import NotFound from "../components/configs/NotFound";
import LoadingSpinner from "../components/configs/LoadingSpinner";
import { extractSeriesIdFromURL } from "../configs/helpers";
import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";

import RatingForm from "../components/forms/RatingForm";

import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";
import RatingDetails from "../components/configs/RatingDetails";

const Episode = () => {
    const { tvId, seasonNumber, episodeNumber } = useParams();

    const auth = useSelector((state) => state.auth);

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
        axiosPublicInstance
            .get(`/api/tmdb/series/${extractSeriesIdFromURL(tvId)}/season/${seasonNumber}/episode/${episodeNumber}`)
            .then(({ data }) => {
                setTmdbEpisode(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [tvId, seasonNumber, episodeNumber]);

    useEffect(() => {
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
                    setIsDetailsLoading(false);
                    console.log(error);
                });
    }, [tvId, tmdbEpisode, hasRated]);

    useEffect(() => {
        setIsLoading(true);
        setIsDetailsLoading(true);
        setHasNextEpisode(true);
        setHasPreviousEpisode(true);
        setEpisodeDetails([]);

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
    }, [tvId, episodeNumber]);

    const handleWatch = (e) => {
        e.preventDefault();
        setIsSending(true);
        const axiosInstance = axiosPrivateInstance(auth);

        const payload = {
            series_id: tvId,
            date_watched: new Date(),
            rating,
            episode_number: episodeNumber,
            season_number: seasonNumber,
        };

        console.log(payload);

        axiosInstance
            .post(`/api/series/watch`, payload)
            .then(() => {
                setHasRated(true);
            })
            .catch((err) => {
                toast.error("Please add series before playing with its episodes!");
                console.log(err);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {isLoading ? (
                <LoadingSpinner />
            ) : !tmdbEpisode ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-16">
                    {episodeCountDetails && (
                        <div className="pb-4 flex justify-between">
                            {hasPreviousEpisode ? (
                                <Link
                                    to={`/tv/${tvId}/season/${seasonNumber}/episode/${parseInt(episodeNumber) - 1}`}
                                    className="text-blue-500  pb-4">
                                    ⬅️ Previous Episode
                                </Link>
                            ) : (
                                <div></div>
                            )}
                            {hasNextEpisode && (
                                <Link
                                    to={`/tv/${tvId}/season/${seasonNumber}/episode/${parseInt(episodeNumber) + 1}`}
                                    className="text-blue-500  pb-4">
                                    ➡️ Next Episode
                                </Link>
                            )}
                        </div>
                    )}
                    <h1 className="text-gray-600 text-sm">
                        S{seasonNumber} | E{episodeNumber}
                    </h1>
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl my-1">{tmdbEpisode.name}</h1>

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

                    <div className="flex gap-4 items-center justify-between text-gray-600 text-sm mb-1 w-36">
                        <h1>{moment(tmdbEpisode.air_date).format("YYYY-MM-DD")}</h1>
                        <h1>{tmdbEpisode.runtime} min</h1>
                    </div>

                    <h3 className="mt-4">Overview</h3>
                    <p className="text-gray-700 text-sm mb-4">{tmdbEpisode.overview}</p>

                    <div className="mt-8">
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
            )}
        </div>
    );
};

export default Episode;
