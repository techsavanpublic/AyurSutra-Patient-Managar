// import React, { useState, useEffect } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';

// const Navbar = () => {
 

//   return (
//     <nav className="bg-teal-600 p-4 text-white flex justify-between items-center">
//       <div className="text-xl font-bold">
//         <NavLink to="/">Ayurveda Platform</NavLink>
//       </div>

//       <div className="space-x-4">
       
//           <>
//             <NavLink to="/register" className="bg-white text-teal-600 px-3 py-1 rounded hover:bg-gray-100">
//               Register
//             </NavLink>
//             <NavLink to="/login" className="bg-white text-teal-600 px-3 py-1 rounded hover:bg-gray-100">
//               Login
//             </NavLink>
//           </>
   

        
   
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <nav className="w-full bg-green-50 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 text-green-700 font-bold text-xl">
            <Leaf className="w-6 h-6" />
            <span>Ayursutra</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-green-600 font-semibold border-b-2 border-green-600"
                      : "text-green-800 hover:text-green-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-700"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-green-50 border-t border-green-100"
        >
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block transition ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-green-800 hover:text-green-600"
                  }`
                }
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
