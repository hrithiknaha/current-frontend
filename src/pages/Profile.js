import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";

import LoadingSpinner from "../components/configs/LoadingSpinner";
import SeriesList from "../components/lists/SeriesList";
import MovieList from "../components/lists/MovieList";

const Profile = () => {
    const { username } = useParams();
    const auth = useSelector((state) => state.auth);

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

                        <div className="flex gap-4">
                            <Link to="stats">
                                <button className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline">
                                    Stats
                                </button>
                            </Link>
                            {selected === "movies" ? (
                                <Link to="/movies/list">
                                    <button className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline">
                                        Movies Info
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/tv/list">
                                        <button className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline">
                                            TV Shows Info
                                        </button>
                                    </Link>
                                    <Link to="/tv/episodes/list">
                                        <button className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline">
                                            Episodes Info
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
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
                                <div>
                                    <div>
                                        <h1 className="inline-block bg-blue-500 text-white px-4 py-2 mb-4 rounded-lg">
                                            Watching Now
                                        </h1>
                                        <SeriesList
                                            series={user.series
                                                .filter((s) => s.episodes.length !== s.number_of_episodes)
                                                .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))}
                                        />
                                    </div>
                                    <div>
                                        <h1 className="inline-block bg-green-500 text-white px-4 py-2 mb-4 rounded-lg">
                                            Completed
                                        </h1>
                                        <SeriesList
                                            series={user.series
                                                .filter((s) => s.episodes.length === s.number_of_episodes)
                                                .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))}
                                        />
                                    </div>
                                </div>
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

export default Profile;
