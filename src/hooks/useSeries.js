import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { extractSeriesIdFromURL } from "../configs/helpers";
import { axiosPrivateInstance, axiosPublicInstance } from "../configs/axios";

export const useSeries = (tvId) => {
    const [series, setSeries] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosPublicInstance
            .get(`/api/tmdb/series/${extractSeriesIdFromURL(tvId)}`)
            .then((res) => {
                setSeries(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    }, [tvId]);

    return { series, isLoading };
};

export const useSeriesWatchedEpisodes = (tvId) => {
    const [watchedEpisodes, setWatchedEpisodes] = useState();
    const [isDetailsLoading, setIsDetailsLoading] = useState(true);

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/series/${extractSeriesIdFromURL(tvId)}/episodes`)
            .then(({ data }) => {
                setWatchedEpisodes(data);
                setIsDetailsLoading(false);
            })
            .catch((err) => console.log(err));
    }, [tvId]);

    return { watchedEpisodes, isDetailsLoading };
};

export const useHasSeriesAdded = (tvId, setHasSeriesBeenAdded) => {
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/series/${extractSeriesIdFromURL(tvId)}`)
            .then(({ data }) => {
                if (data?.series_id) setHasSeriesBeenAdded(true);
            })
            .catch((err) => {
                console.log(err);
                setHasSeriesBeenAdded(false);
            });
    }, [tvId]);
};
