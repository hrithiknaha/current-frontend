import { useState } from "react";
import { useSelector } from "react-redux";

import { convertMinutesToMonthsDaysHours } from "../../configs/helpers";
import { axiosPrivateInstance } from "../../configs/axios";

import Modal from "../../components/configs/Modal";
import { ReactTable } from "../configs/ReactTable";

import PieChartGraph from "../stats/PieChartGraph";
import BarChartGraph from "../stats/BarChartGraph";
import StatCard from "../stats/StatCard";

import { TVShowStatsReducer } from "../../configs/services";

const SeriesStats = ({ series }) => {
    const auth = useSelector((state) => state.auth.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);

    const [modalText, setModalText] = useState("");
    const [showDetails, setShowDetails] = useState([]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchShows = (event, action) => {
        setIsModalLoading(true);
        setIsModalOpen(true);
        setModalText("");

        const axiosInstance = axiosPrivateInstance(auth);

        TVShowStatsReducer(event, action, auth, axiosInstance, setShowDetails, setModalText, setIsModalLoading);
    };

    return (
        <div className="mt-4 lg:mt-8">
            {showDetails && <Modal text={modalText} isOpen={isModalOpen} onClose={closeModal} shows={showDetails} isLoading={isModalLoading} />}

            <div className="flex flex-wrap gap-4 mt-2 justify-start">
                <StatCard title={"Runtime"} value={convertMinutesToMonthsDaysHours(series.totalWatchedRuntime)} />
                <StatCard title={"Series"} value={series.totalSeries} />
                <StatCard title={"Rating"} value={series.avgRatingSeries?.toFixed(2)} />
                <StatCard title={"Episodes"} value={series.totalEpisode} />
                <StatCard title={"Today"} value={series.totalWatchedToday} />
                <StatCard title={"This Week"} value={series.totalWatchedThisWeek} />
                <StatCard title={"This Month"} value={series.totalWatchedThisMonth} />
                <StatCard title={"This Year"} value={series.totalWatchedThisYear} />
            </div>

            <div className="flex flex-wrap">
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <PieChartGraph data={series.genreSeriesDataset} fetchMovies={fetchShows} action={"GENRES"} />
                    <h1 className="text-sm text-gray-500">GENRES</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <PieChartGraph data={series.statusSeriesDataset} fetchMovies={fetchShows} action={"STATUS"} />
                    <h1 className="text-sm text-gray-500">SERIES STATUS</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <PieChartGraph data={series.languageSeriesDataset} fetchMovies={fetchShows} action={"LANGUAGE"} />
                    <h1 className="text-sm text-gray-500">LANGUAGE</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <PieChartGraph data={series.originCountrySeriesDataset} fetchMovies={fetchShows} action={"ORIGIN_COUNTRY"} />
                    <h1 className="text-sm text-gray-500">ORIGIN COUNTRY</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <PieChartGraph data={series.productionCountriesSeriesDataset} fetchMovies={fetchShows} action={"PRODUCTION_COUNTRY"} />
                    <h1 className="text-sm text-gray-500">PRODUCTION COUNTRY</h1>
                </div>
            </div>
            <div className="flex flex-col items-center w-full h-64 mt-16">
                <BarChartGraph data={series.lastTwentyWeekWatchedDataset} fetchMovies={fetchShows} action={"LAST_TWENTY_WEEKS"} />
                <h1 className="text-sm text-gray-500">EPISODES WATCHED IN LAST 20 WEEKS</h1>
            </div>
            <div className="flex flex-col items-center w-full h-64 mt-16">
                <BarChartGraph data={series.hourOfDaySeriesDataset} fetchMovies={fetchShows} action={"HOUR_OF_DAY"} />
                <h1 className="text-sm text-gray-500">EPISODES WATCHED BY TIME OF DAY</h1>
            </div>

            <div className="flex flex-wrap mt-16 items-center justify-between">
                <div className="flex flex-col items-center w-full lg:w-2/5 h-64 mt-16">
                    <BarChartGraph data={series.weekdaySeriesDataset} fetchMovies={fetchShows} action={"WEEKDAY"} />
                    <h1 className="text-sm text-gray-500">EPISODES WATCHED BY DAY OF WEEK</h1>
                </div>
                <div className="flex flex-col items-center w-full lg:w-3/5 h-64 mt-16">
                    <BarChartGraph data={series.monthSeriesDataset} fetchMovies={fetchShows} action={"MONTH"} />
                    <h1 className="text-sm text-gray-500">EPISODES WATCHED BY MONTH</h1>
                </div>
            </div>

            <div className="flex flex-col items-center w-full h-64 mt-16">
                <BarChartGraph data={series.releaseYearSeriesDataset} fetchMovies={fetchShows} action={"YEAR"} />
                <h1 className="text-sm text-gray-500">SERIES RELEASE YEAR</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start my-16">
                <ReactTable dataset={series.productionCompaniesSeriesDataset} type="Production" count="Movies" fetch={fetchShows} />
                <ReactTable dataset={series.networkSeriesDataset} type="Network" count="Movies" fetch={fetchShows} />
                <ReactTable dataset={series.castEpisodeDataset} type="Characters" count="Movies" />
                <ReactTable dataset={series.seriesEpisodesDataset} type="Series" count="Movies" />
            </div>
        </div>
    );
};

export default SeriesStats;
