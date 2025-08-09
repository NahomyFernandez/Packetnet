import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../../constants';
import type { ChatMessage } from '../../types';
import { getAIResponse } from '../../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'ai', text: "Hola! Soy PacketPro, tu asistente de IA. ¿Cómo puedo ayudarte a encontrar el equipo Cisco perfecto hoy?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const aiResponseText = await getAIResponse(input);
        const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText };
        setMessages(prev => [...prev, aiMessage]);
    } catch(error) {
        console.error("Failed to get AI response:", error);
        const errorMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: "Lo siento, no puedo responder en este momento." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-cyan-500 text-white rounded-full p-4 shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 z-50"
        aria-label="Toggle chat"
      >
        <ICONS.Chat className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[60vh] bg-white rounded-xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-out transform-gpu border border-stone-200">
          <header className="bg-cyan-500 text-white p-4 flex justify-between items-center rounded-t-xl">
            <h3 className="font-bold text-lg">Asistente PacketPro</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <ICONS.Close className="w-6 h-6" />
            </button>
          </header>

          <div className="flex-1 p-4 overflow-y-auto bg-stone-100">
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-cyan-500 text-white rounded-br-none' : 'bg-stone-200 text-stone-800 rounded-bl-none'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-stone-200 text-stone-800 rounded-2xl rounded-bl-none p-2">
                        <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-stone-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-stone-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-stone-500 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta..."
              className="flex-1 w-full px-4 py-2 border border-stone-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-cyan-500 text-white rounded-full p-3 hover:bg-cyan-600 disabled:bg-cyan-300 disabled:cursor-not-allowed transition-colors"
            >
              <ICONS.Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;