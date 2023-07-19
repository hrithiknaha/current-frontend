import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { registerUser } from "../redux/actions/auth";

import RegisterUser from "../components/forms/auth/RegisterForm";

function Register({ registerUser }) {
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleRegisration = (e) => {
        e.preventDefault();
        registerUser(firstname, lastname, username, password, navigate);
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { registerUser })(Register);
