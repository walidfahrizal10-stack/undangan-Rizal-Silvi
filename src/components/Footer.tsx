import { OrnamentalPhoto, OptionalBackdrop, JasmineSprig } from "./OrnamentalPhoto";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="closing-section" id="penutup">
      <OptionalBackdrop src="/images/gebyok-jawa.jpg" />
      <div className="closing-shade" aria-hidden="true" />
      <JasmineSprig className="closing-jasmine closing-jasmine-left" />
      <JasmineSprig className="closing-jasmine closing-jasmine-right" />
      <Reveal className="closing-content">
        <div className="closing-photo-frame">
          <OrnamentalPhoto
            src="/images/foto-utama.jpg"
            alt="WALID FAHRIZAL dan SILVI LUPIATUN NISAK"
            label="Foto utama belum ditambahkan"
            variant="footer"
          />
        </div>
        <p className="section-kicker">DENGAN PENUH RASA SYUKUR</p>
        <h2>
          <span>WALID FAHRIZAL</span>
          <i>&amp;</i>
          <span>SILVI LUPIATUN NISAK</span>
        </h2>
        <p className="closing-monogram">RIZAL &amp; SILVI</p>
        <p className="closing-date">06 JANUARI 2027</p>
        <p className="closing-message">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
          hadir untuk memberikan doa restu.
        </p>
        <p className="closing-thanks">Terima kasih.</p>
        <span className="closing-rule" aria-hidden="true" />
        <a className="back-to-top" href="#top">KEMBALI KE ATAS <span aria-hidden="true">↑</span></a>
      </Reveal>
      <p className="footer-copyright">WALID FAHRIZAL &amp; SILVI LUPIATUN NISAK · 2027</p>
    </footer>
  );
}