import { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const EpisodeTable = ({ watchedEpisodes }) => {
    const [ratingFilter, setRatingFilter] = useState("0");
    const [sort, setSort] = useState("recent");
    const [sortDirection, setSortDirection] = useState("desc");

    const [episodes, setEpisodes] = useState();

    useEffect(() => {
        let filteredSeries = [];

        if (ratingFilter === "0") filteredSeries = watchedEpisodes;
        else if (ratingFilter === "2") filteredSeries = watchedEpisodes.filter((movie) => movie.rating < 2);
        else if (ratingFilter === "4")
            filteredSeries = watchedEpisodes.filter((movie) => movie.rating >= 2 && movie.rating < 6);
        else if (ratingFilter === "6")
            filteredSeries = watchedEpisodes.filter((movie) => movie.rating >= 6 && movie.rating < 8);
        else if (ratingFilter === "8")
            filteredSeries = watchedEpisodes.filter((movie) => movie.rating >= 8 && movie.rating <= 10);

        const sortedSeries = [...filteredSeries];

        if (sort === "recent") {
            if (sortDirection === "aesc") sortedSeries.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
            else sortedSeries.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        } else if (sort === "runtime") {
            if (sortDirection === "aesc") sortedSeries.sort((a, b) => (a.runtime > b.runtime ? 1 : -1));
            else sortedSeries.sort((a, b) => (a.runtime < b.runtime ? 1 : -1));
        }

        setEpisodes(sortedSeries);
    }, [ratingFilter, sort, sortDirection, watchedEpisodes]);

    const handleSortDirection = () => {
        if (sortDirection === "desc") setSortDirection("aesc");
        else setSortDirection("desc");
    };

    return (
        <div>
            <div className="flex items-center space-x-4 justify-end mb-8">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Filter by Rating:</span>
                    <select
                        onChange={(e) => setRatingFilter(e.target.value)}
                        className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:border-indigo-500">
                        <option value="0">All</option>
                        <option value="8">Mindblowing</option>
                        <option value="6">Its Alright</option>
                        <option value="4">Headache</option>
                        <option value="2">Delete It</option>
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
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Rating</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Runtime</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Watch Date</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Series Id</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Season</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Episode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes &&
                            episodes.map((episode, index) => (
                                <tr key={episode.episode_id} className={`bg-gray-${index % 2 === 0 ? 50 : 100}`}>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        <Link
                                            to={`/tv/${episode.series_id}/season/${episode.season_number}/episode/${episode.episode_number}`}
                                            className="text-blue-800 hover:underline hover:text-blue-400">
                                            {episode.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap ">{episode.rating}</td>
                                    <td className="px-6 py-4 whitespace-nowrap ">{episode.runtime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        {moment(episode.createdAt).fromNow()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        <Link
                                            to={`/tv/${episode.series_id}`}
                                            className="text-blue-800 hover:underline hover:text-blue-400">
                                            {episode.series_id}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        <Link
                                            to={`/tv/${episode.series_id}/season/${episode.season_number}`}
                                            className="text-blue-800 hover:underline hover:text-blue-400">
                                            {episode.season_number}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        <Link
                                            to={`/tv/${episode.series_id}/season/${episode.season_number}/episode/${episode.episode_number}`}
                                            className="text-blue-800 hover:underline hover:text-blue-400">
                                            {episode.episode_number}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EpisodeTable;
