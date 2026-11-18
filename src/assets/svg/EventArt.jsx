const gold = "#c9a24a";

export function HaldiArt() {
  return (
    <svg viewBox="0 0 200 130" aria-hidden="true" focusable="false">
      <ellipse cx="100" cy="112" rx="70" ry="9" fill="#000" opacity=".12" />
      {/* marigold petals */}
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI;
        return <circle key={i} cx={100 + Math.cos(Math.PI + a) * 62} cy={86 + Math.sin(Math.PI + a) * 28} r="9" fill={i % 2 ? "#f2a516" : "#e6720f"} />;
      })}
      {/* bowl */}
      <path d="M44 80 H156 Q150 118 100 118 Q50 118 44 80Z" fill="#b5651d" stroke={gold} strokeWidth="3" />
      <path d="M52 92 H148" stroke={gold} strokeWidth="2" strokeDasharray="4 5" />
      <ellipse cx="100" cy="80" rx="56" ry="12" fill="#f5c518" />
      <ellipse cx="100" cy="78" rx="40" ry="7" fill="#f9dd5a" />
      {/* mehendi cone */}
      <path d="M150 30 L168 78 L138 78 Z" fill="#6b4226" stroke={gold} strokeWidth="2" transform="rotate(14 150 60)" />
      <path d="M40 40 q10 -14 20 0 q-10 14 -20 0 M30 62 q8 -10 16 0 q-8 10 -16 0" fill="none" stroke="#7a1c2e" strokeWidth="2" />
    </svg>
  );
}

export function KalashArt() {
  return (
    <svg viewBox="0 0 200 130" aria-hidden="true" focusable="false">
      <ellipse cx="100" cy="116" rx="52" ry="7" fill="#000" opacity=".12" />
      {/* mango leaves */}
      {[-50, -25, 0, 25, 50].map((a) => (
        <path key={a} d="M0 0 C-10 -14 -8 -34 0 -46 C8 -34 10 -14 0 0Z" transform={`translate(100 50) rotate(${a})`} fill="#3f7a39" stroke="#2c5a2a" strokeWidth="1.5" />
      ))}
      {/* coconut */}
      <ellipse cx="100" cy="32" rx="17" ry="20" fill="#7a4a21" stroke={gold} strokeWidth="2" />
      <path d="M92 26 q8 -6 16 0 M92 36 q8 6 16 0" stroke="#4a2a10" strokeWidth="1.5" fill="none" />
      {/* pot */}
      <path d="M72 54 H128 Q130 64 126 70 Q148 82 142 102 Q136 116 100 116 Q64 116 58 102 Q52 82 74 70 Q70 64 72 54Z" fill="#b8402f" stroke={gold} strokeWidth="3" />
      <path d="M66 92 H134 M70 80 H130" stroke={gold} strokeWidth="2" strokeDasharray="5 5" />
      <path d="M100 82 l5 8 h-10Z M84 100 l4 6 h-8Z M116 100 l4 6 h-8Z" fill={gold} />
      <rect x="70" y="54" width="60" height="8" rx="3" fill={gold} />
    </svg>
  );
}

export function MandapArt() {
  return (
    <svg viewBox="0 0 200 130" aria-hidden="true" focusable="false">
      <ellipse cx="100" cy="118" rx="80" ry="8" fill="#000" opacity=".12" />
      <rect x="34" y="106" width="132" height="8" fill={gold} />
      {[48, 152].map((x) => (
        <g key={x}>
          <rect x={x - 5} y="48" width="10" height="58" fill="#fff6e0" stroke={gold} strokeWidth="2" />
          <rect x={x - 8} y="44" width="16" height="6" fill={gold} />
        </g>
      ))}
      <path d="M32 46 H168 L152 32 H48Z" fill="#9c2a3e" stroke={gold} strokeWidth="2" />
      <path d="M48 32 Q100 -20 152 32Z" fill="#7a1c2e" stroke={gold} strokeWidth="2" />
      <path d="M100 6 V-2" stroke={gold} strokeWidth="3" />
      <circle cx="100" cy="4" r="3.5" fill={gold} />
      {Array.from({ length: 11 }).map((_, i) => {
        const t = i / 10;
        return <circle key={i} cx={48 + 104 * t} cy={52 + Math.sin(t * Math.PI) * 12} r="4" fill={i % 2 ? "#f2a516" : "#e6720f"} />;
      })}
      <path d="M72 106 V78 Q100 56 128 78 V106Z" fill="#4a0d1a" stroke={gold} strokeWidth="2" />
      {/* two hearts / diyas */}
      <path d="M92 100 q0 -10 8 -6 q8 -4 8 6 q0 8 -8 12 q-8 -4 -8 -12Z" fill={gold} />
    </svg>
  );
}
