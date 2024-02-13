import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCreditCardList = ({ count }) => {
    return Array(count)
        .fill(0)
        .map((c) => (
            <div key={c} className="">
                <Skeleton width={144} height={216} borderRadius={8} />

                <div className="pt-3">
                    <Skeleton width={100} />
                    <Skeleton width={100} />
                </div>
            </div>
        ));
};

export default SkeletonCreditCardList;
