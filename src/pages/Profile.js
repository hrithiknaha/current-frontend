import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import MovieList from "../components/MovieList";
import { fetchUser } from "../redux/actions/user";

const Profile = ({ auth }) => {
    const { username } = useParams();

    const [user, setUser] = useState();

    useEffect(() => {
        if (auth?.token) {
            fetchUser(username, auth.token, setUser);
        } else {
            console.log("You need to be logged in to see this resource.");
        }
    }, []);

    return (
        <div>
            {user ? (
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
