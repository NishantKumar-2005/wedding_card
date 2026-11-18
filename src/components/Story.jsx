import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { wedding } from "../data/wedding";
import useMedia from "../hooks/useMedia";
import useReducedMotion from "../hooks/useReducedMotion";
import Lotus from "../assets/svg/Lotus";
import Reveal, { Heading } from "./Reveal";

function Photo({ src, caption }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="frame__photo">
      {failed ? (
        <div className="frame__placeholder"><Lotus /></div>
      ) : (
        <img src={src} alt={caption || "Sanjay and Shikha"} width="800" height="1000" loading="lazy" decoding="async" onError={() => setFailed(true)} />
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Frame({ item, i, reduced }) {
  const dir = i % 2 ? -1 : 1;
  return (
    <motion.li
      className="frame"
      style={{ transformOrigin: "50% 0%" }}
      initial={{ rotate: reduced ? 0 : 6 * dir, opacity: 0 }}
      whileInView={{ rotate: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={reduced ? undefined : { rotate: 3 * dir }}
      whileTap={reduced ? undefined : { rotate: -6 * dir }}
      transition={{ type: "spring", stiffness: 70, damping: 10, opacity: { duration: 0.6 } }}
    >
      <motion.div
        className="frame__sway"
        style={{ transformOrigin: "50% 0%" }}
        animate={reduced ? {} : { rotate: [-1, 1, -1] }}
        transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
      >
        <span className="frame__cord frame__cord--l" />
        <span className="frame__cord frame__cord--r" />
        <div className="frame__box">
          {item.type === "photo" ? (
            <Photo {...item} />
          ) : (
            <blockquote className="frame__text">
              <span aria-hidden="true">“</span>
              {item.text}
            </blockquote>
          )}
        </div>
      </motion.div>
    </motion.li>
  );
}

function Track({ reduced }) {
  return (
    <>
      <span className="story__string" aria-hidden="true" />
      <ul className="story__frames">
        {wedding.story.map((it, i) => (
          <Frame key={i} item={it} i={i} reduced={reduced} />
        ))}
      </ul>
    </>
  );
}

function DesktopStory({ reduced }) {
  const outer = useRef(null);
  const track = useRef(null);
  const [shift, setShift] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  useLayoutEffect(() => {
    const measure = () => setShift(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={outer} className="story__pin" style={{ height: `${100 + Math.min(shift / 6, 220)}svh` }}>
      <div className="story__sticky">
        <StoryHead />
        <motion.div ref={track} className="story__track" style={{ x }}>
          <Track reduced={reduced} />
        </motion.div>
      </div>
    </div>
  );
}

function StoryHead() {
  return (
    <div className="story__head">
      <Heading className="eyebrow">Our Story</Heading>
      <Reveal as="p" delay={0.1} className="story__sub">A few moments along the way</Reveal>
    </div>
  );
}

export default function Story() {
  const desktop = useMedia("(min-width: 1024px)");
  const reduced = useReducedMotion();
  if (!wedding.story?.length) return null;
  return (
    <section className="sec sec--ivory story" aria-label="Our story">
      {desktop ? (
        <DesktopStory reduced={reduced} />
      ) : (
        <>
          <StoryHead />
          <div className="story__swipe">
            <Track reduced={reduced} />
          </div>
        </>
      )}
    </section>
  );
}
