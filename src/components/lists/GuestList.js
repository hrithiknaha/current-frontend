import React from "react";
import { Link } from "react-router-dom";

const defaultImg = "https://t4.ftcdn.net/jpg/02/17/34/67/240_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg";

const GuestList = ({ guests }) => {
    return (
        <div className="mt-2 mb-8">
            <div className="flex overflow-x-auto gap-4">
                {guests.map((actor) => (
                    <Link
                        to={`/person/${actor.id}`}
                        key={actor.id}
                        className="bg-gray-100 overflow-hidden flex-none rounded-lg shadow w-24 lg:w-36">
                        <img
                            src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
                            alt={actor.name}
                            className="rounded-t w-full object-cover"
                            onError={(e) => (e.target.src = defaultImg)}
                        />
                        <div className="p-3">
                            <h3 className="text-sm font-semibold">{actor.name}</h3>
                            <p className="text-xs text-gray-600">{actor.character}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GuestList;
