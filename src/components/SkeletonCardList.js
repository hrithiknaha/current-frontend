import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCardList = ({ count }) => {
    return Array(count)
        .fill(0)
        .map((c) => {
            return <Skeleton key={c} width={160} height={256} borderRadius={8}></Skeleton>;
        });
};

export default SkeletonCardList;
