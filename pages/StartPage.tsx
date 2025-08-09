import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

// Simplified icons for this page
const FeatureIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-cyan-100 text-cyan-600 rounded-lg p-3 inline-flex">
    {children}
  </div>
);

const StartPage: React.FC = () => {
  return (
    <div className="text-center py-16 md:py-24 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-stone-800 leading-tight">
        <span className="block">Bienvenido a</span>
        <span className="block text-cyan-600">PacketNet</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-stone-600">
        Tu socio experto en conectividad y rendimiento garantizado con equipos Cisco.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/">
          <Button variant="primary">Explorar Catálogo</Button>
        </Link>
        <Link to="/contact">
          <Button variant="secondary">Habla con un experto</Button>
        </Link>
      </div>

      <div className="mt-20 md:mt-28 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </FeatureIcon>
            <h3 className="mt-4 text-xl font-semibold text-stone-700">Equipos de Calidad</h3>
            <p className="mt-2 text-stone-500">Nuevos y reacondicionados, todos con garantía de rendimiento.</p>
          </div>
          <div className="flex flex-col items-center">
            <FeatureIcon>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </FeatureIcon>
            <h3 className="mt-4 text-xl font-semibold text-stone-700">Soporte Experto</h3>
            <p className="mt-2 text-stone-500">Nuestro equipo y asistente IA te guiarán en cada paso.</p>
          </div>
          <div className="flex flex-col items-center">
            <FeatureIcon>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </FeatureIcon>
            <h3 className="mt-4 text-xl font-semibold text-stone-700">Envíos Rápidos</h3>
            <p className="mt-2 text-stone-500">Recibe tu equipo de red donde lo necesites, sin demoras.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;