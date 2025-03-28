import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import ResturantMenu from "../components/ResturantMenu";

const RestaurantDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // State for processing status

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !cuisine || !image) {
      setErrorMessage("All fields are required.");
      return;
    }

    setIsProcessing(true); // Set processing state to true when submitting

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("cuisine", cuisine);
    formData.append("image", image); // Ensure image is included in formData

    try {
      console.log(formData.entries());
      const response = await axios.post(
        "http://localhost:5000/api/restaurant/add-menu",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Add token if required for authentication
          },
        }
      );

      // Handle successful response
      alert("Menu item added successfully!");
      setName("");
      setPrice("");
      setCuisine("");
      setImage(null);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error adding menu item.");
    } finally {
      setIsProcessing(false); // Reset processing state after request
    }
  };

  return (
    <div className="flex gap-2">
      <Sidebar />
      <div className="flex w-full gap-4 p-4 bg-gray-200">
        {/* Form Container */}
        <div className="flex flex-col w-1/3 bg-white p-6 shadow-md rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Add Menu Item</h3>

          {/* Input for Menu Item Name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="border-b-[.1rem] border-orange-500 mb-4 p-2 outline-0"
            onChange={(e) => setName(e.target.value)}
          />

          {/* Input for Price */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            className="border-b-[.1rem] border-orange-500 mb-4 p-2 outline-0"
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Input for Cuisine */}
          <input
            type="text"
            placeholder="Cuisine"
            value={cuisine}
            className="border-b-[.1rem] border-orange-500 mb-4 p-2 outline-0"
            onChange={(e) => setCuisine(e.target.value)}
          />

          {/* Image Upload */}
          <div className="mt-2 mb-4">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="outline-0 bg-orange-500 text-white p-2 rounded-md"
              onChange={handleFileChange}
            />
            {image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded preview"
                  className="h-32 w-32 object-cover"
                />
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            disabled={isProcessing}
            className="bg-orange-500 rounded-xl p-2 text-white cursor-pointer mt-4"
            onClick={handleSubmit}
          >
            {isProcessing ? "Processing..." : "Add Menu Item"}
          </button>
        </div>

        {/* Table Container */}
        <div className="flex-1">
          <ResturantMenu />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
