import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
interface headerForLogRegProps {
  label: string;
}

export function HeaderForLogReg({ label }: headerForLogRegProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>
        FoodGuide Login
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
