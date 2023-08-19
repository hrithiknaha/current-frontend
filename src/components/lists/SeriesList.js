import React from "react";
import { Link } from "react-router-dom";
import { makeSeriesUrl } from "../../configs/helpers";

const SeriesList = ({ series }) => {
    return (
        <div className="flex flex-wrap justify-between gap-4 mb-8">
            {series.map((series) => {
                return (
                    <Link
                        to={`/tv/${makeSeriesUrl(series.series_id, series.name)}`}
                        className="bg-white rounded-lg shadow-md w-full lg:w-80 inline-block relative overflow-hidden"
                        key={series.series_id}>
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4 line-clamp-1">{series.name}</h2>
                            <p className="text-gray-600 text-sm">Release Date {series.first_air_date}</p>
                        </div>
                        <div className="h-3 w-full bg-gray-300">
                            <div
                                className="h-3 bg-orange-500"
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
