import React, { useState } from 'react';
import { CheckCircle, Calendar, CreditCard } from 'lucide-react';
export const CTASection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: ''
  });

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setStep(2);
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (formData.date && formData.time) {
      setStep(3);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    return maxDate.toISOString().split('T')[0];
  };

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'short' });
  };

  const getDayNumber = (date) => {
    return date.getDate();
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 18) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  return <section id="contact" className="relative bg-black text-white py-20">
      <div className="absolute inset-0 bg-[url('/src/public/img7.png')] bg-cover bg-center opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Conte com a experiência de quem entende e resolve situações críticas.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Em situação de risco ou emergência, não hesite. Entre em contato agora para receber orientação imediata, personalizada e sigilosa. Sua segurança é prioridade 
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle size={24} className="text-[#0A3D1C] mr-3 flex-shrink-0" />
                <p>Respostas rápidas em situações críticas ou de emergência</p>
              </div>
              <div className="flex items-start">
                <CheckCircle size={24} className="text-[#0A3D1C] mr-3 flex-shrink-0" />
                <p>Capacitação para lidar com ameaças reais, físicas ou psicológicas</p>
              </div>
              <div className="flex items-start">
                <CheckCircle size={24} className="text-[#0A3D1C] mr-3 flex-shrink-0" />
                <p>Networking com profissionais e referências da área de segurança</p>
              </div>
              <div className="flex items-start">
                <CheckCircle size={24} className="text-[#0A3D1C] mr-3 flex-shrink-0" />
                <p>Atendimento direto com um especialista reconhecido nacional e internacionalmente</p>
              </div>
            </div>
            <a href="#" className="bg-[#0A3D1C] hover:bg-[#0D4B23] text-white font-bold py-3 px-8 rounded-md inline-flex items-center justify-center transition-colors duration-300">
              Entrar em contato agora
            </a>
          </div>
          <div className="bg-black/80 border border-[#0A3D1C]/50 rounded-lg p-8">
            {step === 1 && (
              <>
                <h3 className="text-2xl font-bold mb-6">Dados Pessoais</h3>
                <form onSubmit={handleStep1Submit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Nome Completo *
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/50 border border-[#0A3D1C]/30 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#0A3D1C]" 
                        placeholder="Seu nome" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        E-mail *
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/50 border border-[#0A3D1C]/30 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#0A3D1C]" 
                        placeholder="seu@email.com" 
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Telefone *
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-black/50 border border-[#0A3D1C]/30 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#0A3D1C]" 
                        placeholder="(00) 00000-0000" 
                      />
                    </div>
                    <button type="submit" className="w-full bg-[#0A3D1C] hover:bg-[#0D4B23] text-white font-bold py-3 px-6 rounded-md transition-colors duration-300">
                      Continuar
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-2xl font-bold mb-6">Agendamento</h3>
                <form onSubmit={handleStep2Submit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        <Calendar size={16} className="inline mr-1" />
                        Selecione a Data *
                      </label>
                      <div className="grid grid-cols-7 gap-2 max-h-64 overflow-y-auto">
                        {generateCalendarDays().map((date, index) => {
                          const dateStr = formatDate(date);
                          const isSelected = formData.date === dateStr;
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setFormData({...formData, date: dateStr})}
                              className={`p-2 rounded-md text-center text-sm transition-colors duration-200 ${
                                isSelected 
                                  ? 'bg-[#0A3D1C] text-white border-2 border-[#0A3D1C]' 
                                  : 'bg-black/50 border border-[#0A3D1C]/30 text-white hover:bg-[#0A3D1C]/30'
                              }`}
                            >
                              <div className="text-xs">{getDayName(date)}</div>
                              <div className="font-bold">{getDayNumber(date)}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Horário Preferido *
                      </label>
                      <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                        {generateTimeSlots().map((time, index) => {
                          const isSelected = formData.time === time;
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setFormData({...formData, time: time})}
                              className={`p-2 rounded-md text-center text-sm transition-colors duration-200 ${
                                isSelected 
                                  ? 'bg-[#0A3D1C] text-white border-2 border-[#0A3D1C]' 
                                  : 'bg-black/50 border border-[#0A3D1C]/30 text-white hover:bg-[#0A3D1C]/30'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
                      >
                        Voltar
                      </button>
                      <button type="submit" className="flex-1 bg-[#0A3D1C] hover:bg-[#0D4B23] text-white font-bold py-3 px-6 rounded-md transition-colors duration-300">
                        Continuar
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-2xl font-bold mb-6">Confirmação</h3>
                <div className="space-y-4">
                  <div className="bg-[#0A3D1C]/20 border border-[#0A3D1C]/50 rounded-lg p-4">
                    <h4 className="font-bold mb-2">Resumo do Agendamento:</h4>
                    <p><strong>Nome:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Telefone:</strong> {formData.phone}</p>
                    <p><strong>Data:</strong> {new Date(formData.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                    <p><strong>Horário:</strong> {formData.time}</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
                    >
                      Voltar
                    </button>
                    <button className="flex-1 bg-[#0A3D1C] hover:bg-[#0D4B23] text-white font-bold py-3 px-6 rounded-md inline-flex items-center justify-center transition-colors duration-300">
                      <CreditCard size={20} className="mr-2" />
                      Confirmar Pagamento
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>;
};