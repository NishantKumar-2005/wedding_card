import { wedding } from "../data/wedding";
import { realList } from "../utils";
import Scroll, { ScrollItem } from "./Scroll";
import Lotus from "../assets/svg/Lotus";

function Block({ f, relation }) {
  const parents = realList(f.parents);
  const grand = realList(f.grandparents);
  return (
    <div className="family__block">
      {grand.length > 0 && <ScrollItem className="family__line">{relation === "son" ? "Grandson" : "Granddaughter"} of {grand.join(" & ")}</ScrollItem>}
      <ScrollItem as="h3" className="family__name script">{f.title}</ScrollItem>
      {parents.length > 0 && (
        <ScrollItem className="family__line">
          {relation === "son" ? "Son" : "Daughter"} of <strong>{parents.join(" & ")}</strong>
        </ScrollItem>
      )}
    </div>
  );
}

export default function Family() {
  const { groom, bride } = wedding.families;
  return (
    <section className="sec sec--maroon" aria-label="Families">
      <Scroll title="With the blessings of our families" className="family">
        <div className="family__grid">
          <Block f={groom} relation="son" />
          <ScrollItem className="family__lotus"><Lotus /></ScrollItem>
          <Block f={bride} relation="daughter" />
        </div>
        <ScrollItem className="family__invite">
          request the pleasure of your company at the celebrations of the union of their children
        </ScrollItem>
      </Scroll>
    </section>
  );
}

export function ListScroll({ title, items, label }) {
  const list = realList(items);
  if (!list.length) return null;
  return (
    <section className="sec sec--ivory sec--tight" aria-label={label || title}>
      <Scroll title={title} className="listscroll">
        <ul className="listscroll__list">
          {list.map((t, i) => (
            <ScrollItem as="li" key={i}>{t}</ScrollItem>
          ))}
        </ul>
      </Scroll>
    </section>
  );
}
