import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    quote:
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-base-100">
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-10 left-1/3 h-80 w-80 rounded-full bg-[#C6F432]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#C6F432]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#3B5BFF]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20">
        {/* Heading + intro */}
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
          <h2 className="text-3xl font-semibold md:text-5xl">
            Discover What Our
            <br />
            Community Is Saying
          </h2>
          <p className="text-lg leading-relaxed text-base-content/70 text-justify">
            At ByteSpace, our vibrant community of learners and creators is at
            the heart of what we do. Hear directly from those who have
            experienced the transformative journey of learning and creating on
            our platform. Explore testimonials that reflect the diverse
            perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid items-start gap-6 md:grid-cols-3 ">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="rounded-3xl bg-base-100 p-10 shadow-lg shadow-base-content/5"
            >
              <Image
                src={t.avatar}
                alt={t.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <h3 className="mt-4 text-base font-semibold">{t.name}</h3>
              <p className="text-lg text-primary">{t.role}</p>
              <blockquote className="mt-4 text-lg leading-relaxed text-base-content/70">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}