import React from "react";

const SearchTV = ({ setSearchQuery, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-96 mt-8">
            <input
                type="text"
                name="search-tv"
                id="search-tv"
                placeholder="Search TV"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1 px-4 py-2 w-full border rounded"
            />
            <button
                className="text-center bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 mt-4 rounded outline"
                type="submit"
            >
                Search TV
            </button>
        </form>
    );
};

export default SearchTV;
