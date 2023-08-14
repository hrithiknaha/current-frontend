import React from "react";
import { Link } from "react-router-dom";

const FriendsList = ({ friends }) => {
    return (
        <table className="w-full whitespace-nowrap shadow-md rounded-lg">
            <thead>
                <tr className="bg-gray-200">
                    <th className="text-lg p-4 text-left text-gray-700">People who follow you</th>
                </tr>
            </thead>
            <tbody>
                {friends &&
                    friends.map((user, index) => (
                        <tr key={user.id} className={`bg-gray-${index % 2 === 0 ? 200 : 100}`}>
                            <td className="px-6 py-2 whitespace-nowrap">
                                <Link
                                    to={`/profile/${user.username}`}
                                    className="text-blue-800 hover:underline hover:text-blue-400">
                                    {user.username}
                                </Link>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default FriendsList;
