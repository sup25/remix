import { Link } from "@remix-run/react";
import React from "react";

const Logo = () => {
  return (
    <Link to="/" className="font-bricolage  text-2xl md:text-5xl font-black">
      Remix
    </Link>
  );
};

export default Logo;
