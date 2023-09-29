import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell, XAxis, Bar, BarChart, YAxis } from "recharts";
import StatTable from "../profile/StatTable";
import { convertMinutesToMonthsDaysHours } from "../../configs/helpers";

const COLORS = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];

const SeriesStats = ({ series, selected }) => {
    return (
        <div className="mt-4 lg:mt-8">
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
                            <Pie dataKey="count" data={series.genreSeriesDataset} innerRadius={80} outerRadius={100}>
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
                            <Pie dataKey="count" data={series.statusSeriesDataset} innerRadius={80} outerRadius={100}>
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
                            <Pie dataKey="count" data={series.languageSeriesDataset} innerRadius={80} outerRadius={100}>
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
                            outerRadius={100}>
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
                            outerRadius={100}>
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
                    <BarChart data={series.lastTwentyWeekWatchedDataset}>
                        <XAxis dataKey="name" style={{ fontSize: "0.7rem" }} />
                        <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">EPISODES WATCHED IN LAST 20 WEEKS</h1>
            </div>
            <div className="flex flex-col items-center w-full h-64 mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={series.hourOfDaySeriesDataset}>
                        <XAxis dataKey="hour" interval={0} style={{ fontSize: "0.7rem" }} />
                        <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">EPISODES WATCHED BY TIME OF DAY</h1>
            </div>

            <div className="flex flex-wrap mt-16 items-center justify-between">
                <div className="flex flex-col items-center w-full lg:w-2/5 h-64 mt-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={series.weekdaySeriesDataset}>
                            <XAxis dataKey="day" style={{ fontSize: "0.7rem" }} />
                            <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f95d6a" />
                        </BarChart>
                    </ResponsiveContainer>
                    <h1 className="text-sm text-gray-500">EPISODES WATCHED BY DAY OF WEEK</h1>
                </div>
                <div className="flex flex-col items-center w-full lg:w-3/5 h-64 mt-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={series.monthSeriesDataset}>
                            <XAxis dataKey="month" style={{ fontSize: "0.7rem" }} />
                            <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f95d6a" />
                        </BarChart>
                    </ResponsiveContainer>
                    <h1 className="text-sm text-gray-500">EPISODES WATCHED BY MONTH</h1>
                </div>
            </div>

            <div className="flex flex-col items-center w-full h-64 mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={series.releaseYearSeriesDataset}>
                        <XAxis dataKey="name" style={{ fontSize: "0.7rem" }} />
                        <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f95d6a" />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-sm text-gray-500">SERIES RELEASE YEAR</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start my-16">
                <StatTable dataset={series.productionCompaniesSeriesDataset} header="Production Company" />
                <StatTable dataset={series.networkSeriesDataset} header="Network Company" />
                <StatTable dataset={series.castEpisodeDataset} header="Characters" />
                <StatTable dataset={series.seriesEpisodesDataset} header="Series Episodes" />
            </div>
        </div>
    );
};

export default SeriesStats;
