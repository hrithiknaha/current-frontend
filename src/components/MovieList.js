import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const MovieList = ({ movies }) => {
    return (
        <div>
            <div>
                {movies.map((movie) => {
                    return (
                        <div key={uuid()}>
                            <Link to={`/movies/${movie.movie_id}`}>{movie.title}</Link>
                            <p>{movie.date_watched}</p>
                            <p>
                                {movie.rating} | {movie.runtime}
                            </p>
                            <ul>
                                {movie.genres.map((genre) => (
                                    <li key={uuid()}>{genre}</li>
                                ))}
                            </ul>
                            <p>Theatre : {movie.theatre.toString()}</p>
                            <ul>
                                {movie.cast.map((c) => (
                                    <li key={uuid()}>
                                        {c.name} - {c.character}
                                    </li>
                                ))}
                            </ul>
                            <ul>
                                {movie.crew.map((c) => (
                                    <li key={uuid()}>
                                        {c.name} - {c.job}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MovieList;
