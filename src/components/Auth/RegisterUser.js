import React from "react";

const RegisterUser = ({ handleRegisration, setFirstname, setLastname, setUsername, setPassword }) => {
    return (
        <form onSubmit={handleRegisration}>
            <label htmlFor="firstname">Firstname</label>
            <input type="text" name="firstname" id="firstname" placeholder="firstname" onChange={(e) => setFirstname(e.target.value)} />

            <label htmlFor="lastname">Lastname</label>
            <input type="text" name="lastname" id="lastname" placeholder="lastname" onChange={(e) => setLastname(e.target.value)} />

            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Submit</button>
        </form>
    );
};

export default RegisterUser;
