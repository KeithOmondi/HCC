import { MdArrowForward } from "react-icons/md";
import { motion } from "framer-motion";

const PartnersSection = () => {
  const partners = [
    "https://i.pinimg.com/736x/61/d4/2a/61d42a2baf3e18a03e5f50025b3d9a04.jpg",
    "https://i.pinimg.com/736x/61/d4/2a/61d42a2baf3e18a03e5f50025b3d9a04.jpg",
    "https://i.pinimg.com/736x/61/d4/2a/61d42a2baf3e18a03e5f50025b3d9a04.jpg",
    "https://i.pinimg.com/736x/61/d4/2a/61d42a2baf3e18a03e5f50025b3d9a04.jpg",
    "https://i.pinimg.com/736x/61/d4/2a/61d42a2baf3e18a03e5f50025b3d9a04.jpg",
    "https://i.pinimg.com/736x/61/d4/2a/61d42a2baf3e18a03e5f50025b3d9a04.jpg",
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl font-semibold text-center mb-6 text-blue-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our Trusted Partners and Affiliations
        </motion.h2>

        <motion.h3
          className="text-sm text-center mb-6 text-blue-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Use this section to boost your agency&apos;s credibility.
        </motion.h3>

        <div className="flex justify-center items-center gap-2">
          <motion.a
            className="text-sm text-center text-blue-950 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            See our rental listings
          </motion.a>

          {/* Bouncing Arrow */}
          <motion.div
            className="flex justify-center mt-4"
            animate={{
              y: ["0%", "-20%", "0%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1,
            }}
          >
            <MdArrowForward
              className="text-blue-950 mb-2 w-6 h-6 cursor-pointer"
            />
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center space-x-12"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 10, 
              ease: "linear",
            }}
          >
            
            {[...partners, ...partners].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Partner ${index + 1}`}
                className="h-24 object-contain"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;