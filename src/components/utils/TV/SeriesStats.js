import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell, XAxis, YAxis, Bar, BarChart } from "recharts";

const COLORS = ["#172554", "#1e3a8a", "#1e40af", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa"];

const SeriesStats = ({ series, selected }) => {
    return (
        <div className="mt-8">
            <div className="flex flex-wrap gap-6 mt-2 justify-center">
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">{selected} Runtime</h2>
                    <p className="text-3xl font-bold text-blue-500">{series.totalWatchedRuntime} hrs</p>
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
                            outerRadius={100}
                        >
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
                            outerRadius={100}
                        >
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
                <div class="flex flex-col my-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-blue-800">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Production Company
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Watches
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {series.productionCompaniesSeriesDataset.map((e) => (
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{e.name}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{e.count}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="flex flex-col my-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-blue-800">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Network
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Watches
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {series.networkSeriesDataset.map((e) => (
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{e.name}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{e.count}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeriesStats;
