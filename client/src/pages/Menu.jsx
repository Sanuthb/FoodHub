import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/Slice/cartSlice";
import Navbar from "../components/Navbar";
import axios from "axios";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { ToastContainer } from "react-toastify";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");

  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllMenu();
  }, []);

  const getAllMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/restaurant/menu");
      setMenu(response.data);
      setFilteredMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const handleCuisineFilter = (cuisine) => {
    setSelectedCuisine(cuisine);
    setFilteredMenu(cuisine ? menu.filter((item) => item.cuisine === cuisine) : menu);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleIncrement = (item) => {
    dispatch(increaseQuantity(item._id));
  };

  const handleDecrement = (item) => {
    dispatch(decreaseQuantity(item._id));
  };

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <div className="flex w-full items-center justify-center mt-10">
        <img src="/assets/banner2.jpg" alt="banner2" className="w-[60%] object-cover rounded-xl shadow-md" />
      </div>
      <div className="flex justify-center gap-4 mt-8">
        {["All", "Indian", "Italian", "Chinese", "Mexican", "Japanese"].map((cuisine) => (
          <button
            key={cuisine}
            className={`transition-all px-4 py-2 rounded-lg border cursor-pointer shadow-md hover:scale-125 hover:bg-orange-500 hover:text-white ${
              selectedCuisine === cuisine ? "bg-orange-500 text-white" : "bg-white border-orange-500 text-orange-500"
            }`}
            onClick={() => handleCuisineFilter(cuisine === "All" ? "" : cuisine)}
          >
            {cuisine}
          </button>
        ))}
      </div>
      <div className="container mx-auto p-4 mt-10 flex items-center justify-center">
        <div className="flex flex-wrap gap-6">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <div key={item._id} className="bg-white border-[.1rem] border-orange-200 shadow-md text-white rounded-lg p-4 w-60">
                <img
                  src={item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="w-full h-45 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center justify-between">
                  <div className="text-black">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p>{item.cuisine}</p>
                    <p className="text-xl font-bold mt-2">Rs {item.price}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <button className="bg-orange-500 text-white rounded-xl p-1 text-xl cursor-pointer" onClick={() => handleAddToCart(item)}>
                      <IoCartOutline />
                    </button>
                    <div className="flex gap-2">
                      <button className="cursor-pointer bg-red-500 rounded-full p-1" onClick={() => handleDecrement(item)}>
                        <FaMinus />
                      </button>
                      <p className="text-black">{cart.find((cartItem) => cartItem._id === item._id)?.quantity || 0}</p>
                      <button className="cursor-pointer bg-green-500 rounded-full p-1" onClick={() => handleIncrement(item)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-gray-500">No items found for the selected cuisine.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
