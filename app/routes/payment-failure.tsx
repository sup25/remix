import { Link } from "@remix-run/react";
import { FaTimesCircle } from "react-icons/fa";

export default function PaymentFailure() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center animate-fadeIn">
        <div className="flex justify-center">
          <FaTimesCircle className="text-red-500 text-6xl animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mt-4">Payment Failed</h2>
        <p className="mt-4 text-gray-600">
          Unfortunately, your payment could not be processed. Please try again
          or contact support if the issue persists.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
