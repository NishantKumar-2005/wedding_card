// Original decorated elephant with howdah, facing right. Mirror with CSS (scaleX(-1)) for the other side.
export default function Elephant({ body = "#e9dcc0", shade = "#cdb98f", cloth = "#7a1c2e", gold = "#c9a24a", className = "", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 420 300" aria-hidden="true" focusable="false">
      {/* tail */}
      <path d="M84 120 Q58 150 70 200" fill="none" stroke={shade} strokeWidth="7" strokeLinecap="round" />
      {/* far legs */}
      <rect x="128" y="185" width="36" height="85" rx="14" fill={shade} />
      <rect x="258" y="185" width="36" height="85" rx="14" fill={shade} />
      {/* body */}
      <ellipse cx="200" cy="140" rx="122" ry="72" fill={body} />
      {/* near legs */}
      <rect x="100" y="185" width="38" height="88" rx="15" fill={body} />
      <rect x="226" y="185" width="38" height="88" rx="15" fill={body} />
      <g fill={gold}>
        <rect x="98" y="248" width="42" height="9" rx="4" />
        <rect x="224" y="248" width="42" height="9" rx="4" />
        <rect x="126" y="248" width="40" height="9" rx="4" opacity=".8" />
        <rect x="256" y="248" width="40" height="9" rx="4" opacity=".8" />
      </g>
      <g fill="#f6efe0">
        <rect x="104" y="262" width="10" height="9" rx="4" />
        <rect x="118" y="262" width="10" height="9" rx="4" />
        <rect x="230" y="262" width="10" height="9" rx="4" />
        <rect x="244" y="262" width="10" height="9" rx="4" />
      </g>
      {/* head */}
      <ellipse cx="322" cy="124" rx="56" ry="58" fill={body} />
      {/* trunk */}
      <path d="M338 150 C376 160 392 200 380 240 C376 256 360 262 354 250 C364 226 360 196 332 182 Z" fill={body} />
      <path d="M352 188 Q368 196 372 214 M349 206 Q362 212 365 228" fill="none" stroke={shade} strokeWidth="2" strokeLinecap="round" />
      {/* tusk */}
      <path d="M340 168 Q372 180 386 160" fill="none" stroke="#fffaf0" strokeWidth="8" strokeLinecap="round" />
      {/* ear */}
      <ellipse cx="288" cy="134" rx="30" ry="44" fill={shade} />
      <ellipse cx="288" cy="134" rx="20" ry="32" fill={body} opacity=".5" />
      {/* eye */}
      <circle cx="336" cy="112" r="4.5" fill="#2b1014" />
      {/* head cloth */}
      <path d="M296 80 Q340 68 372 118 L340 134 Q326 100 296 96 Z" fill={cloth} stroke={gold} strokeWidth="2.5" />
      <circle cx="338" cy="104" r="6" fill={gold} />
      {/* blanket */}
      <path d="M126 92 Q200 72 272 94 L282 160 Q280 200 262 200 L142 200 Q122 160 126 92 Z" fill={cloth} stroke={gold} strokeWidth="3" />
      <path d="M138 188 L266 188" stroke={gold} strokeWidth="3" strokeDasharray="3 7" />
      <path d="M136 112 Q202 94 268 114" fill="none" stroke={gold} strokeWidth="2" />
      <g fill={gold}>
        <circle cx="160" cy="140" r="6" /><circle cx="202" cy="150" r="8" /><circle cx="246" cy="140" r="6" />
        <circle cx="180" cy="170" r="4" /><circle cx="226" cy="170" r="4" />
      </g>
      {/* howdah */}
      <rect x="148" y="66" width="104" height="12" rx="3" fill={gold} />
      <rect x="156" y="34" width="88" height="32" fill="#4a0d1a" />
      <path d="M170 66 V50 Q200 28 230 50 V66 Z" fill="none" stroke={gold} strokeWidth="2.5" />
      <rect x="152" y="30" width="6" height="38" fill={gold} />
      <rect x="242" y="30" width="6" height="38" fill={gold} />
      <path d="M142 34 Q200 -6 258 34 Z" fill={gold} />
      <path d="M156 34 Q200 6 244 34" fill="none" stroke="#4a0d1a" strokeWidth="2" opacity=".5" />
      <path d="M200 4 V-2" stroke={gold} strokeWidth="3" />
      <circle cx="200" cy="6" r="4" fill={gold} />
    </svg>
  );
}
