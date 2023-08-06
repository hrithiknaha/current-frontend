import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import RateMovieForm from "../components/forms/RateMovieForm";

import CastList from "../components/lists/CastList";
import CrewList from "../components/lists/CrewList";

import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";
import { getVerdict } from "../configs/helpers";
import NotFound from "../components/configs/NotFound";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";

const Movie = () => {
    const { movieId } = useParams();
    const auth = useSelector((state) => state.auth);

    const [isLoading, setIsLoading] = useState(true);

    const [movie, setMovie] = useState();

    const [rating, setRating] = useState();

    const [isDetailsLoading, setIsDetailsLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState();
    const [hasRated, setHasRated] = useState(false);

    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        axiosPublicInstance
            .get(`/api/tmdb/movies/${movieId}`)
            .then(({ data }) => {
                setMovie(data);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [movieId]);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/movies/${movieId}`)
            .then(({ data }) => {
                setIsDetailsLoading(false);
                setMovieDetails(data[0]);
                setHasRated(true);
                setIsSending(false);
            })
            .catch((err) => {
                setIsDetailsLoading(false);
                console.log(err);
            });
    }, [hasRated]);

    const submitMovie = (e) => {
        e.preventDefault();
        setIsSending(true);
        const axiosInstance = axiosPrivateInstance(auth);

        const payload = {
            movie_id: movieId,
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
        <div className="bg-gray-100 min-h-screen ">
            {isLoading ? (
                <LoadingSpinner />
            ) : !movie ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-16">
                    <h1 className="text-4xl mb-1">
                        <span>{movie.title} </span>
                        <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">
                            🚀
                        </a>
                    </h1>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                        {moment(movie.release_date).format("YYYY-MM-DD")} &#x2022; {movie.runtime} min &#x2022;{" "}
                        {movie.genres.map((genre) => genre.name).join(", ")}
                    </div>
                    <h3>Overview</h3>
                    <p className="text-gray-700 text-sm mb-4">{movie.overview}</p>

                    {isDetailsLoading ? (
                        <SmallLoadingSpinner />
                    ) : hasRated && movieDetails?.rating ? (
                        <div className="flex items-center text-gray-600 text-sm mb-4">
                            {getVerdict(movieDetails.rating)} &#x2022;{" "}
                            {moment(movieDetails.date_watched).format("YYYY-MM-DD")}
                        </div>
                    ) : isSending ? (
                        <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
                            In Progress
                        </button>
                    ) : (
                        <RateMovieForm submitMovie={submitMovie} setRating={setRating} />
                    )}

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
            )}
        </div>
    );
};

export default Movie;
