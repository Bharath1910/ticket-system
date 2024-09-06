import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import rightArrow from '../images/arrow.png';

function InitSetupPage() {
  const [businessName, setBusinessName] = useState("");
  const [venueType, setVenueType] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [location, setLocation] = useState("");
  
  const navigate = useNavigate(); 

  const handleContinue = () => {
    localStorage.setItem("businessName", businessName);
    localStorage.setItem("venueType", venueType);
    localStorage.setItem("location", location);

    navigate("/setup");
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-between">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-4 px-8">
        <div className="text-2xl font-bold">project_1</div>
      </nav>

      {/* Section Title */}
      <div className="flex-grow w-full flex flex-col items-start justify-center px-8 text-left">
        <h3 className="text-lg font-normal text-gray-600">/ Tell Us About Your Business</h3>
        <h1 className="text-5xl font-bold text-black mb-10 leading-relaxed">Start off with the basics</h1>

        {/* Main Content */}
        <div className="text-4xl font-normal text-black mb-8 leading-relaxed">
          {/* Line 1: Business Name */}
          Hello, we are
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business Name"
            className="inline-block w-auto bg-transparent focus:outline-none placeholder-transparent text-black text-4xl mx-2 border-b-2 border-black text-center"
            style={{
              background: "linear-gradient(to right, #007bff, #ff007f, #a200ff)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          />
          <br />
          {/* Line 2: Venue Type */}
          a
          <input
            type="text"
            value={venueType}
            onChange={(e) => setVenueType(e.target.value)}
            placeholder="Venue"
            className="inline-block w-auto bg-transparent focus:outline-none placeholder-transparent text-black text-4xl mx-2 border-b-2 border-black text-center"
            style={{
              background: "linear-gradient(to right, #007bff, #ff007f, #a200ff)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          />
          , looking to modernize our ticketing system with AI.
          <br />
          {/* Line 3: Location */}
          We are located at
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="inline-block w-auto bg-transparent focus:outline-none placeholder-transparent text-black text-4xl mx-2 border-b-2 border-black text-center"
            style={{
              background: "linear-gradient(to right, #007bff, #ff007f, #a200ff)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          />
        </div>
        
        {/* Continue Button */}
        <div className="mt-5">
          <button 
            onClick={handleContinue} 
            className="flex items-center justify-between bg-black text-white font-bold py-4 px-8 rounded-md"
          >
            Continue
            <img
              src={rightArrow} 
              alt="arrow"
              className="ml-2 w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-gray-500 text-sm">
        &copy; 2024 LLMPookies. All rights reserved.
      </footer>
    </div>
  );
}

export default InitSetupPage;
