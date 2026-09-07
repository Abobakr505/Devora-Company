import { useEffect, useMemo, useState } from "react";
import { Mail, Trash2, Building2, Tag, Clock } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function MessagesManager() {
  const { t } = useLanguage();
  const statusTabs = [
    { key: "all", label: t.admin.all },
    { key: "new", label: t.admin.new },
    { key: "read", label: t.admin.read },
    { key: "replied", label: t.admin.replied },
    { key: "archived", label: t.admin.archived },
  ];
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchMessages();

    // تحديث لحظي عند وصول رسالة جديدة
    const channel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => fetchMessages()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setMessages(data ?? []);
    setLoading(false);
  }

  const filtered = useMemo(() => {
    if (activeTab === "all") return messages;
    return messages.filter((m) => m.status === activeTab);
  }, [messages, activeTab]);

  async function updateStatus(id, status) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
    await supabase.from("messages").update({ status }).eq("id", id);
  }

  async function deleteMessage(id) {
    if (!confirm(t.admin.deleteMessageConfirm)) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    await supabase.from("messages").delete().eq("id", id);
  }

  function openMessage(msg) {
    setSelected(msg);
    if (msg.status === "new") updateStatus(msg.id, "read");
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="h-px w-8 bg-emerald-500" />
        <span className="text-xs uppercase tracking-[0.2em] text-mist-600">{t.admin.manageMessages}</span>
      </div>
      <h1 className="font-display text-3xl md:text-4xl text-mist-100 mb-8">{t.admin.inbox}</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              rounded-full border px-4 py-2 text-xs transition-all duration-300
              ${
                activeTab === tab.key
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  : "border-white/10 text-mist-500 hover:text-mist-200"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-3">
          {loading ? (
            <p className="text-sm text-mist-600">{t.admin.loading}</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-mist-600">{t.admin.noMessagesInSection}</p>
          ) : (
            filtered.map((msg) => (
              <button
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`
                  w-full text-right rounded-2xl border p-4 transition-all duration-300
                  ${
                    selected?.id === msg.id
                      ? "border-emerald-500/40 bg-emerald-500/[0.06]"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15]"
                  }
                `}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm text-mist-100 truncate">{msg.name}</p>
                  {msg.status === "new" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-mist-600 truncate">{msg.message}</p>
                <p className="text-[10px] text-mist-700 mt-2">
                  {new Date(msg.created_at).toLocaleDateString("ar-EG", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {!selected ? (
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 h-full flex items-center justify-center text-center">
              <p className="text-sm text-mist-600">{t.admin.selectMessage}</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-2xl text-mist-100 mb-1">{selected.name}</h2>
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-1.5 text-sm text-emerald-400 hover:underline"
                  >
                    <Mail size={13} />
                    {selected.email}
                  </a>
                </div>
                <button
                  onClick={() => deleteMessage(selected.id)}
                  className="shrink-0 flex items-center justify-center h-9 w-9 rounded-full border border-white/10 text-mist-500 hover:border-red-500/30 hover:text-red-400 transition-colors duration-300"
                  title={t.admin.delete}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mb-6 text-xs text-mist-500">
                {selected.company && (
                  <span className="flex items-center gap-1.5">
                    <Building2 size={13} /> {selected.company}
                  </span>
                )}
                {selected.project_type && (
                  <span className="flex items-center gap-1.5">
                    <Tag size={13} /> {selected.project_type}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {new Date(selected.created_at).toLocaleString("ar-EG")}
                </span>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-ink-900/50 p-5 mb-6">
                <p className="text-mist-300 leading-7 whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-mist-600">{t.admin.changeStatus}</span>
                {["new", "read", "replied", "archived"].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selected.id, status)}
                    className={`
                      rounded-full border px-3.5 py-1.5 text-xs transition-all duration-300
                      ${
                        selected.status === status
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                          : "border-white/10 text-mist-500 hover:text-mist-200"
                      }
                    `}
                  >
                    {statusTabs.find((tab) => tab.key === status)?.label}
                  </button>
                ))}

                <a
                  href={`mailto:${selected.email}`}
                  className="mr-auto rounded-full bg-emerald-500 px-5 py-2 text-xs font-semibold text-ink-950 hover:bg-emerald-400 transition-colors duration-300"
                >
                  {t.admin.replyByEmail}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
