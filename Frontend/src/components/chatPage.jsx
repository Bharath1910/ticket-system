import React, { useEffect, useState } from "react";
import aistars from "../images/aistars.png";
import VoiceIcon from "../images/voiceIcon.png";
import transalteIcon from "../images/translate.png";
import rightArrow from "../images/arrow.png";

const translations = {
  en: {
    welcome: "Namaste,<br />Let's start your booking",
    placeholder: "What would you like to book today...?",
    buttons: [
      "Show Active Tickets",
      "Description of the Events",
      "Show Timings",
    ],
    error: "Can't send more than 500 characters."
  },
  hi: {
    welcome: "नमस्ते,<br />आइए आपकी बुकिंग शुरू करें",
    placeholder: "आज आप क्या बुक करना चाहेंगे...?",
    buttons: ["सक्रिय टिकट दिखाएं", "कार्यक्रमों का विवरण", "समय दिखाएं"],
  },
};

const LanguagePage = () => {
  const [language, setLanguage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");

    if (lang) {
      setLanguage(lang);
      localStorage.setItem("selectedLanguage", lang);
    } else {
      const savedLanguage = localStorage.getItem("selectedLanguage");
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  const currentTranslations = translations[language] || translations.en;

  const handleButtonClick = (buttonText) => {
    console.log(`Button clicked: ${buttonText}`);
  };
  const handleSendMessage = () => {
    if (currentInput.length > 500) {
      setError(currentTranslations.error);
      return;
    }
    if (currentInput.trim()) {
      setChatHistory((prevHistory) => [...prevHistory, currentInput]);
      setCurrentInput("");
      setError("");
    }
  };
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
    if (e.target.value.length > 500) {
      setError(currentTranslations.error);
    } else {
      setError("")
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary relative p-8">
      {chatHistory.length === 0 && <div className="flex flex-col items-start gap-8 w-full max-w-4xl">
        <h1 className="text-4xl font-medium bg-gradient-to-r from-black via-pink-500 to-purple-600 text-transparent bg-clip-text">
          <span
            dangerouslySetInnerHTML={{ __html: currentTranslations.welcome }}
          />
        </h1>

        <div className="flex flex-wrap md:flex-nowrap justify-start gap-3 w-full">
          {currentTranslations.buttons.map((text, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(text)}
              className="flex-shrink-0 flex flex-col items-center justify-center border border-gray-300 bg-transparent rounded-lg p-6 w-full md:w-1/4 h-32 text-center hover:shadow-md transition-shadow"
            >
              <span className="text-gray-800 font-semibold">{text}</span>
            </button>
          ))}
        </div>
      </div>}
      {
        chatHistory.length > 0 ?
          (
            <div className="w-full bg-white min-h-[450px] max-h-[450px] overflow-y-auto p-2 space-y-2 max-w-4xl rounded-lg flex flex-col ">
              {chatHistory.map((text, index) => (
                <span className="p-2 bg-slate-100" key={index}>{text}</span>
              ))}
            </div>
          ) : null
      }

      <div className="mt-8 flex items-center md:justify-center w-full">
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-4xl w-full">
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
              {error}
            </div>
          )}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-grow border-none focus:outline-none rounded-md p-2 py-3 bg-gray-100 text-sm mr-4"
              placeholder={currentTranslations.placeholder}
            />
            <button className="text-gray-500 flex items-center">
              <img
                src={transalteIcon}
                alt="Translate"
                className="mr-1 w-6 h-6"
              />
            </button>
          </div>

          <div className="flex items-center justify-between border-t pt-2">
            <div className="flex items-center">
              <button className="text-gray-500 mr-2 flex items-center">
                <img
                  src={aistars}
                  alt="Add Attachment"
                  className="w-6 h-6 mr-3"
                />
              </button>
              <button className="text-gray-500 mr-2 flex items-center">
                <img src={VoiceIcon} alt="Use Image" className="w-6 h-6 mr-1" />
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">{currentInput.length}/500</span>
              <button onClick={handleSendMessage} className="bg-purple-500 text-white rounded-lg p-2">
                <img src={rightArrow} alt="Send" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LanguagePage;


