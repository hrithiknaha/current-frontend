import moment from "moment";

const RatingDetails = ({ data }) => {
    return (
        <div className="bg-orange-500 px-4 py-1 rounded-lg shadow-md text-white flex gap-4 items-center justify-between">
            <div className="text-3xl font-semibold">{data.rating}</div>
            <div className="text-sm opacity-80">{moment(data.date_watched).fromNow()}</div>
        </div>
    );
};

export default RatingDetails;
