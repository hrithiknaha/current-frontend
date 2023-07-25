import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell, XAxis, YAxis, Bar, BarChart } from "recharts";

const COLORS = ["#172554", "#1e3a8a", "#1e40af", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa"];

const MovieStats = ({ movies, selected }) => {
    return (
        <div>
            <div className="flex flex-wrap gap-6 mt-2">
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
            <div className="flex gap-4 mt-8 justify-between">
                <div className="flex flex-col justify-center items-center">
                    <PieChart width={250} height={250}>
                        <Pie dataKey="count" data={movies.genreMovieDataset} innerRadius={80} outerRadius={100}>
                            {movies.genreMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <div className="text-2xl">Genres</div>
                </div>
                <div className="flex flex-col items-center">
                    <PieChart width={250} height={250}>
                        <Pie dataKey="count" data={movies.languageMovieDataset} innerRadius={80} outerRadius={100}>
                            {movies.languageMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <div className="text-2xl">Language</div>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-16 items-center">
                <BarChart width={200} height={200} data={movies.releaseYearMovieDataset}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#172554" />
                </BarChart>
                <div className="text-2xl">Release Year</div>
            </div>
            <div className="flex gap-4 mt-8 justify-between">
                <div className="flex flex-col justify-center items-center">
                    <PieChart width={250} height={250}>
                        <Pie dataKey="count" data={movies.castMovieDataset} innerRadius={80} outerRadius={100}>
                            {movies.genreMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <div className="text-2xl">Cast</div>
                </div>
                <div className="flex flex-col items-center">
                    <PieChart width={250} height={250}>
                        <Pie dataKey="count" data={movies.directorMovieDataset} innerRadius={80} outerRadius={100}>
                            {movies.languageMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <div className="text-2xl">Directors</div>
                </div>
            </div>
            <div className="flex gap-4 mt-8 justify-between">
                <div className="flex flex-col justify-center items-center">
                    <PieChart width={250} height={250}>
                        <Pie
                            dataKey="count"
                            data={movies.productionCompaniesMovieDataset}
                            innerRadius={80}
                            outerRadius={100}
                        >
                            {movies.productionCompaniesMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <div className="text-2xl">Productions</div>
                </div>
                <div className="flex flex-col items-center">
                    <PieChart width={250} height={250}>
                        <Pie
                            dataKey="count"
                            data={movies.productionCountriesMovieDataset}
                            innerRadius={80}
                            outerRadius={100}
                        >
                            {movies.productionCountriesMovieDataset.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <div className="text-2xl">Country Productions</div>
                </div>
            </div>
        </div>
    );
};

export default MovieStats;
