import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token for authentication
        const response = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <>
    <Navbar/>
      <div className="container mx-auto p-6 h-screen">
        <h2 className="text-3xl font-semibold mb-4">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-lg text-gray-500">No orders found.</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Restaurant</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total Price</th>
                <th className="p-3 text-left">Delivery Address</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-3">{order.restaurantId.name}</td>
                  <td className="p-3">
                    {order.items.map((item) => (
                      <div key={item.menuItemId._id}>
                        {item.menuItemId.name} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 font-bold">Rs {order.totalPrice}</td>
                  <td className="p-3">{order.address}</td>
                  <td className="p-3">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Orders;
