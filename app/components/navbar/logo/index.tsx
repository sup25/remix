import { Link } from "@remix-run/react";
import React from "react";

const Logo = () => {
  return (
    <Link to="/" className="font-bricolage  text-4xl  font-black">
      Remix
    </Link>
  );
};

export default Logo;
