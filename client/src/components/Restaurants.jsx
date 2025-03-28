import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Restaurants = (fetchRestaurants) => {
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    ownerEmail: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const response = await axios.post("http://localhost:5000/api/admin/add-restaurant", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setMessage("Restaurant added successfully!");
        fetchRestaurants()
        setFormData({ name: "", location: "", ownerEmail: "", password: "" }); // Reset form
      }
    } catch (error) {
      setMessage("Error adding restaurant: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Add Restaurant</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Restaurant Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Owner Email:</label>
          <input
            type="email"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded cursor-pointer">
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default Restaurants;
