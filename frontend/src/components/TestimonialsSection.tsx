import React from 'react';
import { Star } from 'lucide-react';
export const TestimonialsSection = () => {
  const testimonials = [{
    name: 'Carlos Mendes',
    role: 'CEO, Empresa de Logística',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    stars: 5,
    text: 'A consultoria do Coronel Roberto transformou completamente nossa operação. A aplicação de princípios militares trouxe disciplina e eficiência que nunca tivemos antes.'
  }, {
    name: 'Fernanda Alves',
    role: 'Diretora de RH, Multinacional',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    stars: 5,
    text: 'Os treinamentos de liderança foram revolucionários. Nossa equipe está mais coesa e preparada para enfrentar desafios. Recomendo fortemente.'
  }, {
    name: 'Ricardo Gomes',
    role: 'Fundador, Startup de Tecnologia',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    stars: 5,
    text: 'A mentalidade estratégica e a disciplina que aprendemos com o Coronel Roberto nos ajudaram a escalar nosso negócio de forma estruturada e sustentável.'
  }];
  return <section id="testimonials" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O Que Dizem Nossos Clientes
          </h2>
          <div className="w-20 h-1 bg-[#0A3D1C] mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-[#0A3D1C]/10 border border-[#0A3D1C]/30 rounded-lg p-6 flex flex-col">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.stars)].map((_, i) => <Star key={i} size={16} fill="#0A3D1C" color="#0A3D1C" />)}
              </div>
              <p className="text-gray-300 italic mb-6 flex-grow">
                "{testimonial.text}"
              </p>
              <div className="flex items-center mt-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};