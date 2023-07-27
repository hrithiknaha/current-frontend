import React from "react";
import { Link } from "react-router-dom";

const defaultImg = "https://t4.ftcdn.net/jpg/02/17/34/67/240_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg";

const TMDBPopularMovieList = ({ movies }) => {
    return (
        <div className="mt-8">
            <h1 className="text-2xl">Popular Movies</h1>
            <div className="flex flex-wrap gap-4 items-center mt-4">
                {movies.map((movie) => {
                    return (
                        <Link
                            key={movie.id}
                            to={`/movies/${movie.id}`}
                            className="bg-white shadow-md rounded-lg overflow-hidden w-40"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                alt="Poster Image"
                                className="w-full"
                                onError={(e) => (e.target.src = defaultImg)}
                            />
                            <div className="p-2 text-center">
                                <h2 className="text-xs font-semibold text-gray-800">{movie.title}</h2>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default TMDBPopularMovieList;
