import { useState, useRef, useEffect, useCallback } from "react";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
const mockListings = [
    { id: 1, title: "Luxury Villa", location: "Nairobi", price: 1200, beds: 3, baths: 2, image: "https://thermohouse.ie/wp-content/uploads/2019/04/hero-image.jpg", lat: -1.286389, lng: 36.817223 },
    { id: 2, title: "Modern Apartment", location: "Mombasa", price: 800, beds: 2, baths: 1, image: "https://thermohouse.ie/wp-content/uploads/2019/04/hero-image.jpg", lat: -4.043477, lng: 39.668206 },
    { id: 3, title: "Cozy Cottage", location: "Kisumu", price: 1000, beds: 3, baths: 1, image: "https://thermohouse.ie/wp-content/uploads/2019/04/hero-image.jpg", lat: -0.091702, lng: 34.767956 },
    { id: 4, title: "Studio Apartment", location: "Nakuru", price: 600, beds: 1, baths: 1, image: "https://thermohouse.ie/wp-content/uploads/2019/04/hero-image.jpg", lat: -0.303099, lng: 36.080026 },
    { id: 5, title: "Beachfront Home", location: "Diani", price: 1500, beds: 4, baths: 3, image: "https://thermohouse.ie/wp-content/uploads/2019/04/hero-image.jpg", lat: -4.322575, lng: 39.575383 },
    { id: 6, title: "Urban Loft", location: "Thika", price: 900, beds: 2, baths: 2, image: "https://thermohouse.ie/wp-content/uploads/2019/04/hero-image.jpg", lat: -1.03326, lng: 37.06933 },
];


const Listings = () => {
    const [searchQuery, setSearchQuery] = useState({ location: "", priceRange: "" });
    const [filteredListings, setFilteredListings] = useState(mockListings);
    const [selectedListing, setSelectedListing] = useState(null);
    const scrollContainerRef = useRef(null);
    const handleSearch = useCallback(() => {
        const { location, priceRange } = searchQuery;

        // Parse the price input
        const price = priceRange ? parseInt(priceRange.trim(), 10) : null;

        const results = mockListings.filter((listing) => {
            const matchesLocation = location
                ? listing.location.toLowerCase().includes(location.toLowerCase())
                : true;
            const matchesPrice = price !== null ? listing.price === price : true;
            return matchesLocation && matchesPrice;
        });

        setFilteredListings(results);
    }, [searchQuery]);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, handleSearch]);


    // Clone the listings for circular scrolling

    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;

            // Center the scroll position initially
            container.scrollLeft = container.scrollWidth / 3;
        }
    }, []);

    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = direction === "right" ? 300 : -300;

            container.scrollBy({ left: scrollAmount, behavior: "smooth" });

            // Check for the end of scrolling
            setTimeout(() => {
                if (container.scrollLeft <= 0) {
                    // Scroll to the cloned middle section
                    container.scrollLeft = container.scrollWidth / 3;
                } else if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                    // Scroll back to the cloned middle section
                    container.scrollLeft = container.scrollWidth / 3;
                }
            }, 300);
        }
    };
    const modalStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
        },
        content: {
            width: "90%",
            maxWidth: "600px",
            maxHeight: "90vh",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    };
    return (
        <>  {/* Search Section */}
            <section id="listings" className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-blue-950 text-center mb-6">
                        Start Your Search
                    </h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <input
                            type="text"
                            placeholder="Enter Location"
                            value={searchQuery.location}
                            onChange={(e) =>
                                setSearchQuery((prev) => ({ ...prev, location: e.target.value }))
                            }
                            className="w-full md:w-1/3 shadow-blue-950 p-3 outline-none rounded-lg border border-gray-300"
                        />
                        <input
                            type="text"
                            placeholder="Enter Price (e.g., 1000)"
                            value={searchQuery.priceRange}
                            onChange={(e) =>
                                setSearchQuery((prev) => ({ ...prev, priceRange: e.target.value }))
                            }
                            className="w-full shadow-blue-950 md:w-1/3 p-3 outline-none rounded-lg border border-gray-300"
                            onBlur={() => {
                                if (searchQuery.priceRange && isNaN(parseInt(searchQuery.priceRange.trim(), 10))) {
                                    alert("Please enter a valid price, e.g., '1000'.");
                                }
                            }}
                        />


                        <button
                            className="w-full md:w-auto px-6 py-3 bg-blue-950 text-white hover:bg-gray-100 hover:text-blue-950 font-semibold rounded-lg"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Listings Section */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-blue-950">
                        Featured Listings
                    </h2>
                    <div className="relative">
                        {/* Horizontal Scroll Controls */}
                        <button
                            className="absolute shadow-blue-950 left-[-40px] top-1/2 transform text-blue-950 font-semibold -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg z-10"
                            onClick={() => handleScroll("left")}
                        >
                            &lt;
                        </button>
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-10 overflow-x-auto no-scrollbar relative"
                            style={{
                                scrollBehavior: "smooth",
                                paddingBottom: "1rem",
                            }}
                        >
                            {filteredListings.map((listing) => (
                                <div
                                    key={listing.id}
                                    className="flex-none w-80 shadow-blue-950 bg-white rounded-lg shadow-lg overflow-hidden"
                                >
                                    <img
                                        src={listing.image}
                                        alt={listing.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-blue-950 mb-2">{listing.title}</h3>
                                        <p className="text-blue-950 mt-2">
                                            {listing.beds} Beds • {listing.baths} Baths • ${listing.price}/month
                                        </p>

                                        <p className="text-blue-950 font-semibold my-4">
                                            {listing.location}
                                        </p>
                                        {/* <p className="text-blue-950 mt-2">
                                            {`This beautiful home located in ${listing.location} offers a comfortable lifestyle with ${listing.beds} bedrooms and ${listing.baths} bathrooms. It's perfect for families or individuals seeking a cozy yet spacious place. Rent this property for just $${listing.price} per month.`}
                                        </p> */}
                                        <motion.button
                                            className="mt-4 px-6 py-3 bg-gray-100 hover:bg-blue-950 hover:text-white text-blue-950 font-semibold"
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedListing(listing)}
                                        >
                                            View More
                                        </motion.button>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <button
                            className="absolute right-[-40px] shadow-blue-950 top-1/2 transform text-blue-950 font-semibold -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg z-10"
                            onClick={() => handleScroll("right")}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </section>
            {selectedListing && (
                <Modal
                    isOpen={!!selectedListing}
                    onRequestClose={() => setSelectedListing(null)}
                    style={modalStyles}
                >
                    <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                        onClick={() => setSelectedListing(null)}
                    >
                        ✖
                    </button>

                    <h2 className="text-2xl font-semibold text-blue-950 text-center mb-2">
                        {selectedListing.title}
                    </h2>

                    <p className="text-blue-950 text-center mb-4">
                        {selectedListing.beds} Beds • {selectedListing.baths} Baths • ${selectedListing.price}/month
                    </p>

                    <img
                        src={selectedListing.image}
                        alt={selectedListing.title}
                        className="w-full h-56 object-cover rounded-md mb-4"
                    />

                    <p className="text-gray-700 text-sm text-center mb-4">
                        This beautiful home in {selectedListing.location} offers a perfect blend of comfort and style.
                        Featuring {selectedListing.beds} spacious bedrooms and {selectedListing.baths} modern bathrooms,
                        it is ideal for families or individuals looking for a premium living experience.
                    </p>

                    {/* Fixed size map container */}
                    <div className="w-[400px] h-[300px] mx-auto rounded-lg overflow-hidden">
                        <MapContainer
                            center={[selectedListing.lat, selectedListing.lng]}
                            zoom={13}
                            className="w-full h-full"
                            style={{ width: "100%", height: "100%" }} // Ensures it takes up full div
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[selectedListing.lat, selectedListing.lng]}>
                                <Popup>{selectedListing.title}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </Modal>
            )}
        </>
    )
}
export default Listings;