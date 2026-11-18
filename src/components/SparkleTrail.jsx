import { useEffect } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

// Gold sparkles follow the mouse and pop on tap. DOM nodes animated with WAAPI (transform + opacity only).
export default function SparkleTrail() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const layer = document.createElement("div");
    layer.className = "sparkles";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    const spawn = (x, y, spread = 28, n = 1) => {
      for (let i = 0; i < n; i++) {
        if (layer.childElementCount > 40) return;
        const s = document.createElement("i");
        const size = 6 + Math.random() * 9;
        s.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px`;
        layer.appendChild(s);
        const dx = (Math.random() - 0.5) * spread * 2;
        const dy = (Math.random() - 0.2) * spread * 2;
        const a = s.animate(
          [
            { transform: "translate(-50%,-50%) scale(0) rotate(0deg)", opacity: 1 },
            { transform: `translate(calc(-50% + ${dx / 2}px),calc(-50% + ${dy / 2}px)) scale(1) rotate(90deg)`, opacity: 1, offset: 0.4 },
            { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy + 18}px)) scale(0) rotate(200deg)`, opacity: 0 },
          ],
          { duration: 700 + Math.random() * 400, easing: "ease-out" }
        );
        a.onfinish = () => s.remove();
      }
    };

    let last = 0;
    const move = (e) => {
      if (e.pointerType !== "mouse") return;
      const t = performance.now();
      if (t - last < 45) return;
      last = t;
      spawn(e.clientX, e.clientY, 22);
    };
    const down = (e) => spawn(e.clientX, e.clientY, 46, e.pointerType === "mouse" ? 8 : 10);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      layer.remove();
    };
  }, [reduced]);
  return null;
}
