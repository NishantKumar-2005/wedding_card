import { useId } from "react";

// Original palace + mandap-in-garden scene. Key content lives in the central ~400 units so it survives
// portrait "slice" cropping on phones. variant: "day" | "dusk".
export default function Palace({ variant = "day", className = "" }) {
  const id = useId().replace(/:/g, "");
  const dusk = variant === "dusk";
  const sky = dusk ? ["#35184a", "#a8365e", "#f08a55", "#fbc67a"] : ["#6fb0e3", "#a9d3f0", "#dff0fb", "#fdf3de"];
  const wall = dusk ? "#e7c79c" : "#f6e7c8";
  const wallShade = dusk ? "#c79f78" : "#e3cfa6";
  const hill = dusk ? "#5c2a4f" : "#8fb7c9";
  const grass = dusk ? ["#3d4a3a", "#243222"] : ["#6aa84f", "#3f7a39"];
  const tree = dusk ? "#2c4a35" : "#3f8a3f";
  const gold = "#c9a24a";

  const Tree = ({ x, y, s = 1 }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-5" y="-30" width="10" height="46" fill="#5a3a25" />
      <circle cx="0" cy="-70" r="42" fill={tree} />
      <circle cx="-30" cy="-46" r="30" fill={tree} opacity=".9" />
      <circle cx="30" cy="-46" r="30" fill={tree} opacity=".9" />
      <circle cx="-12" cy="-86" r="24" fill="#fff" opacity=".07" />
    </g>
  );
  const Chhatri = ({ x, y, s = 1 }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-26" y="0" width="52" height="8" fill={gold} />
      <rect x="-22" y="-34" width="5" height="34" fill={wall} />
      <rect x="17" y="-34" width="5" height="34" fill={wall} />
      <rect x="-3" y="-34" width="6" height="34" fill={wall} />
      <path d="M-28 -34 Q0 -76 28 -34 Z" fill={wall} stroke={gold} strokeWidth="2" />
      <path d="M0 -62 V-76" stroke={gold} strokeWidth="2.5" />
      <circle cx="0" cy="-78" r="3.5" fill={gold} />
    </g>
  );

  return (
    <svg className={className} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`sky${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset=".45" stopColor={sky[1]} />
          <stop offset=".78" stopColor={sky[2]} />
          <stop offset="1" stopColor={sky[3]} />
        </linearGradient>
        <linearGradient id={`grass${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={grass[0]} />
          <stop offset="1" stopColor={grass[1]} />
        </linearGradient>
        <radialGradient id={`sun${id}`}>
          <stop offset="0" stopColor={dusk ? "#ffd89a" : "#fff8dc"} />
          <stop offset="1" stopColor={dusk ? "#ffd89a" : "#fff8dc"} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="800" fill={`url(#sky${id})`} />
      <circle cx={dusk ? 880 : 960} cy={dusk ? 470 : 150} r={dusk ? 150 : 110} fill={`url(#sun${id})`} />
      <circle cx={dusk ? 880 : 960} cy={dusk ? 470 : 150} r={dusk ? 46 : 34} fill={dusk ? "#ffe2aa" : "#fffbe8"} />
      {dusk && <g fill="#fff" opacity=".8">{[[120, 80], [260, 150], [980, 90], [1090, 200], [620, 60], [430, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" />)}</g>}

      {/* clouds */}
      <g fill={dusk ? "#f6a07a" : "#fff"} opacity={dusk ? 0.5 : 0.85}>
        <g transform="translate(150 150)"><ellipse rx="80" ry="22" /><ellipse cx="-40" cy="-12" rx="40" ry="20" /><ellipse cx="30" cy="-18" rx="46" ry="24" /></g>
        <g transform="translate(1010 270)"><ellipse rx="90" ry="20" /><ellipse cx="-30" cy="-14" rx="38" ry="18" /><ellipse cx="34" cy="-16" rx="42" ry="22" /></g>
        <g transform="translate(640 110)"><ellipse rx="60" ry="14" /><ellipse cx="-20" cy="-10" rx="30" ry="14" /></g>
      </g>

      {/* hills */}
      <path d="M0 520 Q150 440 320 500 T620 480 T930 490 T1200 470 V700 H0Z" fill={hill} opacity=".8" />

      <rect y="626" width="1200" height="174" fill={`url(#grass${id})`} />
      <g transform="translate(600 800) scale(.8) translate(-600 -800)">
      {/* palace wings */}
      <g>
        <rect x="170" y="440" width="260" height="130" fill={wallShade} />
        <rect x="770" y="440" width="260" height="130" fill={wallShade} />
        <rect x="170" y="430" width="260" height="12" fill={gold} />
        <rect x="770" y="430" width="260" height="12" fill={gold} />
        {[200, 260, 320, 380, 800, 860, 920, 980].map((x) => (
          <g key={x}>
            <path d={`M${x - 12} 560 V490 Q${x} 466 ${x + 12} 490 V560Z`} fill={dusk ? "#ffcf86" : "#7a9fb8"} stroke={gold} strokeWidth="2" />
          </g>
        ))}
        <Chhatri x={200} y={430} s={0.9} />
        <Chhatri x={400} y={430} s={0.9} />
        <Chhatri x={800} y={430} s={0.9} />
        <Chhatri x={1000} y={430} s={0.9} />
      </g>

      {/* central facade */}
      <g>
        <rect x="440" y="350" width="320" height="220" fill={wall} />
        <rect x="440" y="350" width="320" height="10" fill={gold} />
        <rect x="430" y="560" width="340" height="14" fill={wallShade} />
        {/* side towers */}
        <rect x="410" y="330" width="46" height="240" fill={wall} stroke={wallShade} strokeWidth="2" />
        <rect x="744" y="330" width="46" height="240" fill={wall} stroke={wallShade} strokeWidth="2" />
        <path d="M404 330 Q433 270 462 330Z" fill={wall} stroke={gold} strokeWidth="2.5" />
        <path d="M738 330 Q767 270 796 330Z" fill={wall} stroke={gold} strokeWidth="2.5" />
        <circle cx="433" cy="272" r="4" fill={gold} /><circle cx="767" cy="272" r="4" fill={gold} />
        {/* drum + great dome */}
        <rect x="520" y="296" width="160" height="56" fill={wall} />
        {[540, 575, 610, 645].map((x) => <path key={x} d={`M${x - 8} 350 V322 Q${x} 306 ${x + 8} 322 V350Z`} fill={dusk ? "#ffcf86" : "#7a9fb8"} />)}
        <path d="M510 298 Q600 150 690 298Z" fill={dusk ? "#f3dcb6" : "#fffaf0"} stroke={gold} strokeWidth="3" />
        <path d="M600 224 V196" stroke={gold} strokeWidth="4" />
        <circle cx="600" cy="190" r="7" fill={gold} />
        <path d="M600 228 Q570 260 556 296 M600 228 Q630 260 644 296" fill="none" stroke={gold} strokeWidth="1.5" opacity=".6" />
        {/* jharokha balcony windows */}
        {[480, 720].map((x) => (
          <g key={x}>
            <path d={`M${x - 20} 470 V410 Q${x} 376 ${x + 20} 410 V470Z`} fill={dusk ? "#ffcf86" : "#7a9fb8"} stroke={gold} strokeWidth="2.5" />
            <rect x={x - 26} y="470" width="52" height="8" fill={gold} />
          </g>
        ))}
        {/* grand arch door */}
        <path d="M550 570 V440 Q600 360 650 440 V570Z" fill="#4a0d1a" stroke={gold} strokeWidth="5" />
        <path d="M562 570 V448 Q600 388 638 448 V570Z" fill="none" stroke={gold} strokeWidth="2" />
        <path d="M600 396 V570" stroke={gold} strokeWidth="2" opacity=".6" />
        {/* steps */}
        <path d="M520 574 H680 V582 H510Z M500 582 H700 V592 H490Z" fill={wallShade} />
      </g>

      {/* ground */}
      <path d="M-200 585 H1400 V800 H-200Z" fill={`url(#grass${id})`} />
      <path d="M520 590 H680 L860 800 H340Z" fill={dusk ? "#c79f78" : "#ecd9b0"} />
      <path d="M560 590 H640 L700 800 H500Z" fill="#fff" opacity=".12" />

      {/* hedges */}
      <g fill={dusk ? "#2d4a30" : "#4c8f45"}>
        <rect x="120" y="590" width="360" height="26" rx="13" />
        <rect x="720" y="590" width="360" height="26" rx="13" />
      </g>

      {/* trees */}
      <Tree x={90} y={600} s={1.05} />
      <Tree x={250} y={596} s={0.8} />
      <Tree x={950} y={596} s={0.8} />
      <Tree x={1110} y={600} s={1.05} />

      {/* mandap on the path */}
      <g transform="translate(600 700)">
        <ellipse cx="0" cy="66" rx="124" ry="14" fill="#000" opacity=".15" />
        <rect x="-96" y="56" width="192" height="12" fill={gold} />
        {[-84, 84].map((x) => (
          <g key={x}>
            <rect x={x - 6} y="-52" width="12" height="108" fill="#fff6e0" stroke={gold} strokeWidth="2" />
            <rect x={x - 10} y="-56" width="20" height="8" fill={gold} />
          </g>
        ))}
        <path d="M-108 -56 H108 L84 -76 H-84Z" fill="#9c2a3e" stroke={gold} strokeWidth="2.5" />
        <path d="M-84 -76 Q0 -150 84 -76Z" fill="#7a1c2e" stroke={gold} strokeWidth="2.5" />
        <path d="M0 -118 V-134" stroke={gold} strokeWidth="3" /><circle cx="0" cy="-137" r="4" fill={gold} />
        {/* marigold garlands */}
        <g>
          {Array.from({ length: 13 }).map((_, i) => {
            const t = i / 12;
            return <circle key={i} cx={-84 + 168 * t} cy={-48 + Math.sin(t * Math.PI) * 18} r="5" fill={i % 2 ? "#f2a516" : "#e6720f"} />;
          })}
        </g>
        <path d="M-60 56 V8 Q0 -30 60 8 V56Z" fill="#4a0d1a" opacity=".85" />
        <path d="M-60 56 V8 Q0 -30 60 8 V56" fill="none" stroke={gold} strokeWidth="2.5" />
        <rect x="-18" y="26" width="36" height="30" rx="4" fill="#c9a24a" opacity=".9" />
      </g>

      {/* flowers */}
      <g>
        {[[200, 640, "#e6720f"], [260, 660, "#f2a516"], [330, 690, "#e8cf8a"], [140, 700, "#f2a516"], [870, 660, "#e6720f"], [940, 640, "#f2a516"], [1030, 700, "#e8cf8a"], [800, 720, "#e6720f"], [400, 740, "#e6720f"], [1090, 740, "#f2a516"], [90, 760, "#e8cf8a"]].map(([x, y, c], i) => (
          <circle key={i} cx={x} cy={y} r="7" fill={c} />
        ))}
      </g>
      </g>
    </svg>
  );
}
