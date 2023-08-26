const RatingDetails = ({ status, data, completion }) => {
    let statusClassName;

    if (status === "Canceled") {
        statusClassName = "bg-red-500";
    } else if (status === "Ended") {
        statusClassName = "bg-purple-500";
    } else {
        statusClassName = "bg-orange-500";
    }

    return (
        <div
            className={`${statusClassName} px-4 py-1 rounded-lg shadow-md text-white flex gap-4 items-center justify-between`}>
            <div className="text-3xl font-semibold">{data.rating}</div>
            <div className="text-sm opacity-80">{data.runtime} min</div>
            <div className="text-sm font-semibold">{completion}%</div>
        </div>
    );
};

export default RatingDetails;
