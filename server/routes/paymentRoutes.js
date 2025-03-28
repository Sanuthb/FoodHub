import express from "express";
import { processPayment, getPaymentDetails } from "../controllers/paymentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/pay", authMiddleware, processPayment);
router.get("/payment-details/:id", authMiddleware, getPaymentDetails);

export default router;
