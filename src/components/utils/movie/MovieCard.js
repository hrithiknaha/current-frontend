import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movies/${movie.movie_id}`} key={movie.movie_id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-600 mb-2">Watched: {moment(movie.date_watched).fromNow()}</p>
        </Link>
    );
};

export default MovieCard;
