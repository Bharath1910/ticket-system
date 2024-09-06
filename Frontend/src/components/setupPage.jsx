import { AnimatePresence, motion } from "framer-motion";
import { SiIota } from "react-icons/si";
import { MdEditSquare, MdPark } from "react-icons/md";
import { IoTicket, IoBuild } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoIosAlert } from "react-icons/io";

const SpringModal = ({ isOpen, setIsOpen, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-md shadow-lg w-[300px] text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <IoIosAlert className="text-indigo-600 mb-2" size={40} />
            <p className="text-lg font-semibold mb-4">{message}</p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SetupPage = () => {
  const [selected, setSelected] = useState(0);
  const [heading, setHeading] = useState("Welcome");
  const [subHeading, setSubHeading] = useState("");
  const [inputFields, setInputFields] = useState([]);

  const [businessName, setBusinessName] = useState("");
  const [venueType, setVenueType] = useState("");
  const [location, setLocation] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketName, setTicketName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [ticketLocation, setTicketLocation] = useState("");
  const [tickets, setTickets] = useState([]);
  const [sightSeeingInfo, setSightSeeingInfo] = useState([]);

  const [businessInfo, setBusinessInfo] = useState({
    est: "",
    about: "",
    additionalInfo: "",
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    setBusinessName(localStorage.getItem("businessName") || "");
    setVenueType(localStorage.getItem("venueType") || "");
    setLocation(localStorage.getItem("location") || "");

    const savedBusinessInfo = JSON.parse(localStorage.getItem("businessInfo")) || {
      est: "",
      about: "",
      additionalInfo: "",
    };
    setBusinessInfo(savedBusinessInfo);

    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(savedTickets);

    const savedSightSeeingInfo = JSON.parse(localStorage.getItem("sightSeeingInfo")) || [];
    setSightSeeingInfo(savedSightSeeingInfo);
  }, []);

  const handleNavItemClick = (id, heading, subHeading, inputFields) => {
    setSelected(id);
    setHeading(heading);
    setSubHeading(subHeading);
    setInputFields(inputFields);
  };

  const handleAddTicket = () => {
    setIsModalOpen(true);
  };

  const handleSaveTicket = () => {
    const newTicket = {
      id: Date.now(),
      name: ticketName,
      price,
      description,
      fromTime,
      toTime,
      location: ticketLocation,
    };
    setTickets([...tickets, newTicket]);
    setTicketName("");
    setPrice("");
    setDescription("");
    setFromTime("");
    setToTime("");
    setTicketLocation("");
    setIsModalOpen(false);
  };

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  const handleSaveBusinessInfo = () => {
    localStorage.setItem("businessInfo", JSON.stringify(businessInfo));
    setIsSuccessModalOpen(true);
  };

  const handleSaveSightSeeingInfo = () => {
    localStorage.setItem("sightSeeingInfo", JSON.stringify(sightSeeingInfo));
    setIsSuccessModalOpen(true); 
  };

  return (
    <div className="bg-gray-100 text-gray-900 flex h-screen w-screen">
      <SideNav handleNavItemClick={handleNavItemClick} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="relative h-[60px] bg-white shadow-lg rounded-lg flex items-center px-4">
          <div className="flex-grow flex items-center">
            <p className="text-xl font-sans font-thin text-gray-800 flex items-center">
              <span className="mr-4">
                {businessName} - {venueType}
              </span>
            </p>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-800 font-sans font-thin">
            {location}
          </div>
        </div>
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
          {selected === 1 && (
            <>
              <h1 className="text-2xl font-bold mb-4">Ticket Info</h1>
              <button
                onClick={handleAddTicket}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add New+
              </button>
              {tickets.length > 0 ? (
                <ul className="space-y-4">
                  {tickets.map((ticket) => (
                    <li
                      key={ticket.id}
                      className="p-4 bg-gray-50 border rounded-md shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">{ticket.name}</h3>
                        <p className="text-gray-700">Price: ${ticket.price}</p>
                        <p className="text-gray-600">{ticket.description}</p>
                        <p className="text-gray-600">From: {ticket.fromTime}</p>
                        <p className="text-gray-600">To: {ticket.toTime}</p>
                        <p className="text-gray-600">Location: {ticket.location}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteTicket(ticket.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tickets added yet. Click "Add New+" to create one.</p>
              )}
            </>
          )}
          {selected === 2 && (
            <>
              <h1 className="text-2xl font-bold mb-4">Sight Seeing Info</h1>
              <button
                onClick={() => handleNavItemClick(2, "Sight Seeing Info", "", [
                  { label: "Sight Seeing Name", type: "input", placeholder: "Enter Sight Seeing Name", value: "" },
                  { label: "Description", type: "textarea", placeholder: "Enter Description", value: "" },
                ])}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add New+
              </button>
              {sightSeeingInfo.length > 0 ? (
                <ul className="space-y-4">
                  {sightSeeingInfo.map((info) => (
                    <li
                      key={info.id}
                      className="p-4 bg-gray-50 border rounded-md shadow-sm"
                    >
                      <h3 className="text-lg font-semibold">{info.name}</h3>
                      <p className="text-gray-600">{info.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No sight seeing info added yet. Click "Add New+" to create one.</p>
              )}
            </>
          )}
          {selected === 0 && (
            <>
              <h1 className="text-2xl font-bold mb-4">{heading}</h1>
              {subHeading && <h2 className="text-xl font-semibold mb-4">{subHeading}</h2>}
              {inputFields.length > 0 ? (
                <>
                  {inputFields.map((field, index) => (
                    <div key={index} className="mb-4">
                      <label className="block font-medium mb-2">{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          value={businessInfo[field.label.toLowerCase().replace(/\s/g, "")]}
                          onChange={(e) =>
                            setBusinessInfo((prevInfo) => ({
                              ...prevInfo,
                              [field.label.toLowerCase().replace(/\s/g, "")]: e.target.value,
                            }))
                          }
                          className="w-full p-2 border rounded-md shadow-inner h-32"
                          placeholder={field.placeholder}
                        />
                      ) : (
                        <input
                          type="text"
                          value={businessInfo[field.label.toLowerCase().replace(/\s/g, "")]}
                          onChange={(e) =>
                            setBusinessInfo((prevInfo) => ({
                              ...prevInfo,
                              [field.label.toLowerCase().replace(/\s/g, "")]: e.target.value,
                            }))
                          }
                          className="w-full p-2 border rounded-md shadow-inner"
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}
                  <button
                    onClick={handleSaveBusinessInfo}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <p>Select an option from the sidebar to see content here.</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal for adding a new ticket */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-md shadow-lg w-[400px]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">Add New Ticket</h2>
              <div className="mb-4">
                <label className="block font-medium mb-2">Ticket Name</label>
                <input
                  type="text"
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter ticket name"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter price"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter description"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">From Time</label>
                <input
                  type="text"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter from time"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">To Time</label>
                <input
                  type="text"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter to time"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={ticketLocation}
                  onChange={(e) => setTicketLocation(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter location"
                />
              </div>
              <button
                onClick={handleSaveTicket}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <SpringModal
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        message="Information saved successfully!"
      />
    </div>
  );
};

const SideNav = ({ handleNavItemClick }) => {
  const [selected, setSelected] = useState(0);

  return (
    <nav className="bg-white shadow-lg w-[80px] flex flex-col items-center p-4 gap-2 h-full">
      <SiIota className="text-gray-900 mb-4" size={20} />

      <NavItem
        selected={selected === 0}
        id={0}
        setSelected={(id) => {
          setSelected(id);
          handleNavItemClick(id, "About your Business", "", [
            { label: "EST", type: "input", placeholder: "Enter EST", value: "" },
            { label: "About", type: "textarea", placeholder: "Enter About", value: "" },
            { label: "Additional Info", type: "input", placeholder: "Enter additional info", value: "" },
          ]);
        }}
        label="Business Info"
      >
        <MdEditSquare />
      </NavItem>
      <NavItem
        selected={selected === 1}
        id={1}
        setSelected={(id) => {
          setSelected(id);
          handleNavItemClick(id, "", "", []);
        }}
        label="Tickets Info"
      >
        <IoTicket />
      </NavItem>
      <NavItem
        selected={selected === 2}
        id={2}
        setSelected={(id) => {
          setSelected(id);
          handleNavItemClick(id, "", "", []);
        }}
        label="Sight Seeing Info"
      >
        <MdPark />
      </NavItem>
      <NavItem
        selected={selected === 3}
        id={3}
        setSelected={(id) => {
          setSelected(id);
          handleNavItemClick(id, "", "", []);
        }}
        label="About"
      >
        <FaInfoCircle />
      </NavItem>
      <NavItem
        selected={selected === 4}
        id={4}
        setSelected={(id) => {
          setSelected(id);
          handleNavItemClick(id, "", "", []);
        }}
        label="Custom Templates"
      >
        <IoBuild />
      </NavItem>
    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected, label }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className="p-3 text-xl bg-gray-200 hover:bg-gray-300 rounded-md transition-colors relative"
      onClick={() => setSelected(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block relative z-10">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 rounded-md bg-blue-500 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          ></motion.span>
        )}
        {hovered && (
          <motion.div
            className="absolute left-full ml-2 p-2 bg-gray-900 text-white rounded-md whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SetupPage;
