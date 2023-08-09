const RatingDetails = ({ data, completion }) => {
    return (
        <div class="bg-orange-500 px-4 py-1 rounded-lg shadow-md text-white flex gap-4 items-center justify-between">
            <div class="text-3xl font-semibold">{data.rating}</div>
            <div class="text-sm opacity-80">{data.runtime} min</div>
            <div class="text-sm font-semibold">{completion}%</div>
        </div>
    );
};

export default RatingDetails;
