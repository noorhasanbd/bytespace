import CreatorCTA from "@/components/homepage/CreatorCTA";
import Discover from "@/components/homepage/Discover";
import Explore from "@/components/homepage/Explore";
import Features from "@/components/homepage/Feature";
import Hero from "@/components/homepage/Hero";
import Partners from "@/components/homepage/Partners";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Partners/>
      <Discover/>
      <Explore/>
      <Features/>
      <CreatorCTA/>
      <div className="flex-1">
        {/* Additional content can go here */}
      </div>
    </div>
  );
}
