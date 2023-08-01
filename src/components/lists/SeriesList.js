import React from "react";
import { Link } from "react-router-dom";

const SeriesList = ({ series }) => {
    return (
        <div className="flex flex-wrap gap-4 mb-8">
            {series.map((series) => {
                return (
                    <Link
                        to={`/tv/${series.id}`}
                        className="bg-white rounded-lg shadow-md p-6 w-80 inline-block relative "
                        key={series.id}>
                        <h2 className="text-xl font-bold mb-4">{series.name}</h2>
                        <p className="text-gray-600 text-sm">Release Date: {series.first_air_date}</p>
                    </Link>
                );
            })}
        </div>
    );
};

export default SeriesList;
