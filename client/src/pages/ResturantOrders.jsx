import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const ResturantOrders = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null); 

  useEffect(() => {
    if (!user?.restaurantId) return;

    fetchOrders();
  }, [user?.restaurantId, token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `http://localhost:5000/api/orders/orderrestaurant/${user.restaurantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("❌ Error fetching restaurant orders:", error);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (!orderId) {
      console.error("❌ Order ID is undefined");
      return;
    }

    try {
      setUpdatingOrderId(orderId);

      await axios.put(
        `http://localhost:5000/api/orders/update-status/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      fetchOrders();
    } catch (error) {
      console.error("❌ Error updating order status:", error);
      setError("Failed to update order status. Please try again.");
    } finally {
      setUpdatingOrderId(null); // Re-enable dropdown
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <h2 className="text-3xl font-bold mb-4">Restaurant Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Items</th>
                <th className="border px-4 py-2">Total Amount</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="text-center">
                  <td className="border px-4 py-2">{order.orderId}</td>
                  <td className="border px-4 py-2">{order.customerName}</td>
                  <td className="border px-4 py-2">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.itemName} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">Rs {order.totalPrice}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="border px-2 py-1 rounded"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      disabled={updatingOrderId === order._id} 
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    {updatingOrderId === order._id && (
                      <p className="text-sm text-gray-500">Updating...</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ResturantOrders;
