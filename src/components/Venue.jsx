import { wedding } from "../data/wedding";
import { isReal } from "../utils";
import { PinIcon } from "../assets/svg/Icons";
import Divider from "../assets/svg/Divider";
import Reveal, { Heading } from "./Reveal";

export default function Venue() {
  const { name, address, mapsUrl } = wedding.venue;
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  return (
    <section className="sec sec--ivory venue" aria-label="Venue">
      <Heading className="eyebrow">The Venue</Heading>
      <Reveal delay={0.1}><Divider /></Reveal>
      {isReal(name) && <Reveal as="h3" delay={0.15} className="venue__name">{name}</Reveal>}
      <Reveal as="p" delay={0.2} className="venue__addr">{address}</Reveal>
      <Reveal delay={0.3}>
        <a className="btn btn--dark" href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <PinIcon width="20" height="20" /> Get Directions
        </a>
      </Reveal>
      <Reveal delay={0.35} className="venue__map">
        <iframe title="Venue map" src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </Reveal>
    </section>
  );
}
