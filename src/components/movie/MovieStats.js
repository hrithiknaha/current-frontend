import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell, XAxis, Bar, BarChart, YAxis } from "recharts";
import StatTable from "../profile/StatTable";
import { convertMinutesToMonthsDaysHours } from "../../configs/helpers";

const COLORS = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];

const MovieStats = ({ movies, selected }) => {
    return (
        <div className="mt-4 lg:mt-8">
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
                            <Pie dataKey="count" data={movies.genreMovieDataset} innerRadius={80} outerRadius={100}>
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
                            <Pie dataKey="count" data={movies.languageMovieDataset} innerRadius={80} outerRadius={100}>
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
                                outerRadius={100}>
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
                    <BarChart data={movies.lastTwentyWeekMoviesDataset}>
                        <XAxis
                            dataKey="name"
                            style={{
                                fontSize: "0.7rem",
                            }}
                        />
                        <YAxis width={20} style={{ fontSize: "0.5rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">MOVIES WATCHED IN LAST 20 WEEKS</h1>
            </div>

            <div className="flex flex-col items-center w-full h-64 mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={movies.hourOfDayMoviesDataset}>
                        <XAxis dataKey="hour" interval={0} style={{ fontSize: "0.5rem" }} />
                        <YAxis width={20} style={{ fontSize: "0.5rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">MOVIES WATCHED BY TIME OF DAY</h1>
            </div>

            <div className="flex flex-wrap mt-16 items-center justify-between">
                <div className="flex flex-col items-center w-full lg:w-2/5 h-64 mt-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={movies.weekdayMoviesDataset}>
                            <XAxis dataKey="day" interval={0} />
                            <YAxis width={20} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f95d6a" />
                        </BarChart>
                    </ResponsiveContainer>

                    <h1 className="text-sm text-gray-500">MOVIES WATCHED BY DAY OF WEEK</h1>
                </div>
                <div className="flex flex-col items-center w-full lg:w-3/5 h-64 mt-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={movies.monthMoviesDataset}>
                            <XAxis dataKey="month" interval={0} />
                            <YAxis width={20} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f95d6a" />
                        </BarChart>
                    </ResponsiveContainer>

                    <h1 className="text-sm text-gray-500">MOVIES WATCHED BY MONTH</h1>
                </div>
            </div>

            <div className="flex flex-col items-center w-full h-64 mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={movies.releaseYearMovieDataset}>
                        <XAxis
                            dataKey="name"
                            style={{
                                fontSize: "0.7rem",
                            }}
                        />
                        <YAxis width={20} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">MOVIE RELEASE BY YEAR</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start my-16">
                <StatTable dataset={movies.castMovieDataset} header="Actor" />
                <StatTable dataset={movies.directorMovieDataset} header="Director" />
                <StatTable dataset={movies.productionCompaniesMovieDataset} header="Production Company" />
            </div>
        </div>
    );
};

export default MovieStats;
