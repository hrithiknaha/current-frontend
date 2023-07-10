import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";

const Movie = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState();

    const [rating, setRating] = useState();
    const [dateWatched, setDateWatched] = useState();
    const [theatre, setTheatre] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5001/api/tmdb/movies/${movieId}`).then(({ data }) => {
            console.log(data);
            setMovie(data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            movie_id: movieId,
            rating,
            date_watched: dateWatched,
            theatre,
        };
        console.log(payload);

        const token = localStorage.getItem("token");

        if (token) {
            axios
                .post("http://localhost:5001/api/movies/add", payload, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then(({ data }) => console.log(data))
                .catch((err) => console.log(err));
        } else {
            console.log("You need to login to perform that action.");
        }
    };
    return (
        <div>
            {movie ? (
                <div>
                    <h4>{movie.title}</h4>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="rating" id="rating" placeholder="Rating" onChange={(e) => setRating(e.target.value)} />

                        <label htmlFor="date_watched">Date Watched</label>
                        <input type="date" name="date_watched" id="date_watched" placeholder="Date Watched" onChange={(e) => setDateWatched(e.target.value)} />

                        <label htmlFor="theatre">Theatre</label>
                        <input type="checkbox" name="theatre" id="theatre" checked={theatre} onChange={(e) => setTheatre(!theatre)} />

                        <button type="submit">Add</button>
                    </form>
                    <div>
                        <span>{movie.release_date}</span> | <span>{movie.runtime}m</span>
                    </div>
                    <p>{movie.overview}</p>
                    <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">
                        IMDB
                    </a>
                    <ul>
                        {movie.genres.map((genre) => (
                            <li key={uuid()}>{genre.name}</li>
                        ))}
                    </ul>
                    <h4>Cast</h4>
                    <div>
                        {movie.credits.cast
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
                        {movie.credits.crew
                            .filter((c) => c.job === "Director" || c.job === "Director of Photography" || c.job === "Screenplay")
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
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Movie;
