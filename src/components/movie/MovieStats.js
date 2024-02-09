import { useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, XAxis, Bar, BarChart, YAxis } from "recharts";

import { convertMinutesToMonthsDaysHours } from "../../configs/helpers";
import { axiosPrivateInstance } from "../../configs/axios";

import Modal from "../../components/configs/Modal";
import { ReactTable } from "../configs/ReactTable";

const COLORS = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];

const MovieStats = ({ movies }) => {
    const auth = useSelector((state) => state.auth.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);

    const [modalText, setModalText] = useState("");
    const [movieDetails, setMovieDetails] = useState([]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchMovies = (e, action) => {
        setIsModalLoading(true);
        setIsModalOpen(true);
        setModalText("");

        const axiosInstance = axiosPrivateInstance(auth);

        switch (action) {
            case "LAST_TWENTY_WEEKS":
                const week = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/week/${week}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`Movies watched in ${e.name}th week`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "HOUR_OF_THE_DAY":
                const hour = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/hour/${hour}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`Movies watched at ${e.name}th hour`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "DAY_OF_WEEK":
                const day = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/day/${day}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`Movies watched on ${e.day}`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "MONTH":
                const month = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/month/${month}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`Movies watched in ${e.month}`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "YEAR":
                const year = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/year/${year}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`Movies watched from ${e.name}`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "GENRES":
                const genre = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/genre/${genre}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`Movies watched of ${e.name} genre`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "LANGUAGES":
                const languages = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/language/${languages}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`Movies having scene in ${e.name} language`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "PRODUCTION_COUNTRY":
                const country = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/production/country/${country}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`Movies produced in ${e.name}`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "ACTORS":
                const actor = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/actor/${actor}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`${e.name} Movies`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "DIRECTORS":
                const director = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/director/${director}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`${e.name} Movies`);
                        setIsModalLoading(false);
                    })
                    .catch((err) => console.log(err));
                break;

            case "PRODUCTION":
                const production = e.name;

                axiosInstance
                    .get(`/api/stats/${auth.username}/movies/production/company/${production}`)
                    .then(({ data }) => {
                        setMovieDetails(data);
                        setModalText(`${e.name} Movies`);
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
            {movieDetails && (
                <Modal
                    text={modalText}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    movies={movieDetails}
                    isLoading={isModalLoading}
                />
            )}

            <div className="flex flex-wrap gap-2 lg:gap-4 mt-2 justify-start pt-2 lg:justify-start">
                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">Runtime</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">
                        {convertMinutesToMonthsDaysHours(movies.totalRuntimeMovie)}{" "}
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">Rating</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{movies.avgRatingMovie?.toFixed(2)}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">Watched</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{movies.totalMovies}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 lg:gap-4 mt-2 justify-start pt-2 lg:justify-start">
                <div className="bg-white shadow-md rounded-lg p-2 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">Today</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{movies.totalWatchedMoviesToday}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-2 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">This Week</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{movies.totalWatchedMoviesThisWeek}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-2 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">This Month</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">
                        {movies.totalWatchedMoviesThisMonth}
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-2 lg:p-6 lg:w-60">
                    <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">This Year</h2>
                    <p className="text-xs lg:text-3xl font-bold text-orange-500">{movies.totalWatchedMoviesThisYear}</p>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="count"
                                data={movies.genreMovieDataset}
                                innerRadius={80}
                                outerRadius={100}
                                cursor={"pointer"}
                                onClick={(e) => fetchMovies(e, "GENRES")}>
                                {movies.genreMovieDataset.map((entry, index) => (
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
                        <PieChart width={400} height={250}>
                            <Pie
                                dataKey="count"
                                data={movies.languageMovieDataset}
                                innerRadius={80}
                                outerRadius={100}
                                cursor={"pointer"}
                                onClick={(e) => fetchMovies(e, "LANGUAGES")}>
                                {movies.languageMovieDataset.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <h1 className="text-sm text-gray-500">LANGUAGE</h1>
                </div>
                <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/3 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={250}>
                            <Pie
                                dataKey="count"
                                data={movies.productionCountriesMovieDataset}
                                innerRadius={80}
                                outerRadius={100}
                                cursor={"pointer"}
                                onClick={(e) => fetchMovies(e, "PRODUCTION_COUNTRY")}>
                                {movies.productionCountriesMovieDataset.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <h1 className="text-sm text-gray-500">PRODUCTION COUNTRY</h1>
                </div>
            </div>
            <div className="flex flex-col items-center w-full h-64 mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={movies.lastTwentyWeekMoviesDataset} cursor="pointer">
                        <XAxis dataKey="name" interval={0} style={{ fontSize: "0.7rem" }} />
                        <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchMovies(e, "LAST_TWENTY_WEEKS")} />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">MOVIES WATCHED IN LAST 20 WEEKS</h1>
            </div>

            <div className="flex flex-col items-center w-full h-64 mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={movies.hourOfDayMoviesDataset} cursor="pointer">
                        <XAxis dataKey="hour" style={{ fontSize: "0.7rem" }} />
                        <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchMovies(e, "HOUR_OF_THE_DAY")} />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">MOVIES WATCHED BY TIME OF DAY</h1>
            </div>

            <div className="flex flex-wrap mt-16 items-center justify-between">
                <div className="flex flex-col items-center w-full lg:w-2/5 h-64 mt-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={movies.weekdayMoviesDataset} cursor="pointer">
                            <XAxis dataKey="day" interval={0} style={{ fontSize: "0.7rem" }} />
                            <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchMovies(e, "DAY_OF_WEEK")} />
                        </BarChart>
                    </ResponsiveContainer>

                    <h1 className="text-sm text-gray-500">MOVIES WATCHED BY DAY OF WEEK</h1>
                </div>
                <div className="flex flex-col items-center w-full lg:w-3/5 h-64 mt-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={movies.monthMoviesDataset} cursor="pointer">
                            <XAxis dataKey="month" interval={0} style={{ fontSize: "0.7rem" }} />
                            <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchMovies(e, "MONTH")} />
                        </BarChart>
                    </ResponsiveContainer>

                    <h1 className="text-sm text-gray-500">MOVIES WATCHED BY MONTH</h1>
                </div>
            </div>

            <div className="flex flex-col items-center w-full h-64 mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={movies.releaseYearMovieDataset} cursor="pointer">
                        <XAxis dataKey="name" style={{ fontSize: "0.7rem" }} />
                        <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchMovies(e, "YEAR")} />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">MOVIE RELEASE BY YEAR</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start my-16">
                <ReactTable dataset={movies.castMovieDataset} type="Actors" count="Movies" fetch={fetchMovies} />
                <ReactTable dataset={movies.directorMovieDataset} type="Directors" count="Movies" fetch={fetchMovies} />
                <ReactTable
                    dataset={movies.productionCompaniesMovieDataset}
                    type="Production"
                    count="Movies"
                    fetch={fetchMovies}
                />
            </div>
        </div>
    );
};

export default MovieStats;
