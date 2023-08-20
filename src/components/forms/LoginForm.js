import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 lg:px-0">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
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
                <Link to="/register" className="mt-4 underline inline-block">
                    Register?
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
