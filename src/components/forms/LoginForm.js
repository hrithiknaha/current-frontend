import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
    return (
        <div className="container mx-auto  min-h-screen flex flex-col items-center p-8 py-40">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
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
