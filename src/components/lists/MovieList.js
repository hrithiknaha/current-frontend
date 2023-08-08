import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeSeriesUrl } from "../../configs/helpers";

const MovieList = ({ movies }) => {
    return (
        <div className="flex flex-wrap justify-between gap-4 mb-8">
            {movies.map((movie) => {
                return (
                    <Link
                        key={movie.movie_id}
                        to={`/movies/${makeSeriesUrl(movie.movie_id, movie.title)}`}
                        className="bg-white rounded-lg shadow-md p-6 w-80 inline-block relative">
                        <h2 className="text-xl font-bold mb-4">{movie.title}</h2>
                        <p className="text-gray-600 text-sm">
                            Release Date: {moment(movie.release_date).format("YYYY-MM-DD")}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
};

export default MovieList;
