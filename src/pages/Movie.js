import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import RatingForm from "../components/forms/RatingForm";

import CastList from "../components/lists/CastList";
import CrewList from "../components/lists/CrewList";

import SmallLoadingSpinner from "../components/configs/SmallLoadingSpinner";
import NotFound from "../components/configs/NotFound";
import LoadingSpinner from "../components/configs/LoadingSpinner";
import { extractSeriesIdFromURL } from "../configs/helpers";

import RatingDetails from "../components/configs/RatingDetails";

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
            .get(`/api/tmdb/movies/${extractSeriesIdFromURL(movieId)}`)
            .then(({ data }) => {
                setMovie(data);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [movieId]);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/movies/${extractSeriesIdFromURL(movieId)}`)
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
        <div className="bg-gray-100 min-h-screen ">
            {isLoading ? (
                <LoadingSpinner />
            ) : !movie ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl mb-1">
                            <span>{movie.title} </span>
                            <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">
                                🚀
                            </a>
                        </h1>

                        {isDetailsLoading ? (
                            <SmallLoadingSpinner />
                        ) : hasRated && movieDetails?.rating ? (
                            <RatingDetails data={movieDetails} />
                        ) : isSending ? (
                            <SmallLoadingSpinner />
                        ) : (
                            <RatingForm setRating={setRating} handleWatch={handleWatch} />
                        )}
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mb-4">
                        {moment(movie.release_date).format("YYYY-MM-DD")} &#x2022; {movie.runtime} min &#x2022;{" "}
                        {movie.genres.map((genre) => genre.name).join(", ")}
                    </div>
                    <h3>Overview</h3>
                    <p className="text-gray-700 text-sm mb-4">{movie.overview}</p>

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
