import { Link } from "react-router-dom";
import { makeSeriesUrl } from "../../configs/helpers";

const TrendingList = ({ trending }) => {
    return (
        <div className="flex overflow-x-auto pt-1 pb-8">
            {trending.map((e) => {
                return (
                    <Link
                        key={e.id}
                        to={
                            e.media_type === "movie"
                                ? `movies/${makeSeriesUrl(e.id, e.title)}`
                                : `tv/${makeSeriesUrl(e.id, e.name)}`
                        }
                        className="rounded-lg shadow overflow-hidden flex-none w-20 h-32 lg:w-40 lg:h-64 m-2">
                        <img
                            className="w-full h-full object-cover"
                            src={`https://image.tmdb.org/t/p/w300/${e.poster_path}`}
                            alt={`${e.title}`}
                        />
                    </Link>
                );
            })}
        </div>
    );
};

export default TrendingList;
