import React from "react";
import { Link } from "react-router-dom";

function MovieList({ movies }) {
    return (
        <div>
            <h5>Searched Movies</h5>
            <div>
                {movies.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>{movie.title}</Link> | <span>{movie.release_date}</span>
                            <p>{movie.overview}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MovieList;
