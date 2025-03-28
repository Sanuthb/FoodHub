import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-orange-500">FoodHub</h1>

      <div className="flex space-x-6">
        <Link to="/" className=" text-xl text-gray-700 hover:text-orange-500">
          Home
        </Link>
        <Link
          to="/menu"
          className="text-xl  text-gray-700 hover:text-orange-500"
        >
          Menu
        </Link>
        <Link
          to="/orders"
          className=" text-xl  text-gray-700 hover:text-orange-500"
        >
          Orders
        </Link>
        {user && (
          <Link
            to="/userdashboard"
            className=" text-xl  text-gray-700 hover:text-orange-500"
          >
            Dashboard
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <Link
          to="/cart"
          className="flex items-center text-gray-700 hover:text-orange-500 text-lg"
        >
          <FiShoppingCart className="mr-2" /> Cart
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600 transition"
          >
            <FaRegUser className="mr-2" /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
