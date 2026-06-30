import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider flip />
        <About />
        <SectionDivider />
        <CaseStudies />
        <SectionDivider flip />
        <Testimonials />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
