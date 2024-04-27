import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import { HeaderForLogReg } from "../headerForLogReg";
import { BackButton } from "../BackButton";

export default function ErrorCard() {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <HeaderForLogReg label="Oops! something went wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton href="/logim" label="Go back to login" />
      </CardFooter>
    </Card>
  );
}
