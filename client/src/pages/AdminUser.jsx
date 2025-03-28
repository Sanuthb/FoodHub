import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import Sidebar from "../components/Sidebar";

const AdminUser = () => {
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]); // State to store users

  // Fetch users
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data); // Store fetched users in state
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Refresh the list after successful deletion
        fetchUser();
      }
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch users on component mount
  }, [token]); // Re-run the effect if the token changes

  return (
    <div className="flex gap-2">
      <Sidebar />
      <div className="w-full p-3">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard - Users</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border text-left">Name</th>
                <th className="py-2 px-4 border text-left">Email</th>
                <th className="py-2 px-4 border text-left">Role</th>
                <th className="py-2 px-4 border text-left">Created At</th>
                <th className="py-2 px-4 border text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">{user.role}</td>
                    <td className="py-2 px-4 border">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border">
                      {
                        user.role != "admin"?
                        (<button
                            onClick={() => handleDelete(user._id)} // Call delete on button click
                            className="flex gap-1 bg-red-500 rounded-xl justify-center items-center p-1 text-white cursor-pointer"
                          >
                            <MdDelete />
                          </button>)
                          :
                          (<h1>Admin Login</h1>)
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
