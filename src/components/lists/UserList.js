import { Link } from "react-router-dom";

const UserList = ({ users }) => {
    return (
        <div className="flex flex-wrap justify-between lg:justify-start gap-4 mb-8">
            {users.map((user) => {
                return (
                    <Link key={user._id} className="rounded-lg shadow overflow-hidden flex-none p-4">
                        <div className="mb-4">
                            <p className="text-gray-600">@{user.username}</p>
                        </div>
                        <div className="flex justify-betweenm gap-4">
                            <div className="flex flex-col items-center">
                                <span className="text-md font-bold">{user.movies.length}</span>
                                <span className="text-sm text-gray-600">Movies</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-md font-bold">{user.series.length}</span>
                                <span className="text-sm text-gray-600">TV Series</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default UserList;
