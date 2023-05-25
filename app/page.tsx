import CTA from "@/components/home/CTA";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
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
