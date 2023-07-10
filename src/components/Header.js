import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
    const [username, setUsername] = useState();
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token);
            const { username } = decoded;
            setUsername(username);
        }
    }, [username]);

    const handleLogout = () => {
        console.log("Logging out user.");

        axios
            .get("http://localhost:5001/api/auth/logout")
            .then(({ data }) => {
                console.log(data);
                localStorage.removeItem("token");
                setUsername(null);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <div>
                {username ? (
                    <div>
                        <p>⭐️</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/auth">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Header;
