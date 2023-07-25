import React from "react";
import { Link } from "react-router-dom";

const Series = ({ series }) => {
    return (
        <Link to={`/tv/${series.series_id}`} key={series.series_id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">{series.name}</h2>
            <p className="text-gray-600 mb-2">{series.status}</p>
            <p className="text-gray-600 mt-2">
                {series.episodes.length === series.number_of_episodes ? "Completed" : "Currently Watching"}
            </p>
        </Link>
    );
};

export default Series;