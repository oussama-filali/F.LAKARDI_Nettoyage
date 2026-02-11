import { useState, useCallback } from "react";
import Intro from "./components/Intro";
import ScrollSlider from "./components/ScrollSlider";
import Hero from "./components/Hero";
import Realisations from "./components/Realisations";
import Contact from "./components/Contact";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  return (
    <>
      {!introDone && <Intro onComplete={handleIntroDone} />}
      <ScrollSlider locked={!introDone}>
        <Hero animateIn={introDone} />
        <Realisations />
        <Contact />
      </ScrollSlider>
    </>
  );
}
