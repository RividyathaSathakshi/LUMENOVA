import { useState } from "react";
import { useI18n } from "../../i18n";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-display text-h1 text-ink">{t("contact.title")}</h1>
      <p className="mt-4 text-body-lg text-ink-dim">{t("contact.intro")}</p>

      {sent ? (
        <Card className="mt-8">
          <h2 className="font-display text-h3 text-ink">{t("contact.sentTitle")}</h2>
          <p className="mt-2 text-body text-ink-dim">{t("contact.sentBody")}</p>
        </Card>
      ) : (
        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label className="text-label text-ink" htmlFor="name">
              {t("contact.nameLabel")}
            </label>
            <input
              id="name"
              required
              className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-bg-panel px-3.5 py-2.5 text-body text-ink"
            />
          </div>
          <div>
            <label className="text-label text-ink" htmlFor="email">
              {t("contact.emailLabel")}
            </label>
            <input
              id="email"
              type="email"
              required
              className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-bg-panel px-3.5 py-2.5 text-body text-ink"
            />
          </div>
          <div>
            <label className="text-label text-ink" htmlFor="message">
              {t("contact.messageLabel")}
            </label>
            <textarea
              id="message"
              rows={5}
              required
              className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-bg-panel px-3.5 py-2.5 text-body text-ink"
            />
          </div>
          <Button type="submit">{t("contact.submit")}</Button>
        </form>
      )}
    </div>
  );
}
