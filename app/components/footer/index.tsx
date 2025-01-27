import React from "react";

const Footer = () => {
  return (
    <footer className="relative mt-20">
      <div className="absolute bottom-full left-0 right-0">
        <svg
          className="w-full h-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,100 0,0 100,100" className="fill-gray-900" />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto flex flex-col items-center text-center">
          <span className="text-4xl font-Arima font-bold uppercase">Remix</span>
          <div className="text-sm">
            © {new Date().getFullYear()} All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
