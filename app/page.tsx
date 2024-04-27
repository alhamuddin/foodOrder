import BigSearchBox from "@/components/BigSearchBox";
import Carouseles from "@/components/Carousels";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container flex flex-col gap-10 py-10">
      <Hero />
      <BigSearchBox />
      <div className="grid md:grid-cols-2 gap-5">
        <Image
          className="w-full"
          src="/landing.png"
          alt="landing"
          width={300}
          height={300}
        />
        <div className="gap-4 flex  flex-col items-center justify-center text-center">
          <Image
            className=""
            src="/appDownload.png"
            alt="landing"
            width={300}
            height={300}
          />
          <span className="font-bold text-orange-600 text-3xl tracking-tighter">
            Order takeway even faster!
          </span>
          <span className="text-2xl font-mono shadow-md">
            Download FoodGuide app for faster ordering and personalized
            recommandation
          </span>
        </div>
        <Carouseles />
      </div>
    </div>
  );
}
