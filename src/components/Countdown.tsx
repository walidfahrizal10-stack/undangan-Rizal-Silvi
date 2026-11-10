import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const weddingTime = new Date("2027-01-06T09:00:00+07:00").getTime();

function getCountdown(): CountdownTime {
  const distance = Math.max(0, weddingTime - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance % 86_400_000) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1_000),
  };
}

const units: { key: keyof CountdownTime; label: string }[] = [
  { key: "days", label: "HARI" },
  { key: "hours", label: "JAM" },
  { key: "minutes", label: "MENIT" },
  { key: "seconds", label: "DETIK" },
];

export function Countdown() {
  const [time, setTime] = useState(getCountdown);

  useEffect(() => {
    const update = () => {
      const next = getCountdown();
      setTime(next);
      if (next.days === 0 && next.hours === 0 && next.minutes === 0 && next.seconds === 0) {
        window.clearInterval(interval);
      }
    };
    const interval = window.setInterval(update, 1_000);
    update();
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="countdown-section" id="countdown" aria-labelledby="countdown-title">
      <Reveal className="section-inner countdown-inner">
        <p className="section-kicker">MENUJU HARI BAHAGIA</p>
        <h2 id="countdown-title">Menghitung Hari</h2>
        <p className="countdown-subtitle">Rabu, 06 Januari 2027 · 09.00 WIB</p>
        <div className="countdown-clock" aria-label="Hitung mundur menuju acara">
          {units.map(({ key, label }) => (
            <div className="countdown-unit" key={key}>
              <span className="countdown-number" aria-label={`${time[key]} ${label.toLowerCase()}`}>
                {String(time[key]).padStart(2, "0")}
              </span>
              <span className="countdown-label">{label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}