import { Link } from "@remix-run/react";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function Custom404() {
  return (
    <div className="section min-h-screen">
      <div className="container flex flex-col items-center justify-center bg-transparent ">
        <div className="flex justify-center">
          <FaExclamationTriangle className="text-9xl text-yellow-500 mb-6" />
        </div>
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-medium text-gray-600 mt-4">
          Oops! Page not found.
        </p>
        <p className="text-lg text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/80 transition duration-300"
        >
          <FaHome className="mr-2" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
