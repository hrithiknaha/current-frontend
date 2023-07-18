import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Season = () => {
    const { tvId, seasonNumber } = useParams();

    const auth = useSelector((state) => state.auth);

    const [seasonEpisodes, setSeasonEpisodes] = useState();
    const [watchedEpisodes, setWatchedEpisodes] = useState();

    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5001/api/tmdb/series/${tvId}/season/${seasonNumber}`).then(({ data }) => {
            setSeasonEpisodes(data);

            axios
                .get(`http://localhost:5001/api/series/${tvId}/season/${seasonNumber}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                })
                .then(({ data }) => {
                    setWatchedEpisodes(data);
                    setIsPending(false);
                });
        });
    }, [tvId, seasonNumber]);

    console.log("Rendering");
    if (isPending) return <p>Loading..</p>;

    return (
        <div>
            {seasonEpisodes ? (
                <div>
                    <p>{seasonEpisodes.name}</p>
                    <p>{(watchedEpisodes.length / seasonEpisodes.episodes.length) * 100}</p>

                    <p>{seasonEpisodes.overview}</p>

                    <h4>Episodes</h4>
                    {seasonEpisodes.episodes.map((episode) => {
                        return (
                            <div key={episode.id}>
                                <Link to={`episode/${episode.episode_number}`}>{episode.name}</Link>
                                <p>{episode.episode_number}</p>
                                <p>{episode.overview}</p>
                                <p>{episode.air_date}</p>
                                <p>{episode.runtime}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>Loading..</p>
            )}
        </div>
    );
};

export default Season;
