import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-160px)] w-full overflow-hidden bg-[#0638D9] text-white">
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content */}
      <section className="relative z-10 flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-5 text-center">
        {/* 404 */}
        <div className="select-none text-[140px] font-black leading-[0.8] tracking-[-0.08em] text-[#C6F432] sm:text-[180px] md:text-[240px] lg:text-[300px]">
          404
        </div>

        {/* Heading */}
        <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          The page you are looking
          <br />
          for doesn’t exist
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-md text-xs leading-5 text-white/70 sm:text-sm">
          Try to use a correct url or go back to homepage to start again.
        </p>

        {/* Back button */}
        <Link
          href="/"
          className="mt-7 rounded-full bg-[#C6F432] px-7 py-3 text-sm font-semibold text-black transition hover:scale-105 hover:bg-[#d2ff4b]"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}