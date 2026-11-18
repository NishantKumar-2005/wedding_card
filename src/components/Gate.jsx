import { useState } from "react";
import { motion } from "motion/react";
import { wedding } from "../data/wedding";
import Elephant from "../assets/svg/Elephant";
import Lotus from "../assets/svg/Lotus";
import { EASE } from "./Reveal";
import useReducedMotion from "../hooks/useReducedMotion";

function Door({ side, reduced }) {
  const left = side === "left";
  return (
    <motion.div
      className={`gate__door gate__door--${side}`}
      variants={{
        closed: { rotateY: 0 },
        open: { rotateY: reduced ? 0 : left ? 100 : -100, opacity: reduced ? 0 : 1, transition: { duration: reduced ? 0.5 : 1.4, ease: EASE, delay: reduced ? 0 : 0.45 } },
      }}
      style={{ transformOrigin: left ? "left center" : "right center" }}
    >
      <div className="gate__door-frame">
        <Lotus className="gate__lotus" back="#7a1c2e" front="#c9a24a" inner="#faf5ec" />
        <div className="gate__rows" />
        <Elephant className={`gate__elephant ${left ? "" : "gate__elephant--flip"}`} />
      </div>
    </motion.div>
  );
}

export default function Gate({ onOpen, onDone }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { invocation, groom, bride } = wedding;

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    onOpen?.();
  };

  return (
    <motion.div
      className="gate"
      initial="closed"
      animate={open ? "open" : "closed"}
      role="dialog"
      aria-label="Wedding invitation"
      style={{ pointerEvents: open ? "none" : "auto" }}
    >
      <Door side="left" reduced={reduced} />
      <Door side="right" reduced={reduced} />

      <motion.div
        className="gate__card"
        variants={{
          closed: { opacity: 1, scale: 1 },
          open: { opacity: 0, scale: 0.9, transition: { duration: 0.5, ease: EASE } },
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={open ? "open" : { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: EASE, delay: 0.2 } }}
      >
        <p className="gate__invocation hindi">{invocation}</p>
        <p className="gate__sub">You are cordially invited</p>
        <h1 className="gate__names script">
          {groom} <span>&amp;</span> {bride}
        </h1>
        <motion.button
          type="button"
          className="btn btn--pulse"
          onClick={handleOpen}
          animate={open ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Tap to Open
        </motion.button>
      </motion.div>

      {/* gate unmounts after the doors finish */}
      <motion.span
        aria-hidden="true"
        className="gate__done"
        variants={{ closed: { opacity: 0 }, open: { opacity: 1, transition: { delay: reduced ? 0.6 : 2 } } }}
        onAnimationComplete={(def) => def === "open" && onDone?.()}
      />
    </motion.div>
  );
}
