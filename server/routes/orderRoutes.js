import express from "express";
import { placeOrder, getCustomerOrders, getRestaurantOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/place-order", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, getCustomerOrders); 
router.get("/orderrestaurant/:id", getRestaurantOrders); 

router.put("/update-status/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json(updatedOrder);
    } catch (error) {
      console.error("❌ Error updating order status:", error);
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

export default router;
