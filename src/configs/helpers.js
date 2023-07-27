import jwtDecode from "jwt-decode";

export const isTokenExpired = (exp) => {
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
};

export const retrieveAccessToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return {};

    const { username, exp } = jwtDecode(token);
    return { username, token, exp };
};

export const getRatingAsStars = (rating) => {
    const star = "⭐️";
    return star.repeat(rating);
};

export const compileGender = (key) => {
    switch (key) {
        case 0:
            return "Not set / not specified";
        case 1:
            return "Female";
        case 2:
            return "Male";
        case 2:
            return "Non-Binary";
        default:
            break;
    }
};

export const seasonCompleted = (season, watchedEpisodes) => {
    const seasonEpisodes = watchedEpisodes.filter((episode) => episode.season_number === season.season_number);

    const episodesLength = seasonEpisodes.length;
    return episodesLength === season.episode_count;
};

export const getVerdict = (rating) => {
    if (rating >= 9) return "Smashing!";
    else if (rating >= 7 && rating < 9) return "Good One";
    else if (rating >= 5 && rating < 7) return "It was alright";
    else if (rating >= 3 && rating < 5) return "Yuck!";
    else if (rating < 3) return "Should not have been made!";
};

export const compareDatesDescending = (a, b) => {
    const dateA = a.media_type === "movie" ? a.release_date : a.first_air_date;
    const dateB = b.media_type === "movie" ? b.release_date : b.first_air_date;

    return dateB.localeCompare(dateA);
};

export const getAverageEpisodesRating = (watchedEpisodes, seasonEpisodes) => {
    const totalRating = watchedEpisodes.map((e) => e.rating).reduce((acc, co) => acc + co, 0);
    const totalEpisodes = seasonEpisodes.episodes.length;

    const averageRating = (totalRating / totalEpisodes).toFixed(2);

    return averageRating;
};

export const getAverageEpisodesRatingForOneSeason = (watchedEpisodes, season) => {
    const totalRating = watchedEpisodes
        .filter((e) => e.season_number === season.season_number)
        .map((e) => e.rating)
        .reduce((acc, co) => acc + co, 0);
    const totalEpisodes = season.episode_count;

    const averageRating = (totalRating / totalEpisodes).toFixed(2);

    return averageRating;
};

export const getGenres = (series) => {
    const uniqueGenres = new Set();

    series.forEach((show) => {
        show.genres.forEach((genre) => {
            uniqueGenres.add(genre);
        });
    });

    return Array.from(uniqueGenres);
};
