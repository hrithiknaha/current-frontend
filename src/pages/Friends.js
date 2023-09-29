import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FriendsList from "../components/profile/FriendsList";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import { axiosPrivateInstance } from "../configs/axios";

const Friends = () => {
    const { username } = useParams();
    const auth = useSelector((state) => state.auth.user);

    const [isLoading, setIsLoading] = useState(true);
    const [friends, setFriends] = useState();

    const [selected, setSelected] = useState("followers");

    const selectFollower = (e) => {
        setSelected("followers");
    };

    const selectFollowing = (e) => {
        setSelected("following");
    };

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/users/${username}/friends`)
            .then(({ data }) => {
                setFriends(data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, [username]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-16">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="flex gap-4">
                        <div className="flex flex-col justify-between w-80 h-full shadow rounded">
                            <h1 className="text-xl p-4 bg-orange-500 text-white rounded-t">Friends</h1>
                            <div>
                                <div
                                    onClick={selectFollower}
                                    className={`flex items-center justify-between ${
                                        selected === "movies"
                                            ? "bg-gray-200 "
                                            : "hover:bg-gray-200 hover:cursor-pointer"
                                    } pt-4 p-3`}>
                                    <p>Followers</p>
                                    <p className="bg-orange-500 px-2 rounded text-white">{friends.followers.length}</p>
                                </div>
                                <div
                                    onClick={selectFollowing}
                                    className={`flex items-center justify-between ${
                                        selected === "series" ? "bg-gray-200" : "hover:bg-gray-200 hover:cursor-pointer"
                                    } pt-4 p-3`}>
                                    <p>Followings</p>
                                    <p className="bg-orange-500 px-2 rounded text-white">{friends.following.length}</p>
                                </div>
                            </div>
                        </div>
                        {selected === "followers" ? (
                            <FriendsList friends={friends.followers} />
                        ) : (
                            <FriendsList friends={friends.following} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friends;
