import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

const Series = () => {
    const { tvId } = useParams();

    const [series, setSeries] = useState();

    useEffect(() => {
        axios.get(`http://localhost:5001/api/tmdb/series/${tvId}`).then((res) => {
            setSeries(res.data);
        });
    }, [tvId]);
    return (
        <div>
            {series ? (
                <div>
                    <p>{series.name}</p>
                    <p>{series.overview}</p>
                    <p>{series.status}</p>
                    <p>Episode Runtime : {series.episode_run_time}</p>
                    {series.status === "Ended" ? <p>Episode last : {series.last_air_date}</p> : null}
                    <p>Episode first start date: {series.first_air_date}</p>
                    <ul>
                        {series.genres.map((genre) => (
                            <li key={uuid()}>{genre.name}</li>
                        ))}
                    </ul>
                    <p>Number of episode: {series.number_of_episodes}</p>
                    <p>Number of season: {series.number_of_seasons}</p>

                    <h4>Seasons</h4>
                    {series.seasons
                        .filter((allSeasons) => allSeasons.name != "Specials")
                        .map((season) => {
                            return (
                                <div key={season.id}>
                                    <Link to={`/tv/${tvId}/season/${season.season_number}`}>{season.name}</Link>
                                    <p>{season.overview}</p>
                                    <p>Episodes: {season.episode_count}</p>
                                    <p>Air date: {season.air_date}</p>
                                </div>
                            );
                        })}

                    <h4>Cast</h4>
                    <div>
                        {series.credits.cast
                            .filter((c) => c.order < 10)
                            .map((c) => {
                                return (
                                    <div key={uuid()}>
                                        <p>{c.name}</p>
                                        <p>{c.character}</p>
                                    </div>
                                );
                            })}
                    </div>
                    <h4>Crew</h4>
                    <div>
                        {series.credits.crew
                            .filter(
                                (c) =>
                                    c.job === "Director" ||
                                    c.job === "Director of Photography" ||
                                    c.job === "Screenplay"
                            )
                            .map((c) => {
                                return (
                                    <div key={uuid()}>
                                        <p>{c.name}</p>
                                        <p>{c.job}</p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ) : (
                <p>Loading..</p>
            )}
        </div>
    );
};

export default Series;
