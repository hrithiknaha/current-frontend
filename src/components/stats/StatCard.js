const StatCard = ({ title, value }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
            <h2 className="text-sm lg:text-xl font-semibold lg:mb-4">{title}</h2>
            <p className="text-xs lg:text-3xl font-bold text-orange-500">{value} </p>
        </div>
    );
};

export default StatCard;
