import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { getVerdict } from "../../configs/helpers";

const WatchedEpisodeRow = ({ episode }) => {
    return (
        <Link key={episode.episode_id} to={`episode/${episode.episode_number}`}>
            <div key={episode.episode_id} className="bg-white rounded-lg shadow-md p-4 mt-3">
                <h2 className="text-lg font-semibold mb-2">{episode.name}</h2>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-gray-600">Episdoe Number:</p>
                        <p className="text-2xl font-semibold">{episode.episode_number}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-600">Watch Date:</p>
                        <p className="text-2xl font-semibold">{moment(episode.date_watched).fromNow()}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-600 float-right">Verdict:</p>
                        <p className="text-2xl font-semibold">{getVerdict(episode.rating)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WatchedEpisodeRow;
