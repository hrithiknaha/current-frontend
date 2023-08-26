import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeSeriesUrl } from "../../configs/helpers";

const MovieList = ({ movies }) => {
    return (
        <div className="flex flex-wrap justify-between lg:justify-start gap-4 mb-8">
            {movies.map((movie) => {
                return (
                    <Link
                        key={movie.movie_id}
                        to={`/movies/${makeSeriesUrl(movie.movie_id, movie.title)}`}
                        className="rounded-lg shadow overflow-hidden flex-none w-32 h-48 lg:w-40 lg:h-64 m-2">
                        <img
                            className="w-full h-full object-cover"
                            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                            alt={`${movie.title}`}
                        />
                    </Link>
                );
            })}
        </div>
    );
};

export default MovieList;
