import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCardList from "./SkeletonCardList";

const SkeletonProfile = () => {
    return (
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            <div className="container mx-auto py-8 lg:py-12">
                <div className="flex justify-between items-center">
                    <Skeleton width={220} height={40} />
                </div>

                <div className="flex flex-col lg:flex-row gap-4 py-4">
                    <div className="flex justify-between items-center gap-4">
                        <Skeleton width={100} />
                        <Skeleton width={100} />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 py-8">
                    <div className="flex flex-col justify-between w-full lg:w-60 h-full shadow rounded">
                        <Skeleton height={50} />
                        <div>
                            <div className={`flex items-center justify-between  pt-4 p-3`}>
                                <Skeleton width={80} height={20} />
                                <Skeleton width={30} height={20} />
                            </div>
                            <div className={`flex items-center justify-between  pt-4 p-3`}>
                                <Skeleton width={80} height={20} />
                                <Skeleton width={30} height={20} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-4 lg:mt-0">
                        <div className="flex flex-wrap justify-between lg:justify-start gap-4 mb-8">
                            <SkeletonCardList count={10} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonProfile;
