import Nav from "@/components/Nav";
import Masthead from "@/components/Masthead";
import TechStrip from "@/components/TechStrip";
import Range from "@/components/Range";
import ProjectsList from "@/components/ProjectsList";
import AgentsSection from "@/components/AgentsSection";
import WrongSection from "@/components/WrongSection";
import Principles from "@/components/Principles";
import ContactBand from "@/components/ContactBand";

export default function Home() {
  return (
    <>
      <a href="#projects" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <Masthead />
      <TechStrip />
      <main className="container-page flex-1">
        <ProjectsList />
        <AgentsSection />
        <Range />
        <WrongSection />
        <Principles />
      </main>
      <ContactBand />
    </>
  );
}
