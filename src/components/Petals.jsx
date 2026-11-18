import { useMemo } from "react";
import { motion } from "motion/react";
import { Petal } from "../assets/svg/Lotus";

const COLORS = ["#e8cf8a", "#c9a24a", "#9c2a3e", "#f2c9a0"];

// One-shot burst of petals from the centre of its parent. Pure transform + opacity.
export default function Petals({ play, count = 18 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2 + Math.random() * 0.5;
        const d = 110 + Math.random() * 150;
        return {
          dx: Math.cos(a) * d,
          dy: Math.sin(a) * d * 0.8,
          rot: a * (180 / Math.PI) + 90 + Math.random() * 90,
          size: 14 + Math.random() * 14,
          color: COLORS[i % COLORS.length],
          drift: 20 + Math.random() * 40,
          delay: Math.random() * 0.25,
        };
      }),
    [count]
  );
  if (!play) return null;
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => (
        <motion.span
          key={i}
          className="petals__p"
          style={{ width: p.size, height: p.size * 1.3 }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
          animate={{
            x: [0, p.dx, p.dx * 1.08],
            y: [0, p.dy, p.dy + p.drift],
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.9],
            rotate: [0, p.rot, p.rot + 40],
          }}
          transition={{ duration: 3.2, delay: p.delay, ease: "easeOut", times: [0, 0.4, 1] }}
        >
          <Petal fill={p.color} />
        </motion.span>
      ))}
    </div>
  );
}
