"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./CardWrapper";
import { BeatLoader, DotLoader } from "react-spinners";
import { DNA } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/verificationAction";
import FormSuccess from "../form-success";
import FormError from "../form-error";

export default function VerificationForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Verification token is missing");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong we are not being able to identify :( ");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="mt-4">
      <CardWrapper
        headerLabel="Confirming your Verification Email"
        backButtonLabel="Return to login"
        backButtonHref="/login"
      >
        <div className="flex flex-col items-center w-full justify-center ">
          {!success && !error && <DNA />}

          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
      </CardWrapper>
    </div>
  );
}
