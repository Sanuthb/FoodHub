import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../redux/Slice/cartSlice"; // Clear cart after order
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const OrderForm = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error("Please enter your address!");
      return;
    }

    const orderData = {
      customerId: "USER_ID", // Replace with actual user ID (from auth)
      restaurantId: cartItems[0]?.restaurantId, // Assuming all items are from the same restaurant
      items: cartItems.map((item) => ({
        menuItemId: item._id,
        quantity: item.quantity,
      })),
      totalPrice: totalAmount,
      address,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/place-order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order placed successfully!");
      dispatch(clearCart()); // Empty the cart after placing order
      navigate("/orders"); // Redirect to orders page
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("Failed to place order!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-4">Confirm Your Order</h2>

        <form
          onSubmit={handleOrder}
          className="bg-white shadow-md p-6 rounded-lg max-w-md"
        >
          <div className="mb-4">
            <label className="block text-lg font-medium">
              Delivery Address
            </label>
            <textarea
              className="w-full p-3 border rounded-md mt-2"
              rows="3"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">
              Total Price: Rs {totalAmount}
            </h3>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-md w-full"
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
};

export default OrderForm;
