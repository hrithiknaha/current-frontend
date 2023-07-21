import React from "react";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-blue-500">404</h1>
                    <p className="text-xl font-semibold">Page Not Found</p>
                    <p className="mt-4 text-gray-600">
                        The page you are looking for might have been removed or is temporarily unavailable.
                    </p>
                    <a
                        href="/"
                        className="inline-block mt-6 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
