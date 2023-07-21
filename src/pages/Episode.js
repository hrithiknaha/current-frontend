import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import CastList from "../components/CastList";
import GuestList from "../components/GuestList";
import CrewList from "../components/CrewList";
import { toast } from "react-hot-toast";

import NotFound from "../components/NotFound";

const Episode = () => {
    const { tvId, seasonNumber, episodeNumber } = useParams();

    const auth = useSelector((state) => state.auth);

    const [isLoading, setIsLoading] = useState(true);

    const [rating, setRating] = useState();

    const [tmdbEpisode, setTmdbEpisode] = useState();

    const [isDetailsLoading, setIsDetailsLoading] = useState(true);
    const [episodeDetails, setEpisodeDetails] = useState();
    const [hasRated, setHasRated] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/tmdb/series/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`)
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
        if (tmdbEpisode)
            axios
                .get(`http://localhost:5001/api/series/${tvId}/episodes/${tmdbEpisode.id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                })
                .then(({ data }) => {
                    setEpisodeDetails(data);
                    setIsDetailsLoading(false);
                    if (data?.rating) setHasRated(true);
                })
                .catch((error) => {
                    setIsDetailsLoading(false);
                    console.log(error);
                });
    }, [tvId, tmdbEpisode, hasRated]);

    const handleWatch = (e) => {
        e.preventDefault();

        const date_timestamp = new Date();
        const day = date_timestamp.getDate();
        const month = date_timestamp.getMonth() + 1;
        const year = date_timestamp.getFullYear();

        const payload = {
            series_id: tvId,
            date_watched: `${year}-${month}-${day}`,
            rating,
            episode_number: episodeNumber,
            season_number: seasonNumber,
        };

        axios
            .post(`http://localhost:5001/api/series/watch`, payload, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
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
                <p>Loading...</p>
            ) : !tmdbEpisode ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-16">
                    <h1 className="text-4xl my-1">{tmdbEpisode.name}</h1>
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                        {moment(tmdbEpisode.air_date).format("YYYY-MM-DD")} &#x2022; {tmdbEpisode.runtime} min
                    </div>

                    <h3 className="mt-8">Overview</h3>
                    <p className="text-gray-700 text-sm mb-4">{tmdbEpisode.overview}</p>

                    {isDetailsLoading ? (
                        <p>Loading..</p>
                    ) : hasRated && episodeDetails?.rating ? (
                        <div className="text-gray-600 text-sm mb-1">
                            <p>Metadata</p>
                            {episodeDetails.rating} &#x2022; {moment(episodeDetails.date_watched).format("YYYY-MM-DD")}
                        </div>
                    ) : (
                        <form onSubmit={handleWatch} className="flex flex-col justify-between w-80 ">
                            <input
                                min={0}
                                max={10}
                                type="number"
                                name="rate"
                                id="rate"
                                onChange={(e) => setRating(e.target.value)}
                                className="mt-1 px-4 py-2 w-full border rounded mb-4"
                                placeholder="Rate Episode"
                            />
                            <button
                                type="submit"
                                className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline"
                            >
                                Rate
                            </button>
                        </form>
                    )}

                    <div className="mt-8">
                        <CastList casts={tmdbEpisode.credits.cast} />

                        <GuestList guests={tmdbEpisode.guest_stars} />

                        <CrewList
                            crews={tmdbEpisode.credits.crew.filter(
                                (c) =>
                                    c.job === "Writer" ||
                                    c.job === "Director" ||
                                    c.job === "Screenplay" ||
                                    c.job === "Director of Photography"
                            )}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Episode;
