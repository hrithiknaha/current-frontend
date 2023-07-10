import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleAuthToggle = () => {
        setShowLogin(!showLogin);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log({ username, password });
        axios
            .post("http://localhost:5001/api/auth/login", { username, password })
            .then(({ data }) => {
                console.log(data);
                localStorage.setItem("token", data.accessToken);
                navigate("/movies");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            {showLogin ? (
                <div>
                    <h4>Register User</h4>
                    <form>
                        <label htmlFor="firstname">Firstname</label>
                        <input type="text" name="firstname" id="firstname" placeholder="firstname" />

                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" name="lastname" id="lastname" placeholder="lastname" />

                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="username" />

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="password" />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h4>Login</h4>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit">Login</button>
                    </form>
                </div>
            )}

            <label htmlFor="auth-token">Login</label>
            <input type="checkbox" name="auth-token" id="auth-token" onChange={handleAuthToggle} />
        </div>
    );
}

export default Auth;
