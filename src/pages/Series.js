import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SeasonRow from "../components/TV/SeasonRow";
import CastList from "../components/lists/CastList";
import CrewList from "../components/lists/CrewList";
import NotFound from "../components/configs/NotFound";
import LoadingSpinner from "../components/configs/LoadingSpinner";
import CompletedSeasonRow from "../components/TV/CompletedSeasonRow";
import RatingAndTimeDetails from "../components/configs/RatingAndTimeDetails";

import { axiosPrivateInstance } from "../configs/axios";

import { useSeries, useSeriesWatchedEpisodes, useHasSeriesAdded } from "../hooks/useSeries";

import { extractSeriesIdFromURL } from "../configs/helpers";
import { seasonCompleted, computeSumAndWatchTime, computePercentageCompletion } from "../configs/helpers";

const Series = () => {
    const { tvId } = useParams();
    const auth = useSelector((state) => state.auth);

    const [hasSeriesBeenAdded, setHasSeriesBeenAdded] = useState(false);

    const { series, isLoading } = useSeries(tvId);
    const { watchedEpisodes, isDetailsLoading } = useSeriesWatchedEpisodes(tvId);
    useHasSeriesAdded(tvId, setHasSeriesBeenAdded);

    const handleSubmit = () => {
        const axiosInstance = axiosPrivateInstance(auth);
        const payload = { series_id: extractSeriesIdFromURL(tvId) };
        axiosInstance
            .post(`/api/series/add`, payload)
            .then(() => {
                setHasSeriesBeenAdded(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="bg-gray-100 min-h-screen px-4 lg:px-0">
            {isLoading || isDetailsLoading ? (
                <LoadingSpinner />
            ) : !series ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-8 lg:py-12">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex flex-col pb-2 gap-4 my-4 lg:flex-row lg:my-0 justify-between items-center">
                            <h1 className="text-4xl my-1">{series.name} </h1>

                            {hasSeriesBeenAdded ? (
                                <RatingAndTimeDetails
                                    data={computeSumAndWatchTime(watchedEpisodes)}
                                    completion={computePercentageCompletion(
                                        watchedEpisodes.length,
                                        series.number_of_episodes
                                    )}
                                />
                            ) : (
                                <button
                                    className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline"
                                    onClick={handleSubmit}>
                                    Add Series
                                </button>
                            )}
                        </div>

                        <div className="my-4">
                            <div className="flex flex-wrap gap-1 justify-center lg:justify-normal text-gray-600 text-sm mb-4">
                                <div>{moment(series.first_air_date).format("YYYY-MM-DD")}</div>
                                <div>&#8226;</div>
                                <div>{series.episode_run_time && <span>{series.episode_run_time} min</span>}</div>
                                <div>&#8226;</div>
                                <div>{series.genres.map((genre) => genre.name).join(", ")}</div>
                            </div>
                            <div className="flex flex-wrap gap-1 justify-center items-center lg:justify-normal text-gray-600 text-sm mb-4">
                                <div
                                    className={
                                        series.status === "Canceled"
                                            ? "bg-purple-500 text-white inline-block px-2 py-1 rounded-lg"
                                            : series.status === "Ended"
                                            ? "bg-red-500 text-white inline-block px-2 py-1 rounded-lg"
                                            : "bg-green-500 text-white inline-block px-2 py-1 rounded-lg"
                                    }>
                                    {series.status}
                                </div>
                                <div>&#8226;</div>
                                <div>{series.last_air_date}</div>
                            </div>
                        </div>

                        <div>
                            {series.overview && (
                                <div className="py-4">
                                    <h3 className="font-bold">Overview</h3>
                                    <p className="text-gray-700 text-sm mb-4">{series.overview}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="bg-white rounded-lg shadow-md p-4 max-w-lg">
                            <h2 className="text-lg font-semibold">Metadata</h2>
                            <div className="flex items-center justify-between">
                                <div className="text-center">
                                    <p className="text-gray-600">Seasons:</p>
                                    <p className="text-2xl font-semibold">{series.number_of_seasons}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-600">Episodes:</p>
                                    <p className="text-2xl font-semibold">{series.number_of_episodes}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-600">Watched:</p>
                                    {watchedEpisodes && (
                                        <p className="text-2xl font-semibold">{watchedEpisodes.length}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="my-8">
                            <h3 className="bg-gray-100 font-bold">Seasons</h3>
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
                            <h3 className="bg-gray-100 font-bold">Completed Seasons</h3>
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

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <CastList casts={series.credits.cast} />
                        <CrewList
                            crews={series.credits.crew.filter(
                                (c) =>
                                    c.job === "Director" ||
                                    c.job === "Director of Photography" ||
                                    c.job === "Screenplay"
                            )}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Series;
