"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace with a real API call later
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          className="h-12 w-full max-w-sm rounded-full border border-base-300 bg-transparent px-6 text-base outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="h-12 shrink-0 rounded-full bg-[#C6F432] px-8 text-base font-medium text-black transition-opacity hover:opacity-80"
        >
          Subscribe
        </button>
      </form>

      {subscribed && (
        <p role="status" className="mt-3 text-sm text-primary">
          Thanks for subscribing!
        </p>
      )}
    </div>
  );
}