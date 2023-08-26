import React from "react";
import { Link } from "react-router-dom";
import { makeSeriesUrl } from "../../configs/helpers";

const SeriesList = ({ series }) => {
    return (
        <div className="flex flex-wrap justify-between lg:justify-start gap-4 mb-8">
            {series.map((series) => {
                return (
                    <Link
                        to={`/tv/${makeSeriesUrl(series.series_id, series.name)}`}
                        className="rounded-lg shadow overflow-hidden flex-none w-32 h-48 lg:w-40 lg:h-64"
                        key={series.series_id}>
                        <img
                            className="object-cover"
                            src={`https://image.tmdb.org/t/p/w300/${series.poster_path}`}
                            alt={`${series.title}`}
                        />
                        <div className="h-4 w-full bg-gray-300">
                            <div
                                className={
                                    series.episodes.length === series.number_of_episodes
                                        ? "h-4 bg-purple-500"
                                        : "h-4 bg-orange-500"
                                }
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
