import { motion } from "motion/react";
import useReducedMotion from "../hooks/useReducedMotion";

export const EASE = [0.22, 1, 0.36, 1];

// Default scroll reveal: opacity + translateY only.
export default function Reveal({ as = "div", delay = 0, y = 40, duration = 1, amount = 0.3, className, style, children, ...rest }) {
  const reduced = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduced ? 0.4 : duration, delay: reduced ? 0 : delay, ease: EASE }}
      {...rest}
    >
      {children}
    </M>
  );
}

// Word-by-word masked heading reveal.
export function Heading({ as = "h2", className, children, delay = 0 }) {
  const reduced = useReducedMotion();
  const M = motion[as];
  const words = String(children).split(" ");
  const v = {
    h: { y: reduced ? 0 : "110%", opacity: 0 },
    s: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
  };
  return (
    <M className={className} aria-label={String(children)} initial="h" whileInView="s" viewport={{ once: true, amount: 0.6 }} transition={{ staggerChildren: 0.1, delayChildren: delay }}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="word"><motion.span className="word__in" variants={v}>{w}</motion.span></span>{" "}
        </span>
      ))}
    </M>
  );
}
