import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../redux/actions/auth";

import LoginUser from "../components/forms/LoginForm";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(username, password, navigate));
    };

    return <LoginUser handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />;
};

export default Login;
