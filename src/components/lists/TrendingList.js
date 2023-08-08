import { Link } from "react-router-dom";

const TrendingList = ({ trending }) => {
    return (
        <div className="flex overflow-x-auto pt-1">
            {trending.map((e) => {
                return (
                    <Link
                        key={e.id}
                        to={e.media_type === "movie" ? `movies/${e.id}` : `tv/${e.id}`}
                        className="rounded-lg shadow-md overflow-hidden flex-none w-40 h-64 m-2">
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
