import { motion } from "framer-motion";
import { FaBuilding, FaHome, FaWarehouse, FaUsers, FaChartLine, FaHandshake } from "react-icons/fa";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const services = [
    {
        icon: <FaHome className="text-blue-600 text-4xl" />,
        title: "Property Listings",
        description: "Browse a wide range of residential and commercial properties available for rent or sale.",
    },
    {
        icon: <FaBuilding className="text-blue-600 text-4xl" />,
        title: "Commercial Spaces",
        description: "Find premium office spaces, retail stores, and business locations that suit your needs.",
    },
    {
        icon: <FaWarehouse className="text-blue-600 text-4xl" />,
        title: "Warehouse Rentals",
        description: "Get access to secure and spacious warehouses for storage and logistics purposes.",
    },
    {
        icon: <FaUsers className="text-blue-600 text-4xl" />,
        title: "Property Management",
        description: "We handle everything from tenant screening to maintenance for stress-free ownership.",
    },
    {
        icon: <FaChartLine className="text-blue-600 text-4xl" />,
        title: "Investment Advisory",
        description: "Expert guidance on real estate investments to maximize returns and minimize risks.",
    },
    {
        icon: <FaHandshake className="text-blue-600 text-4xl" />,
        title: "Legal Assistance",
        description: "Ensure smooth transactions with our real estate legal consultation and contract services.",
    },
];

const Services = () => {

    return (
        <>
            <Header />
            <section className="py-16 bg-gray-100">
                {/* Hero Section */}
                <div className="text-center mb-12 ">
                    <motion.h1
                        className="text-4xl font-bold text-blue-950"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Real Estate Services
                    </motion.h1>
                    <motion.p
                        className="text-gray-600 mt-4 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        We provide expert real estate services tailored to meet your needs. Whether you&apos;re looking to buy, rent, or invest, we have you covered.
                    </motion.p>
                </div>

                {/* Service Cards */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white shadow-lg hover:scale-100 hover:shadow-2xl cursor-pointer rounded-lg p-6 flex flex-col items-center text-center transition-transform transform"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold text-blue-950">{service.title}</h3>
                            <p className="text-gray-600 mt-2">{service.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <motion.h2
                        className="text-3xl font-bold text-blue-950"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        Ready to Get Started?
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Contact us today and let&apos;s find your perfect property.
                    </motion.p>
                    <motion.button
                        className="mt-6 bg-blue-950 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        Get in Touch
                    </motion.button>
                </div>

            </section>

            <Footer />
        </>
    );
};

export default Services;
