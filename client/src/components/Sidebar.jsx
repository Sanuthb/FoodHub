import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col justify-between">
      {/* Sidebar Menu */}
      <div>
        {user?.role === "admin" ? (
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        ) : (
          <h2 className="text-xl font-bold mb-4">Resturant Panel</h2>
        )}
        {user?.role === "admin" ? (
          <ul>
            <li className="py-2 hover:bg-gray-700 rounded px-2">
              <Link to="/admin-dashboard">Restaurants</Link>
            </li>
            <li className="py-2 hover:bg-gray-700 rounded px-2">
              <Link to="/admin/users">Users</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li className="py-2 hover:bg-gray-700 rounded px-2">
              <Link to="/restaurant-dashboard">Add Menu</Link>
            </li>
            <li className="py-2 hover:bg-gray-700 rounded px-2">
              <Link to={`/restaurant-orders/${user.restaurantId}`}>View orders</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Logout Button */}
      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
