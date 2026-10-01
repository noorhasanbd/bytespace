import Image from "next/image";
import Link from "next/link";

type Path = {
  label: string;
  icon: string;
};

const paths: Path[] = [
  { label: "Design", icon: "/explore/design.png" },
  { label: "Development", icon: "/explore/development.png" },
  { label: "IT & Software", icon: "/explore/itsoftware.png" },
  { label: "Business", icon: "/explore/business.png" },
  { label: "Marketing", icon: "/explore/marketing.png" },
  { label: "Photography", icon: "/explore/photography.png" },
];

export default function Explore() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h2 className="text-3xl font-semibold md:text-4xl">
        Explore Diverse Learning Paths at Bytespace
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-base text-base-content/60">
        At Bytespace, we believe in empowering individuals through knowledge.
        Our diverse range of courses spans various fields, ensuring there&apos;s
        something for everyone. Unleash your potential and explore our
        carefully curated categories.
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {paths.map((path) => (
          <li key={path.label}>
            <Link
              href={`/courses?category=${encodeURIComponent(path.label)}`}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-base-300 px-4 py-8 transition-shadow hover:shadow-md"
            >
              {/* Green circle behind the icon */}
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C6F432] transition-transform group-hover:scale-110">
                <Image
                  src={path.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </span>
              <span className="text-base font-medium">{path.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}