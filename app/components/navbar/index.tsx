import { Link } from "@remix-run/react";
import React from "react";

const NavBar = () => {
  return (
    <div className="w-full bg-red-200 flex section p-5 ">
      <div className="container space-x-2 ">
        <Link to={"/"}>Back to home</Link>
        <Link to={"/test"}>Test</Link>
      </div>
    </div>
  );
};

export default NavBar;
