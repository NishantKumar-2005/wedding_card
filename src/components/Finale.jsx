import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { wedding } from "../data/wedding";
import { isReal } from "../utils";
import Palace from "../assets/svg/Palace";
import { InstagramIcon, PinIcon, ShareIcon } from "../assets/svg/Icons";
import Reveal from "./Reveal";
import Petals from "./Petals";
import useReducedMotion from "../hooks/useReducedMotion";
import Modal from "./Modal";

export default function Finale() {
  const [ig, setIg] = useState(false);
  const [toast, setToast] = useState("");
  const [burst, setBurst] = useState(0);
  const reduced = useReducedMotion();
  const closeIg = useCallback(() => setIg(false), []);
  const hasIg = isReal(wedding.instagram);

  const share = async () => {
    const data = { title: document.title, text: `${wedding.groom} & ${wedding.bride} — you're invited!`, url: window.location.href };
    try {
      if (navigator.share) return await navigator.share(data);
      await navigator.clipboard.writeText(data.url);
      setToast("Link copied");
    } catch (e) {
      if (e?.name === "AbortError") return;
      setToast("Copy the link from your browser bar");
    }
    setTimeout(() => setToast(""), 2200);
  };

  return (
    <section className="finale" aria-label="Finale">
      <Palace variant="dusk" className="finale__art" />
      <div className="finale__veil" />
      <Reveal className="finale__card">
        <p className="finale__line">We look forward to celebrating with you</p>
        <div className="finale__burst">
          <motion.h2
            className="finale__names script"
            onClick={() => setBurst((b) => b + 1)}
            whileHover={reduced ? undefined : { scale: 1.04 }}
            whileTap={reduced ? undefined : { scale: 0.96 }}
            title="Tap for a surprise"
          >
            {wedding.groom} <span>&amp;</span> {wedding.bride}
          </motion.h2>
          {burst > 0 && !reduced && <Petals key={burst} play count={26} />}
        </div>
        {isReal(wedding.hashtag) && <p className="finale__tag">{wedding.hashtag}</p>}
        <div className="finale__icons">
          {hasIg && (
            <button type="button" className="icon-btn" onClick={() => setIg(true)} aria-label="Follow the couple on Instagram">
              <InstagramIcon width="22" height="22" />
            </button>
          )}
          <a className="icon-btn" href={wedding.venue.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open venue in maps">
            <PinIcon width="22" height="22" />
          </a>
          <button type="button" className="icon-btn" onClick={share} aria-label="Share this invitation">
            <ShareIcon width="22" height="22" />
          </button>
        </div>
      </Reveal>

      <Modal open={ig} onClose={closeIg} title="Follow the Couple">
        <p className="modal__text">Share your moments with us and follow along on Instagram.</p>
        <a className="btn btn--dark" href={wedding.instagram} target="_blank" rel="noopener noreferrer">
          <InstagramIcon width="20" height="20" /> Open Instagram
        </a>
      </Modal>

      <AnimatePresence>
        {toast && (
          <motion.div className="toast" role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
