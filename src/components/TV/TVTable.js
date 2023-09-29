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

        const sortedSeries = [...filteredSeries];

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
            <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                <h1 className="pb-4 text-2xl">My Shows Ratings</h1>
                <div className="flex flex-col gap-2 lg:flex-row w-full lg:w-1/2  lg:justify-end">
                    <div className="flex gap-2 w-full lg:w-1/2 items-center justify-center">
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
                    <div className="flex gap-2 w-full lg:w-1/2 items-center justify-center">
                        <span className="text-gray-600">Sort by:</span>
                        <div className="flex gap-4">
                            <select
                                onChange={(e) => setSort(e.target.value)}
                                className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:border-indigo-500">
                                <option value="recent">Most Recent</option>
                                <option value="runtime">Runtime</option>
                            </select>
                            <button onClick={handleSortDirection}>{sortDirection === "desc" ? "⬇️" : "⬆️"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg my-6 overflow-x-scroll">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-orange-500">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Genre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Runtime
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Progress
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Date Added
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {series &&
                            series.map((tv, index) => (
                                <tr key={tv.series_id} className={`bg-gray-${index % 2 === 0 ? 50 : 100}`}>
                                    <td className="text-sm px-6 py-4 whitespace-normal">
                                        <Link
                                            to={`/tv/${tv.series_id}`}
                                            className="text-sm text-gray-900 hover:underline hover:text-blue-400">
                                            {tv.name}
                                        </Link>
                                    </td>

                                    <td className="text-sm px-6 py-4 whitespace-normal">{tv.genres.join(", ")}</td>
                                    <td className="text-sm px-6 py-4 whitespace-normal">
                                        {tv.episode_run_time ? tv.episode_run_time : "NA"}
                                    </td>
                                    <td className="text-sm px-6 py-4 whitespace-normal">{tv.status}</td>
                                    <td className="text-sm px-6 py-4 whitespace-normal">
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
