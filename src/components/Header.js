import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../redux/actions/user";

const Header = ({ user, logoutUser }) => {
    const handleLogout = () => {
        console.log("Logging out user.");
        logoutUser();
    };

    return (
        <div>
            <div>
                {user.username ? (
                    <div>
                        <p>{user.username}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/auth">Login</Link>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({ user: state.users });

export default connect(mapStateToProps, { logoutUser })(Header);
