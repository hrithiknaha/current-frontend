import React from "react";
import { Link } from "react-router-dom";

const SeriesList = ({ series }) => {
    return (
        <div className="flex flex-wrap justify-between gap-4 mb-8">
            {series.map((series) => {
                return (
                    <Link
                        to={`/tv/${series.series_id}`}
                        className="bg-white rounded-lg shadow-md p-6 w-80 inline-block relative "
                        key={series.series_id}>
                        <h2 className="text-xl font-bold mb-4">{series.name}</h2>
                        <p className="text-gray-600 text-sm">Release Date: {series.first_air_date}</p>

                        <div className="h-1 w-full bg-gray-300 mt-4">
                            <div
                                className="h-1 bg-blue-500"
                                style={{
                                    width: `${(series.episodes.length / series.number_of_episodes) * 100}%`,
                                }}></div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SeriesList;
