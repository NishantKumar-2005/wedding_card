import { useSyncExternalStore } from "react";

const Q = "(prefers-reduced-motion: reduce)";
const subscribe = (cb) => {
  const m = window.matchMedia(Q);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(Q).matches, () => false);
}
