import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { registerUser, loginUser } from "../redux/actions/auth";

import RegisterUser from "../components/forms/auth/RegisterUserForm";
import LoginUser from "../components/forms/auth/LoginUserForm";

function Auth({ registerUser, loginUser }) {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);

    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleAuthToggle = () => {
        setShowLogin(!showLogin);
    };

    const handleRegisration = (e) => {
        e.preventDefault();
        registerUser(firstname, lastname, username, password, navigate);
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
                    <RegisterUser handleRegisration={handleRegisration} setFirstname={setFirstname} setLastname={setLastname} setUsername={setUsername} setPassword={setPassword} />
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

export default connect(mapStateToProps, { registerUser, loginUser })(Auth);
