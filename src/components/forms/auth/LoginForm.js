import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
    return (
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <div class="max-w-md w-full px-6 py-8 bg-white shadow-md">
                <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div class="mb-4">
                        <label for="username" class="block text-gray-700 font-semibold">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            class="mt-1 px-4 py-2 w-full border rounded"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-gray-700 font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="mt-1 px-4 py-2 w-full border rounded"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
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
