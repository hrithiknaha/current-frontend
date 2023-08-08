import React from "react";
import NextEpisodeCard from "./NextEpisodeCard";

const NextEpisodeList = ({ nextDetails }) => {
    return nextDetails.map((data) => {
        return (
            <NextEpisodeCard
                key={data.seriesDetails.id}
                series={data.seriesDetails}
                nextEpisode={data.nextEpisode}
                watchedEpisodes={data.show.episodes}
            />
        );
    });
};

export default NextEpisodeList;
