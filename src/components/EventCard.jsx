import { motion, useMotionValue, useSpring } from "motion/react";
import { isReal } from "../utils";
import { HaldiArt, KalashArt, MandapArt } from "../assets/svg/EventArt";
import { EASE } from "./Reveal";
import useReducedMotion from "../hooks/useReducedMotion";

const ART = { yellow: HaldiArt, green: KalashArt, maroon: MandapArt };

export default function EventCard({ event, index }) {
  const reduced = useReducedMotion();
  const Art = ART[event.theme] || MandapArt;
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 16 });
  const sx = useMotionValue(50);

  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
    sx.set((px + 0.5) * 100);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.article
      className={`event event--${event.theme}`}
      initial={{ opacity: 0, y: reduced ? 0 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: reduced ? 0 : index * 0.12, ease: EASE }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ perspective: 900 }}
    >
      <motion.div className="event__inner" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        <motion.div className="event__art" whileHover={reduced ? undefined : { scale: 1.08, rotate: -2 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}>
          <Art />
        </motion.div>
        <h3 className="event__name">{event.name}</h3>
        <ul className="event__meta">
          {isReal(event.date) && <li>{event.date}</li>}
          {isReal(event.time) && <li>{event.time}</li>}
          {isReal(event.venue) && <li>{event.venue}</li>}
        </ul>
      </motion.div>
    </motion.article>
  );
}
