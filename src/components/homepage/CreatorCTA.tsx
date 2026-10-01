import Image from "next/image";

export default function CreatorCTA() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        backgroundColor: "#063DDE",
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(255,255,255,0.16) 1px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            rgba(255,255,255,0.16) 1px,
            transparent 1px
          )
        `,
        backgroundSize: "67px 67px",
      }}
    >
      {/* =========================
          DECORATIVE SHAPES
      ========================== */}

      {/* Green shape - top left */}
      <Image
        src="/cta/shape-green-squiggle-left-top.png"
        alt=""
        width={180}
        height={180}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-8
          -top-5
          z-10
          h-[85px]
          w-[85px]
          object-contain
          sm:left-0
          sm:h-[110px]
          sm:w-[110px]
          lg:h-[150px]
          lg:w-[150px]
        "
      />

      {/* White squiggle - top left */}
      <Image
        src="/cta/shape-white-squiggle-left-top.png"
        alt=""
        width={200}
        height={120}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-10
          top-[12px]
          z-10
          hidden
          h-[65px]
          w-[100px]
          object-contain
          sm:block
          sm:left-[20%]
          sm:h-auto
          sm:w-[130px]
          lg:left-[250px]
          lg:top-[18px]
        
        "
      />

      {/* Yellow triangle - top right */}
      <Image
        src="/hero/shape-triangle.png"
        alt=""
        width={150}
        height={140}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[5%]
          top-[12px]
          z-10
          h-[65px]
          w-[65px]
          rotate-[12deg]
          object-contain
          sm:right-[15%]
          sm:h-[90px]
          sm:w-[90px]
          lg:right-[255px]
          lg:top-[15px]
          lg:h-auto
          lg:w-[150px]
        "
      />

      {/* White shape - right */}
      <Image
        src="/cta/right-cone.png"
        alt=""
        width={200}
        height={180}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-[100px]
          z-10
          h-[90px]
          w-[90px]
          object-contain
          sm:-right-[25px]
          sm:top-[80px]
          sm:h-[120px]
          sm:w-[120px]
          lg:top-[20px]
          lg:h-[180px]
          
        "
      />

      {/* White ring - bottom left */}
      <Image
        src="/cta/circle-left-bottom.png"
        alt=""
        width={300}
        height={180}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[15px]
          -left-[35px]
          z-10
          h-[100px]
          w-[130px]
          object-contain
          sm:bottom-[-20px]
          sm:left-[10px]
          sm:h-[130px]
          sm:w-[200px]
          lg:left-[48px]
          lg:h-[180px]
          lg:w-[300px]
        "
      />

      {/* Green shape - bottom right */}
      <Image
        src="/cta/shape-green-squiggle-right-bottom.png"
        alt=""
        width={200}
        height={180}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          top-80
          -right-8
          z-10
          h-[100px]
          w-[110px]
          object-contain
          sm:bottom-0
          sm:right-0
          sm:h-[130px]
          sm:w-[150px]
          lg:right-[30px]
          lg:h-[180px]
          lg:w-[200px]
        "
      />

      {/* =========================
          CONTENT
      ========================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          h-full
          max-w-[900px]
          flex-col
          items-center
          justify-center
          px-5
          pb-20
          text-center
          sm:px-6
          sm:pb-24
        "
      >
        <h2
          className="
            max-w-[700px]
            pt-24
            text-[25px]
            font-bold
            leading-[1.15]
            tracking-[-0.5px]
            sm:pt-28
            sm:text-3xl
            lg:pt-30
            lg:text-5xl
          "
        >
          Unlock Your Potential as a
          <br />
          Creator with ByteSpace
        </h2>

        <p
          className="
            mt-4
            max-w-[760px]
            text-xs
            leading-[1.7]
            text-white/80
            sm:mt-5
            sm:text-[10px]
            md:text-[11px]
          "
        >
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now and become a part of a community
          comprising over 10,000 local and international creators. Utilize our
          Course Editor, and showcase your expertise by publishing your finest
          course on the ByteSpace Course Library.
        </p>

        <button
          type="button"
          className="
            mt-5
            rounded-full
            bg-[#C6FF00]
            px-5
            py-2
            text-sm
            font-medium
            text-black
            transition-transform
            duration-200
            hover:scale-105
            sm:text-base
          "
        >
          Join as Creator
        </button>
      </div>
    </section>
  );
}
