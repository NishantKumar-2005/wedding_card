import { useEffect, useRef } from "react";
import Lenis from "lenis";
import useReducedMotion from "./useReducedMotion";

// Smooth scroll via a single rAF loop. Locked (stopped) until the gate is opened.
export default function useLenis(locked) {
  const reduced = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.2 });
    lenisRef.current = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    document.documentElement.style.overflow = locked ? "hidden" : "";
    const l = lenisRef.current;
    if (l) locked ? l.stop() : l.start();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [locked, reduced]);
}
