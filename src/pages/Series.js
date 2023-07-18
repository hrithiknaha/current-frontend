import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Series = () => {
    const { tvId } = useParams();

    const [series, setSeries] = useState();

    const [watchedEpisodes, setWatchedEpisodes] = useState();

    const [hasSeriesBeenAdded, setHasSeriesBeenAdded] = useState();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        axios.get(`http://localhost:5001/api/tmdb/series/${tvId}`).then((res) => {
            setSeries(res.data);
        });

        axios
            .get(`http://localhost:5001/api/series/${tvId}/episodes`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then((res) => {
                setWatchedEpisodes(res.data);
            });

        axios
            .get(`http://localhost:5001/api/series/${tvId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then((res) => {
                if (Boolean(res.data?.series_id)) setHasSeriesBeenAdded(true);
            })
            .catch((err) => {
                console.log(err);
                setHasSeriesBeenAdded(false);
            });
    }, [tvId]);

    const handleSubmit = () => {
        console.log("Adding series", tvId);
        const payload = { series_id: tvId };
        axios
            .post(`http://localhost:5001/api/series/add`, payload, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then(({ data }) => {
                console.log(data);
                setHasSeriesBeenAdded(true);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            {series && watchedEpisodes ? (
                <div>
                    <p>{series.name}</p>
                    {hasSeriesBeenAdded ? <p>Checked</p> : <button onClick={handleSubmit}>Add Series</button>}

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
                    {watchedEpisodes && <p>Episodes Watched: {watchedEpisodes.length}</p>}

                    <h4>Seasons</h4>
                    {series.seasons
                        .filter((allSeasons) => allSeasons.name != "Specials")
                        .map((season) => {
                            return (
                                <div key={season.id}>
                                    <Link to={`/tv/${tvId}/season/${season.season_number}`}>{season.name}</Link>
                                    <p>
                                        {watchedEpisodes?.filter((e) => e.season_number == season.season_number).length}{" "}
                                        / {season.episode_count}
                                    </p>
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
