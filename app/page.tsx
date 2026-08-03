import Nav from "@/components/Nav";
import Masthead from "@/components/Masthead";
import TechStrip from "@/components/TechStrip";
import Range from "@/components/Range";
import ProjectsList from "@/components/ProjectsList";
import Principles from "@/components/Principles";
import ContactBand from "@/components/ContactBand";

export default function Home() {
  return (
    <>
      <Nav />
      <Masthead />
      <TechStrip />
      <main className="container-page flex-1">
        <Range />
        <ProjectsList />
        <Principles />
      </main>
      <ContactBand />
    </>
  );
}
