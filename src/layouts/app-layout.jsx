import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header';

const AppLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <div className='grid-background'></div>

      <main className='min-h-screen container mx-auto'>
        <Header />
        <Outlet />
      </main>

      {/* Chatbot Icon */}
      <div 
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, cursor: 'pointer' }}
        onClick={toggleChat} 
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/134/134914.png" 
          alt="Chat Icon" 
          width="70" 
          height="70" 
          className='ml-5'
        />
        <h1 className='gradient-title font-extrabold text-xl'>ArogyaBOT</h1>
      </div>

      {/* Chatbot Iframe */}
      {isChatOpen && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', zIndex: 1000 }}>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/EA67OYaG0vOU3hVj2T_--"
            width="400"
            height="600"
            frameBorder="0"
            title="Chatbot"
          ></iframe>
        </div>
      )}

      <div className='p-10 text-center bg-gray-800 mt-50'>
        Made with ❤️ by Team ByteForge
      </div>
    </div>
  );
};

export default AppLayout;