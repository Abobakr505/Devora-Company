import { Facebook, Instagram, Github, Linkedin } from "lucide-react";
import Logo from "../Logo/Logo.jsx";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const SOCIALS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-ink-950 border-t border-white/[0.06] pt-16 pb-8">
      <div className="container-devora">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size={30} />
              <span className="font-display text-xl text-mist-100">DEVORA</span>
            </div>
            <p className="text-mist-500 max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm text-mist-500 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-mist-500 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 border-t border-white/[0.06] pt-6 text-sm text-mist-700">
          <span>{t.footer.copyright}</span>
          <a href={`mailto:${t.contact.email}`} className="hover:text-emerald-400 transition-colors">
            {t.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
