import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import axios from "axios";

const UserDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [payment, setPayment] = useState({});
  const [timeLeft, setTimeLeft] = useState(""); // For countdown timer

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

  useEffect(() => {
    if (payment.expiryDate) {
      const expiry = new Date(payment.expiryDate).getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const timeDiff = expiry - now;

        if (timeDiff <= 0) {
          setTimeLeft("Subscription Expired");
          return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }
  }, [payment.expiryDate]);

  return (
    <div>
      <Navbar />
      <div className="flex gap-10 px-10 py-5 bg-gray-200 w-full h-screen">
        <div className="bg-white shadow-md rounded-xl h-60 w-60 flex flex-col items-center justify-center p-2">
          <img src="/assets/user.jpg" alt="user" className="w-1/2 rounded-full" />
          <h1 className="font-bold text-2xl">HI! {user.name}</h1>
          <p>Email: {user.email}</p>
        </div>
        <div className="bg-white gap-5 shadow-md rounded-xl h-60 w-[70%] flex flex-col items-center justify-center p-2">
          <h1 className="text-3xl text-orange-500 font-bold">Your Subscription Details</h1>
          <p className="text-xl font-bold">Your Plan: {payment.planType}</p>
          <p className="text-xl">Expires in: <span className="text-2xl text-red-500 font-bold">{timeLeft}</span></p> 
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
