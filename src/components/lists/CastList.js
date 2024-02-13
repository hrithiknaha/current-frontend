import CastCard from "./CastCard";

const CastList = ({ casts }) => {
    return casts.length > 0 ? casts.map((actor) => <CastCard actor={actor} />) : <p>No Casts</p>;
};

export default CastList;
