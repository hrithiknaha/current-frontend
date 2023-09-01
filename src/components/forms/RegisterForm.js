import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({ handleRegisration, setFirstname, setLastname, setUsername, setPassword }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 lg:px-0">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                <form onSubmit={handleRegisration}>
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-gray-700 font-semibold">
                            Firstname
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            className="mt-1 px-4 py-2 w-full border rounded"
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastname" className="block text-gray-700 font-semibold">
                            Lastname
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            className="mt-1 px-4 py-2 w-full border rounded"
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="mt-1 px-4 py-2 w-full border rounded"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 px-4 py-2 w-full border rounded"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Login
                    </button>
                </form>
                <Link to="/login" className="mt-4 underline inline-block">
                    Login?
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
