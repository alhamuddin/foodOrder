"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
  mode?: "modal" | "redirect";
}

export default function LoginButton({
  asChild,
  children,
  mode = "redirect",
}: LoginButtonProps) {
  const router = useRouter();

  const onClick = () => {
    router.push("/login");
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
