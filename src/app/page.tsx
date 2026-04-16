import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ValueProps from "@/components/sections/ValueProps";
import LoanPrograms from "@/components/sections/LoanPrograms";
import InvestorPreview from "@/components/sections/InvestorPreview";
import Testimonials from "@/components/sections/Testimonials";
import GetInTouch from "@/components/sections/GetInTouch";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ValueProps />
      <LoanPrograms />
      <InvestorPreview />
      <Testimonials />
      <GetInTouch />
    </>
  );
}
