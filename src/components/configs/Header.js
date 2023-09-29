import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Home, User } from "react-feather";
import { logoutUser } from "../../redux/features/auth/authSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate("/login");
        });
    };

    // Close the dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        // Attach the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gradient-to-r from-red-500 to-orange-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold flex gap-2">
                    <Home />
                    Current
                </Link>

                {user.username ? (
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={toggleDropdown} className="text-white text-lg">
                            <User className="inline" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-10 right-0 bg-white border border-gray-200 shadow-md mt-2 rounded w-40">
                                <Link
                                    to={`/profile/${user.username}`}
                                    onClick={toggleDropdown}
                                    className="text-sm w-full block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Profile
                                </Link>
                                <Link
                                    to={`/profile/${user.username}/stats`}
                                    onClick={toggleDropdown}
                                    className="text-sm w-full block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Stats
                                </Link>
                                <Link
                                    to={`/profile/${user.username}/movie-list`}
                                    onClick={toggleDropdown}
                                    className="text-sm w-full block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Movie List
                                </Link>
                                <Link
                                    to={`/profile/${user.username}/tv-list`}
                                    onClick={toggleDropdown}
                                    className="text-sm w-full block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Show List
                                </Link>
                                <Link
                                    to={`/profile/${user.username}/tv-episodes-list`}
                                    onClick={toggleDropdown}
                                    className="text-sm w-full block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Episode List
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm w-full text-left block px-4 py-2 text-red-600 hover:bg-gray-200">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="login"
                        className="bg-orange-500 text-white hover:bg-orange-600 font-semibold py-2 px-4 rounded outline">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
