import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { wedding } from "../data/wedding";
import Palace from "../assets/svg/Palace";
import { ChevronDown } from "../assets/svg/Icons";
import useReducedMotion from "../hooks/useReducedMotion";
import { EASE } from "./Reveal";

function Drift({ on }) {
  const items = useMemo(
    () =>
      Array.from({ length: 16 }).map(() => ({
        left: Math.random() * 100,
        size: 8 + Math.random() * 10,
        dur: 9 + Math.random() * 9,
        delay: -Math.random() * 14,
        dx: (Math.random() - 0.5) * 160,
        c: ["#f2a516", "#e6720f", "#e8cf8a", "#d9577a"][Math.floor(Math.random() * 4)],
      })),
    []
  );
  if (!on) return null;
  return (
    <div className="drift" aria-hidden="true">
      {items.map((p, i) => (
        <i key={i} style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.2, background: p.c, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, "--dx": `${p.dx}px` }} />
      ))}
    </div>
  );
}

export default function Hero({ started }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const textO = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const item = (i) => ({
    initial: { opacity: 0, y: reduced ? 0 : 36 },
    animate: started ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduced ? 0.5 : 1.1, delay: reduced ? 0 : 0.5 + i * 0.35, ease: EASE },
  });

  return (
    <section className="hero" ref={ref} aria-label="Welcome">
      <motion.div className="hero__art" style={reduced ? undefined : { y: artY }}>
        <motion.div
          className="hero__zoom"
          animate={started && !reduced ? { scale: 1.08 } : { scale: 1 }}
          transition={{ duration: 12, ease: "linear" }}
        >
          <Palace variant="day" className="hero__svg" />
        </motion.div>
      </motion.div>
      <div className="hero__scrim" />
      {!reduced && <Drift on={started} />}
      <motion.div className="hero__text" style={reduced ? undefined : { y: textY, opacity: textO }}>
        <motion.p className="hero__kicker" {...item(0)}>Together with our families</motion.p>
        <motion.h2 className="hero__name script" {...item(1)}>{wedding.groom}</motion.h2>
        <motion.span className="hero__amp script" {...item(2)}>&amp;</motion.span>
        <motion.h2 className="hero__name script" {...item(3)}>{wedding.bride}</motion.h2>
      </motion.div>
      <div className="hero__chevron" aria-hidden="true">
        <motion.div animate={reduced ? {} : { y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown width="26" height="26" />
        </motion.div>
      </div>
    </section>
  );
}
