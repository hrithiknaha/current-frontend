import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import SkeletonCreditCardList from "./SkeletonCreditCardList";

const SkeletonEpisode = () => {
    return (
        <div className="min-h-screen bg-gray-100 px-4 lg:px-0">
            <div className="container mx-auto py-8 lg:py-12">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <div className="flex items-center text-sm font-medium space-x-2 ">
                        <Skeleton width={120} />
                    </div>
                    <div className="container mx-auto py-4">
                        <div className="pb-4 flex justify-between">
                            <Skeleton width={110} />
                            <Skeleton width={110} />
                        </div>

                        <div className="text-center lg:text-left">
                            <h1 className="text-gray-600 text-sm">
                                <Skeleton width={40} />
                            </h1>
                        </div>
                        <div className="flex flex-col gap-4 my-2 lg:flex-row lg:my-0 justify-between items-center">
                            <Skeleton width={224} height={30} />
                            <Skeleton width={96} height={30} />
                        </div>

                        <div className="flex flex-wrap gap-1 justify-center lg:justify-normal text-gray-600 text-sm">
                            <Skeleton width={250} />
                        </div>

                        <div className="mt-4">
                            <Skeleton width={100} />
                            <Skeleton count={3} />
                        </div>

                        <div className="py-4">
                            <Skeleton width={100} />
                            <div className="flex overflow-x-auto gap-4">
                                <SkeletonCreditCardList count={10} />
                            </div>
                        </div>

                        <div className="py-4">
                            <Skeleton width={100} />
                            <div className="flex overflow-x-auto gap-4">
                                <SkeletonCreditCardList count={10} />
                            </div>
                        </div>

                        <div className="py-4">
                            <Skeleton width={100} />
                            <div className="flex overflow-x-auto gap-4">
                                <SkeletonCreditCardList count={10} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonEpisode;
