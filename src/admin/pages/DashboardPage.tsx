import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import AdminIcon, { type AdminIconName } from "../components/AdminIcon";
import PanelState from "../components/PanelState";
import StatusBadge from "../components/StatusBadge";
import Thumbnail from "../components/Thumbnail";
import { buttonPrimary, buttonSecondary, cardClass } from "../components/ui";
import { SketchCorner, SketchUnderline } from "../../components/SketchFrame";
import { dashboardPath, type DashboardSummary } from "../lib/dashboard";
import { formatDateTime, useDocumentTitle } from "../lib/format";
import type { Resource } from "../../lib/api";
import { useApi } from "../../lib/useApi";

// Beranda panel admin CMS. Susunannya sama dengan dashboard admin BKK & PPDB:
// sapaan + "Perlu Tindakan", empat angka utama, lalu tabel & ringkasan di bawahnya.

function greeting() {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat pagi";
    if (hour < 15) return "Selamat siang";
    if (hour < 18) return "Selamat sore";
    return "Selamat malam";
}

function SectionTitle({ children }: { children: string }) {
    return(
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-brand-ink">
            <SketchUnderline size="sm">{children}</SketchUnderline>
        </h2>
    )
}

export default function DashboardPage() {
    useDocumentTitle("Dashboard Utama");
    const { user } = useAuth();
    const { data, error, reload } = useApi<Resource<DashboardSummary>>(dashboardPath);
    const stats = data?.data;

    const displayName = user?.nama_lengkap ?? user?.name ?? user?.username ?? "Administrator";
    const firstName = displayName.trim().split(/\s+/)[0];

    if (!stats) return <PanelState error={error} onRetry={reload} label="Memuat ringkasan dasbor" />;

    const { total, published, scheduled, draft } = stats.news;
    const percent = (value: number) => (total > 0 ? Math.round((value / total) * 100) : 0);

    const todo = [
        { count: draft, label: "draf berita belum terbit", to: "/admin/berita?status=draft" },
        { count: scheduled, label: "berita terjadwal akan terbit", to: "/admin/berita?status=scheduled" },
    ].filter((item) => item.count > 0);

    const kpis: { label: string; value: number; icon: AdminIconName; note: string; to: string; alert?: boolean }[] = [
        { label: "Total Berita", value: total, icon: "news", note: `${published} terbit · ${scheduled} terjadwal`, to: "/admin/berita" },
        { label: "Draf Berita", value: draft, icon: "pencil", note: "Belum tampil di situs sekolah", to: "/admin/berita?status=draft", alert: draft > 0 },
        { label: "Program Unggulan", value: stats.programs, icon: "star", note: "Tampil di beranda situs", to: "/admin/program" },
        { label: "Fasilitas & Sarana", value: stats.facilities, icon: "building", note: "Lab, bengkel & ruang praktik", to: "/admin/fasilitas" },
    ];

    const statusRows = [
        { label: "Terbit", value: published, tone: "bg-brand-darkred", to: "/admin/berita?status=published" },
        { label: "Terjadwal", value: scheduled, tone: "bg-brand-blue", to: "/admin/berita?status=scheduled" },
        { label: "Draf", value: draft, tone: "bg-brand-ink/20", to: "/admin/berita?status=draft" },
    ];

    const quickActions: { label: string; icon: AdminIconName; to: string }[] = [
        { label: "Tulis berita baru", icon: "news", to: "/admin/berita/baru" },
        { label: "Tambah program unggulan", icon: "star", to: "/admin/program/baru" },
        { label: "Tambah Talent Day", icon: "sparkles", to: "/admin/talent-day/baru" },
        { label: "Tambah ekstrakurikuler", icon: "trophy", to: "/admin/ekskul/baru" },
        { label: "Tambah fasilitas", icon: "building", to: "/admin/fasilitas/baru" },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* HERO */}
            <section className={`${cardClass} relative p-6 sm:p-8 overflow-hidden`}>
                <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-brand-darkred/[0.04] pointer-events-none" />
                <div className="relative grid lg:grid-cols-[1fr_340px] gap-8 items-center">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-darkred">
                            Pusat Kendali Konten · Portal SMK Plus Pelita Nusantara
                        </p>
                        <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[44px] font-bold uppercase tracking-wide text-brand-ink leading-[1.1]">
                            {greeting()}, <SketchUnderline size="md">{firstName}</SketchUnderline>
                        </h1>
                        <p className="mt-5 text-sm sm:text-[15px] text-brand-ink/70 leading-relaxed max-w-2xl">
                            Situs sekolah saat ini memuat <b className="text-brand-ink">{published} berita terbit</b>,{" "}
                            <b className="text-brand-ink">{stats.programs} program unggulan</b>, dan{" "}
                            <b className="text-brand-ink">{stats.facilities} fasilitas</b>.{" "}
                            {draft > 0 ? (
                                <>
                                    Masih ada <b className="text-brand-darkred">{draft} draf</b> yang belum dipublikasikan.
                                </>
                            ) : (
                                "Semua berita sudah dipublikasikan."
                            )}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2.5">
                            <Link to="/admin/berita/baru" className={buttonPrimary}>
                                <AdminIcon name="plus" className="w-4 h-4" />
                                Tulis Berita
                            </Link>
                            <Link to="/admin/berita" className={buttonSecondary}>
                                <AdminIcon name="news" className="w-4 h-4 text-brand-darkred" />
                                Kelola Berita
                            </Link>
                            <span className="hidden sm:block w-px h-6 bg-brand-ink/10 self-center mx-0.5" aria-hidden="true" />
                            <a
                                href="/"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 h-10 px-4 rounded-full text-brand-ink text-sm font-semibold hover:bg-brand-softmist transition-colors"
                            >
                                <AdminIcon name="external" className="w-4 h-4 text-brand-ink/60" />
                                Lihat Situs
                            </a>
                        </div>
                    </div>

                    {/* Perlu tindakan */}
                    <div className="relative rounded-card bg-brand-paper p-5">
                        <SketchCorner className="-left-2 -top-2 w-20 h-8" />
                        <SketchCorner delay={350} className="-right-2 -bottom-2 rotate-180 w-20 h-8" />
                        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-brand-ink">Perlu Tindakan</h2>
                        <ul className="mt-3 space-y-1.5">
                            {todo.length > 0 ? (
                                todo.map((item) => (
                                    <li key={item.label}>
                                        <Link to={item.to} className="group flex items-center gap-3 rounded-xl px-2 py-1.5 -mx-2 hover:bg-white transition-colors">
                                            <span className="min-w-8 h-8 px-2 rounded-full bg-brand-darkred text-white font-display text-sm grid place-items-center">
                                                {item.count}
                                            </span>
                                            <span className="text-sm text-brand-ink flex-1">{item.label}</span>
                                            <AdminIcon name="chevronRight" className="w-4 h-4 text-brand-muted group-hover:text-brand-darkred group-hover:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="flex items-center gap-2 text-sm text-brand-ink/70 py-2">
                                    <AdminIcon name="checkCircle" className="w-5 h-5 text-emerald-600" />
                                    Tidak ada antrean, semua konten sudah terbit.
                                </li>
                            )}
                        </ul>
                        <div className="mt-4 pt-3 border-t border-brand-ink/10">
                            <div className="flex justify-between text-xs font-semibold text-brand-ink">
                                <span>Rasio publikasi berita</span>
                                <span className="tabular-nums">{percent(published)}%</span>
                            </div>
                            <div className="mt-1.5 h-2 rounded-full bg-white overflow-hidden">
                                <div className="h-full rounded-full bg-brand-darkred transition-all duration-500" style={{ width: `${percent(published)}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* KPI */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" aria-label="Ringkasan konten">
                {kpis.map((kpi) => (
                    <Link
                        key={kpi.label}
                        to={kpi.to}
                        className={`${cardClass} group p-5 hover:border-brand-darkred/25 hover:shadow-softpill transition-all ${kpi.alert ? "ring-1 ring-brand-darkred/20" : ""}`}
                    >
                        <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold uppercase tracking-wider ${kpi.alert ? "text-brand-darkred" : "text-brand-ink/60"}`}>{kpi.label}</span>
                            <span
                                className={`w-9 h-9 rounded-full grid place-items-center transition-colors ${
                                    kpi.alert
                                        ? "bg-brand-darkred text-white"
                                        : "bg-brand-darkred/[0.07] text-brand-darkred group-hover:bg-brand-darkred group-hover:text-white"
                                }`}
                            >
                                <AdminIcon name={kpi.icon} className="w-4 h-4" />
                            </span>
                        </div>
                        <div className="mt-3 font-display text-5xl font-bold text-brand-ink leading-none">{kpi.value.toLocaleString("id-ID")}</div>
                        <div className="mt-3 pt-3 border-t border-brand-ink/10 text-xs text-brand-ink/60">{kpi.note}</div>
                    </Link>
                ))}
            </section>

            {/* BERITA TERBARU + STATUS PUBLIKASI */}
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className={`${cardClass} xl:col-span-7 overflow-hidden flex flex-col`}>
                    <div className="px-6 pt-6 pb-4 flex items-end justify-between gap-4">
                        <SectionTitle>Berita Terakhir Diubah</SectionTitle>
                        <Link to="/admin/berita" className="group inline-flex items-center gap-1 text-xs font-semibold text-brand-darkred shrink-0">
                            Semua ({total})
                            <AdminIcon name="arrowRight" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm table-fixed min-w-[480px]">
                            <colgroup>
                                <col />
                                <col className="w-[110px]" />
                                <col className="w-[88px]" />
                            </colgroup>
                            <thead>
                                <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-brand-ink/50 border-y border-brand-ink/10 bg-brand-paper/60">
                                    <th className="px-6 py-2.5">Berita</th>
                                    <th className="px-3 py-2.5">Status</th>
                                    <th className="px-6 py-2.5 text-right">
                                        <span className="sr-only">Aksi</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-ink/5">
                                {stats.recent_news.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center text-sm text-brand-ink/50">
                                            Belum ada berita.{" "}
                                            <Link to="/admin/berita/baru" className="font-semibold text-brand-darkred hover:underline">
                                                Tulis berita pertama
                                            </Link>
                                            .
                                        </td>
                                    </tr>
                                ) : (
                                    stats.recent_news.map((item) => (
                                        <tr key={item.id} className="hover:bg-brand-paper/50">
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <Thumbnail src={item.image} className="h-10 w-14 rounded-lg" />
                                                    <div className="min-w-0">
                                                        <Link
                                                            to={`/admin/berita/${item.id}`}
                                                            className="block font-semibold text-brand-ink hover:text-brand-darkred truncate"
                                                            title={item.title}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                        <span className="block text-xs text-brand-ink/60 truncate">
                                                            <span className="text-brand-darkred">{item.category}</span> · {formatDateTime(item.date)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-3">
                                                <StatusBadge status={item.status} />
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                <Link
                                                    to={`/admin/berita/${item.id}`}
                                                    className="inline-flex items-center h-8 px-3 rounded-full text-xs font-semibold bg-brand-softmist text-brand-ink hover:bg-brand-ink hover:text-white transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={`${cardClass} xl:col-span-5 p-6 flex flex-col`}>
                    <div className="flex items-start justify-between gap-4">
                        <SectionTitle>Status Publikasi</SectionTitle>
                        <span className="font-display text-2xl font-bold text-brand-ink">{total}</span>
                    </div>
                    <div className="mt-6 flex h-3 rounded-full overflow-hidden bg-brand-paper" role="img" aria-label="Komposisi status berita">
                        {statusRows.map(
                            (row) =>
                                row.value > 0 && (
                                    <div
                                        key={row.label}
                                        className={`${row.tone} h-full border-r-2 border-white last:border-r-0`}
                                        style={{ width: `${(row.value / total) * 100}%` }}
                                    />
                                )
                        )}
                    </div>
                    <ul className="mt-5 space-y-1">
                        {statusRows.map((row) => (
                            <li key={row.label}>
                                <Link to={row.to} className="flex items-center gap-3 text-sm rounded-lg px-2 py-1.5 -mx-2 hover:bg-brand-paper transition-colors">
                                    <span className={`w-2.5 h-2.5 rounded-full ${row.tone}`} />
                                    <span className="flex-1 text-brand-ink/80">{row.label}</span>
                                    <span className="font-display font-bold text-base text-brand-ink">{row.value}</span>
                                    <span className="w-10 text-right text-xs text-brand-ink/50">{percent(row.value)}%</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-5 pt-4 border-t border-brand-ink/10">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ink/50">Tambah Konten</span>
                        <ul className="mt-2 grid gap-1">
                            {quickActions.map((action) => (
                                <li key={action.to}>
                                    <Link
                                        to={action.to}
                                        className="group flex items-center gap-3 rounded-xl px-2 py-1.5 -mx-2 text-sm text-brand-ink hover:bg-brand-paper transition-colors"
                                    >
                                        <span className="w-8 h-8 rounded-lg bg-brand-darkred/[0.07] text-brand-darkred grid place-items-center shrink-0 group-hover:bg-brand-darkred group-hover:text-white transition-colors">
                                            <AdminIcon name={action.icon} className="w-4 h-4" />
                                        </span>
                                        <span className="flex-1">{action.label}</span>
                                        <AdminIcon name="chevronRight" className="w-4 h-4 text-brand-muted group-hover:text-brand-darkred transition-colors" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
