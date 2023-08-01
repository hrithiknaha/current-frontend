import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell, XAxis, Bar, BarChart } from "recharts";
import StatTable from "../profile/StatTable";
import { convertMinutesToMonthsDaysHours } from "../../configs/helpers";

const COLORS = ["#172554", "#1e3a8a", "#1e40af", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa"];

const SeriesStats = ({ series, selected }) => {
    return (
        <div className="mt-8">
            <div className="flex flex-wrap gap-6 mt-2 justify-center">
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">{selected} Runtime</h2>
                    <p className="text-3xl font-bold text-blue-500">
                        {convertMinutesToMonthsDaysHours(series.totalWatchedRuntime)}
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                    <h2 className="text-xl font-semibold mb-4">{selected} Watched</h2>
                    <p className="text-3xl font-bold text-blue-500">{series.totalSeries}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">Average Episodes Rating</h2>
                    <p className="text-3xl font-bold text-blue-500">{series.avgRatingSeries?.toFixed(2)}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                    <h2 className="text-xl font-semibold mb-4">Episodes Watched</h2>
                    <p className="text-3xl font-bold text-blue-500">{series.totalEpisode}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">Episodes Watched Today</h2>
                    <p className="text-3xl font-bold text-blue-500">{series.totalWatchedToday}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">Episodes Watched This Week</h2>
                    <p className="text-3xl font-bold text-blue-500">{series.totalWatchedThisWeek}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                    <h2 className="text-xl font-semibold mb-4">Episodes Watched This Month</h2>
                    <p className="text-3xl font-bold text-blue-500">{series.totalWatchedThisMonth}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                    <h2 className="text-xl font-semibold mb-4">Episodes Watched This Year</h2>
                    <p className="text-3xl font-bold text-blue-500">{series.totalWatchedThisYear}</p>
                </div>
            </div>
            <div className="flex gap-4 mt-8 justify-between">
                <div className="flex flex-col justify-center items-center">
                    <PieChart width={400} height={400}>
                        <Pie dataKey="count" data={series.genreSeriesDataset} innerRadius={60} outerRadius={100}>
                            {series.genreSeriesDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div className="flex flex-col items-center">
                    <PieChart width={400} height={400}>
                        <Pie dataKey="count" data={series.statusSeriesDataset} innerRadius={60} outerRadius={100}>
                            {series.statusSeriesDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div className="flex flex-col items-center">
                    <PieChart width={400} height={400}>
                        <Pie dataKey="count" data={series.languageSeriesDataset} innerRadius={60} outerRadius={100}>
                            {series.languageSeriesDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-16 items-center">
                <BarChart width={1000} height={300} data={series.releaseYearSeriesDataset}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#172554" />
                    <Legend />
                </BarChart>
            </div>
            <div className="flex gap-4 mt-8 justify-between">
                <div className="flex flex-col justify-center items-center">
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="count"
                            data={series.originCountrySeriesDataset}
                            innerRadius={60}
                            outerRadius={100}>
                            {series.originCountrySeriesDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div className="flex flex-col items-center">
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="count"
                            data={series.productionCountriesSeriesDataset}
                            innerRadius={60}
                            outerRadius={100}>
                            {series.productionCountriesSeriesDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>

            <div className="flex justify-between items-start mt-8">
                <StatTable dataset={series.productionCompaniesSeriesDataset} header="Production Company" />
                <StatTable dataset={series.networkSeriesDataset} header="Network Company" />
            </div>
        </div>
    );
};

export default SeriesStats;
