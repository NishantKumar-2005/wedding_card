import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import useReducedMotion from "../hooks/useReducedMotion";
import { EASE } from "./Reveal";
import Divider from "../assets/svg/Divider";

const itemV = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

export function ScrollItem({ as = "div", className, children }) {
  const M = motion[as];
  return <M className={className} variants={itemV}>{children}</M>;
}

// Reusable manuscript scroll: paper unrolls (clip-path) while the bottom roller travels down.
export default function Scroll({ title, children, className = "" }) {
  const reduced = useReducedMotion();
  const paperRef = useRef(null);
  const [h, setH] = useState(400);

  useLayoutEffect(() => {
    const el = paperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    setH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  const paperV = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }
    : {
        hidden: { clipPath: "inset(0 0 100% 0)" },
        show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 2.2, ease: EASE, delayChildren: 1.4, staggerChildren: 0.16 } },
      };
  const rollerV = {
    hidden: (hh) => ({ y: reduced ? 0 : -hh }),
    show: { y: 0, transition: { duration: reduced ? 0 : 2.2, ease: EASE } },
  };

  return (
    <motion.div className={`scroll ${className}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <div className="scroll__roller" />
      <div className="scroll__wrap">
        <motion.div ref={paperRef} className="scroll__paper" variants={paperV}>
          <div className="scroll__inner">
            {title && (
              <ScrollItem as="h2" className="scroll__title">{title}</ScrollItem>
            )}
            {title && <ScrollItem className="scroll__rule"><Divider /></ScrollItem>}
            {children}
          </div>
        </motion.div>
      </div>
      <motion.div className="scroll__roller scroll__roller--bottom" variants={rollerV} custom={h} />
    </motion.div>
  );
}
