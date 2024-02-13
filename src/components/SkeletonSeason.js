import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import SkeletonEpisodeList from "./SkeletonEpisodeList";
import SkeletonSeasonList from "./SkeletonSeasonList";

const SkeletonSeason = () => {
    return (
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            <div className="container mx-auto py-8 lg:py-12">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center text-sm font-medium space-x-2 ">
                        <Skeleton width={120} />
                    </div>
                    <div className="pt-4 flex justify-between">
                        <Skeleton width={110} />
                        <Skeleton width={110} />
                    </div>

                    <div className="flex flex-col gap-4 my-2 lg:flex-row lg:my-0 justify-between items-center">
                        <Skeleton width={200} height={40} />
                        <Skeleton width={200} height={40} />
                    </div>

                    <div className="mt-4">
                        <Skeleton width={75} />
                        <Skeleton count={4} />
                    </div>
                </div>

                <div className="my-8 ">
                    <Skeleton width={75} />
                    <SkeletonEpisodeList count={1} />
                </div>

                <div className="my-8 ">
                    <Skeleton width={75} />
                    <SkeletonSeasonList count={1} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonSeason;
