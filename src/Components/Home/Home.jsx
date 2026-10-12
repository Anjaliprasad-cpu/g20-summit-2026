import Formsection from "./Formsection";
import AboutSection from "./AboutSection";
import SpeakersSection from "./SpeakersSection";
import HighlightsSection from "./HighlightsSection";
import FooterSection from "./FooterSection";

export default function Home() {
  return (
    <main>
      <Formsection />
      <AboutSection />
      <SpeakersSection />
      <HighlightsSection />
      <FooterSection />
    </main>
  );
}
