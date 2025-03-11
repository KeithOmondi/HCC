import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Layout/Header";

const Checkout = () => {
  const { cart = [] } = useSelector((state) => state.cart);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    return acc + item.qty * numericPrice;
  }, 0);

  // Handle Payment
  const handlePayment = () => {
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedPhone || !/^\d{10}$/.test(trimmedPhone)) {
      toast.error("Please enter a valid 10-digit M-Pesa phone number");
      return;
    }

    toast.success("Processing M-Pesa payment...");
    // API Call to process payment can go here
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>

        {/* Billing & Shipping Info */}
        <div className="mb-6">
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.trimStart())}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium">M-Pesa Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ""))}
            className="w-full p-2 border rounded-md"
            placeholder="07XXXXXXXX"
            maxLength={10}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="flex justify-between text-sm my-2">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>Ksh {Number(item.price.replace(/[^\d.]/g, "")) * item.qty}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in cart</p>
          )}
          <div className="border-t pt-2 font-bold flex justify-between">
            <span>Total:</span>
            <span>Ksh {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Pay with M-Pesa
        </button>

        <Link to="/" className="block text-center text-blue-500 mt-4">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default Checkout;
