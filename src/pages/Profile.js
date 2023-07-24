import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

import LoadingSpinner from "../components/configs/LoadingSpinner";
import Movie from "../components/forms/movie/Movie";
import Series from "../components/forms/TV/Series";

const Profile = ({ auth }) => {
    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then(({ data }) => {
                setUser(data);
                setIsLoading(false);
                console.log(data.movies);
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
                            <h3 className="text-2xl my-2">Movies</h3>
                            {user.movies ? (
                                <div className="flex flex-wrap gap-4">
                                    {user.movies.map((movie) => {
                                        return <Movie movie={movie} />;
                                    })}
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>

                        <div className="my-8">
                            <h3 className="text-2xl my-2">Series</h3>
                            {user.movies ? (
                                <div className="flex flex-wrap gap-4">
                                    {user.series.map((series) => {
                                        return <Series series={series} />;
                                    })}
                                </div>
                            ) : (
                                <p>Loading...</p>
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
