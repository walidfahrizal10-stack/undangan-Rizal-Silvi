import { useState, type FormEvent } from "react";
import type { FormFeedback } from "../types";
import { submitNetlifyForm } from "../utils/forms";
import { Reveal } from "./Reveal";

export function RSVP() {
  const [feedback, setFeedback] = useState<FormFeedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const attendance = String(data.get("attendance") ?? "");

    if (!name || !["Hadir", "Tidak hadir"].includes(attendance)) {
      setFeedback({ kind: "error", message: "Mohon isi nama dan pilih konfirmasi kehadiran." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      const result = await submitNetlifyForm("rsvp", { name, attendance });
      if (result.status === "local-preview") {
        setFeedback({
          kind: "info",
          message: "Konfirmasi siap dikirim setelah website di-deploy ke Netlify.",
        });
        return;
      }

      form.reset();
      setFeedback({ kind: "success", message: "Terima kasih. Konfirmasi kehadiran berhasil dikirim." });
    } catch {
      setFeedback({
        kind: "error",
        message: "Konfirmasi belum terkirim. Periksa koneksi Anda lalu coba kembali.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rsvp-section" id="rsvp" aria-labelledby="rsvp-title">
      <Reveal className="section-inner rsvp-inner">
        <p className="section-kicker">KEHADIRAN ANDA</p>
        <h2 id="rsvp-title">Konfirmasi Kehadiran</h2>
        <p className="section-intro">Mohon sampaikan konfirmasi Anda melalui formulir berikut.</p>

        <form
          className="elegant-form rsvp-form"
          name="rsvp"
          method="POST"
          action="/"
          data-netlify="true"
          onSubmit={(event) => void handleSubmit(event)}
        >
          <input type="hidden" name="form-name" value="rsvp" />
          <label className="field-label" htmlFor="rsvp-name">Nama</label>
          <input
            className="text-field"
            id="rsvp-name"
            type="text"
            name="name"
            autoComplete="name"
            maxLength={80}
            placeholder="Nama Anda"
            required
          />
          <fieldset className="attendance-fieldset">
            <legend className="field-label">Konfirmasi kehadiran</legend>
            <label className="attendance-option">
              <input type="radio" name="attendance" value="Hadir" required />
              <span className="radio-custom" aria-hidden="true" />
              <span>Hadir</span>
            </label>
            <label className="attendance-option">
              <input type="radio" name="attendance" value="Tidak hadir" />
              <span className="radio-custom" aria-hidden="true" />
              <span>Tidak hadir</span>
            </label>
          </fieldset>
          <div className="form-actions">
            <button className="gold-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "MENGIRIM..." : "KIRIM KONFIRMASI"}
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m3 10 14-7-4 14-3-6-7-1Zm7 1 7-8" /></svg>
            </button>
            <p className={`form-feedback ${feedback ? `feedback-${feedback.kind}` : ""}`} role="status" aria-live="polite">
              {feedback?.message}
            </p>
          </div>
        </form>
      </Reveal>
    </section>
  );
}