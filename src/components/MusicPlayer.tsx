import { useRef, useState } from "react";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notice, setNotice] = useState("");

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      setNotice("");
      return;
    }

    setNotice("");
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setNotice("Musik belum tersedia. Tambahkan musik-undangan.mp3 ke folder public/music.");
    }
  };

  return (
    <div className={`music-player ${isPlaying ? "is-playing" : ""}`}>
      <audio
        ref={audioRef}
        src="/music/musik-undangan.mp3"
        preload="none"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          setNotice("Musik belum tersedia. Tambahkan musik-undangan.mp3 ke folder public/music.");
        }}
      />
      <button
        className="music-toggle"
        type="button"
        onClick={() => void toggleMusic()}
        aria-label={isPlaying ? "Jeda musik undangan" : "Putar musik undangan"}
        aria-pressed={isPlaying}
        title={isPlaying ? "Jeda musik" : "Putar musik"}
      >
        <span className="music-disc" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M20 6v15.2a4 4 0 1 1-2-3.46V10l10-2v10.2a4 4 0 1 1-2-3.46V5l-6 1Z" />
          </svg>
        </span>
        <span className="music-label">
          <span>{isPlaying ? "MUSIK BERPUTAR" : "PUTAR MUSIK"}</span>
          <span className="sound-wave" aria-hidden="true"><i /><i /><i /><i /></span>
        </span>
      </button>
      <span className="music-notice" role="status" aria-live="polite">{notice}</span>
    </div>
  );
}