import { motion } from "framer-motion";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const jobListings = [
    { title: "Real Estate Agent", location: "New York, USA", type: "Full-Time" },
    { title: "Marketing Manager", location: "Remote", type: "Part-Time" },
    { title: "Property Consultant", location: "London, UK", type: "Full-Time" },
];

const Careers = () => {
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
                        Join Our Team
                    </motion.h1>
                    <motion.p
                        className="text-gray-600 mt-4 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        We are always looking for talented individuals to join our growing team.
                    </motion.p>
                </div>

                <div className="mt-12 max-w-4xl mx-auto grid gap-6 px-6">
                    {jobListings.map((job, index) => (
                        <motion.div
                            key={index}
                            className="bg-white shadow-lg p-6 rounded-lg flex justify-between items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-blue-950">{job.title}</h3>
                                <p className="text-gray-600">{job.location} • {job.type}</p>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                Apply Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Careers;
