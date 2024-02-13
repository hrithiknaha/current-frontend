import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import SkeletonCreditCardList from "./SkeletonCreditCardList";

const SkeletonMovie = () => {
    return (
        <div className="container mx-auto py-8 lg:py-12">
            <div className="bg-white shadow-md rounded-lg p-8">
                <div className="flex flex-col pb-2 gap-4 my-4 lg:flex-row lg:my-0 justify-between items-center">
                    <Skeleton width={250} height={30} />

                    <div className="flex gap-4">
                        <Skeleton width={224} height={30} />
                        <Skeleton width={96} height={30} />
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 justify-center lg:justify-normal text-gray-600 text-sm">
                    <Skeleton width={250} />
                </div>

                <div className="py-4">
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
            </div>
        </div>
    );
};

export default SkeletonMovie;
