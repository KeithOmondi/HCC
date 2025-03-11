
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const houses = [
  {
    image: "https://thumbs.dreamstime.com/b/apartment-building-19532951.jpg",
    category: "Real Estate",
  },
  {
    image: "https://t4.ftcdn.net/jpg/03/84/55/29/360_F_384552930_zPoe9zgmCF7qgt8fqSedcyJ6C6Ye3dFs.jpg",
    category: "Office Spaces",
  },
  {
    image: "https://villacarekenya.com/wp-content/uploads/2021/12/5whatsappimage2019-06-12at3.35.59pm.jpeg",
    category: "Warehouses",
  },
  {
    image: "https://thumbs.dreamstime.com/b/apartment-building-19532951.jpg",
    category: "Real Estate",
  },
  {
    image: "https://t4.ftcdn.net/jpg/03/84/55/29/360_F_384552930_zPoe9zgmCF7qgt8fqSedcyJ6C6Ye3dFs.jpg",
    category: "Office Spaces",
  },
  {
    image: "https://villacarekenya.com/wp-content/uploads/2021/12/5whatsappimage2019-06-12at3.35.59pm.jpeg",
    category: "Warehouses",
  },
  {
    image: "https://villacarekenya.com/wp-content/uploads/2021/12/5whatsappimage2019-06-12at3.35.59pm.jpeg",
    category: "Warehouses",
  },
  {
    image: "https://thumbs.dreamstime.com/b/apartment-building-19532951.jpg",
    category: "Real Estate",
  },
  {
    image: "https://t4.ftcdn.net/jpg/03/84/55/29/360_F_384552930_zPoe9zgmCF7qgt8fqSedcyJ6C6Ye3dFs.jpg",
    category: "Office Spaces",
  },
];
const HousesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl font-semibold text-center mb-6 text-blue-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Browse Our Property Listings
        </motion.h2>

        <div className="overflow-hidden">
          <motion.div
            className="flex items-center space-x-12"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
          >
            {[...houses, ...houses].map((house, index) => (
              <img
                key={index}
                src={house.image}
                alt={house.category}
                className="h-24 object-cover cursor-pointer rounded-lg shadow-md transition-transform transform hover:scale-105"
                onClick={() => navigate(`/rent?category=${encodeURIComponent(house.category)}`)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HousesSection;
