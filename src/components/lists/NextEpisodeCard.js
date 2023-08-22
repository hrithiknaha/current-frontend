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
            className="bg-white overflow-hidden flex-none rounded-lg shadow-md w-20 h-32 lg:w-40 lg:h-64">
            <img
                className="object-cover"
                src={`https://image.tmdb.org/t/p/w300/${series.poster_path}`}
                alt={`${series.title}`}
            />
            <div className="h-4 w-full bg-gray-300">
                <div className="h-4 bg-orange-500" style={{ width: `${watchedPercentage}%` }}></div>
            </div>
        </Link>
    );
};

export default NextEpisodeCard;
