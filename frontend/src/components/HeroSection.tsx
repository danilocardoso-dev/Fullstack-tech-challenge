import React from 'react';
import { ChevronRight, Shield } from 'lucide-react';
export const HeroSection = () => {
  return <section id="home" className="relative bg-black text-white">
      <div className="absolute inset-0 bg-[url('./src/public/img0.png')] bg-contain bg-right bg-no-repeat opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Roberto Aragão {' '}
            <span className="text-[#0A3D1C]">forja com disciplina militar</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Sua tranquilidade não tem preço. Segurança de verdade é feita com informação, estratégia e preparação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="bg-[#0A3D1C] hover:bg-[#0D4B23] text-white font-bold py-3 px-8 rounded-md inline-flex items-center justify-center transition-colors duration-300">
              Agende uma Consulta
              <ChevronRight size={20} className="ml-2" />
            </a>
            <a href="#services" className="border-2 border-white hover:border-[#0A3D1C] text-white hover:text-[#0A3D1C] font-bold py-3 px-8 rounded-md inline-flex items-center justify-center transition-colors duration-300">
              Conheça Nossos Serviços
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-20 right-8 hidden md:block">
          <div className="bg-[#0A3D1C]/90 backdrop-blur-sm border border-[#0A3D1C] rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <Shield size={24} className="text-white" />
              <span className="text-white font-semibold text-sm">Especialista em Defesa Pessoal</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
    </section>;
};