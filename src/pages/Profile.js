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
    const [loggedUser, setLoggedUser] = useState();

    const [userQuery, setUserQuery] = useState();
    const [searchUser, setSearchUser] = useState();

    const [user, setUser] = useState();

    const [requestSent, setRequestSent] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const [selected, setSelected] = useState("movies");

    const selectMovies = (e) => {
        setSelected("movies");
    };

    const selectShows = (e) => {
        setSelected("series");
    };

    useEffect(() => {
        setSearchUser(null);
        setUserQuery(null);
        setIsLoading(true);

        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/users/${username}`)
            .then(({ data }) => {
                setUser(data);

                axiosInstance
                    .get(`/api/users/${auth.username}`)
                    .then(({ data }) => {
                        setLoggedUser(data);
                        setIsLoading(false);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [auth.username, username, requestSent]);

    const handleSearchUser = (e) => {
        e.preventDefault();
        const axiosInstance = axiosPrivateInstance(auth);

        const payload = {
            username: userQuery,
        };

        console.log("Sending request");

        axiosInstance
            .post(`/api/users`, payload)
            .then(({ data }) => {
                if (data?.username) {
                    setSearchUser(data);
                } else setSearchUser(null);
            })
            .catch((err) => console.log(err));
    };

    const handleFollowUser = () => {
        const axiosInstance = axiosPrivateInstance(auth);
        setButtonDisabled(true);

        axiosInstance
            .get(`/api/users/follow/${username}`)
            .then(() => {
                setRequestSent((prev) => !prev);
                setButtonDisabled(false);
            })
            .catch((err) => console.log(err));
    };

    const handleUnfollowUser = () => {
        const axiosInstance = axiosPrivateInstance(auth);
        setButtonDisabled(true);

        axiosInstance
            .get(`/api/users/follow/${username}/remove`)
            .then(() => {
                setRequestSent((prev) => !prev);
                setButtonDisabled(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            {!isLoading ? (
                <div className="container mx-auto py-8 lg:py-12">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl lg:text-4xl my-1">Hi, {user.username}</h1>

                        {auth.username === username ? (
                            <p></p>
                        ) : Boolean(loggedUser?.following.filter((user) => user.username === username).length) ? (
                            <button
                                style={{ backgroundColor: isButtonDisabled ? "bg-gray-500" : "bg-orange-500" }}
                                disabled={isButtonDisabled}
                                onClick={handleUnfollowUser}
                                className=" bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                                Unfollow
                            </button>
                        ) : (
                            <button
                                style={{ backgroundColor: isButtonDisabled ? "bg-gray-500" : "bg-orange-500" }}
                                disabled={isButtonDisabled}
                                onClick={handleFollowUser}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                                Follow
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col justify-between items-start lg:flex-row gap-4 py-4">
                        <div className="flex justify-between items-center gap-4">
                            <Link to="friends" className=" mx-auto bg-white px-4 py-2 rounded-lg shadow-md">
                                <h2 className="text-sm">Followers</h2>
                                <p className="text-m font-bold text-center">{user.followers.length}</p>
                            </Link>

                            <Link to="friends" className=" mx-auto bg-white px-4 py-2 rounded-lg shadow-md">
                                <h2 className="text-sm">Following</h2>
                                <p className="text-m font-bold text-center">{user.following.length}</p>
                            </Link>
                        </div>

                        <form
                            className="w-full lg:w-80 flex gap-4 items-center justify-center rounded"
                            onSubmit={handleSearchUser}>
                            <input
                                type="text"
                                id="query"
                                name="query"
                                className="w-full border border-gray-300 rounded p-2"
                                placeholder="Search User"
                                onChange={(e) => setUserQuery(e.target.value)}
                                value={userQuery}
                                required
                            />
                            <button
                                type="submit"
                                className="bg-orange-500 text-white hover:bg-orange-600 font-semibold py-2 px-4 rounded">
                                Submit
                            </button>
                        </form>

                        <div className="flex gap-4 items-center">
                            <Link to="stats">
                                <button className="bg-orange-500 text-white hover:bg-orange-600 font-semibold py-2 px-4 rounded">
                                    Stats
                                </button>
                            </Link>
                            {selected === "movies" ? (
                                <Link to={`/movies/list/${username}`}>
                                    <button className="bg-orange-500 text-white hover:bg-orange-600 font-semibold py-2 px-4 rounded">
                                        Movies Info
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link to={`/tv/list/${username}`}>
                                        <button className="bg-orange-500 text-white hover:bg-orange-600 font-semibold py-2 px-4 rounded outline">
                                            Shows Info
                                        </button>
                                    </Link>
                                    <Link to={`/tv/episodes/list/${username}`}>
                                        <button className="bg-orange-500 text-white hover:bg-orange-600 font-semibold py-2 px-4 rounded outline">
                                            Episodes Info
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {searchUser && (
                        <Link to={`/profile/${searchUser.username}`}>
                            <div className="bg-white rounded-lg shadow-md p-4 text-center w-48 mx-auto">
                                <span className="font-semibold"></span> {searchUser.username}
                            </div>
                        </Link>
                    )}

                    <div className="flex flex-col lg:flex-row gap-4 py-8">
                        <div className="flex flex-col justify-between w-full lg:w-60 h-full shadow rounded">
                            <h1 className="text-xl p-4 bg-orange-500 text-white rounded-t">Search Results</h1>
                            <div>
                                <div
                                    onClick={selectMovies}
                                    className={`flex items-center justify-between ${
                                        selected === "movies"
                                            ? "bg-gray-200 "
                                            : "hover:bg-gray-200 hover:cursor-pointer"
                                    } pt-4 p-3`}>
                                    <p>Movies</p>
                                    <p className="bg-orange-500 px-2 rounded text-white">{user.movies.length}</p>
                                </div>
                                <div
                                    onClick={selectShows}
                                    className={`flex items-center justify-between ${
                                        selected === "series" ? "bg-gray-200" : "hover:bg-gray-200 hover:cursor-pointer"
                                    } pt-4 p-3`}>
                                    <p>TV Shows</p>
                                    <p className="bg-orange-500 px-2 rounded text-white">{user.series.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-4 lg:mt-0">
                            {selected === "movies" ? (
                                <MovieList movies={user.movies.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))} />
                            ) : (
                                <div>
                                    <div>
                                        <h1 className="inline-block bg-orange-500 text-white px-4 py-2 mb-4 rounded-lg">
                                            Watching Now
                                        </h1>
                                        <SeriesList
                                            series={user.series
                                                .filter((s) => s.episodes.length !== s.number_of_episodes)
                                                .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))}
                                        />
                                    </div>
                                    {loggedUser.series.filter(
                                        (s) =>
                                            s.episodes.length === s.number_of_episodes &&
                                            s.status === "Returning Series"
                                    ).length > 0 && (
                                        <div>
                                            <h1 className="inline-block bg-green-500 text-white px-4 py-2 mb-4 rounded-lg">
                                                Up To Date
                                            </h1>
                                            <SeriesList
                                                series={user.series
                                                    .filter(
                                                        (s) =>
                                                            s.episodes.length === s.number_of_episodes &&
                                                            s.status === "Returning Series"
                                                    )
                                                    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))}
                                            />
                                        </div>
                                    )}
                                    {loggedUser.series.filter(
                                        (s) => s.episodes.length === s.number_of_episodes && s.status === "Ended"
                                    ).length > 0 && (
                                        <div>
                                            <h1 className="inline-block bg-purple-500 text-white px-4 py-2 mb-4 rounded-lg">
                                                Completed
                                            </h1>
                                            <SeriesList
                                                series={user.series
                                                    .filter(
                                                        (s) =>
                                                            s.episodes.length === s.number_of_episodes &&
                                                            s.status === "Ended"
                                                    )
                                                    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))}
                                            />
                                        </div>
                                    )}
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
