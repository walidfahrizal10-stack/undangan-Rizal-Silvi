import { useEffect, useState } from "react";
import { Cover } from "./components/Cover";
import { Countdown } from "./components/Countdown";
import { EventDetails } from "./components/EventDetails";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Guestbook } from "./components/Guestbook";
import { Hero } from "./components/Hero";
import { MusicPlayer } from "./components/MusicPlayer";
import { RSVP } from "./components/RSVP";
import { WeddingGift } from "./components/WeddingGift";

const navigation = [
  { href: "#mempelai", label: "Mempelai" },
  { href: "#acara", label: "Acara" },
  { href: "#galeri", label: "Galeri" },
  { href: "#hadiah", label: "Hadiah" },
  { href: "#ucapan", label: "Ucapan" },
];

export default function App() {
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = invitationOpened ? previousOverflow : "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [invitationOpened]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#mempelai">Lewati ke isi undangan</a>
      {!invitationOpened && <Cover onComplete={() => setInvitationOpened(true)} />}

      <div className="site-shell" id="top">
        <header className="site-header">
          <a className="brand-mark" href="#top" aria-label="Rizal dan Silvi, kembali ke awal" onClick={closeMenu}>
            <span className="brand-seal">R<span>/</span>S</span>
            <span className="brand-name">RIZAL <i>&amp;</i> SILVI</span>
          </a>
          <button
            className={`mobile-menu-button ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
          <nav className={`site-navigation ${menuOpen ? "is-open" : ""}`} id="primary-navigation" aria-label="Navigasi utama">
            {navigation.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
          </nav>
          <a className="header-rsvp" href="#rsvp" onClick={closeMenu}>RSVP</a>
        </header>

        <main>
          <Hero />
          <Countdown />
          <EventDetails />
          <Gallery />
          <WeddingGift />
          <Guestbook />
          <RSVP />
        </main>

        <Footer />
        <MusicPlayer />
      </div>
    </>
  );
}