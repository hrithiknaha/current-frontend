import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="border-t-4 border-orange-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;
