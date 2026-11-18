export default function MusicToggle({ playing, onToggle }) {
  return (
    <button type="button" className={`music ${playing ? "is-playing" : ""}`} onClick={onToggle} aria-label={playing ? "Mute music" : "Play music"} aria-pressed={playing}>
      <span className="music__bars" aria-hidden="true"><i /><i /><i /><i /></span>
    </button>
  );
}
