import Link from "next/link";
import React from "react";
import MobileView from "./MobileView";
import Navbar from "./Navbar";

function Header() {
  return (
    <div className="border-b-2 flex border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-orange-500"
        >
          FoodGuide
        </Link>
      </div>
      <div className="md:hidden px-3">
        <MobileView />
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
}

export default Header;
