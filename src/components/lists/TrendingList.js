import TrendingCard from "./TrendingCard";

const TrendingList = ({ trending }) => {
    return trending.map((data) => {
        return <TrendingCard trending={data} />;
    });
};

export default TrendingList;
