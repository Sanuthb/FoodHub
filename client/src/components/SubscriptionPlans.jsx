import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setSubscriptionPlan } from "../redux/Slice/subscriptionSlice"; // Import action

const SubscriptionPlans = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChoosePlan = (plan) => {
    dispatch(setSubscriptionPlan(plan)); // Update plan in Redux store
    console.log(`${plan}`);
    if (!user) {
      navigate("/login");
    } else {
      navigate("/payment", { state: { plan } });
    }
  };

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Choose <span className="text-orange-500">Your Plan</span>
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Select a meal plan that suits your taste and lifestyle!
        </p>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Basic Plan */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Basic Plan
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Perfect for individuals who need a quick, budget-friendly meal
              option.
            </p>
            <div className="text-4xl font-bold text-gray-800 mb-6">
              ₹ 299 <span className="text-lg text-gray-600">/daily</span>
            </div>
            <ul className="mb-6 text-left text-gray-600">
              <li className="mb-2">• 3 meals per day</li>
              <li className="mb-2">• Standard ingredients</li>
              <li className="mb-2">
                • Simple meal options from local restaurants
              </li>
            </ul>
            <button
              onClick={() => handleChoosePlan("Basic")}
              className="bg-orange-500 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-200"
            >
              Choose Plan
            </button>
          </div>

          {/* Standard Plan */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Standard Plan
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              For those who want variety and premium ingredients.
            </p>
            <div className="text-4xl font-bold text-gray-800 mb-6">
              ₹ 2999<span className="text-lg text-gray-600">/month</span>
            </div>
            <ul className="mb-6 text-left text-gray-600">
              <li className="mb-2">• 6 meals per week</li>
              <li className="mb-2">• Premium ingredients</li>
              <li className="mb-2">
                • More variety of dishes from local restaurants
              </li>
            </ul>
            <button
              onClick={() => handleChoosePlan("Standard")}
              className="bg-orange-500 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-200"
            >
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
