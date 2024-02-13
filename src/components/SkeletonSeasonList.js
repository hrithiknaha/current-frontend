import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonSeasonList = ({ count }) => {
    return Array(count)
        .fill(0)
        .map((c) => {
            return (
                <div className="bg-white rounded-lg shadow-md p-4 mt-3">
                    <Skeleton width={75} />
                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <Skeleton width={60} />
                            <Skeleton width={50} />
                        </div>
                        <div className="text-center">
                            <Skeleton width={60} />
                            <Skeleton width={50} />
                        </div>
                        <div className="text-center">
                            <Skeleton width={60} />
                            <Skeleton width={50} />
                        </div>
                    </div>
                </div>
            );
        });
};

export default SkeletonSeasonList;
