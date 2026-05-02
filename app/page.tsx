import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Hand = dynamic(() => import("@/components/Hand"));
const Skills = dynamic(() => import("@/components/Skills"));
const Experience = dynamic(() => import("@/components/Exp"));
const Projects = dynamic(() => import("@/components/Proj"));
const Footer = dynamic(() => import("@/components/Footer"));

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
