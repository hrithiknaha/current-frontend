import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";

import LoadingSpinner from "../components/configs/LoadingSpinner";
import SeriesList from "../components/lists/SeriesList";
import MovieList from "../components/lists/MovieList";

const Profile = ({ auth }) => {
    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();

    const [selected, setSelected] = useState("movies");

    const selectMovies = (e) => {
        setSelected("movies");
    };

    const selectShows = (e) => {
        setSelected("series");
    };

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/users/${username}`)
            .then(({ data }) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
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

                    <div className="flex gap-4 py-8">
                        <div className="flex flex-col justify-between w-80 h-full shadow rounded">
                            <h1 className="text-xl p-4 bg-blue-500 text-white rounded-t">Search Results</h1>
                            <div>
                                <div
                                    onClick={selectMovies}
                                    className={`flex items-center justify-between ${
                                        selected === "movies"
                                            ? "bg-gray-200 "
                                            : "hover:bg-gray-200 hover:cursor-pointer"
                                    } pt-4 p-3`}>
                                    <p>Movies</p>
                                    <p className="bg-blue-500 px-2 rounded text-white">{user.movies.length}</p>
                                </div>
                                <div
                                    onClick={selectShows}
                                    className={`flex items-center justify-between ${
                                        selected === "series" ? "bg-gray-200" : "hover:bg-gray-200 hover:cursor-pointer"
                                    } pt-4 p-3`}>
                                    <p>TV Shows</p>
                                    <p className="bg-blue-500 px-2 rounded text-white">{user.series.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            {selected === "movies" ? (
                                <MovieList movies={user.movies} />
                            ) : (
                                <SeriesList series={user.series} />
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
