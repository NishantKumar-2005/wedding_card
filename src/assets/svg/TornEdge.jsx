// Torn-paper edge. `fill` is the colour of the section BELOW (it overlaps the bottom of the section above).
export default function TornEdge({ fill = "#faf5ec", className = "" }) {
  return (
    <svg className={`torn ${className}`} viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path
        fill={fill}
        d="M0 60 V30 L30 24 L58 34 L92 20 L130 32 L164 18 L206 30 L240 22 L280 34 L318 20 L352 28 L394 16 L430 30 L470 22 L506 34 L548 20 L586 30 L624 18 L660 32 L700 22 L742 34 L780 18 L818 30 L856 22 L894 34 L934 20 L972 30 L1010 18 L1050 32 L1090 22 L1130 30 L1166 20 L1200 28 V60 Z"
      />
      <path
        fill="none"
        stroke="#c9a24a"
        strokeWidth="1.2"
        opacity=".55"
        vectorEffect="non-scaling-stroke"
        d="M0 28 L30 22 L58 32 L92 18 L130 30 L164 16 L206 28 L240 20 L280 32 L318 18 L352 26 L394 14 L430 28 L470 20 L506 32 L548 18 L586 28 L624 16 L660 30 L700 20 L742 32 L780 16 L818 28 L856 20 L894 32 L934 18 L972 28 L1010 16 L1050 30 L1090 20 L1130 28 L1166 18 L1200 26"
      />
    </svg>
  );
}
