import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell, XAxis, Bar, BarChart, YAxis } from "recharts";
import StatTable from "../profile/StatTable";
import { convertMinutesToMonthsDaysHours } from "../../configs/helpers";

const COLORS = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];

const MovieStats = ({ movies, selected }) => {
    return (
        <div className="mt-8">
            <div className="flex flex-wrap gap-4 mt-2 justify-between">
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">{selected} Runtime</h2>
                    <p className="text-3xl font-bold text-blue-500">
                        {convertMinutesToMonthsDaysHours(movies.totalRuntimeMovie)}{" "}
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">{selected} Rating</h2>
                    <p className="text-3xl font-bold text-blue-500">{movies.avgRatingMovie?.toFixed(2)}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                    <h2 className="text-xl font-semibold mb-4">{selected} Watched</h2>
                    <p className="text-3xl font-bold text-blue-500">{movies.totalMovies}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">{selected} Watched Today</h2>
                    <p className="text-3xl font-bold text-blue-500">{movies.totalWatchedMoviesToday}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">{selected} Watched This Week</h2>
                    <p className="text-3xl font-bold text-blue-500">{movies.totalWatchedMoviesThisWeek}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                    <h2 className="text-xl font-semibold mb-4">{selected} Watched This Month</h2>
                    <p className="text-3xl font-bold text-blue-500">{movies.totalWatchedMoviesThisMonth}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                    <h2 className="text-xl font-semibold mb-4">{selected} Watched This Year</h2>
                    <p className="text-3xl font-bold text-blue-500">{movies.totalWatchedMoviesThisYear}</p>
                </div>
            </div>
            <div className="flex gap-4 my-16 justify-between">
                <div className="flex flex-col justify-center items-center">
                    <PieChart width={400} height={250}>
                        <Pie dataKey="count" data={movies.genreMovieDataset} innerRadius={80} outerRadius={100}>
                            {movies.genreMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <h1 className="text-sm text-gray-500">GENRES</h1>
                </div>
                <div className="flex flex-col items-center">
                    <PieChart width={400} height={250}>
                        <Pie dataKey="count" data={movies.languageMovieDataset} innerRadius={80} outerRadius={100}>
                            {movies.languageMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <h1 className="text-sm text-gray-500">LANGUAGE</h1>
                </div>
                <div className="flex flex-col items-center">
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
                    <h1 className="text-sm text-gray-500">PRODUCTION COUNTRY</h1>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-16 items-center">
                <div className="flex flex-col items-center">
                    <BarChart width={1200} height={300} data={movies.lastTwentyWeekMoviesDataset}>
                        <XAxis
                            dataKey="name"
                            style={{
                                fontSize: "0.7rem",
                            }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" />
                    </BarChart>
                    <h1 className="text-sm text-gray-500">MOVIES WATCHED IN LAST 20 WEEKS</h1>
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-16 items-center">
                <BarChart width={1200} height={300} data={movies.hourOfDayMoviesDataset}>
                    <XAxis
                        dataKey="hour"
                        interval={0}
                        style={{
                            fontSize: "0.7rem",
                        }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#f95d6a" />
                </BarChart>
                <h1 className="text-sm text-gray-500">MOVIES WATCHED BY TIME OF DAY</h1>
            </div>

            <div className="flex gap-4 mt-16 items-center justify-center">
                <div className="flex flex-col gap-4 mt-16 items-center">
                    <BarChart width={600} height={300} data={movies.weekdayMoviesDataset}>
                        <XAxis
                            dataKey="day"
                            interval={0}
                            style={{
                                fontSize: "0.7rem",
                            }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" />
                    </BarChart>
                    <h1 className="text-sm text-gray-500">MOVIES WATCHED BY DAY OF WEEK</h1>
                </div>
                <div className="flex flex-col gap-4 mt-16 items-center">
                    <BarChart width={600} height={300} data={movies.monthMoviesDataset}>
                        <XAxis
                            dataKey="month"
                            interval={0}
                            style={{
                                fontSize: "0.7rem",
                            }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" />
                    </BarChart>
                    <h1 className="text-sm text-gray-500">MOVIES WATCHED BY MONTH</h1>
                </div>
            </div>

            <div className="flex flex-col gap-4 my-24 items-center">
                <BarChart width={1000} height={300} data={movies.releaseYearMovieDataset}>
                    <XAxis
                        dataKey="name"
                        style={{
                            fontSize: "0.7rem",
                        }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#f95d6a" />
                </BarChart>
                <h1 className="text-sm text-gray-500">MOVIE RELEASE BY YEAR</h1>
            </div>
            <div className="flex justify-between items-start mt-8">
                <StatTable dataset={movies.castMovieDataset} header="Actor" />
                <StatTable dataset={movies.directorMovieDataset} header="Director" />
                <StatTable dataset={movies.productionCompaniesMovieDataset} header="Production Company" />
            </div>
        </div>
    );
};

export default MovieStats;
