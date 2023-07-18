import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Episode = () => {
    const { tvId, seasonNumber, episodeNumber } = useParams();

    const auth = useSelector((state) => state.auth);

    const [rating, setRating] = useState();

    const [tmdbEpisode, setTmdbEpisode] = useState();
    const [episode, setEpisode] = useState();
    const [isLoading, setIsLoading] = useState();
    const [haveRated, setHaveRated] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/tmdb/series/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`)
            .then(({ data }) => {
                setTmdbEpisode(data);

                axios
                    .get(`http://localhost:5001/api/series/${tvId}/episodes/${data.id}`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    })
                    .then(({ data }) => {
                        setEpisode(data);
                        setHaveRated(true);
                        setIsLoading(true);
                    })
                    .catch((error) => {
                        setIsLoading(false);
                    });
            });
    }, [tvId, seasonNumber, episodeNumber, haveRated]);

    const handleWatch = (e) => {
        e.preventDefault();

        const date_timestamp = new Date();
        const day = date_timestamp.getDate();
        const month = date_timestamp.getMonth() + 1;
        const year = date_timestamp.getFullYear();

        const payload = {
            series_id: tvId,
            date_watched: `${year}-${month}-${day}`,
            rating,
            episode_number: episodeNumber,
            season_number: seasonNumber,
        };

        axios
            .post(`http://localhost:5001/api/series/watch`, payload, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then(({ data }) => {
                setHaveRated(true);
            })
            .catch((err) => console.log(err));
    };

    if (isLoading === undefined) return <p>Loading...</p>;
    return (
        <div>
            {tmdbEpisode ? (
                <div>
                    {haveRated ? (
                        episode?.rating ? (
                            <div>
                                <p>Rated : {episode.rating}</p>
                                <p>Date wathched : {episode.date_watched}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )
                    ) : (
                        <form onSubmit={handleWatch}>
                            <input type="number" name="rate" id="rate" onChange={(e) => setRating(e.target.value)} />
                            <button type="submit">Rate</button>
                        </form>
                    )}

                    <p>{tmdbEpisode.name}</p>
                    <p>{tmdbEpisode.overview}</p>
                    <p>{tmdbEpisode.air_date}</p>
                    <p>{tmdbEpisode.runtime}</p>

                    <h3>Casts</h3>
                    {tmdbEpisode.credits.cast.map((c) => {
                        return (
                            <p key={c.id}>
                                {c.name} - {c.character}
                            </p>
                        );
                    })}

                    <h3>Guest Stars</h3>
                    {tmdbEpisode.guest_stars.map((c) => {
                        return (
                            <p key={c.id}>
                                {c.name} - {c.character}
                            </p>
                        );
                    })}

                    <h3>Crew</h3>
                    {tmdbEpisode.credits.crew
                        .filter(
                            (c) =>
                                c.job === "Writer" ||
                                c.job === "Director" ||
                                c.job === "Screenplay" ||
                                c.job === "Director of Photography"
                        )
                        .map((c) => {
                            return (
                                <p key={c.id}>
                                    {c.name} - {c.job}
                                </p>
                            );
                        })}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Episode;
