import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Your public key from Stripe
const stripePromise = loadStripe(
  "pk_test_51R6Kj6KomPn9UsXDNyAfzi4slafPgtLi5UGid2AoJb4CTH9aiu10ZQnkrUrPLSaK1QrsFm8l3f3kS2Sv1WYBSCqs00aoWmg42T"
);

const PaymentForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  // Fetch the selected plan from Redux store
  const plan = useSelector((state) => state.subscription.plan);
  const {user,token} = useSelector((state) => state.auth);
  // Set the amount based on the plan
  let amount = 0;
  if (plan === "Standard") {
    amount = 2999;
  } else {
    amount = 299;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log(error.message);
      setIsProcessing(false);
      return;
    }

    const res = await fetch("http://localhost:5000/api/payments/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customerId:user._id,
        amount: amount, 
      }),
    });

    if (!res.ok) {
      console.error("Error creating payment intent");
      setIsProcessing(false);
      return;
    } else {
      setIsSuccess(true); // Set success state to true
      setTimeout(() => {
        // Redirect to home page after 2 seconds
        navigate("/");
      }, 2000);
      console.log("Payment Successful!");
    }

    const paymentIntentResponse = await res.json();

    // Confirm the payment on the frontend
    const { error: confirmError } = await stripe.confirmCardPayment(
      paymentIntentResponse.clientSecret
    );

    if (confirmError) {
      console.log(confirmError.message);
    }

    setIsProcessing(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-12">
      {isSuccess ? (
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-green-500 mb-4">
            Payment Successful!
          </h2>
          <p className="text-xl text-gray-600">Redirecting to home...</p>
        </div>
      ) : (
        <>
          <h3 className="text-4xl font-semibold text-center mb-4 text-orange-500">
            FoodHub
          </h3>
          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            Payment for the {plan} Plan
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="border p-4 rounded-md">
                <CardElement className="h-12" />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 text-white rounded-md mt-4 focus:outline-none ${
                isProcessing
                  ? "bg-gray-400"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
              disabled={isProcessing || !stripe}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
