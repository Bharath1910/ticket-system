import React, { useState } from 'react';
import englishImage from '../images/englishbg.png';
import hindiImage from '../images/hindibg.png';
import backgroundVideo from '../video/bg.mp4';

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleLanguageSelect = (language) => {
    window.location.href = `/chat?lang=${language}`;
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex space-x-8">
          <div
            className={`relative w-64 h-40 flex items-center justify-center rounded-lg border-4 border-white cursor-pointer transform transition-all duration-500 ${
              hoveredCard === 'english' ? 'hover:scale-105 border-none' : ''
            }`}
            onMouseEnter={() => setHoveredCard('english')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleLanguageSelect('en')} 
            style={{
              backgroundImage: hoveredCard === 'english' ? `url(${englishImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 5s ease-in-out',
            }}
          >
            <h2 className="text-4xl font-bold text-center text-white">English</h2>
          </div>

          <div
            className={`relative w-64 h-40 flex items-center justify-center rounded-lg border-4 border-white cursor-pointer transform transition-all duration-500 ${
              hoveredCard === 'hindi' ? 'hover:scale-105 border-none' : ''
            }`}
            onMouseEnter={() => setHoveredCard('hindi')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleLanguageSelect('hi')}  
            style={{
              backgroundImage: hoveredCard === 'hindi' ? `url(${hindiImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 5s ease-in-out',
            }}
          >
            <h2 className="text-4xl font-bold text-center text-white">हिन्दी</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
