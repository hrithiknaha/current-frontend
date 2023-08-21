import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CastList from "../components/lists/CastList";
import CrewList from "../components/lists/CrewList";
import RatingForm from "../components/forms/RatingForm";

import NotFound from "../components/configs/NotFound";
import RatingDetails from "../components/configs/RatingDetails";
import LoadingSpinner from "../components/configs/LoadingSpinner";
import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";

import { axiosPrivateInstance } from "../configs/axios";
import { extractSeriesIdFromURL } from "../configs/helpers";

import { useMovieTMDB, useMovieDetails } from "../hooks/useMovie";

const Movie = () => {
    const { movieId } = useParams();
    const auth = useSelector((state) => state.auth);

    const [rating, setRating] = useState();

    const [hasRated, setHasRated] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const { movie, isLoading } = useMovieTMDB(movieId);
    const { movieDetails, isDetailsLoading } = useMovieDetails(movieId, setIsSending, hasRated);

    const handleWatch = (e) => {
        e.preventDefault();
        setIsSending(true);
        const axiosInstance = axiosPrivateInstance(auth);

        const payload = {
            movie_id: extractSeriesIdFromURL(movieId),
            rating,
            date_watched: new Date(),
        };

        axiosInstance
            .post("/api/movies/add", payload)
            .then(() => {
                setHasRated(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="bg-gray-100 min-h-screen px-4 lg:px-0">
            {isLoading ? (
                <LoadingSpinner />
            ) : !movie ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-8 lg:py-12">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <div className="flex flex-col pb-2 gap-4 my-4 lg:flex-row lg:my-0 justify-between items-center">
                            <h1 className="text-3xl mb-1 text-center lg:text-4xl lg:text-left">
                                <span>{movie.title} </span>
                                <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">
                                    🚀
                                </a>
                            </h1>

                            {isDetailsLoading ? (
                                <SmallLoadingSpinner />
                            ) : isSending ? (
                                <SmallLoadingSpinner />
                            ) : movieDetails?.rating ? (
                                <RatingDetails data={movieDetails} />
                            ) : (
                                <RatingForm setRating={setRating} handleWatch={handleWatch} />
                            )}
                        </div>

                        <div className="flex flex-wrap gap-1 justify-center lg:justify-normal text-gray-600 text-sm">
                            <div>{moment(movie.release_date).format("YYYY-MM-DD")}</div>
                            <div>&#8226;</div>
                            <div>{movie.runtime} min</div>
                            <div>&#8226;</div>
                            <div>{movie.genres.map((genre) => genre.name).join(", ")}</div>
                        </div>

                        <div className="py-4">
                            <h3 className="font-bold">Overview</h3>
                            <p className="text-gray-700 text-sm mb-4">{movie.overview}</p>
                        </div>

                        <CastList casts={movie.credits.cast.filter((cast) => cast.order < 10)} />
                        <CrewList
                            crews={movie.credits.crew.filter(
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

export default Movie;
