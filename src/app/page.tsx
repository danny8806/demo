import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";
import MarqueeText from "@/components/MarqueeText";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider flip />
        <MarqueeText text="Web Development  App Development  UI/UX Design  Digital Marketing  ERP Solutions" speed={30} />
        <About />
        <SectionDivider />
        <CaseStudies />
        <SectionDivider flip />
        <MarqueeText text="Trusted by clients in Pathankot  Punjab  & beyond" speed={20} direction="right" />
        <Testimonials />
        <SectionDivider />
        <FaqSection />
        <SectionDivider flip />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
