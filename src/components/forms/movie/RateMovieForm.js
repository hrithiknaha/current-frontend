import React from "react";

const RateMovieForm = ({ submitMovie, setRating, setDateWatched, setTheatre, theatre }) => {
    return (
        <form onSubmit={submitMovie}>
            <label htmlFor="rating">Rating</label>
            <input type="number" name="rating" id="rating" placeholder="Rating" onChange={(e) => setRating(e.target.value)} />

            <label htmlFor="date_watched">Date Watched</label>
            <input type="date" name="date_watched" id="date_watched" placeholder="Date Watched" onChange={(e) => setDateWatched(e.target.value)} />

            <label htmlFor="theatre">Theatre</label>
            <input type="checkbox" name="theatre" id="theatre" checked={theatre} onChange={(e) => setTheatre(!theatre)} />

            <button type="submit">Add</button>
        </form>
    );
};

export default RateMovieForm;
