import CreatorCTA from "@/components/homepage/CreatorCTA";
import Discover from "@/components/homepage/Discover";
import Explore from "@/components/homepage/Explore";
import Features from "@/components/homepage/Feature";
import Hero from "@/components/homepage/Hero";
import Partners from "@/components/homepage/Partners";
import Testimonials from "@/components/homepage/Testimonials";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Partners/>
      <Discover/>
      <Explore/>
      <Features/>
      <CreatorCTA/>
      <Testimonials/>
    </div>
  );
}
