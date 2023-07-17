import React from "react";
import { Link } from "react-router-dom";

function TMDBTVList({ series }) {
    return (
        <div>
            <h5>Searched Series</h5>
            <div>
                {series.map((tv) => {
                    return (
                        <div key={tv.id}>
                            <Link to={`/tv/${tv.id}`}>{tv.name}</Link> | <span>{tv.first_air_date}</span>
                            <p>{tv.overview}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TMDBTVList;
