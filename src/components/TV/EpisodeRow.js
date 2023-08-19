import React from "react";
import { Link } from "react-router-dom";

const EpisodeRow = ({ episode }) => {
    return (
        <Link to={`episode/${episode.episode_number}`}>
            <div key={episode.id} className="bg-white rounded-lg shadow-md p-4 mt-3">
                <h2 className="text-lg font-semibold mb-2">{episode.name}</h2>
                <p className="text-gray-600 mb-2 max-w-30ch line-clamp-3 mt-4">{episode.overview}</p>
                <div className="flex items-center justify-between">
                    <div className="text-center">
                        <p className="text-gray-600">Episode:</p>
                        <p className="text-lg lg:text-2xl font-semibold">{episode.episode_number}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">Air Date:</p>
                        <p className="text-lg lg:text-2xl font-semibold">{episode.air_date}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">Runtime:</p>
                        <p className="text-lg lg:text-2xl font-semibold">{episode.runtime} min</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EpisodeRow;
