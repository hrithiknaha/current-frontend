import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import MovieList from "../components/MovieList";

import axios from "axios";

const Profile = ({ auth }) => {
    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();

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
                console.log(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();

        if (!auth.isAuthenticated) {
            navigate("/auth");
        }
    }, [username]);

    return (
        <div>
            {!isLoading ? (
                <div>
                    <h5>Hi {username}</h5>
                    <div>
                        <p>Full Name</p>
                        <span>{user.firstname}</span> - <span>{user.lastname}</span>
                    </div>
                    <div>
                        <h4>Movies Watched - {user.movies.length}</h4>
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
