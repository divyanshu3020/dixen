import  Hand  from "@/components/Hand";
import Hero from "@/components/Hero"
import Skills from "@/components/Skills";
import Experience from "@/components/Exp";
import Projects from "@/components/Proj"
import Footer from "@/components/Footer"
// import Footer from "@/components/alternatives/Footer1";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Hand />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
    </>
  );
}
