import React from "react";

const RegisterUser = () => {
    return (
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
    );
};

export default RegisterUser;
