import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Topsearch from "../components/Topsearch";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import SubscriptionPlans from "../components/SubscriptionPlans";
import Feedback from "../components/Feedback";
const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="h-screen w-full relative flex items-center justify-center px-20 gap-10 overflow-hidden">
        <div className="absolute left-6 top-[15%] w-1 h-1/2 bg-orange-950 "></div>
        <div className="absolute -right-6 top-[60%] w-1/4 h-6 bg-orange-500 "></div>
        <div className="absolute -right-6 top-[10%]">
          <img
            src="/assets/heroimag2.jpg"
            alt="heroimage"
            className="object-cover w-80 h-80 rounded-full"
          />
        </div>
        <img
          src="/assets/hero_img.jpg"
          alt="heroimage"
          className="object-cover w-80 h-80 rounded-full"
        />
        <div>
          <h1 className="text-8xl font-bold text-orange-500">Tasty</h1>
          <h1 className="text-8xl font-bold text-orange-500 ml-20">Oragnic</h1>
          <p className="w-1/2 mt-10 text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
            accusamus voluptatem, quia sapiente ut quod
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-orange-500 hover:bg-white hover:scale-110 transition-all hover:text-orange-500 hover:border-orange-500 border border-orange-500 rounded-md shadow-md p-2 cursor-pointer mt-10 text-lg font-semibold text-white"
            aria-label="Order Now"
          >
            Order Now
          </button>
        </div>
      </div>
      <Topsearch />
      <div className=" mt-10 h-screen w-full bg-[#0e1317] flex items-center  justify-between px-30 relative py-10">
        <div className="absolute top-1 tracking-[1rem]">
          <h1 className="text-[#45454686] text-9xl font-bold font-sans">
            SPECIAL DEAL
          </h1>
        </div>
        <div className="z-10 text-white">
          <img src="/assets/text.png" alt="text" />
          <h1 className="text-5xl font-bold leading-16">
            Special deal offer for
          </h1>
          <h1 className="text-5xl font-bold leading-16">this week</h1>
          <button
            onClick={() => navigate("/menu")}
            className="bg-orange-500 hover:bg-white hover:scale-110 transition-all hover:text-orange-500 hover:border-orange-500 border border-orange-500 rounded-md shadow-md p-2 cursor-pointer mt-10 text-lg font-semibold text-white"
            aria-label="Order Now"
          >
            Order Now
          </button>
        </div>
        <div className="h-[75%] z-10 flex items-center justify-center">
          <img src="/assets/steak.webp" alt="steak" className="h-full w-full" />
        </div>
      </div>
      <SubscriptionPlans />
      <div
        className="flex w-full items-center justify-center h-70"
        style={{
          background: "url(/assets/banner1.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></div>
      <Menu />
      <Feedback/>
      <Footer />
    </>
  );
};

export default Home;
