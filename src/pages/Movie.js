import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";

import RateMovieForm from "../components/forms/movie/RateMovieForm";
import { getMovieDetails } from "../redux/actions/tmdb";
import { fetchSavedMovie } from "../redux/actions/user";
import { saveMovieToCollection } from "../redux/actions/movies";

const Movie = ({ user }) => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState();

    const [rating, setRating] = useState();
    const [dateWatched, setDateWatched] = useState();
    const [theatre, setTheatre] = useState(false);

    const [userSavedMovie, setUserSavedMovie] = useState();

    useEffect(() => {
        getMovieDetails(movieId, setMovie);

        if (user?.token) {
            console.log("User logged im. Searching for movie in his collections");
            fetchSavedMovie(movieId, user.token, setUserSavedMovie);
        }
    }, [movieId]);

    const submitMovie = (e) => {
        e.preventDefault();
        if (user?.token) saveMovieToCollection(user, rating, dateWatched, theatre);
        else console.log("You need to login in order to perform that action.");
    };
    return (
        <div>
            {movie ? (
                <div>
                    {userSavedMovie?.rating ? (
                        <div>
                            <p>Rating: {userSavedMovie.rating}</p>
                            <p>Watched: {userSavedMovie.date_watched}</p>
                            <p>Theatre: {userSavedMovie.theatre}</p>
                        </div>
                    ) : (
                        <RateMovieForm submitMovie={submitMovie} setRating={setRating} setDateWatched={setDateWatched} setTheatre={setTheatre} theatre={theatre} />
                    )}
                    <div>
                        <h4>{movie.title}</h4>
                        <div>
                            <span>{movie.release_date}</span> | <span>{movie.runtime}m</span>
                        </div>
                        <p>{movie.overview}</p>
                        <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">
                            IMDB
                        </a>
                        <ul>
                            {movie.genres.map((genre) => (
                                <li key={uuid()}>{genre.name}</li>
                            ))}
                        </ul>
                        <h4>Cast</h4>
                        <div>
                            {movie.credits.cast
                                .filter((c) => c.order < 10)
                                .map((c) => {
                                    return (
                                        <div key={uuid()}>
                                            <p>{c.name}</p>
                                            <p>{c.character}</p>
                                        </div>
                                    );
                                })}
                        </div>
                        <h4>Crew</h4>
                        <div>
                            {movie.credits.crew
                                .filter((c) => c.job === "Director" || c.job === "Director of Photography" || c.job === "Screenplay")
                                .map((c) => {
                                    return (
                                        <div key={uuid()}>
                                            <p>{c.name}</p>
                                            <p>{c.job}</p>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({ user: state.auth });
export default connect(mapStateToProps, {})(Movie);
