import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
} from "./routes/Routes.js";
import {
  AdminDashboardPage,
  AdminDashboardClients,
  AdminDashboardAgents,
  AdminDashboardTransactions,
  AdminDashboardListings,
  AdminDashboardEvents,
  ResetPasswordPage,
  AdminLoginPage
} from "./routes/AdminRoutes.js";
import { ToastContainer } from "react-toastify";
import Loader from "./pages/Loader.jsx";
import BlogAndEventsPage from "./components/BlogAndEventsPage/BlogAndEventsPage.jsx";
import RentingPage from "./components/Renting/RentingPage.jsx";
import Services from "./components/Services/Services.jsx";
import Contact from "./components/Company/Contact.jsx";
import AboutUs from "./components/Company/AboutUs.jsx";
import Careers from "./components/Company/Careers.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import ProtectedRoute from "./routes/ProtectedRoute"


function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Track route changes

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading time (adjust as needed)

    return () => clearTimeout(timeout);
  }, [location.pathname]); // Trigger on route change

  return (
    <div>
      {loading && <Loader />} {/* Show loader when loading */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/events" element={<BlogAndEventsPage />} />

        <Route path="/rent" element={<RentingPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin-client" element={<AdminDashboardClients />} />
        <Route path="/admin-agent" element={<AdminDashboardAgents />} />
        <Route
          path="/admin-transaction"
          element={<AdminDashboardTransactions />}
        />
        <Route
          path="/admin-reset-password"
          element={<ResetPasswordPage />}
        />
        <Route path="/admin-listing" element={<AdminDashboardListings />} />
        <Route path="/admin-event" element={<AdminDashboardEvents />} />

        {/* <Route path="/profile" element={<ProfileContent />} /> */}

        <Route path="/events" element={<BlogAndEventsPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/checkout" element={

          <Checkout />

        } />
        <Route path="/admin" element={<AdminLoginPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
