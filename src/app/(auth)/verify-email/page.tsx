import Image from "next/image";
import { FC } from "react";
import { VerifyEmail } from "@/components";

type IVerifyEmailPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const VerifyEmailPage: FC<IVerifyEmailPageProps> = ({ searchParams }) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src="/email-sent.png" fill alt="send-email-img" />
            </div>
            <h3 className="font-semibold text-2xl">Check your email</h3>

            {toEmail ? (
              <div className="text-muted-foreground text-center">
                We&apos;ve sent a verification email to <br />
                <span className="font-semibold">{toEmail}</span>.
              </div>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification to your email{" "}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
