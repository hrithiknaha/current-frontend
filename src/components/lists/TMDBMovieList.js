import React from "react";
import { Link } from "react-router-dom";
import { makeSeriesUrl } from "../../configs/helpers";

const defaultImg = "https://t4.ftcdn.net/jpg/02/17/34/67/240_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg";

function TMDBMovieList({ movies }) {
    return (
        <div className="flex flex-wrap gap-4 mb-8">
            {movies.map((movie) => {
                return (
                    <Link
                        to={`/movies/${makeSeriesUrl(movie.id, movie.title)}`}
                        className="bg-white rounded-lg shadow-md p-6 w-full lg:w-80 inline-block relative "
                        key={movie.id}>
                        <h2 className="text-xl font-bold mb-4">{movie.title}</h2>
                        <p className="text-gray-600 mb-2  max-w-30ch line-clamp-3">{movie.overview}</p>
                        <img
                            src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
                            className="absolute left-0 bottom-0 w-full h-full opacity-0 hover:opacity-20  rounded-lg transition-all "
                            onError={(e) => (e.target.src = defaultImg)}
                            alt="TMDB List"
                        />
                        <p className="text-gray-600 text-sm">Release Date: {movie.release_date}</p>
                    </Link>
                );
            })}
        </div>
    );
}

export default TMDBMovieList;
