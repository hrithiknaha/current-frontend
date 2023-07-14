import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import MovieList from "../components/MovieList";

import axios from "axios";

const Profile = ({ auth }) => {
    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [userStat, setUserStat] = useState();
    const [isUserStatLoading, setIsUserStatLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/users/${username}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                setUser(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchUserStats = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/stats/movies`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                setUserStat(res.data);
                setIsUserStatLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
        fetchUserStats();

        if (!auth.isAuthenticated) {
            navigate("/auth");
        }
    }, [username]);

    return (
        <div>
            {!isUserStatLoading ? (
                <div>
                    <p>Total runtime watched : {userStat.totalRuntime}</p>
                    <p>Average Rating: {userStat.avgRating}</p>
                    <p>Movies Watched: {userStat.totalMovies}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {!isLoading ? (
                <div>
                    <h5>Hi {username}</h5>
                    <div>
                        <p>Full Name</p>
                        <span>{user.firstname}</span> - <span>{user.lastname}</span>
                    </div>
                    <div>
                        <MovieList movies={user.movies} />
                    </div>
                </div>
            ) : (
                <p>Loading..</p>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, {})(Profile);
