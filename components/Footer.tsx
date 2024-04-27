import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-orange-500 py-10 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          FoodGuide
        </span>
        <span className="text-white font-bold flex gap-4">
          <Link href="#">Privacy policy</Link>
          <Link href="#">Terms of service!</Link>
        </span>
      </div>
    </div>
  );
}
