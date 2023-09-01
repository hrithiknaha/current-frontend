import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { registerUser } from "../redux/features/auth/authSlice";

import RegisterUser from "../components/forms/RegisterForm";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleRegisration = (e) => {
        e.preventDefault();

        const payload = {
            firstname,
            lastname,
            username,
            password,
        };
        dispatch(registerUser(payload));

        navigate("/");
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
