import { Link } from "react-router-dom";
import AdminIcon, { type AdminIconName } from "./AdminIcon";

// Pintas Dashboard: perpindahan antar panel admin sekolah (CMS landing page, BKK, PPDB).
// Isi & tampilan sama persis dengan bkk/ dan ppdb/ resources/views/partials/dashboard-shortcuts.blade.php, ubah ketiganya bersamaan.
type DashboardKey = "cms" | "bkk" | "ppdb";

const shortcuts: { key: DashboardKey; label: string; desc: string; icon: AdminIconName; href: string }[] = [
    { key: "cms", label: "CMS Portal Utama", desc: "Web & konten", icon: "globe", href: "/admin" },
    { key: "bkk", label: "Admin BKK", desc: "Bursa kerja & karier", icon: "briefcase", href: "/bkk/admin" },
    { key: "ppdb", label: "Admin PPDB", desc: "Penerimaan siswa", icon: "graduationCap", href: "/ppdb/dashboard" },
];

export default function DashboardShortcuts({ current }: { current: DashboardKey }) {
    return(
        <nav className="space-y-1" aria-label="Pintas dashboard">
            <div className="px-3 pb-1.5 flex items-center gap-2">
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-darkred">Pintas Dashboard</span>
                <span className="h-px flex-1 bg-brand-ink/10" />
            </div>
            {shortcuts.map((item) =>
                item.key === current ? (
                    <Link
                        key={item.key}
                        to={item.href}
                        aria-current="page"
                        className="flex items-center gap-3 px-2.5 py-2 rounded-xl bg-brand-ink text-white shadow-sm"
                    >
                        <span className="w-8 h-8 rounded-lg bg-white/10 grid place-items-center shrink-0">
                            <AdminIcon name={item.icon} className="w-4 h-4" />
                        </span>
                        <span className="min-w-0 flex-1 leading-tight">
                            <span className="block text-[13px] font-semibold truncate">{item.label}</span>
                            <span className="block text-[11px] text-white/60 truncate">{item.desc}</span>
                        </span>
                        <span className="shrink-0 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Aktif
                        </span>
                    </Link>
                ) : (
                    <a
                        key={item.key}
                        href={item.href}
                        className="group flex items-center gap-3 px-2.5 py-2 rounded-xl text-brand-ink hover:bg-brand-paper transition-colors"
                    >
                        <span className="w-8 h-8 rounded-lg bg-brand-paper border border-brand-ink/10 grid place-items-center shrink-0 text-brand-ink/60 group-hover:text-brand-darkred group-hover:border-brand-darkred/20 transition-colors">
                            <AdminIcon name={item.icon} className="w-4 h-4" />
                        </span>
                        <span className="min-w-0 flex-1 leading-tight">
                            <span className="block text-[13px] font-semibold truncate">{item.label}</span>
                            <span className="block text-[11px] text-brand-ink/50 truncate">{item.desc}</span>
                        </span>
                        <AdminIcon name="arrowUpRight" className="w-3.5 h-3.5 shrink-0 text-brand-ink/40 group-hover:text-brand-darkred transition-colors" />
                    </a>
                )
            )}
        </nav>
    )
}
