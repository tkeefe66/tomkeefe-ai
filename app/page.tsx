import Nav from "@/components/Nav";
import Masthead from "@/components/Masthead";
import TechStrip from "@/components/TechStrip";
import ProjectsList from "@/components/ProjectsList";
import AgentsSection from "@/components/AgentsSection";
import Principles from "@/components/Principles";
import ContactBand from "@/components/ContactBand";

export default function Home() {
  return (
    <>
      <Nav />
      <Masthead />
      <TechStrip />
      <main className="container-page flex-1">
        <ProjectsList />
        <AgentsSection />
        <Principles />
      </main>
      <ContactBand />
    </>
  );
}
