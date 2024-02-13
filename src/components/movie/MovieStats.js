import { useState } from "react";
import { useSelector } from "react-redux";

import { convertMinutesToMonthsDaysHours } from "../../configs/helpers";
import { axiosPrivateInstance } from "../../configs/axios";
import { ReactTable } from "../configs/ReactTable";

import Modal from "../../components/configs/Modal";

import StatCard from "../stats/StatCard";
import PieChartGraph from "../stats/PieChartGraph";
import BarChartGraph from "../stats/BarChartGraph";

import { MovieStatsReducer } from "../../configs/services";

const MovieStats = ({ movies }) => {
    const auth = useSelector((state) => state.auth.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);

    const [modalText, setModalText] = useState("");
    const [movieDetails, setMovieDetails] = useState([]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchMovies = (event, action) => {
        setIsModalLoading(true);
        setIsModalOpen(true);
        setModalText("");

        const axiosInstance = axiosPrivateInstance(auth);

        MovieStatsReducer(event, action, auth, axiosInstance, setMovieDetails, setModalText, setIsModalLoading);
    };

    return (
        <div className="mt-4 lg:mt-8">
            {movieDetails && <Modal text={modalText} isOpen={isModalOpen} onClose={closeModal} movies={movieDetails} isLoading={isModalLoading} />}

            <div className="flex flex-wrap gap-2 lg:gap-4 mt-2 justify-start pt-2 lg:justify-start">
                <StatCard title={"Runtime"} value={convertMinutesToMonthsDaysHours(movies.totalRuntimeMovie)} />
                <StatCard title={"Rating"} value={movies.avgRatingMovie?.toFixed(2)} />
                <StatCard title={"Watched"} value={movies.totalMovies} />
                <StatCard title={"Today"} value={movies.totalWatchedMoviesToday} />
                <StatCard title={"This Week"} value={movies.totalWatchedMoviesThisWeek} />
                <StatCard title={"This Month"} value={movies.totalWatchedMoviesThisMonth} />
                <StatCard title={"This Year"} value={movies.totalWatchedMoviesThisYear} />
            </div>

            <div className="flex flex-wrap">
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <PieChartGraph data={movies.genreMovieDataset} fetchMovies={fetchMovies} action={"GENRES"} />
                    <h1 className="text-sm text-gray-500">GENRES</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <PieChartGraph data={movies.languageMovieDataset} fetchMovies={fetchMovies} action={"LANGUAGES"} />
                    <h1 className="text-sm text-gray-500">LANGUAGE</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <PieChartGraph data={movies.productionCountriesMovieDataset} fetchMovies={fetchMovies} action={"PRODUCTION_COUNTRY"} />
                    <h1 className="text-sm text-gray-500">PRODUCTION COUNTRY</h1>
                </div>
            </div>
            <div className="flex flex-col items-center w-full h-64 mt-16">
                <BarChartGraph data={movies.lastTwentyWeekMoviesDataset} fetchMovies={fetchMovies} action={"LAST_TWENTY_WEEKS"} />
                <h1 className="text-sm text-gray-500">MOVIES WATCHED IN LAST 20 WEEKS</h1>
            </div>

            <div className="flex flex-col items-center w-full h-64 mt-16">
                <BarChartGraph data={movies.hourOfDayMoviesDataset} fetchMovies={fetchMovies} action={"HOUR_OF_THE_DAY"} />
                <h1 className="text-sm text-gray-500">MOVIES WATCHED BY TIME OF DAY</h1>
            </div>

            <div className="flex flex-wrap mt-16 items-center justify-between">
                <div className="flex flex-col items-center w-full lg:w-2/5 h-64 mt-16">
                    <BarChartGraph data={movies.weekdayMoviesDataset} fetchMovies={fetchMovies} action={"DAY_OF_WEEK"} />
                    <h1 className="text-sm text-gray-500">MOVIES WATCHED BY DAY OF WEEK</h1>
                </div>
                <div className="flex flex-col items-center w-full lg:w-3/5 h-64 mt-16">
                    <BarChartGraph data={movies.monthMoviesDataset} fetchMovies={fetchMovies} action={"MONTH"} />
                    <h1 className="text-sm text-gray-500">MOVIES WATCHED BY MONTH</h1>
                </div>
            </div>

            <div className="flex flex-col items-center w-full h-64 mt-16">
                <BarChartGraph data={movies.releaseYearMovieDataset} fetchMovies={fetchMovies} action={"YEAR"} />
                <h1 className="text-sm text-gray-500">MOVIE RELEASE BY YEAR</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start my-16">
                <ReactTable dataset={movies.castMovieDataset} type="Actors" count="Movies" fetch={fetchMovies} />
                <ReactTable dataset={movies.directorMovieDataset} type="Directors" count="Movies" fetch={fetchMovies} />
                <ReactTable dataset={movies.productionCompaniesMovieDataset} type="Production" count="Movies" fetch={fetchMovies} />
            </div>
        </div>
    );
};

export default MovieStats;
