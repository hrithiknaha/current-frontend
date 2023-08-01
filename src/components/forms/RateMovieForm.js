import React from "react";

const RateMovieForm = ({ submitMovie, setRating }) => {
    return (
        <form onSubmit={submitMovie} className="flex flex-col justify-between w-80">
            <div className="mb-4">
                <input
                    min={0}
                    max={10}
                    type="number"
                    name="rating"
                    id="rating"
                    placeholder="Rating"
                    onChange={(e) => setRating(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border rounded"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline"
            >
                Rate
            </button>
        </form>
    );
};

export default RateMovieForm;
