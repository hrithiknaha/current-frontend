import { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { getGenres } from "../../configs/helpers";

const TVTable = ({ watchedSeries }) => {
    const [genreFilter, setGenreFilter] = useState("All");
    const [sort, setSort] = useState("recent");
    const [sortDirection, setSortDirection] = useState("desc");

    const [series, setSeries] = useState();

    useEffect(() => {
        let filteredSeries = [];

        if (genreFilter === "All") filteredSeries = watchedSeries;
        else filteredSeries = watchedSeries.filter((tv) => tv.genres.includes(genreFilter));

        const sortedSeries = filteredSeries;

        if (sort === "recent")
            if (sortDirection === "aesc") sortedSeries.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
            else sortedSeries.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        else if (sort === "runtime")
            if (sortDirection === "aesc")
                sortedSeries.sort((a, b) => (a.episode_run_time > b.episode_run_time ? 1 : -1));
            else sortedSeries.sort((a, b) => (a.episode_run_time < b.episode_run_time ? 1 : -1));

        setSeries(sortedSeries);
    }, [genreFilter, sort, sortDirection, watchedSeries]);

    const handleSortDirection = () => {
        if (sortDirection === "desc") setSortDirection("aesc");
        else setSortDirection("desc");
    };

    return (
        <div>
            <div className="flex items-center space-x-4 justify-end mb-8">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Filter by:</span>
                    <select
                        onChange={(e) => setGenreFilter(e.target.value)}
                        className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:border-indigo-500">
                        <option value="All">All</option>
                        {getGenres(watchedSeries).map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Sort by:</span>
                    <select
                        onChange={(e) => setSort(e.target.value)}
                        className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:border-indigo-500">
                        <option value="recent">Most Recent</option>
                        <option value="runtime">Runtime</option>
                    </select>
                    <button onClick={handleSortDirection}>{sortDirection === "desc" ? "⬇️" : "⬆️"}</button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Title</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Genre</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Runtime</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Progress</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {series &&
                            series.map((tv, index) => (
                                <tr key={tv.series_id} className={`bg-gray-${index % 2 === 0 ? 50 : 100}`}>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        <Link
                                            to={`/tv/${tv.series_id}`}
                                            className="text-blue-800 hover:underline hover:text-blue-400">
                                            {tv.name}
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">{tv.genres.join(", ")}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {tv.episode_run_time ? tv.episode_run_time : "NA"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{tv.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {tv.episodes.length === tv.number_of_episodes
                                            ? "Completed"
                                            : "Currently Watching"}
                                    </td>
                                    <td>{moment(tv.createdAt).fromNow()}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TVTable;
