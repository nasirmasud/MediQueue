import { Button } from "@/components/ui/Button";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";

export default function NotFoundContent() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-surface-container-high motion-safe:animate-bounce">
            <AlertCircle className="h-12 w-12 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-display-lg text-transparent">
            404
          </h1>
          <h2 className="text-headline-md text-on-surface">Page Not Found</h2>
          <p className="text-body-md text-on-surface-variant">
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <Button as={Link} href="/" size="lg" shape="pill">
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
