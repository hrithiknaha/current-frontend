import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
    return (
        <Link to={`/movies/${movie.movie_id}`} key={movie.movie_id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
        </Link>
    );
};

export default Movie;
