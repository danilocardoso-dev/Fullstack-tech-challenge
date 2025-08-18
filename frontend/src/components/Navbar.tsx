import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <nav className="bg-black border-b border-[#0A3D1C] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-white text-xl font-bold">
              ELITE<span className="text-[#0A3D1C]">CONSULT</span>
            </h1>
          </div>
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#home" className="text-white hover:text-[#0A3D1C] transition-colors duration-300">
                Home
              </a>
              <a href="#about" className="text-white hover:text-[#0A3D1C] transition-colors duration-300">
                Sobre
              </a>
              <a href="#services" className="text-white hover:text-[#0A3D1C] transition-colors duration-300">
                Serviços
              </a>
              <a href="#testimonials" className="text-white hover:text-[#0A3D1C] transition-colors duration-300">
                Depoimentos
              </a>
              <a href="#contact" className="bg-[#0A3D1C] text-white px-6 py-2 rounded-md font-medium hover:bg-[#0D4B23] transition-colors duration-300">
                Contato
              </a>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#0A3D1C] focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-black border-t border-[#0A3D1C]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block px-3 py-2 text-white hover:bg-[#0A3D1C] rounded-md">
              Home
            </a>
            <a href="#about" className="block px-3 py-2 text-white hover:bg-[#0A3D1C] rounded-md">
              Sobre
            </a>
            <a href="#services" className="block px-3 py-2 text-white hover:bg-[#0A3D1C] rounded-md">
              Serviços
            </a>
            <a href="#testimonials" className="block px-3 py-2 text-white hover:bg-[#0A3D1C] rounded-md">
              Depoimentos
            </a>
            <a href="#contact" className="block px-3 py-2 text-white hover:bg-[#0A3D1C] rounded-md">
              Contato
            </a>
          </div>
        </div>}
    </nav>;
};