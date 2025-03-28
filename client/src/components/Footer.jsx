import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-6 ">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left section */}
        <div>
          <h4 className="text-xl font-bold">Food Hub</h4>
          <p className="text-sm mt-2">Your monthly food subscription service</p>
        </div>

        {/* Middle section - Links */}
        <div className="flex gap-20">
          <div>
            <h5 className="text-lg font-semibold">Quick Links</h5>
            <ul className="text-sm mt-2 flex  flex-col gap-2">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold">Support</h5>
            <ul className="text-sm mt-2 flex  flex-col gap-2">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Help Center</li>
            </ul>
          </div>
        </div>

        {/* Right section - Social media links */}
        <div>
          <h5 className="text-lg font-semibold">Follow Us</h5>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-xl">
            <FaFacebook/>
            </a>
            <a href="#" className="text-xl">
            <FaInstagram/>
            </a>
            <a href="#" className="text-xl">
              <FaXTwitter/>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-6 border-t border-gray-600 pt-4">
        <p className="text-sm">© 2025 Food Hub. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
