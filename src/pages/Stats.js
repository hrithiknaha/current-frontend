import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MovieStats from "../components/movie/MovieStats";
import SeriesStats from "../components/TV/SeriesStats";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import { axiosPrivateInstance } from "../configs/axios";

const Stats = () => {
    const [series, setSeries] = useState();
    const [movies, setMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState("Movies");

    const auth = useSelector((state) => state.auth);

    const handleStatToggle = () => {
        setSelected((prevState) => {
            if (prevState === "Movies") return "Series";
            else return "Movies";
        });
    };

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/stats`)
            .then(({ data }) => {
                setSeries(data.series);
                setMovies(data.movies);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="min-h-screen bg-gray-100">
            {!isLoading ? (
                <div className="container mx-auto py-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl my-1">{selected}</h1>

                        <button
                            onClick={handleStatToggle}
                            className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline">
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
                <LoadingSpinner />
            )}
        </div>
    );
};

export default Stats;
