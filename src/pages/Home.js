import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { axiosPublicInstance, axiosPrivateInstance } from "../configs/axios";
import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";
import NextEpisodeCard from "../components/NextEpisodeCard";

function Home() {
    const [trending, setTrending] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [query, setQuery] = useState("");

    const [nextDetails, setNextDetails] = useState([]);
    const [isSeriesLoading, setIsSeriesLoading] = useState(true);

    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        axiosPublicInstance.get("/api/tmdb/trending").then(({ data }) => {
            setTrending(data.results);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);

        axiosInstance.get(`/api/users/${auth.username}`).then(({ data }) => {
            if (data.series.length > 0) {
                const promises = data.series.map((show) => {
                    const series_id = show.series_id;
                    let seasonNumber = show.episodes[show.episodes?.length - 1].season_number;
                    let episodeNumber = show.episodes[show.episodes?.length - 1].episode_number;

                    return axiosPublicInstance
                        .get(`/api/tmdb/series/${series_id}`)
                        .then((response) => {
                            const seriesDetails = response.data;

                            //total seasons
                            const totalSeasons = seriesDetails.number_of_seasons;

                            //Next Episode?
                            const currentSeason = seriesDetails.seasons.filter(
                                (season) => season.season_number === seasonNumber
                            )[0];

                            if (seasonNumber <= totalSeasons) {
                                if (episodeNumber < currentSeason.episode_count) episodeNumber += 1;
                                else if (episodeNumber === currentSeason.episode_count) {
                                    episodeNumber = 1;
                                    seasonNumber += 1;
                                }

                                return axiosPublicInstance
                                    .get(
                                        `/api/tmdb/series/${series_id}/season/${seasonNumber}/episode/${episodeNumber}`
                                    )
                                    .then((nextEpisodeData) => {
                                        const nextEpisode = nextEpisodeData.data;
                                        return { seriesDetails, nextEpisode, show };
                                    });
                            } else {
                                return null; // Return null for cases where there is no next episode
                            }
                        })
                        .catch((error) => {
                            console.error(error); // Handle errors for individual Axios requests locally
                            return null; // Return null for failed requests
                        });
                });

                Promise.all(promises.filter(Boolean)) // Filter out null values from the promises array
                    .then((results) => {
                        const validResult = results
                            .filter((r) => r !== null)
                            .sort((a, b) => (a.show.updatedAt < b.show.updatedAt ? 1 : -1));
                        setNextDetails(validResult);
                        setIsSeriesLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        setIsSeriesLoading(false);
                    });
            }
        });
    }, [auth.username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${query}`);
    };

    return (
        <div className="min-h-screen  bg-gray-100">
            <div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-500 py-20">
                    <div className="mx-auto container">
                        <h1 className="text-5xl  font-bold text-white mb-4">This is your archive.</h1>
                        <p className="text-xl  text-white">Do what you want with it!</p>

                        <form
                            className="flex gap-4 items-center justify-between py-8 rounded w-3/4"
                            onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="query"
                                name="query"
                                className="w-full border border-gray-300 rounded p-2"
                                placeholder="Search Entities"
                                onChange={(e) => setQuery(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                {nextDetails && (
                    <div className="container mx-auto pt-8">
                        <h1 className="text-2xl">Currently Watching</h1>
                        <div className="pt-2 flex flex-wrap gap-4">
                            {isSeriesLoading ? (
                                <SmallLoadingSpinner />
                            ) : (
                                nextDetails.map((data) => {
                                    return (
                                        <NextEpisodeCard
                                            key={data.seriesDetails.id}
                                            series={data.seriesDetails}
                                            nextEpisode={data.nextEpisode}
                                            watchedEpisodes={data.show.episodes}
                                        />
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}

                <div className="container mx-auto pt-8">
                    <h1 className="text-2xl">Trending this week</h1>
                    {isLoading ? (
                        <SmallLoadingSpinner />
                    ) : (
                        <div className="flex overflow-x-auto pt-1">
                            {trending.map((e) => {
                                return (
                                    <Link
                                        key={e.id}
                                        to={e.media_type === "movie" ? `movies/${e.id}` : `tv/${e.id}`}
                                        className="rounded-lg shadow-md overflow-hidden flex-none w-40 h-64 m-2">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={`https://image.tmdb.org/t/p/w300/${e.poster_path}`}
                                            alt={`${e.title}`}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
