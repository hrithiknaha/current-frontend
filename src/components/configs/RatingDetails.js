import moment from "moment";

const RatingDetails = (data) => {
    return (
        <div class="bg-blue-500 px-4 py-1 rounded-lg shadow-md text-white w-36 flex gap-4 items-center justify-between">
            <div class="text-3xl font-semibold">{data.rating}</div>
            <div class="text-sm opacity-80">{moment(data.date_watched).fromNow()}</div>
        </div>
    );
};

export default RatingDetails;
