import { useState, type FormEvent } from "react";
import type { FormFeedback, GuestbookEntry } from "../types";
import { submitNetlifyForm } from "../utils/forms";
import { Reveal } from "./Reveal";

const storageKey = "rizal-silvi-guestbook-v1";

function readEntries(): GuestbookEntry[] {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return [];
    const entries: unknown = JSON.parse(saved);
    if (!Array.isArray(entries)) return [];
    return entries
      .filter(
        (entry): entry is GuestbookEntry =>
          typeof entry?.id === "string" &&
          typeof entry?.name === "string" &&
          typeof entry?.message === "string" &&
          typeof entry?.sentAt === "string",
      )
      .slice(0, 30);
  } catch {
    return [];
  }
}

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(readEntries);
  const [feedback, setFeedback] = useState<FormFeedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !message) {
      setFeedback({ kind: "error", message: "Mohon isi nama serta ucapan dan doa." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      const result = await submitNetlifyForm("guestbook", { name, message });
      if (result.status === "local-preview") {
        setFeedback({
          kind: "info",
          message: "Buku ucapan siap digunakan setelah website di-deploy ke Netlify.",
        });
        return;
      }

      const entry: GuestbookEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        message,
        sentAt: new Date().toISOString(),
      };
      const updated = [entry, ...entries].slice(0, 30);
      setEntries(updated);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // Netlify has already received the form; local display storage is optional.
      }
      form.reset();
      setFeedback({ kind: "success", message: "Terima kasih. Ucapan berhasil dikirim." });
    } catch {
      setFeedback({
        kind: "error",
        message: "Ucapan belum terkirim. Periksa koneksi Anda lalu coba kembali.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="guestbook-section" id="ucapan" aria-labelledby="guestbook-title">
      <Reveal className="section-inner guestbook-inner">
        <div className="quote-block">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>
            Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu
            agar kamu cenderung dan merasa tenteram kepadanya.
          </blockquote>
          <cite>QS. Ar-Rum: 21</cite>
        </div>

        <div className="guestbook-heading">
          <p className="section-kicker">DOA &amp; UCAPAN</p>
          <h2 id="guestbook-title">Kirimkan Doa Restu</h2>
          <p className="section-intro">Setiap doa baik akan menjadi kenangan yang berarti bagi kami.</p>
        </div>

        <form
          className="elegant-form guestbook-form"
          name="guestbook"
          method="POST"
          action="/"
          data-netlify="true"
          onSubmit={(event) => void handleSubmit(event)}
        >
          <input type="hidden" name="form-name" value="guestbook" />
          <label className="field-label" htmlFor="guestbook-name">Nama</label>
          <input
            className="text-field"
            id="guestbook-name"
            type="text"
            name="name"
            autoComplete="name"
            maxLength={80}
            placeholder="Nama Anda"
            required
          />
          <label className="field-label" htmlFor="guestbook-message">Ucapan dan doa</label>
          <textarea
            className="text-field text-area"
            id="guestbook-message"
            name="message"
            rows={4}
            maxLength={700}
            placeholder="Tuliskan ucapan dan doa terbaik Anda"
            required
          />
          <div className="form-actions">
            <button className="gold-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "MENGIRIM..." : "KIRIM UCAPAN"}
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m3 10 14-7-4 14-3-6-7-1Zm7 1 7-8" /></svg>
            </button>
            <p className={`form-feedback ${feedback ? `feedback-${feedback.kind}` : ""}`} role="status" aria-live="polite">
              {feedback?.message}
            </p>
          </div>
        </form>

        <div className="guestbook-list" aria-live="polite">
          <div className="guestbook-list-heading">
            <span>DOA YANG TERSAMPAIKAN</span>
            <span className="list-rule" />
          </div>
          {entries.length ? (
            <ul>
              {entries.map((entry) => (
                <li className="guestbook-entry" key={entry.id}>
                  <div className="entry-flower" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 11c-1-4 0-7 2-7 2 0 2 3 0 7 4-2 7-2 7 0s-3 3-7 1c2 4 2 7 0 7s-3-3-2-7c-3 3-6 4-7 2s1-4 7-3c-4-2-5-5-3-6 2-1 4 1 3 6Z" />
                      <circle cx="12" cy="12" r="1.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="entry-name">{entry.name}</p>
                    <p className="entry-message">{entry.message}</p>
                    <time className="entry-date" dateTime={entry.sentAt}>
                      {new Date(entry.sentAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="guestbook-empty">Belum ada ucapan yang tersimpan di perangkat ini.</p>
          )}
          <p className="guestbook-note">Ucapan yang berhasil dikirim tercatat di dashboard Netlify.</p>
        </div>
      </Reveal>
    </section>
  );
}