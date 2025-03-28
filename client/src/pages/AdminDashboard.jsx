import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import Restaurants from "../components/Restaurants";

const AdminDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/restaurants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        fetchRestaurants(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard - Restaurants</h1>

        {/* Restaurant Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border text-left">Name</th>
                <th className="py-2 px-4 border text-left">Location</th>
                <th className="py-2 px-4 border text-left">Owner Email</th>
                <th className="py-2 px-4 border text-left">Created At</th>
                <th className="py-2 px-4 border text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <tr key={restaurant._id} className="border-b">
                    <td className="py-2 px-4 border">{restaurant.name}</td>
                    <td className="py-2 px-4 border">{restaurant.location}</td>
                    <td className="py-2 px-4 border">{restaurant.ownerEmail}</td>
                    <td className="py-2 px-4 border">{new Date(restaurant.createdAt).toLocaleString()}</td>
                    <td className="py-2 px-4 border">
                      <button 
                        onClick={() => handledelete(restaurant._id)} 
                        className="flex gap-1 bg-red-500 rounded-xl justify-center items-center p-1 text-white cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No restaurants found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Restaurants fetchRestaurants={fetchRestaurants}/>
    </div>
  );
};

export default AdminDashboard;
