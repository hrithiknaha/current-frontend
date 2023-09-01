import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { extractSeriesIdFromURL } from "../configs/helpers";
import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";

export const useMovieTMDB = (movieId) => {
    const [movie, setMovie] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosPublicInstance
            .get(`/api/tmdb/movies/${extractSeriesIdFromURL(movieId)}`)
            .then(({ data }) => {
                setMovie(data);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [movieId]);

    return { movie, isLoading };
};

export const useMovieDetails = (movieId, setIsSending, hasRated) => {
    const [isDetailsLoading, setIsDetailsLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState();

    const auth = useSelector((state) => state.auth.user);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/movies/${extractSeriesIdFromURL(movieId)}`)
            .then(({ data }) => {
                setIsDetailsLoading(false);
                setMovieDetails(data[0]);
                setIsSending(false);
            })
            .catch((err) => {
                setIsDetailsLoading(false);
            });
    }, [hasRated]);

    return { movieDetails, isDetailsLoading };
};
