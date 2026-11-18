import { wedding } from "../data/wedding";
import Divider from "../assets/svg/Divider";
import TornEdge from "../assets/svg/TornEdge";
import Reveal, { Heading } from "./Reveal";
import EventCard from "./EventCard";

export default function Events() {
  return (
    <section className="sec sec--maroon events" aria-label="Wedding festivities">
      <Heading className="eyebrow eyebrow--light">Wedding Festivities</Heading>
      <Reveal delay={0.1}><Divider /></Reveal>
      <div className="events__grid">
        {wedding.events.map((e, i) => (
          <EventCard key={e.id} event={e} index={i} />
        ))}
      </div>
      <TornEdge fill="#faf5ec" />
    </section>
  );
}
