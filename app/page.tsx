import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import LogoClouds from "@/components/home/LogoClouds";
import Pricing from "@/components/home/Pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <LogoClouds />
      <Pricing />
      <CTA />
    </main>
  );
}
