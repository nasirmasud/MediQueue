"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPending(true);
    toast.success("Subscribed. Watch your inbox for weekly case notes.");
    setEmail("");
    setPending(false);
  };

  return (
    <form className="flex flex-col gap-2 pt-1" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter medical email"
        className="w-full rounded-lg bg-surface-container px-3.5 py-2.5 text-body-sm text-on-surface transition-colors placeholder:text-outline focus:bg-surface-container-high focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-primary-container px-3 py-2 text-label-md text-on-primary-container transition-colors hover:bg-primary-container/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}

export default NewsletterForm;
