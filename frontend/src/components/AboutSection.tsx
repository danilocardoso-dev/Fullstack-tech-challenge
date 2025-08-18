import React, { useState } from 'react';
import { Medal, Target, Users, Shield, X } from 'lucide-react';
export const AboutSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = ['img1.jpeg', 'img2.jpeg', 'img3.jpeg', 'img4.jpeg', 'img5.jpeg', 'img6.jpeg'];

  return <section id="about" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Honra ao Mérito
          </h2>
          <div className="w-20 h-1 bg-[#0A3D1C] mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-2">
              {images.map((img, index) => (
                <div key={index} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedImage(`./src/public/${img}`)}>
                  <img src={`./src/public/${img}`} alt={`Foto ${index + 2}`} className="rounded-lg object-cover w-full h-32 shadow-xl" />
                </div>
              ))}
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#0A3D1C] p-4 rounded-lg shadow-lg hidden md:block">
              <p className="font-bold text-xl">+40 Anos</p>
              <p className="text-sm">de Experiência Militar</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Roberto Aragão-Forjando pessoas,construindo resultados</h3>
            <div className="text-gray-300 mb-6 space-y-4">
              <p className="leading-relaxed">
                Especialista em <span className="text-white font-semibold">Segurança Estratégica e Defesa Pessoal</span>, com mais de 40 anos de atuação no Brasil e no exterior, Roberto Aragão vai além do ensino: <span className="text-[#22C55E] font-bold">Forja caráter, transforma mentalidades</span> e prepara pessoas para enfrentar qualquer desafio.
              </p>
              <p className="leading-relaxed">
                Reconhecido por instituições como <span className="text-white font-semibold">Polícia Federal, Exército Brasileiro</span> e forças de elite, Roberto já capacitou centenas de profissionais, sempre com ética, técnica e foco total em resultado.
              </p>
              <p className="leading-relaxed">
                Hoje, oferece consultoria personalizada para quem busca proteger o que mais importa — <span className="text-[#22C55E] font-bold">vida, família, patrimônio e reputação</span> — com inteligência, estratégia e confiança.
              </p>
              <p className="leading-relaxed italic border-l-4 border-[#0A3D1C] pl-4">
                "Se você precisa de orientação verdadeira e soluções eficazes em segurança, conte com quem tem experiência real e compromisso absoluto com sua tranquilidade."
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-[#0A3D1C] p-3 rounded-full mr-4">
                  <Medal size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Liderança</h4>
                  <p className="text-gray-400 text-sm">
                    Comandei equipes em situações extremas
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#0A3D1C] p-3 rounded-full mr-4">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Estratégia</h4>
                  <p className="text-gray-400 text-sm">
                    Planejamento tático para resultados precisos
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#0A3D1C] p-3 rounded-full mr-4">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Treinamento</h4>
                  <p className="text-gray-400 text-sm">
                    Orientação direta em situações de alto risco
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#0A3D1C] p-3 rounded-full mr-4">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Resiliência</h4>
                  <p className="text-gray-400 text-sm">
                    Preparação para superar adversidades
                  </p>
                </div>
              </div>
            </div>
            <a href="#contact" className="inline-block border-b-2 border-[#0A3D1C] font-medium hover:text-[#0A3D1C] transition-colors duration-300">
              Saiba mais sobre minha trajetória →
            </a>
          </div>
        </div>
      </div>
      
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-full p-4">
            <button className="absolute top-2 right-2 text-white hover:text-gray-300" onClick={() => setSelectedImage(null)}>
              <X size={32} />
            </button>
            <img src={selectedImage} alt="Foto expandida" className="max-w-full max-h-full object-contain rounded-lg" />
          </div>
        </div>
      )}
    </section>;
};