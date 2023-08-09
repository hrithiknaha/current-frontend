import React from "react";

const RateForm = ({ setRating, handleWatch }) => {
    return (
        <form onSubmit={handleWatch} className="flex gap-4 justify-between w-80 h-10">
            <input
                min={0}
                max={10}
                type="number"
                name="rate"
                id="rate"
                onChange={(e) => setRating(e.target.value)}
                className=" px-4 py-2 w-56 h-full border rounded mb-4"
                placeholder="Ratings"
                required
            />
            <button
                type="submit"
                className="w-24  bg-orange-500 hover:bg-orange-600 text-white  font-semibold  rounded  ">
                Rate
            </button>
        </form>
    );
};

export default RateForm;
