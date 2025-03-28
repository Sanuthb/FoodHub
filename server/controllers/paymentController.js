import Stripe from "stripe";
import Payment from "../models/Payment.js";

const stripe = new Stripe("sk_test_51R6Kj6KomPn9UsXDMmiSXHOelCxYJ4HWA0qvFdWcktQoCJ8Oxvd5LTGUPvG8qUEuD83JlBONtjrwu1oYdActS9zy009MHbUwgw");
export const processPayment = async (req, res) => {
    try {
        const { customerId, amount } = req.body;

        if (!customerId || !amount) {
            return res.status(400).json({ error: "Customer ID and amount are required" });
        }

        console.log("Received Payment Request:", { customerId, amount });

        if (amount !== 299 && amount !== 2999) {
            return res.status(400).json({ error: "Invalid amount. Only ₹299 (Basic) or ₹2999 (Standard) allowed." });
        }

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe requires amount in paise
            currency: "inr",
        });

        console.log("✅ Payment Intent Created:", paymentIntent.id);

        // Determine Plan Type and Expiry Date
        let planType = "";
        let expiryDate = new Date();
        
        if (amount === 299) {
            planType = "Basic";
            expiryDate.setHours(expiryDate.getHours() + 24); // Expires in 24 hours
        } else if (amount === 2999) {
            planType = "Standard";
            expiryDate.setMonth(expiryDate.getMonth() + 1); // Expires in 1 month
        }

        // Save Payment to Database
        const newPayment = new Payment({
            customerId,
            amount,
            currency: "INR",
            paymentId: paymentIntent.id,
            planType,
            expiryDate,
        });

        await newPayment.save();


        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentId: paymentIntent.id,
            planType,
            expiryDate,
        });

    } catch (error) {
        console.error("❌ Error Processing Payment:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getPaymentDetails = async (req, res) => {
    const customerId=req.params.id;
    try {
        const payment = await Payment.find({customerId});
        if (!payment) return res.status(404).json({ message: "Payment not found" });

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
