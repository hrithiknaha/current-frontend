import React from "react";
import { Link } from "react-router-dom";

const SeasonRow = ({ season, tvId, watchedEpisodes }) => {
    return (
        <Link to={`/tv/${tvId}/season/${season.season_number}`}>
            <div className="bg-white rounded-lg shadow-md p-4 mt-3">
                <h2 className="text-lg font-semibold mb-2">{season.name}</h2>
                <div className="flex items-center justify-between">
                    <div className="text-center">
                        <p className="text-gray-600">Episodes:</p>
                        <p className="text-lg lg:text-2xl font-semibold">{season.episode_count}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">Watched:</p>
                        <p className="text-lg lg:text-2xl font-semibold">
                            {watchedEpisodes?.filter((e) => e.season_number === season.season_number).length} /{" "}
                            {season.episode_count}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">Air Date:</p>
                        {watchedEpisodes && <p className="text-lg lg:text-2xl font-semibold">{season.air_date}</p>}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SeasonRow;
