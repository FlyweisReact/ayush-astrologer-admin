/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MSG from "./components/vendorPanel/components/pages/Message/Message";
import "react-toastify/dist/ReactToastify.css";
import VendorLogin from "./components/vendorPanel/components/forms/VendorLogin";
import VendorDashboard from "./components/vendorPanel/components/pages/VendorDashboard";
import Astrologers from "./components/vendorPanel/components/pages/Astrologer/Astrologers";
import Users from "./components/vendorPanel/components/pages/Users/Users";
import Kundli from "./components/vendorPanel/components/pages/Kundli/Kundli";
import AdminHoro from "./components/vendorPanel/components/pages/Horoscope/Horoscope";
import Booking from "./components/vendorPanel/components/pages/Booking/Booking";
import AdminReview from "./components/vendorPanel/components/pages/Astrologer/AdminReview";
import UploadDocs from "./components/vendorPanel/components/pages/Astrologer/UploadDocs";
import Banners from "./components/vendorPanel/components/pages/Astrologer/Banners";
import AdminDiscount from "./components/vendorPanel/components/pages/Astrologer/AdminDiscount";
import Support from "./components/vendorPanel/components/pages/Support";
import Product from "./components/vendorPanel/components/pages/Product";
import Testimonial from "./components/vendorPanel/components/pages/Testimonial";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<VendorLogin />} />
        <Route path="/vendorDashboard" element={<VendorDashboard />} />
        <Route path="/astro" element={<Astrologers />} />
        <Route path="/kundli" element={<Kundli />} />
        <Route path="/horo" element={<AdminHoro />} />
        <Route path="/adminReviews" element={<AdminReview />} />
        <Route path="/uploadDocs" element={<UploadDocs />} />
        <Route path="/Banners" element={<Banners />} />
        <Route path="/AdminDiscount" element={<AdminDiscount />} />
        <Route path="/msg" element={<MSG />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/users" element={<Users />} />
        <Route path="/support" element={<Support />} />
        <Route path="/product" element={<Product />} />
        <Route path="/testimonial" element={<Testimonial />} />
      </Routes>
    </>
  );
}

export default App;
