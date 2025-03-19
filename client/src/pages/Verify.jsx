import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

const Verify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // To prevent setting state on unmounted component

    const verifyEmail = async () => {
      try {
        const res = await axios.get(`${server}/admin/verify/${token}`);
        if (isMounted) {
          setMessage(res.data.message);
        }
      } catch (error) {
        if (isMounted) {
          setMessage(
            error.response?.data?.message || "Invalid or expired verification link."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    verifyEmail();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        {loading ? <p className="text-gray-500">Verifying, please wait...</p> : <p>{message}</p>}
      </div>
    </div>
  );
};

export default Verify;
