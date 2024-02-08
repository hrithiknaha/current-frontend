import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeSeriesUrl } from "../../configs/helpers";

const SeriesList = ({ series }) => {
    const [showEpisodeList, setShowEpisodeList] = useState(false);
    const [selectedSeries, setSelectedSeries] = useState(null);

    const toggleEpisodeList = (seriesId) => {
        setShowEpisodeList(!showEpisodeList);
        setSelectedSeries(seriesId);
    };

    return (
        <div className="flex flex-wrap justify-between lg:justify-start gap-4 mb-8">
            {series.map((series) => {
                return (
                    <div
                        key={series.series_id}
                        className="rounded-lg shadow overflow-hidden flex-none w-32 h-full lg:w-40 lg:h-full">
                        <Link
                            to={`/tv/${makeSeriesUrl(series.series_id, series.name)}`}
                            className="relative block w-full h-full">
                            <img
                                className="object-cover w-full"
                                src={`https://image.tmdb.org/t/p/w300/${series.poster_path}`}
                                alt={`${series.title}`}
                            />

                            {showEpisodeList && selectedSeries === series.series_id && (
                                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 p-4 overflow-y-auto">
                                    <ul className="text-xs text-white whitespace-nowrap">
                                        {series.episodes.map((episode) => (
                                            <li key={episode._id}>
                                                <Link
                                                    to={`/tv/${makeSeriesUrl(series.series_id, series.name)}/season/${
                                                        episode.season_number
                                                    }/episode/${episode.episode_number}`}
                                                    className="cursor-pointer hover:underline hover:text-blue-300">
                                                    S{episode.season_number}E{episode.episode_number}: {episode.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Link>
                        <button onClick={() => toggleEpisodeList(series.series_id)} className="bg-gray-500 w-full z-50">
                            <span className="text-xs font-medium text-white uppercase tracking-wider">
                                Show Episode
                            </span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default SeriesList;
