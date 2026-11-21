import { wedding } from "../data/wedding";
import Scroll, { ScrollItem } from "./Scroll";

export default function Gallery() {
  const photos = wedding.gallery || [];
  if (!photos.length) return null;
  return (
    <section className="sec sec--ivory" aria-label="Gallery">
      <Scroll title="Our Moments Together" className="gallery">
        <div className="gallery__grid">
          {photos.map((src, i) => (
            <ScrollItem key={i} className="gallery__item">
              <img src={src} alt={`${wedding.groom} and ${wedding.bride}`} loading="lazy" decoding="async" />
            </ScrollItem>
          ))}
        </div>
      </Scroll>
    </section>
  );
}
