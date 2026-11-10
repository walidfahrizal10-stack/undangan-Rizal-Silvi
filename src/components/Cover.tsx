import { useEffect, useRef, useState } from "react";
import { JasmineSprig, OptionalBackdrop } from "./OrnamentalPhoto";

export function Cover({ onComplete }: { onComplete: () => void }) {
  const [opening, setOpening] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    timer.current = window.setTimeout(onComplete, 1650);
  };

  return (
    <section
      className={`invitation-cover ${opening ? "is-opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Sampul undangan Rizal dan Silvi"
    >
      <OptionalBackdrop src="/images/gebyok-jawa.jpg" />
      <div className="cover-grain" aria-hidden="true" />
      <div className="cover-arch cover-arch-outer" aria-hidden="true" />
      <div className="cover-arch cover-arch-inner" aria-hidden="true" />
      <div className="cover-door cover-door-left" aria-hidden="true">
        <div className="door-carving">
          <span className="door-carving-center" />
        </div>
      </div>
      <div className="cover-door cover-door-right" aria-hidden="true">
        <div className="door-carving">
          <span className="door-carving-center" />
        </div>
      </div>
      <JasmineSprig className="cover-jasmine cover-jasmine-left" />
      <JasmineSprig className="cover-jasmine cover-jasmine-right" />

      <div className="cover-inscription">
        <svg className="gunungan-mark" viewBox="0 0 100 132" fill="none" aria-hidden="true">
          <path d="M50 5C47 25 35 36 22 49 10 62 7 79 14 95c7 17 20 25 36 31 16-6 29-14 36-31 7-16 4-33-8-46C65 36 53 25 50 5Z" />
          <path d="M50 21v93M50 38c-12 8-18 18-18 30 0 12 8 21 18 26 10-5 18-14 18-26 0-12-6-22-18-30ZM23 79c9-2 17 1 23 8m31-8c-9-2-17 1-23 8M25 96c8 0 15 4 20 10m30-10c-8 0-15 4-20 10" />
          <circle cx="50" cy="69" r="5" />
          <path d="M5 122h90M17 128h66" />
        </svg>
        <p className="cover-eyebrow">THE WEDDING OF</p>
        <h1>RIZAL <span>&amp;</span> SILVI</h1>
        <p className="cover-date">06 JANUARI 2027</p>
        <button className="cover-open-button" onClick={openInvitation} disabled={opening}>
          <span>{opening ? "MEMBUKA UNDANGAN" : "BUKA UNDANGAN"}</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" />
          </svg>
        </button>
      </div>
      <p className="cover-footer-note">UNDANGAN PERNIKAHAN</p>
    </section>
  );
}