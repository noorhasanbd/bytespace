
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white pt-25"
      style={
        {
          backgroundColor: "#1C39BB",
          "--grid-opacity": 0.15,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,var(--grid-opacity)) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(255,255,255,var(--grid-opacity)) 2px, transparent 2px)
          `,
          backgroundSize: "80px 80px",
        } as React.CSSProperties
      }
    >
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute inset-x-0 top-40 hidden items-start justify-between md:flex">
        <Image
          src="/hero/shape-green-squiggle.png"
          alt=""
          width={180}
          height={180}
        />
        <Image
          src="/hero/shape-green-pill.png"
          alt=""
          width={180}
          height={180}
        />
      </div>

      {/* White squiggle - left */}
      <Image
        src="/hero/shape-white-squiggle-left.png"
        alt=""
        width={120}
        height={120}
        className="absolute bottom-40 left-24 z-10 hidden md:block"
      />

      {/* White ring - left */}
      

      {/* White triangle - right */}
      <Image
        src="/hero/shape-triangle.png"
        alt=""
        width={140}
        height={140}
        className="absolute right-40 bottom-40 z-10 hidden md:block"
      />

      {/* White squiggle - right */}
      <div className="flex justify-center items-center">
        <Image
        src="/hero/shape-white-ring.png"
        alt=""
        width={250}
        height={150}
        className="absolute bottom-0 left-100 z-10 hidden md:block"
      />
      <Image
        src="/hero/shape-white-squiggle-right.png"
        alt=""
        width={250}
        height={140}
        className="absolute right-90 bottom-0 z-10 hidden md:block"
      />
      </div>

      {/* Green half circle */}
      <div className="absolute top-120 left-1/2 h-120 w-5xl -translate-x-1/2 rounded-t-full bg-[#C6F432]" />

      {/* Main content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-20 text-center">
        {/* Heading */}
        <h1 className="max-w-4xl text-4xl font-bold md:text-7xl weight-200">
          Get Access to Hundreds
          <br />
          Courses Available
        </h1>

        {/* Description */}
        <p className="mt-4 text-base">
          Unlock your creativity, gain valuable knowledge, and grow your
          business with our wide range of courses.
        </p>

        {/* Search */}
        +

        {/* Student and floating cards */}
        <div className="relative mt-10 flex w-full justify-center">
          {/* Student image */}
          <Image
            src="/hero/boy.png"
            alt="Student holding a laptop"
            width={420}
            height={480}
            priority
            className="relative z-10"
          />

          {/* UX Design card */}
          <div className="absolute left-1/2 top-[22%] z-20 w-[150px] -translate-x-[180%] rounded-lg bg-white px-3 py-2 text-left shadow-md">
            <div className="flex items-center gap-2">
              
              <div>
                <p className="text-base font-medium text-gray-800">
                  UI/UX Design
                </p>
                <p className="text-[8px] text-gray-400">
                  200 Courses • 1000+ Students 
                </p>
              </div>
            </div>
          </div>

          {/* Learning progress card */}
          <div className="absolute right-1/2 top-[22%] z-20 w-[150px] translate-x-[180%] rounded-lg bg-white p-3 text-left shadow-md">
            <p className="text-[14px] font-semibold text-gray-500">
              Learning Progress
            </p>
            <p className="mt-1 text-5xl font-bold leading-none text-gray-800">
              55%
            </p>
            <div className="mt-3 h-1.5 rounded-full bg-gray-100">
              <div className="h-full w-[55%] rounded-full bg-[#C6F432]" />
            </div>
          </div>

          {/* Happy students card */}
          <div className="absolute bottom-[22%] left-1/2 z-20 w-[175px] -translate-x-[195%] rounded-lg bg-white p-2 text-left shadow-md">
            <p className="text-[10px] font-medium text-gray-800">
              Happy Students
            </p>
            <div className="mt-1">
              <span className="rounded bg-pink-100 px-1.5 py-0.5 text-[8px] font-medium text-pink-700">
                5.0 ★
              </span>
            </div>
            <div className="mt-2 flex items-center">
              {["A", "S", "M", "R", "N"].map((initial, index) => (
                <div
                  key={index}
                  className="-ml-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-pink-100 text-[8px] font-semibold text-pink-700 first:ml-0"
                >
                  {initial}
                </div>
              ))}
              <span className="ml-1 flex h-6 items-center justify-center rounded-full bg-[#C6F432] px-1.5 text-[8px] font-semibold text-gray-900">
                2K+
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}