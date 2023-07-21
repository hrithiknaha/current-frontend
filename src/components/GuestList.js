import React from "react";

const defaultImg = "https://t4.ftcdn.net/jpg/02/17/34/67/240_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg";

const GuestList = ({ guests }) => {
    return (
        <div className="mt-2 mb-8">
            <h2 className="text-xl font-bold mb-2">Guest Cast</h2>
            <div className="flex flex-wrap gap-4">
                {guests.map((actor) => (
                    <div key={actor.id} className="bg-white rounded shadow w-36">
                        <img
                            src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
                            alt={actor.name}
                            className="rounded-t w-full"
                            onError={(e) => (e.target.src = defaultImg)}
                        />
                        <div className="p-3">
                            <h3 className="text-sm font-semibold">{actor.name}</h3>
                            <p className="text-xs text-gray-600">{actor.character}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuestList;