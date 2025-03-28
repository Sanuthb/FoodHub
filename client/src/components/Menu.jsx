import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/Slice/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [userPlan, setUserPlan] = useState(""); // Store user's plan
  const [orderCount, setOrderCount] = useState(0); // Count meals ordered
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const {user,token} = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPlan(); // Fetch user plan
    getAllMenu();
  }, []);

  // Fetch user plan from backend
  const getUserPlan = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/payments/payment-details/${user._id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }); // Replace with actual API
      setUserPlan(response.data[0].planType)
    } catch (error) {
      console.error("Error fetching user plan:", error);
    }
  };

  const getAllMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/restaurant/menu");
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  // Calculate total meals ordered
  useEffect(() => {
    const totalMeals = cart.reduce((total, item) => total + item.quantity, 0);
    setOrderCount(totalMeals);
    localStorage.setItem("cart", JSON.stringify(cart)); // Store cart in localStorage
  }, [cart]);

  // Define meal limits based on plan
  const mealLimit = userPlan === "Basic" ? 3 : userPlan === "Standard" ? 6 : Infinity;

  const handleAddToCart = (item) => {
    if (orderCount >= mealLimit) {
      
      toast.error(`Meal limit reached! (${mealLimit} meals max)`, { position: "top-right" });
      return;
    }
    dispatch(addToCart(item));
  };

  const handleIncrement = (itemId) => {
    if (orderCount >= mealLimit) {
      toast.error(`Cannot order more than ${mealLimit} meals!`, { position: "top-right" });
      return;
    }
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-5xl font-bold mb-6 text-center"><span className="text-orange-500">Our</span> Menu</h2>
      <p className="text-lg font-semibold mb-4 text-center">
        Plan: {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} | Meals Ordered: {orderCount}/{mealLimit}
      </p>

      <div className="flex flex-wrap gap-6 items-center justify-center">
        {menu.slice(0, 6).map((item) => (
          <div key={item._id} className="bg-white border-[.1rem] border-gray-300 text-white shadow-md rounded-lg p-4 w-60">
            <img
              src={item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`}
              alt={item.name}
              className="w-full h-45 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="text-black">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-black">{item.cuisine}</p>
                <p className="text-xl font-bold mt-2">Rs {item.price}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                {/* Add to Cart Button */}
                <button
                  className={`rounded-xl p-1 text-xl cursor-pointer ${orderCount >= mealLimit ? "bg-gray-400" : "bg-orange-500"}`}
                  onClick={() => handleAddToCart(item)}
                  disabled={orderCount >= mealLimit}
                >
                  <IoCartOutline />
                </button>
                {/* Quantity control */}
                <div className="flex gap-2">
                  <button className="cursor-pointer bg-red-500 rounded-full p-1" onClick={() => handleDecrement(item._id)}>
                    <FaMinus />
                  </button>
                  <p className="text-black">{cart.find((cartItem) => cartItem._id === item._id)?.quantity || 0}</p>
                  <button
                    className={`cursor-pointer bg-green-500 rounded-full p-1 ${orderCount >= mealLimit ? "bg-gray-400" : "bg-green-500"}`}
                    onClick={() => handleIncrement(item._id)}
                    disabled={orderCount >= mealLimit}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Link */}
      {menu.length > 6 && (
        <div className="mt-6 text-center">
          <Link to="/menu" className="text-orange-500 font-semibold text-lg">
            View More
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
