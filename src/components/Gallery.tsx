import { useEffect, useState } from "react";
import { OrnamentalPhoto } from "./OrnamentalPhoto";
import { Reveal } from "./Reveal";

const photos = [
  { src: "/images/foto-galeri-1.jpg", label: "Foto galeri 1", alt: "Foto galeri pertama Rizal dan Silvi" },
  { src: "/images/foto-galeri-2.jpg", label: "Foto galeri 2", alt: "Foto galeri kedua Rizal dan Silvi" },
  { src: "/images/foto-galeri-3.jpg", label: "Foto galeri 3", alt: "Foto galeri ketiga Rizal dan Silvi" },
];

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((index) => (index === null ? null : (index + 1) % photos.length));
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index === null ? null : (index + photos.length - 1) % photos.length));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <section className="gallery-section" id="galeri" aria-labelledby="gallery-title">
      <Reveal className="section-inner gallery-inner">
        <p className="section-kicker">KENANGAN DALAM BINGKAI</p>
        <h2 id="gallery-title">OUR MOMENTS</h2>
        <p className="section-intro">Tiga ruang untuk momen yang paling berarti.</p>
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <button
              className="gallery-item"
              type="button"
              key={photo.src}
              onClick={() => setActiveIndex(index)}
              aria-label={`Perbesar ${photo.label}`}
              aria-haspopup="dialog"
            >
              <OrnamentalPhoto
                src={photo.src}
                alt={photo.alt}
                label={`${photo.label} belum ditambahkan`}
                variant="gallery"
              />
              <span className="gallery-zoom" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="10.8" cy="10.8" r="6.3" />
                  <path d="m16 16 4 4M10.8 7.8v6m-3-3h6" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      {activePhoto && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activePhoto.label} diperbesar`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Tutup foto">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
          <button
            className="lightbox-arrow lightbox-previous"
            type="button"
            aria-label="Foto sebelumnya"
            onClick={() => setActiveIndex((index) => (index === null ? null : (index + photos.length - 1) % photos.length))}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
          </button>
          <div className="lightbox-content">
            <OrnamentalPhoto
              src={activePhoto.src}
              alt={activePhoto.alt}
              label={`${activePhoto.label} belum ditambahkan`}
              variant="lightbox"
            />
            <p>{activePhoto.label}</p>
          </div>
          <button
            className="lightbox-arrow lightbox-next"
            type="button"
            aria-label="Foto berikutnya"
            onClick={() => setActiveIndex((index) => (index === null ? null : (index + 1) % photos.length))}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}