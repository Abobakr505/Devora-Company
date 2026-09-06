import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function Contact() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal("[data-reveal]");
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: t.contact.form.projectTypes[0],
    message: "",
  });

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to EmailJS or your own API endpoint.
    setStatus("sent");
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-ink-900/30">
      <div className="container-devora">
        <div ref={revealRef} className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5" data-reveal>
            <p className="section-label mb-6">{t.contact.label}</p>
            <h2 className="font-display text-4xl sm:text-5xl text-mist-100 mb-8">
              {t.contact.title}
            </h2>

            <div className="space-y-6">
              <a
                href={`mailto:${t.contact.email}`}
                className="flex items-center gap-4 text-mist-300 hover:text-emerald-400 transition-colors"
              >
                <Mail size={20} className="text-emerald-500 shrink-0" />
                {t.contact.email}
              </a>
              <a
                href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 text-mist-300 hover:text-emerald-400 transition-colors"
              >
                <Phone size={20} className="text-emerald-500 shrink-0" />
                {t.contact.phone}
              </a>
              <div className="flex items-center gap-4 text-mist-300">
                <MapPin size={20} className="text-emerald-500 shrink-0" />
                {t.contact.location}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            data-reveal
            className="lg:col-span-7 grid sm:grid-cols-2 gap-5"
          >
            <div className="sm:col-span-1">
              <label className="text-sm text-mist-500 mb-2 block">{t.contact.form.name}</label>
              <input
                required
                value={form.name}
                onChange={update("name")}
                type="text"
                className="w-full rounded-xl bg-ink-900/60 border border-white/10 px-4 py-3 text-mist-100 focus:border-emerald-500/60 outline-none transition-colors"
                placeholder={t.contact.form.namePlaceholder}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-sm text-mist-500 mb-2 block">{t.contact.form.email}</label>
              <input
                required
                value={form.email}
                onChange={update("email")}
                type="email"
                className="w-full rounded-xl bg-ink-900/60 border border-white/10 px-4 py-3 text-mist-100 focus:border-emerald-500/60 outline-none transition-colors"
                placeholder={t.contact.form.emailPlaceholder}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-sm text-mist-500 mb-2 block">{t.contact.form.company}</label>
              <input
                value={form.company}
                onChange={update("company")}
                type="text"
                className="w-full rounded-xl bg-ink-900/60 border border-white/10 px-4 py-3 text-mist-100 focus:border-emerald-500/60 outline-none transition-colors"
                placeholder={t.contact.form.companyPlaceholder}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-sm text-mist-500 mb-2 block">{t.contact.form.projectType}</label>
              <select
                value={form.projectType}
                onChange={update("projectType")}
                className="w-full rounded-xl bg-ink-900/60 border border-white/10 px-4 py-3 text-mist-100 focus:border-emerald-500/60 outline-none transition-colors"
              >
                {t.contact.form.projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-mist-500 mb-2 block">{t.contact.form.message}</label>
              <textarea
                required
                value={form.message}
                onChange={update("message")}
                rows={5}
                className="w-full rounded-xl bg-ink-900/60 border border-white/10 px-4 py-3 text-mist-100 focus:border-emerald-500/60 outline-none transition-colors resize-none"
                placeholder={t.contact.form.messagePlaceholder}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 text-ink-950 font-medium px-8 py-3.5 hover:bg-emerald-400 transition-colors duration-300"
              >
                {status === "sent" ? t.contact.form.sent : t.contact.form.send}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}