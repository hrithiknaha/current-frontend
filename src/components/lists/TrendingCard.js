import { Link } from "react-router-dom";
import { makeSeriesUrl } from "../../configs/helpers";

const TrendingCard = ({ trending }) => {
    return (
        <Link
            key={trending.id}
            to={
                trending.media_type === "movie"
                    ? `movies/${makeSeriesUrl(trending.id, trending.title)}`
                    : `tv/${makeSeriesUrl(trending.id, trending.name)}`
            }
            className="rounded-lg shadow overflow-hidden flex-none w-20 h-32 lg:w-40 lg:h-64">
            <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/w300/${trending.poster_path}`}
                alt={`${trending.title}`}
            />
        </Link>
    );
};

export default TrendingCard;
