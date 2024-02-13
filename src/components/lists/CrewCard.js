import { Link } from "react-router-dom";
const defaultImg = "https://t4.ftcdn.net/jpg/02/17/34/67/240_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg";

const CrewCard = ({ crew }) => {
    return (
        <Link
            to={`/person/${crew.id}`}
            key={crew.id}
            className="bg-gray-100 overflow-hidden flex-none rounded-lg shadow w-24 lg:w-36">
            <img
                src={`https://image.tmdb.org/t/p/w300/${crew.profile_path}`}
                alt={crew.name}
                className="rounded-t w-full object-cover"
                onError={(e) => (e.target.src = defaultImg)}
            />
            <div className="p-3">
                <h3 className="text-sm font-semibold">{crew.name}</h3>
                <p className="text-xs text-gray-600">{crew.jobs.join(", ")}</p>
            </div>
        </Link>
    );
};

export default CrewCard;
