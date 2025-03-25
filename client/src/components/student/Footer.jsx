import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-center md:items-start px-8 md:px-0 justify-between gap-10 py-10 border-b border-white/30">
        
        {/* Logo and Description Section (Left) */}
        <div className="flex flex-col items-start w-full md:w-auto">
          <img src={assets.logo_dark} alt="logo" className="self-start" />
          <p className="mt-6 text-sm text-white/80">
            Lorem ipsum dolor sit amet consectetur<br/> adipisicing elit. Consequatur amet dolorem quae<br/> error dolore! Ab, aliquid magnam blanditiis velit <br/>cumque architecto voluptatum corporis iste et ipsa!
          </p>
        </div>

        {/* Centered Company Section */}
        <div className="flex flex-col items-center md:items-center text-center md:text-center flex-grow">
          <h2 className="text-white font-semibold text-lg mb-3">Company</h2>
          <ul className="text-white/80 space-y-2">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Subscribe Section (Right) */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h2 className="text-white font-semibold text-lg mb-3">Subscribe to our newsletter</h2>
          <p className="text-white/80 max-w-xs">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
            />
            <button className="bg-blue-600 px-4 py-2 text-white font-semibold rounded-r-md hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <p className="text-center py-4 text-sm text-white/80">
        Copyright 2025 © LearnHive. All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
