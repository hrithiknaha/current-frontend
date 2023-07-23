import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import CastList from "../components/lists/CastList";
import CrewList from "../components/lists/CrewList";
import NotFound from "../components/configs/NotFound";
import Season from "../components/forms/TV/Season";
import LoadingSpinner from "../components/configs/LoadingSpinner";

const Series = () => {
    const { tvId } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [series, setSeries] = useState();

    const [watchedEpisodes, setWatchedEpisodes] = useState();
    const [isDetailsLoading, setIsDetailsLoading] = useState(true);
    const [hasSeriesBeenAdded, setHasSeriesBeenAdded] = useState();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/tmdb/series/${tvId}`)
            .then((res) => {
                setSeries(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });

        axios
            .get(`http://localhost:5001/api/series/${tvId}/episodes`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then(({ data }) => {
                setWatchedEpisodes(data);
                setIsDetailsLoading(false);
            })
            .catch((err) => console.log(err));

        axios
            .get(`http://localhost:5001/api/series/${tvId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then(({ data }) => {
                if (data?.series_id) setHasSeriesBeenAdded(true);
            })
            .catch((err) => {
                console.log(err);
                setHasSeriesBeenAdded(false);
            });
    }, [tvId]);

    const handleSubmit = () => {
        const payload = { series_id: tvId };
        axios
            .post(`http://localhost:5001/api/series/add`, payload, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
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

                        {!hasSeriesBeenAdded && (
                            <button
                                className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline"
                                onClick={handleSubmit}
                            >
                                Add Series
                            </button>
                        )}
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mb-1">
                        {moment(series.first_air_date).format("YYYY-MM-DD")} &#x2022; {series.episode_run_time} min
                        &#x2022; {series.genres.map((genre) => genre.name).join(", ")}
                    </div>

                    <p className="mb-4">
                        {series.status} &#x2022;
                        {series.status === "Ended" && <span>{series.last_air_date}</span>}
                    </p>

                    <h3>Overview</h3>
                    <p className="text-gray-700 text-sm mb-4">{series.overview}</p>

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
                                .filter((allSeasons) => allSeasons.name != "Specials")
                                .map((season) => {
                                    return <Season season={season} tvId={tvId} watchedEpisodes={watchedEpisodes} />;
                                })}
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
