import React from "react";
import { Link } from "react-router-dom";

const defaultImg = "https://t4.ftcdn.net/jpg/02/17/34/67/240_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg";

const CrewList = ({ crews }) => {
    return (
        <div className="mt-2 mb-8">
            <h3 className="bg-gray-100 font-bold py-2">Crews</h3>
            {crews.length > 0 ? (
                <div className="flex overflow-x-auto gap-4">
                    {crews.map((crew) => (
                        <Link
                            to={`/person/${crew.id}`}
                            key={crew.id}
                            className="bg-white overflow-hidden flex-none rounded shadow w-36">
                            <img
                                src={`https://image.tmdb.org/t/p/w300/${crew.profile_path}`}
                                alt={crew.name}
                                className="rounded-t w-full"
                                onError={(e) => (e.target.src = defaultImg)}
                            />
                            <div className="p-3">
                                <h3 className="text-sm font-semibold">{crew.name}</h3>
                                <p className="text-xs text-gray-600">{crew.job}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No crew information available</p>
            )}
        </div>
    );
};

export default CrewList;
