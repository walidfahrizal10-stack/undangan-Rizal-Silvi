import { JasmineSprig, OrnamentalPhoto, OptionalBackdrop } from "./OrnamentalPhoto";

export function Hero() {
  return (
    <section className="hero-section" id="mempelai" aria-labelledby="hero-title">
      <OptionalBackdrop src="/images/gebyok-jawa.jpg" />
      <OrnamentalPhoto
        src="/images/foto-utama.jpg"
        alt="WALID FAHRIZAL dan SILVI LUPIATUN NISAK"
        label="Foto utama belum ditambahkan"
        variant="hero"
      />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-ornament-frame" aria-hidden="true" />
      <JasmineSprig className="hero-jasmine hero-jasmine-left" />
      <JasmineSprig className="hero-jasmine hero-jasmine-right" />

      <div className="hero-copy">
        <p className="hero-kicker hero-rise">THE WEDDING OF</p>
        <h1 className="hero-names hero-rise" id="hero-title">
          <span>WALID FAHRIZAL</span>
          <i>&amp;</i>
          <span>SILVI LUPIATUN NISAK</span>
        </h1>
        <div className="hero-monogram hero-rise" aria-label="Rizal dan Silvi">
          <span>RIZAL</span>
          <i>&amp;</i>
          <span>SILVI</span>
        </div>
        <p className="hero-date hero-rise">Rabu, 06 Januari 2027</p>
        <p className="hero-invitation hero-rise">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i
          untuk menghadiri pernikahan kami.
        </p>
        <a className="hero-scroll-link hero-rise" href="#countdown">
          <span>LIHAT UNDANGAN</span>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2v11m-4-4 4 4 4-4" />
          </svg>
        </a>
      </div>
      <div className="hero-edge-note" aria-hidden="true">06 . 01 . 2027</div>
    </section>
  );
}