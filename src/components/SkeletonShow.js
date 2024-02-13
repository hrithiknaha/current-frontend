import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import SkeletonCreditCardList from "./SkeletonCreditCardList";
import SkeletonSeasonList from "./SkeletonSeasonList";

const SkeletonShow = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 lg:px-0">
            <div className="container mx-auto py-8 lg:py-12">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="flex flex-col pb-2 gap-4 my-4 lg:flex-row lg:my-0 justify-between items-center">
                        <Skeleton width={250} height={40} />

                        <Skeleton width={250} height={40} />
                    </div>

                    <div className="my-4">
                        <Skeleton width={200} />
                        <Skeleton width={150} />
                    </div>

                    <div className="py-4">
                        <Skeleton width={100} />
                        <Skeleton />
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
                        <Skeleton width={75} height={20} />
                        <div className="flex items-center justify-between">
                            <div className="text-center">
                                <Skeleton width={50} />
                                <Skeleton width={30} />
                            </div>
                            <div className="text-center">
                                <Skeleton width={50} />
                                <Skeleton width={30} />
                            </div>
                            <div className="text-center">
                                <Skeleton width={50} />
                                <Skeleton width={30} />
                            </div>
                        </div>
                    </div>

                    <div className="my-8">
                        <Skeleton width={75} />
                        <SkeletonSeasonList count={1} />
                    </div>

                    <div className="my-8 ">
                        <Skeleton width={75} />
                        <SkeletonSeasonList count={1} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
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
    );
};

export default SkeletonShow;
