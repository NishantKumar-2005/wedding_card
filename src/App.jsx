import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "./data/wedding";
import { isReal } from "./utils";
import useLenis from "./hooks/useLenis";
import Gate from "./components/Gate";
import Hero from "./components/Hero";
import Family, { ListScroll } from "./components/Family";
import DateReveal from "./components/DateReveal";
import Story from "./components/Story";
import Events from "./components/Events";
import Venue from "./components/Venue";
import Finale from "./components/Finale";
import MusicToggle from "./components/MusicToggle";
import ProgressBar from "./components/ProgressBar";
import { createTune } from "./audio/softTune";
import SparkleTrail from "./components/SparkleTrail";

export default function App() {
  const [opened, setOpened] = useState(false); // user tapped
  const [gateGone, setGateGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null); // optional real music file
  const tune = useRef(null); // built-in soft tune (fallback / default)
  const fileBad = useRef(!isReal(wedding.music));
  const wanted = useRef(false);

  useLenis(!opened);

  useEffect(() => {
    tune.current = createTune({ onChange: setPlaying });
    if (isReal(wedding.music)) {
      const a = new Audio(wedding.music);
      a.loop = true;
      a.volume = 0.6;
      a.preload = "none";
      a.addEventListener("error", () => {
        fileBad.current = true;
        if (wanted.current) tune.current.start();
      });
      a.addEventListener("play", () => setPlaying(true));
      a.addEventListener("pause", () => setPlaying(false));
      audio.current = a;
    }
    return () => {
      audio.current?.pause();
      tune.current?.stop();
    };
  }, []);

  const handleOpen = useCallback(() => {
    setOpened(true);
    wanted.current = true;
    if (audio.current && !fileBad.current) {
      audio.current.play().catch(() => { fileBad.current = true; tune.current.start(); });
    } else {
      tune.current.start();
    }
  }, []);

  const toggleMusic = () => {
    if (audio.current && !fileBad.current) {
      audio.current.paused ? audio.current.play().catch(() => {}) : audio.current.pause();
    } else {
      tune.current.playing ? tune.current.stop() : tune.current.start();
    }
  };

  return (
    <>
      {!gateGone && <Gate onOpen={handleOpen} onDone={() => setGateGone(true)} />}
      {opened && <ProgressBar />}
      <SparkleTrail />
      {opened && <MusicToggle playing={playing} onToggle={toggleMusic} />}
      <main>
        <Hero started={opened} />
        <Family />
        <DateReveal />
        <Story />
        <Events />
        <Venue />
        <ListScroll title="Things to Note" items={wedding.notes} />
        <ListScroll title="With Best Compliments From" items={wedding.compliments} />
        <Finale />
      </main>
    </>
  );
}
