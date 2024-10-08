import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import logo from "./assets/logo.png";
import { is_admin } from "./utils";
import { FaCog } from "react-icons/fa"; // Import the cogwheel icon

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <nav className="bg-custom-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-4">
          <img src={logo} alt="Kokopelli Logo" className="h-20 mb-4" />

          <h1 className="text-2xl font-bold mb-2">Tye's Byway Blog</h1>

          <p className="italic text-center mb-4">
            "I believe the beauty of nature can be found within as without and
            is limited, not by the size or amplitude of it, but by one's
            imagination."
          </p>

          <div className="flex space-x-4 mt-4 items-center">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            {user ? (
              <>
                {/* Show the Admin link only if the user is an admin */}
                {is_admin(user.uid) && (
                  <Link
                    to="/admin"
                    className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>

                {/* User Settings - Cogwheel Icon */}
                <Link
                  to="/settings"
                  className="flex items-center text-gray-300 px-3 py-2 rounded-md text-sm font-medium group"
                >
                  <FaCog
                    className="transition-transform duration-300 group-hover:animate-spin"
                    size={20}
                  />
                  <span className="ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 opacity-0 transform -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100">
                    Settings
                  </span>
                </Link>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
