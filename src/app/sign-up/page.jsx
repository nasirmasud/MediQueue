"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoogleMark } from "@/components/ui/GoogleMark";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { authClient } from "@/lib/auth-client";
import { LogIn, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

const SignUpPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      image: user.image,
      name: user.name,
      role: user.role,
    });

    if (data) {
      router.push("/");
    }

    if (error) {
      alert(error?.message || "Something went wrong");
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
          <Eyebrow>Join MediQueue</Eyebrow>
          <h1 className="mt-3 text-headline-lg text-on-surface">Create your account</h1>
          <p className="mt-2 text-body-md text-on-surface-variant">
            Book verified medical tutors and track your sessions in one place.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-label-md text-on-surface">
              Full name
            </label>
            <Input id="name" name="name" type="text" required placeholder="Your full name" />
          </div>

          <div>
            <label htmlFor="image" className="mb-1.5 block text-label-md text-on-surface">
              Profile image URL
            </label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/your-photo.jpg"
            />
          </div>

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
            <label htmlFor="role" className="mb-1.5 block text-label-md text-on-surface">
              Register as
            </label>
            <Select id="role" name="role" required>
              <option value="student">I am a student</option>
              <option value="tutor">I am a tutor</option>
            </Select>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-label-md text-on-surface">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              pattern={PASSWORD_PATTERN.source}
              title="Use at least 8 characters with 1 uppercase letter and 1 number"
              placeholder="••••••••"
            />
            <p className="mt-1.5 text-body-sm text-on-surface-variant">
              At least 8 characters, with 1 uppercase letter and 1 number.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Button type="submit" className="flex-1">
              <LogIn aria-hidden="true" className="size-4" />
              Sign Up
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
            Sign up with Google
          </Button>

          <p className="mt-1 text-center text-body-md text-on-surface-variant">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary transition-colors hover:text-surface-tint"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Card>
    </Section>
  );
};

export default SignUpPage;
