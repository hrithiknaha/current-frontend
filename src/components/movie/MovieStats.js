import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell, XAxis, Bar, BarChart } from "recharts";
import StatTable from "../profile/StatTable";
import { convertMinutesToMonthsDaysHours } from "../../configs/helpers";

const COLORS = ["#EA1179", "#FD8D14", "#F11A7B", "#6528F7", "#1A5D1A", "#F24C3D", "#17594A"];

const MovieStats = ({ movies, selected }) => {
    return (
        <div className="mt-8">
            <div className="flex flex-wrap gap-6 mt-2 justify-center">
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
            <div className="flex gap-4 my-8 justify-between">
                <div className="flex flex-col justify-center items-center">
                    <PieChart width={400} height={350}>
                        <Pie dataKey="count" data={movies.genreMovieDataset} innerRadius={60} outerRadius={100}>
                            {movies.genreMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div className="flex flex-col items-center">
                    <PieChart width={400} height={350}>
                        <Pie dataKey="count" data={movies.languageMovieDataset} innerRadius={60} outerRadius={100}>
                            {movies.languageMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div className="flex flex-col items-center">
                    <PieChart width={400} height={350}>
                        <Pie
                            dataKey="count"
                            data={movies.productionCountriesMovieDataset}
                            innerRadius={60}
                            outerRadius={100}>
                            {movies.productionCountriesMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-16 items-center">
                <BarChart width={1200} height={300} data={movies.lastTwentyWeekMoviesDataset}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#172554" />
                </BarChart>
                <BarChart width={1200} height={300} data={movies.weekdayMoviesDataset}>
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#172554" />
                </BarChart>
                <BarChart width={1200} height={300} data={movies.monthMoviesDataset}>
                    <XAxis dataKey="month" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#172554" />
                </BarChart>
                <BarChart width={1200} height={300} data={movies.hourOfDayMoviesDataset}>
                    <XAxis dataKey="hour" interval={0} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#172554" />
                </BarChart>
            </div>
            <div className="flex flex-col gap-4 my-24 items-center">
                <BarChart width={1000} height={300} data={movies.releaseYearMovieDataset}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#172554" />
                    <Legend />
                </BarChart>
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
