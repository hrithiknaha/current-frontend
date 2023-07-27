import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell, XAxis, YAxis, Bar, BarChart } from "recharts";

const COLORS = ["#172554", "#1e3a8a", "#1e40af", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa"];

const MovieStats = ({ movies, selected }) => {
    return (
        <div className="mt-8">
            <div className="flex flex-wrap gap-6 mt-2 justify-center">
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">{selected} Runtime</h2>
                    <p className="text-3xl font-bold text-blue-500">{movies.totalRuntimeMovie} hrs</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60">
                    <h2 className="text-xl font-semibold mb-4">Average {selected} Rating</h2>
                    <p className="text-3xl font-bold text-blue-500">{movies.avgRatingMovie?.toFixed(2)}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                    <h2 className="text-xl font-semibold mb-4">Movies Watched</h2>
                    <p className="text-3xl font-bold text-blue-500">{movies.totalMovies}</p>
                </div>
            </div>
            <div className="flex gap-4 my-8 justify-between">
                <div className="flex flex-col justify-center items-center">
                    <PieChart width={400} height={400}>
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
                    <PieChart width={400} height={400}>
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
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="count"
                            data={movies.productionCountriesMovieDataset}
                            innerRadius={60}
                            outerRadius={100}
                        >
                            {movies.productionCountriesMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
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
                <div class="flex flex-col my-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-blue-500">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Actor
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Movies
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {movies.castMovieDataset.slice(0, 10).map((e) => (
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
                            <thead class="bg-blue-500">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Director
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Movies
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {movies.directorMovieDataset.slice(0, 10).map((e) => (
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
                            <thead class="bg-blue-500">
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
                                        Movies
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {movies.productionCompaniesMovieDataset.slice(0, 10).map((e) => (
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

export default MovieStats;
