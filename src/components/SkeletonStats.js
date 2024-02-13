import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonStats = () => {
    return (
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            <div className="container mx-auto py-8 lg:py-12">
                <div className="flex justify-between items-center">
                    <Skeleton width={110} height={40} />
                    <Skeleton width={150} height={40} />
                </div>
                <div className="flex flex-wrap gap-2 lg:gap-4 mt-2 justify-start pt-2 lg:justify-start">
                    <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                        <Skeleton width={50} />
                        <p className="text-xs lg:text-3xl font-bold text-orange-500">
                            <Skeleton width={100} height={20} />
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                        <Skeleton width={50} />
                        <p className="text-xs lg:text-3xl font-bold text-orange-500">
                            <Skeleton width={100} height={20} />
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 lg:w-60">
                        <Skeleton width={50} />
                        <p className="text-xs lg:text-3xl font-bold text-orange-500">
                            <Skeleton width={100} height={20} />
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 lg:gap-4 mt-2 justify-start pt-2 lg:justify-start">
                    <div className="bg-white shadow-md rounded-lg p-2 lg:p-6 lg:w-60">
                        <Skeleton width={50} />
                        <p className="text-xs lg:text-3xl font-bold text-orange-500">
                            <Skeleton width={100} height={20} />
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-2 lg:p-6 lg:w-60">
                        <Skeleton width={50} />
                        <p className="text-xs lg:text-3xl font-bold text-orange-500">
                            <Skeleton width={100} height={20} />
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-2 lg:p-6 lg:w-60">
                        <Skeleton width={50} />
                        <p className="text-xs lg:text-3xl font-bold text-orange-500">
                            <Skeleton width={100} height={20} />
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-2 lg:p-6 lg:w-60">
                        <Skeleton width={50} />
                        <p className="text-xs lg:text-3xl font-bold text-orange-500">
                            <Skeleton width={100} height={20} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonStats;
