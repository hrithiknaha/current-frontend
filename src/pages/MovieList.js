import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import MovieTable from "../components/movie/MovieTable";

const MovieList = () => {
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
            <div className="container mx-auto py-16">
                <div>
                    <h1 className="pb-4 text-2xl">My Ratings</h1>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : watchedMovies ? (
                        <MovieTable watchedMovies={watchedMovies} />
                    ) : (
                        <p>No Movies</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieList;
