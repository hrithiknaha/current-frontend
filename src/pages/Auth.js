import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser } from "../redux/actions/user";
import RegisterUser from "../components/Auth/RegisterUser";
import LoginUser from "../components/Auth/LoginUser";

function Auth({ loginUser }) {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleAuthToggle = () => {
        setShowLogin(!showLogin);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(username, password, navigate);
    };

    return (
        <div>
            {showLogin ? (
                <div>
                    <h4>Register User</h4>
                    <RegisterUser />
                </div>
            ) : (
                <div>
                    <h4>Login</h4>
                    <LoginUser handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
                </div>
            )}

            <label htmlFor="auth-token">Login</label>
            <input type="checkbox" name="auth-token" id="auth-token" onChange={handleAuthToggle} />
        </div>
    );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { loginUser })(Auth);
