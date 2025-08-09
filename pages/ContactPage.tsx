import React from 'react';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.");
    // Here you would typically handle form submission to a backend
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Contáctanos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Información de Contacto</h2>
            <p className="mt-2 text-stone-600">
              Estamos aquí para ayudarte. No dudes en contactarnos por correo electrónico, teléfono o utilizando el formulario.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:soporte@packetnet.com" className="text-cyan-600 hover:underline">soporte@packetnet.com</a>
            </div>
            <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>+1 (555) 123-4567</span>
            </div>
             <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>123 Network Drive, Suite 100, San Jose, CA 95134</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Nombre</label>
            <input type="text" id="name" required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm bg-stone-50" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Correo Electrónico</label>
            <input type="email" id="email" required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm bg-stone-50" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium">Asunto</label>
            <input type="text" id="subject" required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm bg-stone-50" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">Mensaje</label>
            <textarea id="message" rows={4} required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm bg-stone-50"></textarea>
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Enviar Mensaje
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;