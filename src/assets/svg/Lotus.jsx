const P = "M0 0 C-15 -20 -15 -52 0 -84 C15 -52 15 -20 0 0Z";

export default function Lotus({ back = "#9c2a3e", front = "#e8cf8a", stroke = "#c9a24a", inner = "#faf5ec", className = "", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 240 140" aria-hidden="true" focusable="false">
      <g transform="translate(120 122)">
        <path d="M-96 6 Q-60 -14 -8 4 Q-52 20 -96 6Z M96 6 Q60 -14 8 4 Q52 20 96 6Z" fill="#3f6b4a" opacity=".9" />
        {[-82, 82, -58, 58].map((a) => (
          <path key={a} d={P} transform={`rotate(${a})`} fill={back} stroke={stroke} strokeWidth="2" />
        ))}
        {[-36, 36, -14, 14].map((a) => (
          <path key={a} d={P} transform={`rotate(${a}) scale(.92)`} fill={front} stroke={stroke} strokeWidth="2" />
        ))}
        <path d={P} transform="scale(.8)" fill={inner} stroke={stroke} strokeWidth="2" />
        <path d="M0 -6 V-58" stroke={stroke} strokeWidth="1.5" opacity=".7" />
        <ellipse cx="0" cy="4" rx="26" ry="6" fill={stroke} />
      </g>
    </svg>
  );
}

export function Petal({ fill = "#e8cf8a", className = "", style }) {
  return (
    <svg className={className} style={style} viewBox="-12 -30 24 32" aria-hidden="true" focusable="false">
      <path d="M0 0 C-10 -8 -10 -20 0 -28 C10 -20 10 -8 0 0Z" fill={fill} />
    </svg>
  );
}
