import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";
import moment from "moment";

import RateMovieForm from "../components/forms/movie/RateMovieForm";
import CastList from "../components/CastList";
import CrewList from "../components/CrewList";

import { getRatingAsStars } from "../configs/helpers";

const Movie = () => {
    const { movieId } = useParams();
    const auth = useSelector((state) => state.auth);

    const [movie, setMovie] = useState();

    const [rating, setRating] = useState();
    const [dateWatched, setDateWatched] = useState();
    const [theatre, setTheatre] = useState(false);

    const [savedMovieDetails, setSavedMoveDetails] = useState();
    const [hasSavedMovie, setHasSavedMovie] = useState();

    const [isLoading, setIsLoading] = useState();
    useEffect(() => {
        axios.get(`http://localhost:5001/api/tmdb/movies/${movieId}`).then(({ data }) => {
            setMovie(data);
        });

        axios
            .get(`http://localhost:5001/api/users/added/${movieId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then(({ data }) => {
                setHasSavedMovie(true);
                setSavedMoveDetails(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setHasSavedMovie(false);
                setIsLoading(false);
            });
    }, [movieId, hasSavedMovie]);

    const submitMovie = (e) => {
        e.preventDefault();

        const payload = {
            movie_id: movieId,
            rating,
            date_watched: dateWatched,
            theatre,
        };

        axios
            .post("http://localhost:5001/api/movies/add", payload, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then(({ data }) => {
                console.log(data);
                setHasSavedMovie(true);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="bg-gray-100 min-h-screen px-16">
            {movie && !isLoading ? (
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

                    {hasSavedMovie === undefined ? (
                        <p>Loading..</p>
                    ) : !hasSavedMovie ? (
                        <RateMovieForm
                            submitMovie={submitMovie}
                            setRating={setRating}
                            setDateWatched={setDateWatched}
                            setTheatre={setTheatre}
                            theatre={theatre}
                        />
                    ) : (
                        savedMovieDetails?.rating && (
                            <div className="flex items-center text-gray-600 text-sm mb-4">
                                {getRatingAsStars(savedMovieDetails.rating)} &#x2022;{" "}
                                {moment(savedMovieDetails.date_watched).format("YYYY-MM-DD")} &#x2022;{" "}
                                {savedMovieDetails.theatre ? <p> Watched in theatre</p> : <p> Watched elsewhere</p>}
                            </div>
                        )
                    )}

                    <CastList casts={movie.credits.cast.filter((cast) => cast.order < 10)} />
                    <CrewList
                        crews={movie.credits.crew.filter(
                            (c) => c.job === "Director" || c.job === "Director of Photography" || c.job === "Screenplay"
                        )}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Movie;
