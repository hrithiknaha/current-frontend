import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { registerUser } from "../redux/actions/auth";

import RegisterUser from "../components/forms/auth/RegisterForm";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleRegisration = (e) => {
        e.preventDefault();
        dispatch(registerUser(firstname, lastname, username, password, navigate));
    };

    return (
        <RegisterUser
            handleRegisration={handleRegisration}
            setFirstname={setFirstname}
            setLastname={setLastname}
            setUsername={setUsername}
            setPassword={setPassword}
        />
    );
}

export default Register;
