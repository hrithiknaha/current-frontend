import React from "react";

const DisabledRatingForm = ({ setRating, handleWatch }) => {
    return (
        <form onSubmit={handleWatch} className="flex gap-4 justify-between w-full lg:w-80 h-10">
            <input
                min={0}
                max={10}
                type="number"
                name="rate"
                id="rate"
                onChange={(e) => setRating(e.target.value)}
                className=" px-4 py-2 w-full lg:w-56 h-full border rounded mb-4"
                placeholder="Ratings"
                required
                disabled
            />
            <button disabled className="w-24 bg-orange-500 text-white font-semibold rounded cursor-not-allowed">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
            </button>
        </form>
    );
};

export default DisabledRatingForm;
