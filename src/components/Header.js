import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../redux/actions/auth";

const Header = ({ user, logoutUser }) => {
    const handleLogout = () => {
        console.log("Logging out user.");
        logoutUser();
    };

    return (
        <nav class="bg-blue-500 p-4">
            <div class="container mx-auto flex justify-between items-center">
                <Link to="/" class="text-white text-lg font-semibold">
                    Current
                </Link>

                {user.username && (
                    <div className="flex justify-between items-center w-48">
                        <Link to={`/profile/${user.username}`} className="text-white text-lg hover:underline">
                            {user.username}
                        </Link>
                        <button
                            onClick={handleLogout}
                            class="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => ({ user: state.auth });

export default connect(mapStateToProps, { logoutUser })(Header);
