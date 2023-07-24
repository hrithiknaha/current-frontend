import React from "react";
import { Link } from "react-router-dom";

function TMDBTVList({ series }) {
    return (
        <div className="mt-8">
            <div className="flex flex-wrap gap-4 justify-between">
                {series.map((series) => {
                    return (
                        <Link
                            to={`/tv/${series.id}`}
                            className="bg-white rounded-lg shadow-md p-6 w-60 inline-block relative "
                            key={series.id}
                        >
                            <h2 className="text-xl font-bold mb-4">{series.name}</h2>
                            <p className="text-gray-600 mb-2  max-w-30ch line-clamp-3">{series.overview}</p>
                            <img
                                src={`https://image.tmdb.org/t/p/w300/${series.backdrop_path}`}
                                className="absolute left-0 bottom-0 w-full h-full opacity-0 hover:opacity-20  rounded-lg transition-all "
                            />
                            <p className="text-gray-600 text-sm">Release Date: {series.first_air_date}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default TMDBTVList;
