import MovieList from "../lists/MovieList";
import SeriesListNoBar from "../lists/SeriesListNoBar";
import { X } from "react-feather";
import SmallLoadingSpinner from "./SmallLoadingSpinner";

const Modal = ({ text, isOpen, onClose, shows, movies, isLoading }) => {
    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}
                onClick={onClose}
                style={{ zIndex: 50 }}></div>
            <div
                className={`fixed inset-0 flex items-center justify-center ${isOpen ? "" : "hidden"}`}
                style={{ zIndex: 100 }}>
                <div style={{ maxHeight: "90%" }} className="bg-white overflow-y-auto rounded-lg p-8 m-8">
                    <div className="flex justify-between gap-8 items-center mb-4">
                        <h2 className="text-xl font-semibold">{text}</h2>
                        <X onClick={onClose} cursor={"pointer"} />
                    </div>
                    {isLoading ? (
                        <SmallLoadingSpinner />
                    ) : movies ? (
                        <MovieList movies={movies} />
                    ) : (
                        <SeriesListNoBar series={shows} />
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;
