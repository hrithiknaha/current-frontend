import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { axiosPrivateInstance } from "../configs/axios";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import MovieTable from "../components/movie/MovieTable";

const MovieList = () => {
    const { username } = useParams();

    const [watchedMovies, setWatchedMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/movies/user/${username}`)
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
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            <div className="container mx-auto py-8 lg:py-12">
                <div>
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
