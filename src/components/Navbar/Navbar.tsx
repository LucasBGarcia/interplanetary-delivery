import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../utils/images/logo.svg"
import { Button } from 'components/Button';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <nav className="w-full h-12 bg-slate-800">
        <div className="w-full h-full pl-4 pr-4 max-w-7xl m-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Planeta"
              className="w-14 h-14 object-cover"
            />
            <p className="hidden sm:block text-2xl text-white ml-2">
              Interplanetary<span className="font-bold text-logo">Delivery</span>
            </p>
          </div>
          <div className="flex items-center">
            <Link
              to="https://github.com/LucasBGarcia/interplanetary-delivery"
              className="hidden sm:block"
            >
              <Button>Ver github</Button>
            </Link>
            <button
              className="block sm:hidden text-white focus:outline-none"
              onClick={handleMenuToggle}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden bg-slate-800 w-full">
            <Link
              to="https://github.com/LucasBGarcia/interplanetary-delivery"
              className="block px-4 py-2 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Ver github
            </Link>
          </div>
        )}
      </nav>
    );
  };
  