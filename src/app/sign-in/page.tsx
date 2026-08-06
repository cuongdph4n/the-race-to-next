import { CardCompact } from "@/components/card-compact";
import { RedirectToast } from "@/components/redirect-toast";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/paths";
import Link from "next/link";

const SignInPage = () => {
  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact
          title="Sign In"
          description="Sign in to your account"
          className="w-full max-w-105 animate-fade-from-top"
          content={<SignInForm />}
          footer={
            <>
              <Link
                className="text-sm text-muted-foreground"
                href={signUpPath()}
              >
                No account yet?
              </Link>

              <Link
                className="text-sm text-muted-foreground"
                href={passwordForgotPath()}
              >
                Forgot Password?
              </Link>
            </>
          }
        />
      </div>

      <RedirectToast />
    </>
  );
};

export default SignInPage;
