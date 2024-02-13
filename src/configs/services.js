export const TVShowStatsReducer = (e, action, auth, axiosInstance, setShowDetails, setModalText, setIsModalLoading) => {
    switch (action) {
        case "GENRES":
            const genre = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/genre/${genre}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows watched of ${e.name} genre`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "STATUS":
            const status = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/status/${status}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows watched of ${e.name} status`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "LANGUAGE":
            const language = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/language/${language}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows watched of ${e.name} language`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "ORIGIN_COUNTRY":
            const country = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/origin/country/${country}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows watched from ${e.name} country`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "PRODUCTION_COUNTRY":
            const prodCountry = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/production/country/${prodCountry}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows produced from ${e.name} country`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "LAST_TWENTY_WEEKS":
            const week = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/week/${week}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows watched in week ${e.name}`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "HOUR_OF_DAY":
            const hour = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/hour/${hour}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows at ${e.name}th hour`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "WEEKDAY":
            const day = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/day/${day}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows watched on ${e.name}`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "MONTH":
            const month = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/month/${month}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows watched in ${e.name}`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "YEAR":
            const year = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/year/${year}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows watched in ${e.name}`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "PRODUCTION":
            const production = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/production/company/${production}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows produced by ${e.name}`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "NETWORK":
            const network = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/shows/network/${network}`)
                .then(({ data }) => {
                    setShowDetails(data);
                    setModalText(`Shows network by ${e.name}`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        default:
            break;
    }
};

export const MovieStatsReducer = (e, action, auth, axiosInstance, setMovieDetails, setModalText, setIsModalLoading) => {
    switch (action) {
        case "LAST_TWENTY_WEEKS":
            const week = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/week/${week}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`Movies watched in ${e.name}th week`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "HOUR_OF_THE_DAY":
            const hour = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/hour/${hour}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`Movies watched at ${e.name}th hour`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "DAY_OF_WEEK":
            const day = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/day/${day}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`Movies watched on ${e.day}`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "MONTH":
            const month = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/month/${month}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`Movies watched in ${e.month}`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "YEAR":
            const year = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/year/${year}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`Movies watched from ${e.name}`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "GENRES":
            const genre = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/genre/${genre}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`Movies watched of ${e.name} genre`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "LANGUAGES":
            const languages = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/language/${languages}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`Movies having scene in ${e.name} language`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "PRODUCTION_COUNTRY":
            const country = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/production/country/${country}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`Movies produced in ${e.name}`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "ACTORS":
            const actor = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/actor/${actor}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`${e.name} Movies`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "DIRECTORS":
            const director = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/director/${director}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`${e.name} Movies`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        case "PRODUCTION":
            const production = e.name;

            axiosInstance
                .get(`/api/stats/${auth.username}/movies/production/company/${production}`)
                .then(({ data }) => {
                    setMovieDetails(data);
                    setModalText(`${e.name} Movies`);
                    setIsModalLoading(false);
                })
                .catch((err) => console.log(err));
            break;

        default:
            break;
    }
};
