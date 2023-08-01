import React from "react";

const RateEpisodeForm = ({ setRating, handleWatch }) => {
    return (
        <form onSubmit={handleWatch} className="flex flex-col justify-between w-80 ">
            <input
                min={0}
                max={10}
                type="number"
                name="rate"
                id="rate"
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 px-4 py-2 w-full border rounded mb-4"
                placeholder="Rate Episode"
            />
            <button
                type="submit"
                className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline"
            >
                Rate
            </button>
        </form>
    );
};

export default RateEpisodeForm;
