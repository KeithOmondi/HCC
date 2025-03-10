import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro/DateTimeRangePicker";

Modal.setAppElement("#root");

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingRange, setBookingRange] = useState([null, null]);
  const [isBooked, setIsBooked] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleBookAppointment = () => {
    const [startDate, endDate] = bookingRange;
    if (startDate && endDate) {
      setIsBooked(true);
      toast.success(`Appointment booked successfully for ${startDate.format('YYYY/MM/DD')} at 12:00 noon!`);
      handleModalClose();
    } else {
      toast.error("Please select both start and end dates.");
    }
  };

  return (
    <section
      id="about"
      className="p-6 md:p-12 lg:p-20 flex flex-col bg-white lg:flex-row items-center gap-6 justify-center w-full relative"
    >
      {/* Book an Appointment Button */}
      <motion.button
        onClick={handleModalOpen}
        className={`px-4 py-2 md:px-6 md:py-3 ${isBooked ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-blue-500"} text-blue-950 font-semibold absolute top-6 md:top-10 left-1/2 transform -translate-x-1/2 z-10 text-sm md:text-base`}
        disabled={isBooked}
      >
        {isBooked ? "Booked" : "Book an Appointment"}
      </motion.button>

      <div className="flex flex-col lg:flex-row w-full items-center text-center lg:text-left">
        <div className="w-full lg:w-1/2 px-4 md:px-6 flex flex-col gap-4">
          <motion.h2 className="text-xl md:text-2xl font-bold text-blue-950">
            Are you thinking of renting your own property?
          </motion.h2>
          <p className="text-sm md:text-base font-medium text-blue-950">
            Schedule a free consultation to discuss your rental needs. We assess your requirements, provide tailored options, and explain our process.
          </p>
          <motion.button className="px-4 py-2 md:px-6 md:py-3 bg-blue-950 text-white hover:bg-gray-100 hover:text-blue-950 w-full md:w-auto">
            Learn More
          </motion.button>
        </div>

        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center">
          <motion.video
            src="https://videos.pexels.com/video-files/7578117/7578117-sd_640_360_30fps.mp4"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-lg"
            autoPlay
            loop
            muted
            playsInline
            controls
          />
        </div>
      </div>

      {/* Modal for DateTimeRangePicker */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="modal-content bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3 p-4"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-gray-500"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg md:text-xl font-bold text-blue-950">Select Appointment Dates</h3>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeRangePicker
              value={bookingRange}
              onChange={(newRange) => setBookingRange(newRange)}
              localeText={{ start: "Check-in", end: "Check-out" }}
              className="w-full"
            />
          </LocalizationProvider>

          <div className="flex flex-col md:flex-row gap-4 mt-4 w-full">
            <button
              onClick={handleBookAppointment}
              className="px-4 py-2 md:px-6 md:py-3 bg-blue-950 hover:bg-blue-500 text-white w-full md:w-auto"
              disabled={isBooked}
            >
              Book Appointment
            </button>
            <button
              onClick={handleModalClose}
              className="px-4 py-2 md:px-6 md:py-3 bg-gray-500 hover:bg-gray-400 text-white w-full md:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
};

export default About;