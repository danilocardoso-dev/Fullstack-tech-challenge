import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-black border-t border-[#0A3D1C]/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-2xl font-bold mb-4">
              ELITE<span className="text-[#0A3D1C]">CONSULT</span>
            </h1>
            <p className="text-gray-400 mb-6 max-w-md">
              Transformando empresas através de estratégias e disciplina
              militar. Consultoria especializada para líderes que buscam
              excelência.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-[#0A3D1C]/20 hover:bg-[#0A3D1C] p-2 rounded-full transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-[#0A3D1C]/20 hover:bg-[#0A3D1C] p-2 rounded-full transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-[#0A3D1C]/20 hover:bg-[#0A3D1C] p-2 rounded-full transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-[#0A3D1C] transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-[#0A3D1C] transition-colors duration-300">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#0A3D1C] transition-colors duration-300">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-[#0A3D1C] transition-colors duration-300">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-[#0A3D1C] transition-colors duration-300">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={20} className="mr-3 text-[#0A3D1C]" />
                <span className="text-gray-400">(11) 99999-9999</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mr-3 text-[#0A3D1C]" />
                <span className="text-gray-400">
                  contato@eliteconsult.com.br
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#0A3D1C]/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Elite Consult. Todos os direitos
            reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-[#0A3D1C] text-sm mr-4">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-[#0A3D1C] text-sm">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>;
};