import React from "react";

const LoginUserForm = ({ handleLogin, setUsername, setPassword }) => {
    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Login</button>
        </form>
    );
};

export default LoginUserForm;
