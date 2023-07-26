import React from "react";

const SearchMovie = ({ handleSubmit, setSearchQuery }) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-96 mt-4">
            <input
                className="mt-1 px-4 py-2 w-full border rounded"
                type="text"
                name="search-movies"
                id="search-movies"
                placeholder="Search Movies"
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
                className="text-center bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 mt-4 rounded outline"
                type="submit"
            >
                Search Movies
            </button>
        </form>
    );
};

export default SearchMovie;
