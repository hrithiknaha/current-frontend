import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

import { axiosPrivateInstance } from "../configs/axios";

import LoadingSpinner from "../components/configs/LoadingSpinner";
import MovieCard from "../components/utils/movie/MovieCard";
import SeriesCard from "../components/utils/TV/SeriesCard";

const Profile = ({ auth }) => {
    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance.get(`/api/users/${username}`).then(({ data }) => {
            setUser(data);
            setIsLoading(false);
        });
    }, [username]);

    return (
        <div className="min-h-screen bg-gray-100">
            {!isLoading ? (
                <div className="container mx-auto py-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl my-1">Hi, {user.username}</h1>

                        <Link to="stats">
                            <button className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline">
                                Stats
                            </button>
                        </Link>
                    </div>

                    <div className="mt-8">
                        <div className="my-4">
                            <h3 className="text-2xl my-2">
                                <Link to="/movies/list" className="underline text-blue-600">
                                    Movies
                                </Link>
                            </h3>
                            {user.movies?.length != 0 ? (
                                <div className="flex flex-wrap gap-4">
                                    {user.movies.map((movie) => {
                                        return <MovieCard movie={movie} />;
                                    })}
                                </div>
                            ) : (
                                <p>No Movies</p>
                            )}
                        </div>

                        <div className="my-8">
                            <h3 className="text-2xl my-2">
                                <Link to="/tv/list" className="underline text-blue-600">
                                    Series
                                </Link>
                            </h3>
                            {user.series?.length != 0 ? (
                                <div className="flex flex-wrap gap-4">
                                    {user.series.map((series) => {
                                        return <SeriesCard series={series} />;
                                    })}
                                </div>
                            ) : (
                                <p>No Series</p>
                            )}
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
