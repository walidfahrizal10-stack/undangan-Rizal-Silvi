import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const bankAccounts = [
  { bank: "BANK BCA", holder: "WALID FAHRIZAL", account: "0312722567" },
  { bank: "BANK BNI", holder: "SILVI LUPIATUN NISAK", account: "1232656336" },
];

async function copyText(value: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Try the selection-based fallback when clipboard permission is unavailable.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!copied) throw new Error("Clipboard tidak tersedia.");
}

export function WeddingGift() {
  const [notice, setNotice] = useState("");
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const handleCopy = async (account: string) => {
    try {
      await copyText(account);
      setNotice(`Nomor rekening ${account} berhasil disalin.`);
    } catch {
      setNotice("Nomor rekening belum dapat disalin. Silakan salin secara manual.");
    }
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setNotice(""), 3_500);
  };

  return (
    <section className="gift-section" id="hadiah" aria-labelledby="gift-title">
      <Reveal className="section-inner gift-inner">
        <p className="section-kicker">TANDA KASIH</p>
        <h2 id="gift-title">Wedding Gift</h2>
        <p className="gift-intro">
          Doa restu Anda merupakan hadiah terindah bagi kami. Namun, apabila ingin memberikan tanda
          kasih, dapat melalui rekening berikut:
        </p>
        <div className="gift-accounts">
          {bankAccounts.map((item) => (
            <article className="bank-account" key={item.bank}>
              <div className="bank-topline">
                <span className="bank-emblem" aria-hidden="true">
                  <svg viewBox="0 0 36 36" fill="none">
                    <path d="M4 13 18 5l14 8M7 14h22M9 16v11m6-11v11m6-11v11m6-11v11M5 29h26M3 32h30" />
                  </svg>
                </span>
                <span className="bank-name">{item.bank}</span>
              </div>
              <p className="account-holder-label">ATAS NAMA</p>
              <p className="account-holder">{item.holder}</p>
              <p className="account-number">{item.account}</p>
              <button className="copy-button" type="button" onClick={() => void handleCopy(item.account)}>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="7" y="7" width="9" height="10" rx="1" />
                  <path d="M13 7V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2" />
                </svg>
                SALIN NOMOR REKENING
              </button>
            </article>
          ))}
        </div>
        <p className={`gift-notice ${notice ? "is-visible" : ""}`} role="status" aria-live="polite">
          {notice}
        </p>
      </Reveal>
    </section>
  );
}