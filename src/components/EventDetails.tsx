import { Reveal } from "./Reveal";

const mapUrl = "https://maps.app.goo.gl/s7b11STDuYhthPAW9";

export function EventDetails() {
  return (
    <section className="event-section" id="acara" aria-labelledby="event-title">
      <Reveal className="section-inner event-inner">
        <p className="section-kicker">MOMEN ISTIMEWA</p>
        <h2 id="event-title">Waktu &amp; Lokasi</h2>
        <p className="section-intro">Dengan penuh rasa syukur, kami menantikan kehadiran Anda.</p>

        <div className="event-plaque">
          <article className="event-time">
            <span className="event-flourish" aria-hidden="true" />
            <h3>AKAD NIKAH</h3>
            <p>Rabu, 06 Januari 2027</p>
            <p className="event-hour">Pukul 09.00 WIB</p>
          </article>
          <span className="event-divider" aria-hidden="true" />
          <article className="event-time">
            <span className="event-flourish" aria-hidden="true" />
            <h3>RESEPSI</h3>
            <p>Rabu, 06 Januari 2027</p>
            <p className="event-hour">Pukul 10.00 WIB – Selesai</p>
          </article>
        </div>

        <div className="event-location">
          <div className="location-mark" aria-hidden="true">
            <svg viewBox="0 0 32 38" fill="none">
              <path d="M16 35s12-12 12-21A12 12 0 1 0 4 14c0 9 12 21 12 21Z" />
              <circle cx="16" cy="14" r="4" />
            </svg>
          </div>
          <div className="location-copy">
            <span className="location-label">LOKASI ACARA</span>
            <p>Buka tautan untuk melihat lokasi acara di Google Maps.</p>
          </div>
          <a className="gold-button location-button" href={mapUrl} target="_blank" rel="noreferrer">
            LIHAT LOKASI
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M11 3h6v6m-1-5-9 9M14 11v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}