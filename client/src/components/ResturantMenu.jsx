import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

const RestaurantMenu = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [menu, setMenu] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/restaurant/get-menu/${user?.restaurantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMenu(response.data); 
        setLoading(false); 
      } catch (error) {
        setError("Error fetching menu."); 
        setLoading(false); 
      }
    };

    if (user?.restaurantId && token) {
      fetchMenu();
    }
  }, [user, token]); 

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>{error}</div>;

  const handleDelete = async (menuId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/restaurant/deletemenu/${menuId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message); 

      setMenu((prevMenu) => prevMenu.filter((item) => item._id !== menuId));
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Error deleting menu item.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Restaurant Menu</h2>

      {/* Table layout for menu items */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Cuisine</th>
            <th className="py-2 px-4 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {menu.length > 0 ? (
            menu.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-2 px-4 text-center">
                  <img
                    src={`http://localhost:5000${item.image}`} // Assuming image path is relative
                    alt={item.name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">Rs {item.price}</td>
                <td className="py-2 px-4">{item.cuisine}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-red-500 p-2 rounded-full text-white cursor-pointer"
                    onClick={() => handleDelete(item._id)} 
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center">
                No menu items available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantMenu;
