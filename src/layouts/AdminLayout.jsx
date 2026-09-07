import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, MessageSquare, FolderKanban, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const { t, toggleLang } = useLanguage();
  const navItems = [
    { to: "/admin", label: t.admin.dashboard, icon: LayoutDashboard, end: true },
    { to: "/admin/messages", label: t.admin.messages, icon: MessageSquare },
    { to: "/admin/projects", label: t.admin.projects, icon: FolderKanban },
  ];

  return (
    <div className="min-h-screen bg-ink-950 text-mist-100 flex">
      {/* ================= SIDEBAR ================= */}
      <aside
        className="
          hidden md:flex md:flex-col
          w-64 shrink-0
          border-l border-white/[0.07]
          bg-ink-900/40 backdrop-blur-xl
          px-5 py-8
        "
      >
        <div className="flex items-center gap-3 mb-10 px-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="font-display text-lg text-mist-100">Devora Admin</p>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `
                    group flex items-center gap-3 rounded-xl px-4 py-3 text-sm
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-mist-500 border border-transparent hover:text-mist-200 hover:bg-white/[0.03]"
                    }
                  `
                }
              >
                <Icon size={17} strokeWidth={1.8} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-white/[0.06] space-y-3">
          <button
            onClick={toggleLang}
            className="px-4 text-xs text-mist-600 hover:text-emerald-400 transition-colors duration-300"
          >
            {t.admin.languageToggle}
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 text-xs text-mist-600 hover:text-emerald-400 transition-colors duration-300"
          >
            <ArrowLeft size={13} className="rtl:-scale-x-100" />
            {t.admin.backToSite}
          </Link>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-mist-600 mb-1">
              {t.admin.account}
            </p>
            <p className="text-sm text-mist-300 truncate mb-3">{user?.email}</p>
            <button
              onClick={signOut}
              className="flex items-center gap-2 text-xs text-mist-500 hover:text-red-400 transition-colors duration-300"
            >
              <LogOut size={13} />
              {t.admin.signOut}
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MOBILE TOP NAV ================= */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/[0.08] bg-ink-950/90 backdrop-blur-xl">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 text-[11px] ${
                    isActive ? "text-emerald-400" : "text-mist-600"
                  }`
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                {item.label}
              </NavLink>
            );
          })}
          <button
            onClick={signOut}
            className="flex flex-col items-center gap-1 text-[11px] text-mist-600"
          >
            <LogOut size={19} strokeWidth={1.8} />
            {t.admin.logout}
          </button>
          <button
            onClick={toggleLang}
            className="flex flex-col items-center gap-1 text-[11px] text-mist-600"
          >
            <span className="text-xs font-medium">Aa</span>
            {t.admin.languageToggle}
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 min-w-0 pb-24 md:pb-0">
        <div className="relative">
          <div className="pointer-events-none absolute top-0 left-1/3 h-[350px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[130px]" />
          <div className="relative z-10 p-6 md:p-10 max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
