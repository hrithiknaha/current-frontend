import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { axiosPrivateInstance } from "../../../configs/axios";
import SmallLoadingSpinner from "../../configs/SmallLoadingSpinner";
import MovieCard from "./MovieCard";

const MovieTable = () => {
    const [watchedMovies, setWatchedMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get("/api/movies")
            .then(({ data }) => {
                setWatchedMovies(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto">
                <div>
                    <h1 className="pt-8 pb-4 text-2xl ">Movies Added</h1>
                    {isLoading ? (
                        <SmallLoadingSpinner />
                    ) : watchedMovies ? (
                        <div className="flex flex-wrap gap-4">
                            {watchedMovies.map((movie) => {
                                return <MovieCard movie={movie} />;
                            })}
                        </div>
                    ) : (
                        <p>No Movies</p>
                    )}
                </div>
                <h1 class="text-2xl mb-4 pt -16">Movie List</h1>
                <div class="shadow-lg rounded-lg overflow-x-auto">
                    <table class="w-full whitespace-nowrap">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="px-6 py-3 text-left font-bold text-gray-700">Movie</th>
                                <th class="px-6 py-3 text-left font-bold text-gray-700">Genre</th>
                                <th class="px-6 py-3 text-left font-bold text-gray-700">Year</th>
                                <th class="px-6 py-3 text-left font-bold text-gray-700">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">Movie 1</td>
                                <td class="px-6 py-4 whitespace-nowrap">Action</td>
                                <td class="px-6 py-4 whitespace-nowrap">2021</td>
                                <td class="px-6 py-4 whitespace-nowrap">8.5</td>
                            </tr>
                            <tr class="bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">Movie 2</td>
                                <td class="px-6 py-4 whitespace-nowrap">Comedy</td>
                                <td class="px-6 py-4 whitespace-nowrap">2019</td>
                                <td class="px-6 py-4 whitespace-nowrap">7.9</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MovieTable;
