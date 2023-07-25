import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { compileGender } from "../configs/helpers";
import NotFound from "../components/configs/NotFound";
import TextWithMultipleParagraphs from "../components/configs/TextWithMultipleParagraphs";
import TMDBPopularMovieList from "../components/lists/TMDBPopularMovieList";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import { axiosPublicInstance } from "../configs/axios";
import TMDBPopularTVList from "../components/lists/TMDBPopularTVList";

const Person = () => {
    const { personId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [person, setPerson] = useState();

    useEffect(() => {
        axiosPublicInstance
            .get(`/api/tmdb/person/${personId}`)
            .then(({ data }) => {
                console.log(data);
                setIsLoading(false);
                setPerson(data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [personId]);

    return (
        <div className="min-h-screen bg-gray-100">
            {isLoading ? (
                <LoadingSpinner />
            ) : !person ? (
                <NotFound />
            ) : (
                <div className="container mx-auto py-16">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h1 className="text-4xl mb-1">
                            <span>{person.name} </span>
                            <a href={`https://www.imdb.com/name/${person.imdb_id}`} target="_blank">
                                🚀
                            </a>
                        </h1>

                        <div className="text-gray-700 mb-4">
                            <TextWithMultipleParagraphs text={person.biography} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h2 className="font-bold mb-1">Date of Birth</h2>
                                <p className="text-gray-700">{person.birthday}</p>
                            </div>

                            <div>
                                <h2 className="font-bold mb-1">Gender</h2>
                                <p className="text-gray-700">{compileGender(person.gender)}</p>
                            </div>

                            <div>
                                <h2 className="font-bold mb-1">Place of Birth</h2>
                                <p className="text-gray-700">{person.place_of_birth}</p>
                            </div>

                            <div>
                                <h2 className="font-bold mb-1">Department</h2>
                                <p className="text-gray-700">{person.known_for_department}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h1 className="text-2xl">Popular Movies</h1>
                            <TMDBPopularMovieList
                                movies={person.combined_credits.cast.filter(
                                    (movie) =>
                                        movie.media_type === "movie" && movie.vote_average > 8 && movie.vote_count > 500
                                )}
                            />
                        </div>
                        <div className="mt-8">
                            <h1 className="text-2xl">Popular Shows</h1>
                            <TMDBPopularTVList
                                series={person.combined_credits.cast.filter(
                                    (serie) =>
                                        serie.media_type === "tv" && serie.vote_average > 8 && serie.vote_count > 500
                                )}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Person;
