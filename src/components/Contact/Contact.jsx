import { useEffect, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Send,
  CheckCircle2,
} from "lucide-react";
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

  useEffect(() => {
    setForm((current) => ({
      ...current,
      projectType: t.contact.form.projectTypes.includes(current.projectType)
        ? current.projectType
        : t.contact.form.projectTypes[0],
    }));
  }, [t]);

  const update = (key) => (e) => {
    setForm((current) => ({
      ...current,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("sent");

    // Add EmailJS / API integration here.
  };

  const contactItems = [
    {
      icon: Mail,
      label: t.contact.emailLabel,
      value: t.contact.email,
      href: `mailto:${t.contact.email}`,
    },
    {
      icon: Phone,
      label: t.contact.phoneLabel,
      value: t.contact.phone,
      href: `tel:${t.contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: t.contact.locationLabel,
      value: t.contact.location,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-36 bg-ink-950"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-emerald-400/5 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="container-devora relative z-10">
        {/* Header */}
        <div
          ref={revealRef}
          data-reveal
          className="max-w-3xl mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-emerald-500" />

            <p className="section-label">
              {t.contact.label}
            </p>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-mist-100 tracking-tight">
            {t.contact.title}
          </h2>

          <p className="mt-6 max-w-xl text-mist-500 text-base md:text-lg leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Information */}
          <div
            data-reveal
            className="lg:col-span-5 space-y-4"
          >
            {contactItems.map((item, index) => {
              const Icon = item.icon;

              const content = (
                <div
                  className="
                    group relative overflow-hidden
                    rounded-2xl
                    border border-white/[0.07]
                    bg-white/[0.025]
                    backdrop-blur-xl
                    p-5 md:p-6
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:border-emerald-500/30
                    hover:bg-emerald-500/[0.035]
                  "
                >
                  {/* Hover glow */}
                  <div
                    className="
                      absolute -right-10 -top-10
                      h-28 w-28 rounded-full
                      bg-emerald-500/10
                      blur-3xl
                      opacity-0
                      transition-opacity duration-500
                      group-hover:opacity-100
                    "
                  />

                  <div className="relative flex items-center gap-4">
                    <div
                      className="
                        flex h-12 w-12 shrink-0
                        items-center justify-center
                        rounded-xl
                        border border-emerald-500/20
                        bg-emerald-500/10
                        text-emerald-400
                        transition-all duration-500
                        group-hover:scale-110
                        group-hover:bg-emerald-500/15
                      "
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.15em] text-mist-600 mb-1">
                        {item.label}
                      </p>

                      <p className="text-mist-200 text-sm md:text-base truncate">
                        {item.value}
                      </p>
                    </div>

                    {item.href && (
                      <ArrowUpRight
                        size={18}
                        className="
                          ml-auto shrink-0
                          text-mist-600
                          transition-all duration-300
                          group-hover:text-emerald-400
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                        "
                      />
                    )}
                  </div>
                </div>
              );

              return item.href ? (
                <a
                  key={index}
                  href={item.href}
                  data-reveal
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={index} data-reveal>
                  {content}
                </div>
              );
            })}

            {/* Availability */}
            <div
              data-reveal
              className="
                mt-6 rounded-2xl
                border border-emerald-500/10
                bg-emerald-500/[0.035]
                p-5
              "
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>

                <span className="text-sm text-mist-300">
                  {t.contact.available}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            data-reveal
            className="
              lg:col-span-7
              relative overflow-hidden
              rounded-3xl
              border border-white/[0.08]
              bg-white/[0.035]
              backdrop-blur-2xl
              p-6 md:p-8 lg:p-10
              shadow-2xl shadow-black/20
            "
          >
            {/* Card glow */}
            <div
              className="
                pointer-events-none
                absolute -right-32 -top-32
                h-72 w-72
                rounded-full
                bg-emerald-500/[0.07]
                blur-[100px]
              "
            />

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-500 mb-2">
                    {t.contact.form.startProject}
                  </p>

                  <h3 className="font-display text-2xl md:text-3xl text-mist-100">
                    {t.contact.form.title}
                  </h3>
                </div>

                <div
                  className="
                    hidden sm:flex
                    h-11 w-11
                    items-center justify-center
                    rounded-full
                    border border-white/10
                    bg-white/[0.03]
                    text-mist-400
                  "
                >
                  <Send size={17} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="text-sm text-mist-500 mb-2 block">
                    {t.contact.form.name}
                  </label>

                  <input
                    required
                    value={form.name}
                    onChange={update("name")}
                    type="text"
                    className="
                      w-full rounded-xl
                      bg-ink-900/70
                      border border-white/[0.08]
                      px-4 py-3.5
                      text-mist-100
                      placeholder:text-mist-700
                      outline-none
                      transition-all duration-300
                      focus:border-emerald-500/50
                      focus:ring-4
                      focus:ring-emerald-500/5
                    "
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-mist-500 mb-2 block">
                    {t.contact.form.email}
                  </label>

                  <input
                    required
                    value={form.email}
                    onChange={update("email")}
                    type="email"
                    className="
                      w-full rounded-xl
                      bg-ink-900/70
                      border border-white/[0.08]
                      px-4 py-3.5
                      text-mist-100
                      placeholder:text-mist-700
                      outline-none
                      transition-all duration-300
                      focus:border-emerald-500/50
                      focus:ring-4
                      focus:ring-emerald-500/5
                    "
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="text-sm text-mist-500 mb-2 block">
                    {t.contact.form.company}
                  </label>

                  <input
                    value={form.company}
                    onChange={update("company")}
                    type="text"
                    className="
                      w-full rounded-xl
                      bg-ink-900/70
                      border border-white/[0.08]
                      px-4 py-3.5
                      text-mist-100
                      placeholder:text-mist-700
                      outline-none
                      transition-all duration-300
                      focus:border-emerald-500/50
                      focus:ring-4
                      focus:ring-emerald-500/5
                    "
                    placeholder={t.contact.form.companyPlaceholder}
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="text-sm text-mist-500 mb-2 block">
                    {t.contact.form.projectType}
                  </label>

                  <select
                    value={form.projectType}
                    onChange={update("projectType")}
                    className="
                      w-full rounded-xl
                      bg-ink-900/70
                      border border-white/[0.08]
                      px-4 py-3.5
                      text-mist-100
                      outline-none
                      transition-all duration-300
                      focus:border-emerald-500/50
                      focus:ring-4
                      focus:ring-emerald-500/5
                      cursor-pointer
                    "
                  >
                    {t.contact.form.projectTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-ink-900"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="text-sm text-mist-500 mb-2 block">
                    {t.contact.form.message}
                  </label>

                  <textarea
                    required
                    value={form.message}
                    onChange={update("message")}
                    rows={6}
                    className="
                      w-full rounded-xl
                      bg-ink-900/70
                      border border-white/[0.08]
                      px-4 py-3.5
                      text-mist-100
                      placeholder:text-mist-700
                      outline-none
                      transition-all duration-300
                      focus:border-emerald-500/50
                      focus:ring-4
                      focus:ring-emerald-500/5
                      resize-none
                    "
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>

                {/* Submit */}
                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sent"}
                    className="
                      group
                      relative
                      w-full sm:w-auto
                      inline-flex
                      items-center
                      justify-center
                      gap-3
                      overflow-hidden
                      rounded-full
                      bg-emerald-500
                      px-8 py-3.5
                      text-sm font-semibold
                      text-ink-950
                      transition-all duration-300
                      hover:bg-emerald-400
                      hover:shadow-xl
                      hover:shadow-emerald-500/20
                      active:scale-[0.98]
                      disabled:cursor-default
                    "
                  >
                    {status === "sent" ? (
                      <>
                        <CheckCircle2 size={18} />
                        {t.contact.form.sent}
                      </>
                    ) : (
                      <>
                        <span>
                          {t.contact.form.send}
                        </span>

                        <ArrowUpRight
                          size={18}
                          className="
                            transition-transform duration-300
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                          "
                        />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
