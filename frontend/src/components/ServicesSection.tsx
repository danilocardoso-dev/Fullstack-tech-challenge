import React from 'react';
import { Briefcase, LineChart, Users, ShieldCheck, BookOpen, Compass } from 'lucide-react';
export const ServicesSection = () => {
  const services = [{
    icon: <Briefcase size={32} />,
    title: 'Consultoria Estratégica',
    description: 'Desenvolvimento de planos estratégicos personalizados, aplicando metodologias militares adaptadas por Roberto Aragão para promover resultados concretos em qualquer cenário.'


  }, {
    icon: <LineChart size={32} />,
    title: 'Gestão de Crises',
    description: 'Elaboração e aplicação de protocolos sólidos para enfrentar situações críticas e tomar decisões assertivas, mesmo sob máxima pressão.'
  }, {
    icon: <Users size={32} />,
    title: 'Liderança de Equipes',
    description: 'Capacitação de líderes para moldar equipes resilientes e de alto desempenho, com base em disciplina e busca constante por resultados..'
  }, {
    icon: <ShieldCheck size={32} />,
    title: 'Segurança Corporativa',
    description: 'Avaliação de vulnerabilidades e implementação de protocolos de segurança para proteger seu negócio.'
  }, {
    icon: <BookOpen size={32} />,
    title: 'Treinamentos Especializados',
    description: ' capacitação em disciplina, resiliência e estratégia, personalizados a partir do seu contexto real. Roberto Aragão identifica seus desafios para orientar o seu crescimento com precisão.'

  }, {
    icon: <Compass size={32} />,
    title: 'Ação Rápida',
    description: 'Em situações de emergência, entre em contato para atendimento prioritário e orientação imediata.'
  }];
  return <section id="services" className="bg-[#0A3D1C]/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
           A disciplina, a estratégia e a liderança militar que moldaram grupos de elite agora ao seu serviço para transformar pessoas, processos e resultados.


          </p>
          <div className="w-20 h-1 bg-[#0A3D1C] mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => <div key={index} className="bg-black border border-[#0A3D1C]/30 rounded-lg p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-[#0A3D1C] inline-flex p-3 rounded-lg mb-5">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>)}
        </div>
        <div className="mt-16 text-center">
          <a href="#contact" className="bg-[#0A3D1C] hover:bg-[#0D4B23] text-white font-bold py-3 px-8 rounded-md inline-flex items-center justify-center transition-colors duration-300">
            Solicite uma Proposta Personalizada
          </a>
        </div>
      </div>
    </section>;
};