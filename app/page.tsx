import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatBanner from "@/components/StatBanner";
import Principles from "@/components/Principles";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <StatBanner />
        <Principles />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
