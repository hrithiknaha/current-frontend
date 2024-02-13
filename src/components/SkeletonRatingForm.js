import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonRatingForm = () => {
    return (
        <div className="flex gap-4">
            <Skeleton width={224} height={30} />
            <Skeleton width={96} height={30} />
        </div>
    );
};

export default SkeletonRatingForm;
