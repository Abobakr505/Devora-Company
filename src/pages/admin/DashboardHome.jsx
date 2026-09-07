import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, FolderKanban, Mail, ArrowUpRight } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function DashboardHome() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalMessages: 0,
    newMessages: 0,
    totalProjects: 0,
    publishedProjects: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const [
        { count: totalMessages },
        { count: newMessages },
        { count: totalProjects },
        { count: publishedProjects },
        { data: recent },
      ] = await Promise.all([
        supabase.from("messages").select("*", { count: "exact", head: true }),
        supabase.from("messages").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      if (!active) return;
      setStats({
        totalMessages: totalMessages ?? 0,
        newMessages: newMessages ?? 0,
        totalProjects: totalProjects ?? 0,
        publishedProjects: publishedProjects ?? 0,
      });
      setRecentMessages(recent ?? []);
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const cards = [
    {
      label: t.admin.totalMessages,
      value: stats.totalMessages,
      icon: Mail,
      to: "/admin/messages",
    },
    {
      label: t.admin.newMessages,
      value: stats.newMessages,
      icon: MessageSquare,
      to: "/admin/messages",
      highlight: stats.newMessages > 0,
    },
    {
      label: t.admin.totalProjects,
      value: stats.totalProjects,
      icon: FolderKanban,
      to: "/admin/projects",
    },
    {
      label: t.admin.publishedNow,
      value: stats.publishedProjects,
      icon: FolderKanban,
      to: "/admin/projects",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="h-px w-8 bg-emerald-500" />
        <span className="text-xs uppercase tracking-[0.2em] text-mist-600">
          {t.admin.overview}
        </span>
      </div>
      <h1 className="font-display text-3xl md:text-4xl text-mist-100 mb-10">
        {t.admin.welcome}
      </h1>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.to}
              className="
                group relative overflow-hidden rounded-2xl
                border border-white/[0.07] bg-white/[0.025]
                p-6 transition-all duration-300
                hover:-translate-y-1 hover:border-emerald-500/25
              "
            >
              {card.highlight && (
                <span className="absolute top-4 left-4 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
              <Icon size={20} className="text-emerald-400 mb-4" strokeWidth={1.8} />
              <p className="font-display text-3xl text-mist-100 mb-1">
                {loading ? "—" : card.value}
              </p>
              <p className="text-xs text-mist-600">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent messages */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-mist-100">{t.admin.recentMessages}</h2>
          <Link
            to="/admin/messages"
            className="flex items-center gap-1.5 text-xs text-mist-500 hover:text-emerald-400 transition-colors duration-300"
          >
            {t.admin.viewAll}
            <ArrowUpRight size={13} className="rtl:-scale-x-100" />
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-mist-600">{t.admin.loading}</p>
        ) : recentMessages.length === 0 ? (
          <p className="text-sm text-mist-600">{t.admin.noMessages}</p>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="text-sm text-mist-100 truncate">{msg.name}</p>
                  <p className="text-xs text-mist-600 truncate">{msg.message}</p>
                </div>
                <span
                  className={`shrink-0 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    msg.status === "new"
                      ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/[0.06]"
                      : "border-white/10 text-mist-600"
                  }`}
                >
                  {t.admin[msg.status] || msg.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
