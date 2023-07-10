import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList";

const Profile = () => {
    const { username } = useParams();

    const [user, setUser] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/users/${username}`)
            .then(({ data }) => {
                console.log(data);
                setUser(data);
            })
            .catch((err) => console.log(err));
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

export default Profile;
