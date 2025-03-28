import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/Slice/cartSlice";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { user,token } = useSelector((state) => state.auth);
  const [payment,setPayment] = useState({})
  useEffect(() => {
    const fetchPayment = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/payments/payment-details/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPayment(response.data[0]); // Store the first payment record
    };
    fetchPayment();
  }, []);

  const handelplaceorder= () =>{
    if(!payment.paymentId){
      alert("Please choose your subscription plan")
      navigate("/")
    }
    navigate("/orderform")
  }

  return (
    <>
    <Navbar/>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-xl text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-[2fr_1fr] gap-6">
            {/* Cart Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg border">
                <thead>
                  <tr className="bg-orange-500 text-white text-left">
                    <th className="p-3">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b text-center">
                      <td className="p-3">
                        <img
                          src={`http://localhost:5000${item.image}`}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">Rs {item.price}</td>
                      <td className="p-3 flex justify-center items-center gap-2">
                        <button
                          className="bg-red-500 text-white p-1 rounded"
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                        >
                          <FaMinus />
                        </button>
                        <span className="text-lg">{item.quantity}</span>
                        <button
                          className="bg-green-500 text-white p-1 rounded"
                          onClick={() => dispatch(increaseQuantity(item._id))}
                        >
                          <FaPlus />
                        </button>
                      </td>
                      <td className="p-3 font-semibold">
                        Rs {item.price * item.quantity}
                      </td>
                      <td className="p-3">
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                          onClick={() => dispatch(removeFromCart(item._id))}
                        >
                          <FaTrash /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price & Place Order Section (Aligned Left) */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
              <p className="text-lg font-semibold mb-2">
                Total Amount: Rs {totalAmount}
              </p>
              {
                user ? 
                <button
                className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg w-full"
                onClick={handelplaceorder}
              >
                Place Order
              </button> 
                :
                <button
                className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg w-full"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              }
              
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
