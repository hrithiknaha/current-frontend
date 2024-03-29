import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MovieStats from "../components/movie/MovieStats";
import SeriesStats from "../components/TV/SeriesStats";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import { axiosPrivateInstance } from "../configs/axios";
import SkeletonStats from "../components/SkeletonStats";

const Stats = () => {
    const { username } = useParams();

    const [series, setSeries] = useState();
    const [movies, setMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState("Movies");

    const auth = useSelector((state) => state.auth.user);

    const handleStatToggle = () => {
        setSelected((prevState) => {
            if (prevState === "Movies") return "Series";
            else return "Movies";
        });
    };

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/stats/${username}`)
            .then(({ data }) => {
                setSeries(data.series);
                setMovies(data.movies);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            {!isLoading ? (
                <div className="container mx-auto py-8 lg:py-12">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl lg:text-4xl my-1">{selected}</h1>

                        <button
                            onClick={handleStatToggle}
                            className="text-sm lg:text-base bg-orange-500 text-white hover:bg-orange-600 font-semibold py-2 px-4 rounded">
                            Switch to {selected === "Movies" ? "Series" : "Movies"}
                        </button>
                    </div>
                    {selected === "Movies" ? (
                        <MovieStats movies={movies} selected={selected} />
                    ) : (
                        <SeriesStats series={series} selected={selected} />
                    )}
                </div>
            ) : (
                <SkeletonStats />
            )}
        </div>
    );
};

export default Stats;
