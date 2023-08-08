import { Link } from "react-router-dom";
import { makeSeriesUrl } from "../../configs/helpers";

const NextEpisodeCard = ({ series, nextEpisode, watchedEpisodes }) => {
    const totalEpisodes = series.number_of_episodes;
    const watchedPercentage = (watchedEpisodes.length / totalEpisodes) * 100;

    return (
        <Link
            to={`tv/${makeSeriesUrl(series.id, series.name)}/season/${nextEpisode.season_number}/episode/${
                nextEpisode.episode_number
            }`}
            className="bg-white rounded-lg shadow-md w-64">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{series.name}</h2>
                <p>{nextEpisode.name}</p>
                <p className="text-gray-600">
                    S{nextEpisode.season_number} | E{nextEpisode.episode_number}
                </p>
            </div>
            <div className="h-3 w-full bg-gray-300">
                <div className="h-3 bg-blue-500" style={{ width: `${watchedPercentage}%` }}></div>
            </div>
        </Link>
    );
};

export default NextEpisodeCard;
