import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import WhyChoose from "@/components/sections/WhyChoose";
import About from "@/components/sections/About";
import Cta from "@/components/sections/Cta";
import News from "@/components/sections/News";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      <WhyChoose />
      <About />      
      <News />
      <Cta />
      <Footer />
    </>
  );
}
