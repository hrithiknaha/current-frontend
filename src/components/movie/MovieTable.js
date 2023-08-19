import { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const MovieTable = ({ watchedMovies }) => {
    const [ratingFilter, setRatingFilter] = useState("0");
    const [sort, setSort] = useState("recent");
    const [sortDirection, setSortDirection] = useState("desc");

    const [movies, setMovies] = useState();

    useEffect(() => {
        let filteredMovies = [];

        if (ratingFilter === "0") filteredMovies = watchedMovies;
        else if (ratingFilter === "2") filteredMovies = watchedMovies.filter((movie) => movie.rating < 2);
        else if (ratingFilter === "4")
            filteredMovies = watchedMovies.filter((movie) => movie.rating >= 2 && movie.rating < 6);
        else if (ratingFilter === "6")
            filteredMovies = watchedMovies.filter((movie) => movie.rating >= 6 && movie.rating < 8);
        else if (ratingFilter === "8")
            filteredMovies = watchedMovies.filter((movie) => movie.rating >= 8 && movie.rating <= 10);

        const sortedMovies = [...filteredMovies];

        if (sort === "recent")
            if (sortDirection === "aesc") sortedMovies.sort((a, b) => (a.date_watched > b.date_watched ? 1 : -1));
            else sortedMovies.sort((a, b) => (a.date_watched < b.date_watched ? 1 : -1));
        else if (sort === "rating")
            if (sortDirection === "aesc") sortedMovies.sort((a, b) => (a.rating > b.rating ? 1 : -1));
            else sortedMovies.sort((a, b) => (a.rating < b.rating ? 1 : -1));

        setMovies(sortedMovies);
    }, [ratingFilter, sort, sortDirection, watchedMovies]);

    const handleSortDirection = () => {
        if (sortDirection === "desc") setSortDirection("aesc");
        else setSortDirection("desc");
    };
    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                <h1 className="pb-4 text-2xl">My Ratings</h1>
                <div className="flex flex-col gap-2 lg:flex-row w-full lg:w-1/2  lg:justify-end">
                    <div className="flex gap-2 w-full lg:w-1/2 items-center justify-between">
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
                    <div className="flex gap-2 w-full lg:w-1/2 items-center justify-between">
                        <span className="text-gray-600">Sort by:</span>
                        <div className="flex gap-4">
                            <select
                                onChange={(e) => setSort(e.target.value)}
                                className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:border-indigo-500">
                                <option value="recent">Most Recent</option>
                                <option value="rating">Top Rated</option>
                            </select>
                            <button onClick={handleSortDirection}>{sortDirection === "desc" ? "⬇️" : "⬆️"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded my-6  overflow-x-scroll">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Title</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Genre</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Rated On</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-700">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies &&
                            movies.map((movie, index) => (
                                <tr key={movie.movie_id} className={`bg-gray-${index % 2 === 0 ? 50 : 100}`}>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        <Link
                                            to={`/movies/${movie.movie_id}`}
                                            className="text-blue-800 hover:underline hover:text-blue-400">
                                            {movie.title}
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">{movie.genres.join(", ")}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {moment(movie.date_watched).format("DD-MM-YYYY")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{movie.rating}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovieTable;
