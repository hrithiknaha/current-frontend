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
            className="bg-white rounded-lg shadow-md p-6 w-64">
            <h2 className="text-xl font-bold mb-2">{series.name}</h2>
            <p>{nextEpisode.name}</p>
            <p className="text-gray-600 mb-2">
                S{nextEpisode.season_number} | E{nextEpisode.episode_number}
            </p>
            <div className="h-1 w-full bg-gray-300 mt-4">
                <div className="h-1 bg-blue-500" style={{ width: `${watchedPercentage}%` }}></div>
            </div>
        </Link>
    );
};

export default NextEpisodeCard;
