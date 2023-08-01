import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import CastList from "../components/lists/CastList";
import CrewList from "../components/lists/CrewList";
import NotFound from "../components/configs/NotFound";
import SeasonRow from "../components/TV/SeasonRow";
import LoadingSpinner from "../components/configs/LoadingSpinner";
import CompletedSeasonRow from "../components/TV/CompletedSeasonRow";

import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";

import { seasonCompleted } from "../configs/helpers";

const Series = () => {
    const { tvId } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [series, setSeries] = useState();

    const [watchedEpisodes, setWatchedEpisodes] = useState();
    const [isDetailsLoading, setIsDetailsLoading] = useState(true);
    const [hasSeriesBeenAdded, setHasSeriesBeenAdded] = useState();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosPublicInstance
            .get(`/api/tmdb/series/${tvId}`)
            .then((res) => {
                setSeries(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });

        axiosInstance
            .get(`/api/series/${tvId}/episodes`)
            .then(({ data }) => {
                setWatchedEpisodes(data);
                setIsDetailsLoading(false);
            })
            .catch((err) => console.log(err));

        axiosInstance
            .get(`/api/series/${tvId}`)
            .then(({ data }) => {
                if (data?.series_id) setHasSeriesBeenAdded(true);
            })
            .catch((err) => {
                console.log(err);
                setHasSeriesBeenAdded(false);
            });
    }, [tvId]);

    const handleSubmit = () => {
        const axiosInstance = axiosPrivateInstance(auth);
        const payload = { series_id: tvId };
        axiosInstance
            .post(`/api/series/add`, payload)
            .then(() => {
                setHasSeriesBeenAdded(true);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="min-h-screen bg-gray-100">
            {isLoading || isDetailsLoading ? (
                <LoadingSpinner />
            ) : !series ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl my-1">{series.name} </h1>

                        {hasSeriesBeenAdded ? (
                            <div className="flex gap-4 items-center justify-between text-2xl text-blue-500">
                                <p>
                                    {(
                                        watchedEpisodes.map((e) => e.rating).reduce((acc, co) => acc + co, 0) /
                                        watchedEpisodes.length
                                    ).toFixed(2)}{" "}
                                    / 10
                                </p>
                                &#x2022;
                                <p>{watchedEpisodes.map((e) => e.runtime).reduce((acc, co) => acc + co, 0)} mins </p>
                            </div>
                        ) : (
                            <button
                                className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline"
                                onClick={handleSubmit}>
                                Add Series
                            </button>
                        )}
                    </div>

                    <div className="my-4">
                        <div className="flex items-center gap-4 text-gray-600 text-sm mb-1">
                            <span>{moment(series.first_air_date).format("YYYY-MM-DD")}</span>
                            {series.episode_run_time && <span>{series.episode_run_time} min</span>}
                            <span>{series.genres.map((genre) => genre.name).join(", ")}</span>
                        </div>
                        <div className="flex gap-4 items-center mb-4">
                            <span
                                className={
                                    series.status === "Canceled"
                                        ? "bg-red-300 inline-block p-1 rounded-lg"
                                        : series.status === "Ended"
                                        ? "bg-orange-300 inline-block p-1 rounded-lg"
                                        : "bg-green-300 inline-block p-1 rounded-lg"
                                }>
                                {series.status}
                            </span>
                            <span>{series.last_air_date}</span>
                        </div>
                    </div>

                    <div className="h-1 w-full bg-gray-300 mt-4">
                        <div
                            style={{ width: `${(watchedEpisodes.length / series.number_of_episodes) * 100}%` }}
                            className={`h-full ${
                                watchedEpisodes.length / series.number_of_episodes < 70 ? "bg-blue-500" : "bg-green-500"
                            }`}></div>
                    </div>

                    <div className="mt-4">
                        <h3>Overview</h3>
                        <p className="text-gray-700 text-sm mb-4">{series.overview}</p>
                    </div>

                    <div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-lg font-semibold mb-2">Metadata</h2>
                            <div className="flex items-center justify-between">
                                <div className="mr-4">
                                    <p className="text-gray-600">Number of Seasons:</p>
                                    <p className="text-2xl font-semibold">{series.number_of_seasons}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Total Episodes:</p>
                                    <p className="text-2xl font-semibold">{series.number_of_episodes}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Episodes Watched:</p>
                                    {watchedEpisodes && (
                                        <p className="text-2xl font-semibold">{watchedEpisodes.length}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="my-8">
                            <h1 className="text-2xl">Seasons</h1>
                            {series.seasons
                                .filter(
                                    (season) => season.name != "Specials" && !seasonCompleted(season, watchedEpisodes)
                                )
                                .map((season) => {
                                    return (
                                        <SeasonRow
                                            season={season}
                                            tvId={tvId}
                                            watchedEpisodes={watchedEpisodes}
                                            key={season.id}
                                        />
                                    );
                                })}
                        </div>
                        <div className="my-8 ">
                            <h1 className="text-2xl">Completed Seasons</h1>
                            {series.seasons.filter((season) => seasonCompleted(season, watchedEpisodes)).length > 0 ? (
                                series.seasons
                                    .filter((season) => seasonCompleted(season, watchedEpisodes))
                                    .map((completedSeason) => (
                                        <CompletedSeasonRow
                                            season={completedSeason}
                                            tvId={tvId}
                                            watchedEpisodes={watchedEpisodes}
                                            key={completedSeason.id}
                                        />
                                    ))
                            ) : (
                                <p>No completed seasons yet.</p>
                            )}
                        </div>
                    </div>

                    <CastList casts={series.credits.cast} />
                    <CrewList
                        crews={series.credits.crew.filter(
                            (c) => c.job === "Director" || c.job === "Director of Photography" || c.job === "Screenplay"
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default Series;
