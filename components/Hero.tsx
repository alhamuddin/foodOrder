import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div>
      <div className="">
        <Image
          className="w-full max-h-[500px] object-cover rounded-sm"
          src="/hero.png"
          alt="hero image"
          width={700}
          height={100}
        />
      </div>
    </div>
  );
}
