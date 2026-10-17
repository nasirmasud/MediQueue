"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoogleMark } from "@/components/ui/GoogleMark";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { authClient } from "@/lib/auth-client";
import { LogIn, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const SignInPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      router.push("/");
    }

    if (error) {
      alert(error.message || "Invalid email or password");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      alert("Google sign in failed. Please try again.");
    }
  };

  return (
    <Section tone="surface" spacing="lg">
      <Card padding="none" shadow="xl" className="mx-auto w-full max-w-md p-6 sm:p-8">
        <div className="mb-7 text-center">
          <Eyebrow>Welcome Back</Eyebrow>
          <h1 className="mt-3 text-headline-lg text-on-surface">Sign in to MediQueue</h1>
          <p className="mt-2 text-body-md text-on-surface-variant">
            Pick up where you left off with your mentors and sessions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-label-md text-on-surface">
              Email address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              pattern={EMAIL_PATTERN.source}
              title="Please enter a valid email address"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label htmlFor="password" className="text-label-md text-on-surface">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-label-md text-primary transition-colors hover:text-surface-tint"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Button type="submit" className="flex-1">
              <LogIn aria-hidden="true" className="size-4" />
              Sign In
            </Button>
            <Button type="reset" variant="secondary" className="flex-1">
              <RotateCcw aria-hidden="true" className="size-4" />
              Reset
            </Button>
          </div>

          <div className="flex items-center gap-4 py-1">
            <span className="h-px flex-1 bg-outline-variant" />
            <span className="text-label-sm uppercase text-outline">Or continue with</span>
            <span className="h-px flex-1 bg-outline-variant" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            block
          >
            <GoogleMark />
            Sign in with Google
          </Button>

          <p className="mt-1 text-center text-body-md text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-primary transition-colors hover:text-surface-tint"
            >
              Create an account
            </Link>
          </p>
        </form>
      </Card>
    </Section>
  );
};

export default SignInPage;
