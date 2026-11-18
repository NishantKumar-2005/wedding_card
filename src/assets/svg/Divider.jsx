export default function Divider({ color = "#c9a24a", className = "" }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 320 28" aria-hidden="true" focusable="false">
      <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
        <path d="M6 14 H128" />
        <path d="M192 14 H314" />
        <path d="M128 14 q8 -9 16 0 q-8 9 -16 0" />
        <path d="M192 14 q-8 -9 -16 0 q8 9 16 0" />
      </g>
      <g transform="translate(160 14)" fill={color}>
        <path d="M0 -11 C-5 -5 -5 5 0 11 C5 5 5 -5 0 -11Z" />
        <path transform="rotate(60)" d="M0 -9 C-4 -4 -4 4 0 9 C4 4 4 -4 0 -9Z" opacity=".8" />
        <path transform="rotate(-60)" d="M0 -9 C-4 -4 -4 4 0 9 C4 4 4 -4 0 -9Z" opacity=".8" />
        <circle r="2.2" fill="#4a0d1a" />
      </g>
      <circle cx="6" cy="14" r="2.5" fill={color} />
      <circle cx="314" cy="14" r="2.5" fill={color} />
    </svg>
  );
}
