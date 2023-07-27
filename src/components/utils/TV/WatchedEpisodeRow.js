import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { getRatingAsStars, getVerdict } from "../../../configs/helpers";

const WatchedEpisodeRow = ({ episode }) => {
    return (
        <Link key={episode.episode_id} to={`episode/${episode.episode_number}`}>
            <div key={episode.episode_id} className="bg-white rounded-lg shadow-md p-4 mt-3">
                <h2 className="text-lg font-semibold mb-2">{episode.name}</h2>
                <div className="flex items-center justify-between">
                    <div className="mr-4">
                        <p className="text-gray-600">Episdoe Number:</p>
                        <p className="text-2xl font-semibold">{episode.episode_number}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Watch Date:</p>
                        <p className="text-2xl font-semibold">{moment(episode.date_watched).format("YYYY-MM-DD")}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 float-right">Verdict:</p>
                        <p className="text-2xl font-semibold">{getVerdict(episode.rating)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WatchedEpisodeRow;
