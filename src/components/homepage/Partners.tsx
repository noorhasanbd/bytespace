
import Image from "next/image";

const partners = [
  { name: "Partner 1", logo: "/partners/logo-1.png" },
  { name: "Partner 2", logo: "/partners/logo-2.png" },
  { name: "Partner 3", logo: "/partners/logo-3.png" },
  { name: "Partner 4", logo: "/partners/logo-f.png" },
  { name: "Partner 5", logo: "/partners/logo-5.png" },
];

export default function Partner() {
  return (
    <section className="w-full bg-[#F5F5F5] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:justify-between md:gap-x-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex w-[140px] items-center justify-center sm:w-[160px] md:w-auto md:flex-1"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={60}
                className="h-auto max-h-12 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}