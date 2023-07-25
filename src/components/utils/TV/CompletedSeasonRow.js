import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { seasonVerdict } from "../../../configs/helpers";

const CompletedSeasonRow = ({ season, tvId, watchedEpisodes }) => {
    const [seasonEpisodes, setSeasonEpisodes] = useState(
        watchedEpisodes.filter((e) => e.season_number === season.season_number)
    );

    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const totalRating = seasonEpisodes.map((e) => e.rating).reduce((acc, co) => acc + co, 0);
        const averageRating = (totalRating / seasonEpisodes.length).toFixed(2);

        setAverageRating(averageRating);
    }, []);

    return (
        <Link to={`/tv/${tvId}/season/${season.season_number}`}>
            <div className="bg-white rounded-lg shadow-md p-4 mt-3">
                <h2 className="text-lg font-semibold mb-2">{season.name}</h2>
                <div className="flex items-center justify-between">
                    <div className="mr-4">
                        <p className="text-gray-600">Number of Episodes:</p>
                        <p className="text-2xl font-semibold">{season.episode_count}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Average Rating:</p>
                        <p className="text-2xl font-semibold">{averageRating}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Verdict:</p>
                        <p className="text-2xl font-semibold">{seasonVerdict(averageRating)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CompletedSeasonRow;
