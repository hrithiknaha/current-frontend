import { useState } from "react";
import { useSelector } from "react-redux";

import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, XAxis, Bar, BarChart, YAxis } from "recharts";
import { convertMinutesToMonthsDaysHours } from "../../configs/helpers";
import { axiosPrivateInstance } from "../../configs/axios";

import Modal from "../../components/configs/Modal";
import { ReactTable } from "../configs/ReactTable";

const COLORS = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];

const SeriesStats = ({ series }) => {
    const auth = useSelector((state) => state.auth.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);

    const [modalText, setModalText] = useState("");
    const [showDetails, setShowDetails] = useState([]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchShows = (e, action) => {
        setIsModalLoading(true);
        setIsModalOpen(true);
        setModalText("");

        const axiosInstance = axiosPrivateInstance(auth);

        switch (action) {
            case "GENRES":
                const genre = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/genre/${genre}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows watched of ${e.name} genre`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "STATUS":
                const status = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/status/${status}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows watched of ${e.name} status`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "LANGUAGE":
                const language = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/language/${language}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows watched of ${e.name} language`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "ORIGIN_COUNTRY":
                const country = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/origin/country/${country}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows watched from ${e.name} country`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "PRODUCTION_COUNTRY":
                const prodCountry = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/production/country/${prodCountry}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows produced from ${e.name} country`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "LAST_TWENTY_WEEKS":
                const week = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/week/${week}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows watched in week ${e.name}`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "HOUR_OF_DAY":
                const hour = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/hour/${hour}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows at ${e.name}th hour`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "WEEKDAY":
                const day = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/day/${day}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows watched on ${e.name}`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "MONTH":
                const month = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/month/${month}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows watched in ${e.name}`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "YEAR":
                const year = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/year/${year}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows watched in ${e.name}`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "PRODUCTION":
                const production = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/production/company/${production}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows produced by ${e.name}`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "NETWORK":
                const network = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/shows/network/${network}`)
                    .then(({ data }) => {
                        setShowDetails(data);
                        setModalText(`Shows network by ${e.name}`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            default:
                break;
        }
    };

    return (
        <div className="mt-4 lg:mt-8">
            {showDetails && (
                <Modal
                    text={modalText}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    shows={showDetails}
                    isLoading={isModalLoading}
                />
            )}

            <div className="flex flex-wrap gap-4 mt-2 justify-start">
                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">Runtime</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">
                        {convertMinutesToMonthsDaysHours(series.totalWatchedRuntime)}
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">Series</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{series.totalSeries}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">Rating</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">
                        {series.avgRatingSeries?.toFixed(2)}
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">Episodes</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{series.totalEpisode}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">Today</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{series.totalWatchedToday}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">This Week</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{series.totalWatchedThisWeek}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">This Month</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{series.totalWatchedThisMonth}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">This Year</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{series.totalWatchedThisYear}</p>
                </div>
            </div>

            <div className="flex flex-wrap">
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="count"
                                data={series.genreSeriesDataset}
                                innerRadius={80}
                                outerRadius={100}
                                cursor={"pointer"}
                                onClick={(e) => fetchShows(e, "GENRES")}>
                                {series.genreSeriesDataset.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <h1 className="text-sm text-gray-500">GENRES</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="count"
                                data={series.statusSeriesDataset}
                                innerRadius={80}
                                outerRadius={100}
                                cursor={"pointer"}
                                onClick={(e) => fetchShows(e, "STATUS")}>
                                {series.statusSeriesDataset.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <h1 className="text-sm text-gray-500">SERIES STATUS</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="count"
                                data={series.languageSeriesDataset}
                                innerRadius={80}
                                outerRadius={100}
                                cursor={"pointer"}
                                onClick={(e) => fetchShows(e, "LANGUAGE")}>
                                {series.languageSeriesDataset.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <h1 className="text-sm text-gray-500">LANGUAGE</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <PieChart width={400} height={250}>
                        <Pie
                            dataKey="count"
                            data={series.originCountrySeriesDataset}
                            innerRadius={80}
                            outerRadius={100}
                            cursor={"pointer"}
                            onClick={(e) => fetchShows(e, "ORIGIN_COUNTRY")}>
                            {series.originCountrySeriesDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <h1 className="text-sm text-gray-500">ORIGIN COUNTRY</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <PieChart width={400} height={250}>
                        <Pie
                            dataKey="count"
                            data={series.productionCountriesSeriesDataset}
                            innerRadius={80}
                            outerRadius={100}
                            cursor={"pointer"}
                            onClick={(e) => fetchShows(e, "PRODUCTION_COUNTRY")}>
                            {series.productionCountriesSeriesDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <h1 className="text-sm text-gray-500">PRODUCTION COUNTRY</h1>
                </div>
            </div>
            <div className="flex flex-col items-center w-full h-64 mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={series.lastTwentyWeekWatchedDataset} cursor="pointer">
                        <XAxis dataKey="name" style={{ fontSize: "0.6rem" }} />
                        <YAxis width={20} style={{ fontSize: "0.6rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchShows(e, "LAST_TWENTY_WEEKS")} />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">EPISODES WATCHED IN LAST 20 WEEKS</h1>
            </div>
            <div className="flex flex-col items-center w-full h-64 mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={series.hourOfDaySeriesDataset} cursor="pointer">
                        <XAxis dataKey="hour" style={{ fontSize: "0.6rem" }} />
                        <YAxis width={20} style={{ fontSize: "0.6rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchShows(e, "HOUR_OF_DAY")} />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">EPISODES WATCHED BY TIME OF DAY</h1>
            </div>

            <div className="flex flex-wrap mt-16 items-center justify-between">
                <div className="flex flex-col items-center w-full lg:w-2/5 h-64 mt-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={series.weekdaySeriesDataset} cursor="pointer">
                            <XAxis dataKey="day" style={{ fontSize: "0.6rem" }} />
                            <YAxis width={20} style={{ fontSize: "0.6rem" }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchShows(e, "WEEKDAY")} />
                        </BarChart>
                    </ResponsiveContainer>
                    <h1 className="text-sm text-gray-500">EPISODES WATCHED BY DAY OF WEEK</h1>
                </div>
                <div className="flex flex-col items-center w-full lg:w-3/5 h-64 mt-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={series.monthSeriesDataset} cursor="pointer">
                            <XAxis dataKey="month" style={{ fontSize: "0.6rem" }} />
                            <YAxis width={20} style={{ fontSize: "0.6rem" }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchShows(e, "MONTH")} />
                        </BarChart>
                    </ResponsiveContainer>
                    <h1 className="text-sm text-gray-500">EPISODES WATCHED BY MONTH</h1>
                </div>
            </div>

            <div className="flex flex-col items-center w-full h-64 mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={series.releaseYearSeriesDataset} cursor="pointer">
                        <XAxis dataKey="name" style={{ fontSize: "0.6rem" }} />
                        <YAxis width={20} style={{ fontSize: "0.6rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchShows(e, "YEAR")} />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">SERIES RELEASE YEAR</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start my-16">
                <ReactTable
                    dataset={series.productionCompaniesSeriesDataset}
                    type="Production"
                    count="Movies"
                    fetch={fetchShows}
                />
                <ReactTable dataset={series.networkSeriesDataset} type="Network" count="Movies" fetch={fetchShows} />
                <ReactTable dataset={series.castEpisodeDataset} type="Characters" count="Movies" />
                <ReactTable dataset={series.seriesEpisodesDataset} type="Series" count="Movies" />
            </div>
        </div>
    );
};

export default SeriesStats;
