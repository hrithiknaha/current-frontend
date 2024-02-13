import React, { useEffect, useState } from "react";

import CrewCard from "./CrewCard";

const CrewList = ({ crews }) => {
    const [crewArrayWithJobs, setCrewArrayWithJobs] = useState([]);

    useEffect(() => {
        const crewsWithJobs = {};

        crews.forEach((crew) => {
            if (!crewsWithJobs[crew.name]) {
                crewsWithJobs[crew.name] = {
                    id: crew.id,
                    name: crew.name,
                    jobs: [crew.job],
                    profile_path: crew.profile_path,
                };
            } else {
                crewsWithJobs[crew.name].jobs.push(crew.job);
            }
        });

        setCrewArrayWithJobs(Object.values(crewsWithJobs));
    }, []);

    return crewArrayWithJobs.length > 0 ? (
        crewArrayWithJobs.map((crew) => <CrewCard crew={crew} />)
    ) : (
        <p>No crew information available</p>
    );
};

export default CrewList;
