
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../Layout/Header";

const Contact = () => {
    return (
        <>
            <Header />
            <section className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        className="text-4xl font-bold text-blue-950"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        className="text-gray-600 mt-4 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Have questions? Reach out to us via phone, email, or visit our office.
                    </motion.p>
                </div>

                <div className="mt-12 max-w-4xl mx-auto grid gap-6 px-6">
                    <motion.div
                        className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <FaPhone className="text-blue-600 text-3xl" />
                        <div>
                            <h3 className="text-lg font-semibold text-blue-950">Phone</h3>
                            <p className="text-gray-600">+1 (123) 456-7890</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <FaEnvelope className="text-blue-600 text-3xl" />
                        <div>
                            <h3 className="text-lg font-semibold text-blue-950">Email</h3>
                            <p className="text-gray-600">contact@realestate.com</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <FaMapMarkerAlt className="text-blue-600 text-3xl" />
                        <div>
                            <h3 className="text-lg font-semibold text-blue-950">Location</h3>
                            <p className="text-gray-600">123 Main Street, New York, USA</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Contact;
