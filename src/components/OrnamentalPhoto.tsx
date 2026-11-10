import { useEffect, useState } from "react";

interface OrnamentalPhotoProps {
  src: string;
  alt: string;
  label: string;
  variant?: "hero" | "portrait" | "gallery" | "footer" | "lightbox";
  className?: string;
}

export function useOptionalImage(src: string) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    setAvailable(false);

    fetch(src, { method: "HEAD" })
      .then((response) => {
        if (active) setAvailable(response.ok);
      })
      .catch(() => {
        if (active) setAvailable(false);
      });

    return () => {
      active = false;
    };
  }, [src]);

  return available;
}

export function OptionalBackdrop({ src }: { src: string }) {
  const available = useOptionalImage(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (!available || failed) return null;

  return (
    <img
      className="optional-backdrop"
      src={src}
      alt=""
      aria-hidden="true"
      onError={() => setFailed(true)}
    />
  );
}

export function OrnamentalPhoto({
  src,
  alt,
  label,
  variant = "portrait",
  className = "",
}: OrnamentalPhotoProps) {
  const available = useOptionalImage(src);
  const [failed, setFailed] = useState(false);
  const hasPhoto = available && !failed;

  useEffect(() => setFailed(false), [src]);

  return (
    <div className={`ornamental-photo photo-${variant} ${className} ${hasPhoto ? "has-photo" : "is-placeholder"}`}>
      {hasPhoto ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <div className="photo-placeholder" role="img" aria-label={label}>
          <svg className="placeholder-mandala" viewBox="0 0 220 290" aria-hidden="true">
            <path d="M110 18 132 76 191 52 166 110 204 144 166 178 191 237 132 214 110 272 88 214 29 237 54 178 16 144 54 110 29 52 88 76Z" />
            <path d="M110 49 125 101 178 91 149 130 174 145 149 160 178 199 125 188 110 238 95 188 42 199 71 160 46 145 71 130 42 91 95 101Z" />
            <circle cx="110" cy="145" r="43" />
            <circle cx="110" cy="145" r="31" />
            <path d="M110 112c-19 12-19 54 0 66m0-66c19 12 19 54 0 66M77 145h66M86 122l48 46m0-46-48 46" />
          </svg>
          <div className="placeholder-caption">
            <span className="placeholder-rule" />
            <strong>{label}</strong>
            <span className="placeholder-rule" />
          </div>
          <span className="placeholder-path">Ganti file di <code>{src}</code></span>
        </div>
      )}
      <span className="photo-frame-line" aria-hidden="true" />
      <span className="photo-corner photo-corner-top" aria-hidden="true" />
      <span className="photo-corner photo-corner-bottom" aria-hidden="true" />
    </div>
  );
}

export function JasmineSprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`jasmine-sprig ${className}`} viewBox="0 0 110 210" fill="none" aria-hidden="true">
      <path className="sprig-stem" d="M18 194C54 153 45 98 90 17M39 149c-13-4-23-14-27-28 15 1 25 10 27 28ZM57 105c15-5 24-16 27-30-15 2-24 12-27 30ZM76 66c-12-5-18-15-18-28 13 4 20 14 18 28Z" />
      <g className="sprig-flower" transform="translate(82 25)">
        <ellipse cy="-8" rx="4.5" ry="7" /><ellipse cx="7.6" cy="-2.5" rx="4.5" ry="7" transform="rotate(55 7.6 -2.5)" />
        <ellipse cx="4.8" cy="6.5" rx="4.5" ry="7" transform="rotate(130 4.8 6.5)" /><ellipse cx="-4.8" cy="6.5" rx="4.5" ry="7" transform="rotate(230 -4.8 6.5)" />
        <ellipse cx="-7.6" cy="-2.5" rx="4.5" ry="7" transform="rotate(305 -7.6 -2.5)" /><circle r="2.2" />
      </g>
      <g className="sprig-flower" transform="translate(66 60) scale(.78)">
        <ellipse cy="-8" rx="4.5" ry="7" /><ellipse cx="7.6" cy="-2.5" rx="4.5" ry="7" transform="rotate(55 7.6 -2.5)" />
        <ellipse cx="4.8" cy="6.5" rx="4.5" ry="7" transform="rotate(130 4.8 6.5)" /><ellipse cx="-4.8" cy="6.5" rx="4.5" ry="7" transform="rotate(230 -4.8 6.5)" />
        <ellipse cx="-7.6" cy="-2.5" rx="4.5" ry="7" transform="rotate(305 -7.6 -2.5)" /><circle r="2.2" />
      </g>
      <g className="sprig-flower" transform="translate(33 129) scale(.68)">
        <ellipse cy="-8" rx="4.5" ry="7" /><ellipse cx="7.6" cy="-2.5" rx="4.5" ry="7" transform="rotate(55 7.6 -2.5)" />
        <ellipse cx="4.8" cy="6.5" rx="4.5" ry="7" transform="rotate(130 4.8 6.5)" /><ellipse cx="-4.8" cy="6.5" rx="4.5" ry="7" transform="rotate(230 -4.8 6.5)" />
        <ellipse cx="-7.6" cy="-2.5" rx="4.5" ry="7" transform="rotate(305 -7.6 -2.5)" /><circle r="2.2" />
      </g>
    </svg>
  );
}