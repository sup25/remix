import { Link } from "@remix-run/react";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center animate-fadeIn">
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-green-600 mt-4">
          Payment Successful!
        </h2>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase! Your payment has been successfully
          processed.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
