import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm text-gray-400">
              Empowering educators with the tools and resources they need to
              inspire the next generation of learners.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm text-gray-400">
              <li className="mb-1">
                <a href="/educator/courses" className="hover:text-white">
                  Courses
                </a>
              </li>
              <li className="mb-1">
                <a href="/educator/resources" className="hover:text-white">
                  Resources
                </a>
              </li>
              <li className="mb-1">
                <a href="/educator/community" className="hover:text-white">
                  Community
                </a>
              </li>
              <li className="mb-1">
                <a href="/educator/support" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <ul className="text-sm text-gray-400">
              <li className="mb-1">Email: support@eductor.com</li>
              <li className="mb-1">Phone: +1 (123) 456-7890</li>
              <li className="mb-1">Address: 123 Edu Street, Knowledge City</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Eductor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;