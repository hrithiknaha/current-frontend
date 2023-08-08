import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeSeriesUrl } from "../../configs/helpers";

const TMDBPersonFilmography = ({ filmography }) => {
    const [media, setMedia] = useState("all");
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        let entity = [];
        if (media === "all") entity = filmography;
        else if (media === "movies") entity = filmography.filter((m) => m.media_type === "movie");
        else if (media === "tv") entity = filmography.filter((m) => m.media_type === "tv");

        setFilteredMovies(entity);
    }, [media, filmography]);

    return (
        <div className="mt-8">
            <h1 className="text-2xl">Flimography</h1>
            <div className="flex items-center space-x-4 justify-end mb-8">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Filter by:</span>
                    <select
                        onChange={(e) => setMedia(e.target.value)}
                        className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:border-indigo-500">
                        <option value="all">All</option>
                        <option value="movies">Movies</option>
                        <option value="tv">TV Shows</option>
                    </select>
                </div>
                {/* <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Sort by:</span>
                    <select
                        onChange={(e) => setSort(e.target.value)}
                        className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:border-indigo-500"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="rating">Top Rated</option>
                    </select>
                    <button onClick={handleSortDirection}>{sortDirection === "desc" ? "⬇️" : "⬆️"}</button>
                </div> */}
            </div>
            <div className="flex flex-wrap gap-4 items-center mt-4">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Year</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovies &&
                            filteredMovies.map((entity) => (
                                <tr key={entity.movie_id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {entity.media_type === "movie"
                                            ? entity.release_date
                                                ? moment(entity.release_date).format("YYYY")
                                                : "-"
                                            : entity.first_air_date
                                            ? moment(entity.first_air_date).format("YYYY")
                                            : "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        <Link
                                            to={
                                                entity.media_type === "movie"
                                                    ? `/movies/${makeSeriesUrl(entity.id, entity.title)}`
                                                    : `/tv/${makeSeriesUrl(entity.id, entity.name)}`
                                            }
                                            className=" hover:underline hover:text-blue-800">
                                            {entity.media_type === "movie" ? entity.title : entity.name}
                                        </Link>
                                        <br />
                                        {entity.media_type === "tv" ? (
                                            <span className="text-gray-700 text-sm">
                                                {entity.episode_count} episodes
                                            </span>
                                        ) : (
                                            <span className="text-gray-700 text-sm">as {entity.character}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TMDBPersonFilmography;
