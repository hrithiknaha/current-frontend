import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import MovieStats from "../components/MovieStats";
import SeriesStats from "../components/SeriesStats";

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
        axios
            .get(`http://localhost:5001/api/stats`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then(({ data }) => {
                setSeries(data.series);
                setMovies(data.movies);
                setIsLoading(false);
            });
    }, []);
    return (
        <div className="min-h-screen bg-gray-100">
            {!isLoading ? (
                <div className="container mx-auto py-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl my-1">{selected}</h1>

                        <button
                            onClick={handleStatToggle}
                            className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline"
                        >
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
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Stats;
