import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import MovieList from "../components/MovieList";

import axios from "axios";

const Profile = ({ auth }) => {
    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [userStat, setUserStat] = useState();

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
        <div>
            {!isLoading ? (
                <div>
                    <div>
                        <p>Total movie runtime watched : {userStat.totalMovieRuntime}</p>
                        <p>Average movie Rating: {userStat.avgMovieRating}</p>
                        <p>Movies Watched: {userStat.totalMovies}</p>
                    </div>
                    <div>
                        <p>Series Watched: {userStat.totalSeries}</p>
                        <p>Episodes Watched: {userStat.totalEpisodes}</p>
                        <p>Total episode runtime watched : {userStat.totalEpisodeRuntime}</p>
                        <p>Average episode Rating: {userStat.avgEpisodeRating}</p>
                    </div>
                    <h5>Hi {username}</h5>
                    <div>
                        <p>Full Name</p>
                        <span>{user.firstname}</span> - <span>{user.lastname}</span>
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
