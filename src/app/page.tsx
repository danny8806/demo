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
import SmoothScroll from "@/components/SmoothScroll";
import ParticleConstellation from "@/components/ParticleConstellation";
import PerspectiveScroll from "@/components/PerspectiveScroll";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <SmoothScroll>
      <PageLoader />
      <NoiseOverlay />
      <ParticleConstellation />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <PerspectiveScroll>
          <Services />
        </PerspectiveScroll>
        <SectionDivider flip />
        <MarqueeText text="Web Development  App Development  UI/UX Design  Digital Marketing  ERP Solutions" speed={30} />
        <PerspectiveScroll>
          <About />
        </PerspectiveScroll>
        <SectionDivider />
        <PerspectiveScroll>
          <CaseStudies />
        </PerspectiveScroll>
        <SectionDivider flip />
        <MarqueeText text="Trusted by clients in Pathankot  Punjab  & beyond" speed={20} direction="right" />
        <PerspectiveScroll>
          <Testimonials />
        </PerspectiveScroll>
        <SectionDivider />
        <PerspectiveScroll>
          <FaqSection />
        </PerspectiveScroll>
        <SectionDivider flip />
        <PerspectiveScroll>
          <Contact />
        </PerspectiveScroll>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
