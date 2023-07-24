import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import axios from "axios";
import LoadingSpinner from "../components/configs/LoadingSpinner";

const Profile = ({ auth }) => {
    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [userStat, setUserStat] = useState();

    const COLORS = ["#172554", "#1e3a8a", "#1e40af", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa"];

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then(({ data }) => {
                axios
                    .get(`http://localhost:5001/api/stats`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    })
                    .then(({ data }) => {
                        setUserStat(data);
                        setIsLoading(false);
                    });
                setUser(data);
            });
    }, [username]);

    return (
        <div className="min-h-screen bg-gray-100">
            {!isLoading ? (
                <div className="container mx-auto py-16">
                    <div className="text-2xl mt-8">
                        <h1>Stats</h1>
                        <div className="flex flex-wrap gap-6 mt-2 justify-between">
                            <div className="bg-white shadow-md rounded-lg p-6 w-60">
                                <h2 className="text-xl font-semibold mb-4">Movie Runtime</h2>
                                <p className="text-3xl font-bold text-blue-500">{userStat.totalMovieRuntime} hrs</p>
                            </div>

                            <div className="bg-white shadow-md rounded-lg p-6 w-60">
                                <h2 className="text-xl font-semibold mb-4">Average Movie Rating</h2>
                                <p className="text-3xl font-bold text-blue-500">
                                    {userStat.avgMovieRating?.toFixed(2)}
                                </p>
                            </div>

                            <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                                <h2 className="text-xl font-semibold mb-4">Movies Watched</h2>
                                <p className="text-3xl font-bold text-blue-500">{userStat.totalMovies}</p>
                            </div>

                            <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                                <h2 className="text-xl font-semibold mb-4">Series Watched</h2>
                                <p className="text-3xl font-bold text-blue-500">{userStat.totalSeries}</p>
                            </div>

                            <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                                <h2 className="text-xl font-semibold mb-4">Episodes Watched</h2>
                                <p className="text-3xl font-bold text-blue-500">{userStat.totalEpisodes}</p>
                            </div>

                            <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                                <h2 className="text-xl font-semibold mb-4">Episode Watchtime</h2>
                                <p className="text-3xl font-bold text-blue-500">{userStat.totalEpisodeRuntime} hrs</p>
                            </div>

                            <div className="bg-white shadow-md rounded-lg p-6 w-60 ">
                                <h2 className="text-xl font-semibold mb-4">Average Episode Rating</h2>
                                <p className="text-3xl font-bold text-blue-500">
                                    {userStat.avgEpisodeRating?.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-2xl">Genres</h1>
                        <div className="flex justify-between items-center">
                            <div className="div">
                                <h1>Movie</h1>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="count"
                                        data={userStat.movieGenreDataset}
                                        innerRadius={80}
                                        outerRadius={100}
                                    >
                                        {userStat.movieGenreDataset.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                            <div className="div">
                                <h1>TV</h1>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="count"
                                        data={userStat.seriesGenreDataset}
                                        innerRadius={80}
                                        outerRadius={100}
                                    >
                                        {userStat.seriesGenreDataset.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, {})(Profile);
