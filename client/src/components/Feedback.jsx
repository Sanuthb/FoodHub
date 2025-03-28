import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

const Feedback = () => {
  const [reviews, setreviews] = useState([]);
  useEffect(() => {
    const getreviews = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/reviews/restaurant-reviews"
      );
      setreviews(response.data);
    };
    getreviews();
  }, []);
  return (
    <div className="text-white bg-[#0e1317] w-full h-screen flex items-center justify-center flex-col gap-10 relative">
        <img src="/assets/tomato.webp" alt="tomato"  className="absolute left-0 top-10"/>
        <img src="/assets/hamburger.png" alt="hamburger" className="absolute right-0 bottom-5" />
      <div className="text-center">
        <h4 className="uppercase text-orange-500 font-semibold">
          customer feedback
        </h4>
        <h1 className="text-2xl font-bold">
          What have lot’s off happy customer explore feedback
        </h1>
      </div>
      <div className="flex items-center justify-between px-10 gap-10">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-md  p-5">
            <h1 className="text-black text-justify">{review.comment}</h1>
            <p className="text-orange-500 flex gap-2 font-bold items-center"><FaStar/>{review.rating}/5</p>
            <h1 className="text-black text-right">-{" "}{review.customername}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
