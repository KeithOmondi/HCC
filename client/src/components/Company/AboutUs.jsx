import { motion } from "framer-motion";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const AboutUs = () => {
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
                        About Our Company
                    </motion.h1>
                    <motion.p
                        className="text-gray-600 mt-4 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        We are a leading real estate firm dedicated to helping individuals and businesses find their perfect properties. Our mission is to simplify the process and provide exceptional service.
                    </motion.p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
                    <motion.div
                        className="bg-white shadow-lg p-6 rounded-lg"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold text-blue-950">Our Mission</h3>
                        <p className="text-gray-600 mt-2">
                            To connect people with the best properties and make real estate transactions seamless.
                        </p>
                    </motion.div>
                    <motion.div
                        className="bg-white shadow-lg p-6 rounded-lg"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold text-blue-950">Our Values</h3>
                        <p className="text-gray-600 mt-2">
                            Integrity, transparency, and customer satisfaction are at the core of everything we do.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default AboutUs;
