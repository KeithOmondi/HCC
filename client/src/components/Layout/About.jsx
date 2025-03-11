import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";


Modal.setAppElement("#root");

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const navigate = useNavigate();
  const [bookingRange, setBookingRange] = useState({ from: null, to: null });

  const handleBookAppointment = () => {
    if (bookingRange.from && bookingRange.to) {
      setIsBooked(true);
      toast.success(
        `Appointment booked successfully from ${bookingRange.from.toLocaleDateString()} to ${bookingRange.to.toLocaleDateString()} at 12:00 noon!`
      );
      handleModalClose();
    } else {
      toast.error("Please select a valid date range before booking.");
    }
  };


  return (
    <section
      id="about"
      className="p-8 md:p-16 lg:p-28 flex flex-col bg-white lg:flex-row items-center gap-6 justify-center w-full relative"
    >
      {/* Book an Appointment Button */}
      <motion.button
        onClick={handleModalOpen}
        className={`px-6 py-3 ${isBooked ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-blue-500"} text-blue-950 font-semibold absolute top-6 md:top-10 left-1/2 transform -translate-x-1/2 z-10`}
        disabled={isBooked}
      >
        {isBooked ? "Booked" : "Book an Appointment"}
      </motion.button>

      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 px-6 gap-4 flex sm:pb-[10rem] flex-col justify-center text-center lg:text-left">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-blue-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Are you thinking of renting your own property?
          </motion.h2>
          <p className="text-sm md:text-base font-medium text-blue-950">
            Schedule a free consultation to discuss your rental needs. We assess
            your requirements, provide tailored options, and explain our process.
            You have the freedom to choose whether to partner with us for your
            rental journey.
          </p>
          <motion.button
            className="px-6 py-3 cursor-pointer bg-blue-950 text-white hover:bg-gray-100 hover:text-blue-950 inline-block w-full md:w-auto"
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/services")}
          >     Learn More
          </motion.button>
        </div>

        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <motion.video
            src="https://videos.pexels.com/video-files/7578117/7578117-sd_640_360_30fps.mp4"
            className="w-full h-auto rounded-lg shadow-lg"
            autoPlay
            loop
            muted
            playsInline
            controls
            whileHover={{ scale: 1.05 }}
            loading="lazy"
          />
        </div>
      </div>

      {/* Modal for DateTimeRangePicker */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="modal-content bg-white rounded-lg shadow-lg w-full max-w-md mx-auto relative p-6"
        overlayClassName="fixed inset-0 flex items-center justify-center z-50"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
          },
        }}
      >


        <button
          onClick={handleModalClose}
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-gray-500"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Select Appointment Date</h3>
          <DayPicker
            mode="range"
            selected={bookingRange}
            onSelect={setBookingRange}
            className="border rounded-lg p-4 shadow-md"
          />;

          <div className="flex flex-col md:flex-row gap-4 mt-4 w-full">
            <button
              onClick={handleBookAppointment}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white w-full md:w-auto rounded-lg shadow-md"
              disabled={isBooked}
            >
              Book Appointment
            </button>
            <button
              onClick={handleModalClose}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-400 text-white w-full md:w-auto rounded-lg shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Toast Container */}
      <ToastContainer />
    </section >
  );
};

export default About;
