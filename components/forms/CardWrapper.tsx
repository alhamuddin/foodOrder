"usr client";

import { HeaderForLogReg } from "@/app/(admin)/headerForLogReg";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import Social from "@/app/(admin)/Social";
import { BackButton } from "@/app/(admin)/BackButton";

interface CardWrapperprops {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export default function CardWrapper({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocial,
}: CardWrapperprops) {
  return (
    <div>
      <Card className="w-[400px] shadow-md p-2 text-black  bg-slate-100">
        <CardHeader className="text-orange-600">
          <HeaderForLogReg label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      </Card>
    </div>
  );
}
