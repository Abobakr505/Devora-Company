import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Lock, Mail, ArrowUpRight, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function AdminLogin() {
  const { signIn, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);
    const res = await signIn(email, password);
    setLoading(false);
    if (!res.ok) setFormError(res.error);
  };

  return (
    <div className="relative min-h-screen bg-ink-950 flex items-center justify-center px-6 overflow-hidden">
      {/* خلفية */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[400px] w-[500px] rounded-full bg-emerald-500/[0.07] blur-[140px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.15]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <span className="h-px w-10 bg-emerald-500" />
          <p className="text-xs uppercase tracking-[0.2em] text-mist-600">
            {t.admin.loginLabel}
          </p>
          <span className="h-px w-10 bg-emerald-500" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            relative overflow-hidden
            rounded-3xl
            border border-white/[0.08]
            bg-white/[0.035]
            backdrop-blur-2xl
            p-8 md:p-10
            shadow-2xl shadow-black/30
          "
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-500/[0.08] blur-[100px]" />

          <div className="relative">
            <h1 className="font-display text-3xl text-mist-100 mb-2">
              {t.admin.loginTitle}
            </h1>
            <p className="text-sm text-mist-500 mb-8">
              {t.admin.loginDescription}
            </p>

            {formError && (
              <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="text-sm text-mist-500 mb-2 block">
                  {t.admin.email}
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-mist-600"
                  />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@devora.com"
                    className="w-full rounded-xl bg-ink-900/70 border border-white/[0.08] px-4 py-3.5 pr-11 text-mist-100 placeholder:text-mist-700 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-mist-500 mb-2 block">
                  {t.admin.password}
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-mist-600"
                  />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-ink-900/70 border border-white/[0.08] px-4 py-3.5 pr-11 text-mist-100 placeholder:text-mist-700 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  group mt-2 w-full inline-flex items-center justify-center gap-2
                  rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-ink-950
                  transition-all duration-300 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20
                  disabled:opacity-60 disabled:cursor-default
                "
              >
                {loading ? t.admin.loggingIn : t.admin.login}
                {!loading && (
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
