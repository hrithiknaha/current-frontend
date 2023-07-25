import React from "react";
import { Link } from "react-router-dom";

function TMDBMovieList({ movies }) {
    return (
        <div className="mt-8">
            <div className="flex flex-wrap gap-4 justify-center">
                {movies.map((movie) => {
                    return (
                        <Link
                            to={`/movies/${movie.id}`}
                            className="bg-white rounded-lg shadow-md p-6 w-80 inline-block relative "
                            key={movie.id}
                        >
                            <h2 className="text-xl font-bold mb-4">{movie.title}</h2>
                            <p className="text-gray-600 mb-2  max-w-30ch line-clamp-3">{movie.overview}</p>
                            <img
                                src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
                                className="absolute left-0 bottom-0 w-full h-full opacity-0 hover:opacity-20  rounded-lg transition-all "
                            />
                            <p className="text-gray-600 text-sm">Release Date: {movie.release_date}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default TMDBMovieList;
