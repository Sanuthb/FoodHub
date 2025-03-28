import Order from "../models/Order.js";
import User from "../models/User.js";
import Menu from "../models/Menu.js";

export const placeOrder = async (req, res) => {
    const { restaurantId, items, totalPrice, address } = req.body;

    try {
        if (!address) {
            return res.status(400).json({ message: "Delivery address is required." });
        }

        const formattedItems = items.map(item => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity
        }));

        const order = await Order.create({
            customerId: req.user.id,
            restaurantId,
            items: formattedItems,
            totalPrice,
            address
        });

        res.status(201).json({ message: "Order placed successfully!", order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order", error: error.message });
    }
};

// ✅ Fetch orders of a specific logged-in customer
export const getCustomerOrders = async (req, res) => {
    try {
        const customerId = req.user.id; // ✅ Get customer ID from token (middleware)

        console.log(`🔍 Fetching orders for customer: ${customerId}`);

        const orders = await Order.find({ customerId })
            .populate("restaurantId", "name") // ✅ Fetch restaurant details
            .populate({
                path: "items.menuItemId",
                select: "name price image"
            })
            .sort({ createdAt: -1 });

        console.log(`✅ Orders found: ${orders.length}`);

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this customer." });
        }

        res.json(orders);
    } catch (error) {
        console.error("❌ Error fetching customer orders:", error);
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
};


export const getRestaurantOrders = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        // Fetch orders and populate customer name and menu item details
        const orders = await Order.find({ restaurantId })
            .populate("customerId", "name") // Get only the name field from User
            .populate("items.menuItemId", "name price"); // Get name & price from MenuItem

        // Format the response
        const formattedOrders = orders.map((order) => ({
            orderId: order._id, // Include Order ID
            customerName: order.customerId.name, // Customer Name
            items: order.items.map((item) => ({
                itemName: item.menuItemId.name, // Item Name
                quantity: item.quantity, // Quantity
            })),
            address: order.address, // Delivery Address
            totalPrice: order.totalPrice, // Order Total Price
            status: order.status, // Order Status
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error("❌ Error fetching restaurant orders:", error);
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
};
