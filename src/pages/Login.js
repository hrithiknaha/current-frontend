import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../redux/actions/auth";

import LoginUser from "../components/forms/auth/LoginForm";

const Login = ({ loginUser }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(username, password, navigate);
    };

    return <LoginUser handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />;
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { loginUser })(Login);
