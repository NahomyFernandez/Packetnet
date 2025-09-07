import React from 'react';
import { ICONS } from '../constants';

// Datos de ejemplo para las reseñas con nombres corregidos
const testimonials = [
  {
    quote: "La calidad de los equipos reacondicionados es excepcional. PacketNet se ha convertido en nuestro proveedor de confianza.",
    name: "Daniel Torres",
    title: "IT Manager en TechSolutions",
    avatar: "https://i.pravatar.cc/150?u=maria"
  },
  {
    quote: "El asistente IA me ayudó a elegir el switch perfecto. El soporte técnico es de primer nivel y la entrega fue rapidísima.",
    name: "Ana Lucía Vera",
    title: "Jefe de Operaciones en LogistiCore",
    avatar: "https://i.pravatar.cc/150?u=carlos"
  },
  {
    quote: "Encontrar un proveedor fiable de equipos Cisco era un desafío hasta que descubrimos PacketNet. Precios competitivos.",
    name: "Carlos Mendoza",
    title: "Ingeniera de Redes Senior",
    avatar: "https://i.pravatar.cc/150?u=ana"
  }
];

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200 max-w-6xl mx-auto space-y-16">
      
      {/* Banner Principal */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
        <img 
          src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Equipo PacketNet trabajando" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white leading-tight">Conecta tu futuro con PacketNet</h1>
            <p className="mt-4 text-xl text-stone-200 max-w-3xl mx-auto">
              Tu socio estratégico en soluciones de red Cisco, redefiniendo la conectividad empresarial.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Historia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-cyan-600 mb-4">Nuestra Historia</h2>
          <p className="text-stone-700 leading-relaxed text-lg">
            PacketNet nació de la visión de un grupo de ingenieros de redes apasionados por optimizar la infraestructura digital de las empresas. Con más de 20 años de experiencia combinada, notamos una brecha en el mercado: la necesidad de un proveedor que no solo vendiera equipos, sino que también ofreciera una asesoría experta y confiable. Así, en 2021, fundamos PacketNet para ser ese aliado estratégico.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-md">
          <img 
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Reunión de equipo" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Misión, Visión y Valores (IMÁGENES CORREGIDAS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="bg-cyan-50 p-8 rounded-lg border border-cyan-200 h-full flex flex-col justify-between shadow-sm">
          <div>
            <ICONS.Rocket className="w-12 h-12 text-cyan-500 mb-4" />
            <h3 className="text-2xl font-bold text-stone-800 mb-3">Nuestra Misión</h3>
            <p className="text-stone-600 leading-relaxed">
              Empoderar a nuestros clientes con soluciones de red de vanguardia y un servicio excepcional, garantizando la máxima conectividad y rendimiento.
            </p>
          </div>
          <img 
            src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Misión: Tecnología y empoderamiento" 
            className="mt-6 rounded-md object-cover h-40 w-full"
          />
        </div>
        <div className="bg-stone-50 p-8 rounded-lg border border-stone-200 h-full flex flex-col justify-between shadow-sm">
          <div>
            <ICONS.Eye className="w-12 h-12 text-stone-500 mb-4" />
            <h3 className="text-2xl font-bold text-stone-800 mb-3">Nuestra Visión</h3>
            <p className="text-stone-600 leading-relaxed">
              Ser la plataforma líder y de mayor confianza en Latinoamérica para la adquisición de equipos de red Cisco, reconocidos por nuestra innovación e integridad.
            </p>
          </div>
          <img 
            src="data:image/jpeg;base64,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" 
            alt="Visión: Liderazgo y futuro" 
            className="mt-6 rounded-md object-cover h-40 w-full"
          />
        </div>
        <div className="bg-indigo-50 p-8 rounded-lg border border-indigo-200 h-full flex flex-col justify-between shadow-sm">
          <div>
            <ICONS.Award className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-2xl font-bold text-stone-800 mb-3">Nuestros Valores</h3>
            <ul className="list-disc list-inside text-stone-600 leading-relaxed space-y-1">
              <li><strong>Excelencia:</strong> Buscamos la perfección en cada solución.</li>
              <li><strong>Integridad:</strong> Actuamos con honestidad y transparencia.</li>
              <li><strong>Innovación:</strong> Nos adaptamos y creamos el futuro.</li>
              <li><strong>Cliente Primero:</strong> El éxito de nuestros clientes es nuestra prioridad.</li>
            </ul>
          </div>
          <img 
            src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Valores: Confianza e integridad" 
            className="mt-6 rounded-md object-cover h-40 w-full"
          />
        </div>
      </div>

      {/* Reseñas de Clientes */}
      <div>
        <h2 className="text-3xl font-bold text-center text-cyan-600 mb-8">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-stone-200 flex flex-col items-center text-center">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-cyan-400 p-0.5"
              />
              <p className="text-stone-600 italic flex-grow">"{testimonial.quote}"</p>
              <div className="mt-4">
                <p className="font-bold text-stone-800">{testimonial.name}</p>
                <p className="text-sm text-stone-500">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;