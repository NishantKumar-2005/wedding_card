import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { wedding } from "../data/wedding";
import { mainDateObj } from "../utils";
import Lotus from "../assets/svg/Lotus";
import Elephant from "../assets/svg/Elephant";
import Petals from "./Petals";
import Reveal, { EASE, Heading } from "./Reveal";
import useReducedMotion from "../hooks/useReducedMotion";

function Digit({ v }) {
  return (
    <span className="digit">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.b key={v} initial={{ y: "-70%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "70%", opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
          {String(v).padStart(2, "0")}
        </motion.b>
      </AnimatePresence>
    </span>
  );
}

function Countdown({ target }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = target.getTime() - now;
  if (diff <= 0) return null;
  const d = Math.floor(diff / 864e5);
  const h = Math.floor((diff % 864e5) / 36e5);
  const m = Math.floor((diff % 36e5) / 6e4);
  const sec = Math.floor((diff % 6e4) / 1000);
  return (
    <Reveal className="countdown" delay={0.2} aria-label="Countdown to the wedding">
      {[["Days", d], ["Hours", h], ["Minutes", m], ["Seconds", sec]].map(([l, v]) => (
        <div key={l} className="countdown__cell">
          <Digit v={v} />
          <span className="countdown__label">{l}</span>
        </div>
      ))}
    </Reveal>
  );
}

export default function DateReveal() {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [burst, setBurst] = useState(0);
  const { day, month, year, weekday } = wedding.mainDate;
  const plaques = [["Date", day], ["Month", month], ["Year", year]];

  return (
    <section className="sec sec--ivory date" aria-label="Wedding date">
      <Heading className="eyebrow">Save the date</Heading>
      <div className="date__stage" ref={ref}>
        <div className="date__lotus-wrap">
          <motion.button
            type="button"
            className="date__lotus-btn"
            aria-label="Scatter petals"
            initial={{ opacity: 0, scale: reduced ? 1 : 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            whileHover={reduced ? undefined : { scale: 1.06, rotate: -2 }}
            whileTap={reduced ? undefined : { scale: 0.94 }}
            transition={{ duration: 1.2, ease: EASE }}
            onClick={() => setBurst((b) => b + 1)}
          >
            <Lotus className="date__lotus" />
          </motion.button>
          {!reduced && <Petals key={burst} play={inView} />}
          <p className="hint">Tap the lotus</p>
        </div>

        <div className="date__row">
          <motion.div
            className="date__ele date__ele--l"
            initial={{ x: reduced ? 0 : -160, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
          >
            <motion.div animate={reduced ? {} : { y: [0, -5, 0], rotate: [0, 0.8, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}>
              <Elephant />
            </motion.div>
          </motion.div>

          <div className="date__plaques">
            {plaques.map(([label, value], i) => (
              <motion.div
                key={label}
                className="plaque"
                initial={{ rotateX: reduced ? 0 : 90, opacity: 0 }}
                animate={inView ? { rotateX: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: EASE, delay: 0.7 + i * 0.25 }}
                whileHover={reduced ? undefined : { y: -6, scale: 1.04, transition: { duration: 0.25 } }}
                whileTap={reduced ? undefined : { rotateX: 360, transition: { duration: 0.8, ease: EASE } }}
              >
                <span className="plaque__label">{label}</span>
                <b className="plaque__value">{value}</b>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="date__ele date__ele--r"
            initial={{ x: reduced ? 0 : 160, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
          >
            <motion.div animate={reduced ? {} : { y: [0, -5, 0], rotate: [0, -0.8, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
              <Elephant />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Reveal as="p" className="date__weekday">{weekday}</Reveal>
      <Countdown target={mainDateObj(wedding.mainDate)} />
    </section>
  );
}
