import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminIcon, { type AdminIconName } from "./AdminIcon";
import DashboardShortcuts from "./DashboardShortcuts";
import { SketchUnderline } from "../../components/SketchFrame";
import { useAuth } from "../auth/auth-context";
import { dashboardPath, type DashboardSummary } from "../lib/dashboard";
import type { Resource } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import logoSekolah from "../../assets/images/logosmkpenus.webp";

// Kerangka panel admin CMS. Tata letaknya (header, sidebar, Pintas Dashboard, kaki) sama dengan panel admin BKK & PPDB.

type NavItem = {
    to: string;
    label: string;
    icon: AdminIconName;
    end?: boolean;
};

const navGroups: { label: string; items: NavItem[] }[] = [
    {
        label: "Manajemen Konten",
        items: [
            { to: "/admin", label: "Dashboard", icon: "dashboard", end: true },
            { to: "/admin/berita", label: "Berita Sekolah", icon: "news" },
            { to: "/admin/program", label: "Program Unggulan", icon: "star" },
            { to: "/admin/talent-day", label: "Talent Day", icon: "sparkles" },
            { to: "/admin/ekskul", label: "Ekstrakurikuler", icon: "trophy" },
            { to: "/admin/fasilitas", label: "Fasilitas & Sarana", icon: "building" },
        ],
    },
    {
        label: "Pengaturan",
        items: [{ to: "/admin/akun", label: "Akun & Keamanan", icon: "user" }],
    },
];

const publicLinks: { href: string; label: string; icon: AdminIconName }[] = [
    { href: "/", label: "Beranda Sekolah", icon: "globe" },
    { href: "/berita", label: "Halaman Berita", icon: "news" },
    { href: "/fasilitas", label: "Halaman Fasilitas", icon: "building" },
    { href: "/kegiatan", label: "Kegiatan Siswa", icon: "trophy" },
];

const sectionLabel = "font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-darkred";

function SectionLabel({ children }: { children: string }) {
    return(
        <div className="px-3 pb-1.5 flex items-center gap-2">
            <span className={sectionLabel}>{children}</span>
            <span className="h-px flex-1 bg-brand-ink/10" />
        </div>
    )
}

function SideLink({ item }: { item: NavItem }) {
    return(
        <NavLink
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
                `group flex items-center justify-between gap-2 h-10 px-3 rounded-xl text-[13px] transition-colors ${
                    isActive ? "bg-brand-paper text-brand-darkred font-bold" : "text-brand-ink font-medium hover:bg-brand-paper"
                }`
            }
        >
            {({ isActive }) => (
                <span className="flex items-center gap-3 min-w-0">
                    <AdminIcon
                        name={item.icon}
                        className={`w-4 h-4 shrink-0 ${isActive ? "text-brand-darkred" : "text-brand-muted group-hover:text-brand-ink"}`}
                    />
                    {isActive ? <SketchUnderline size="sm">{item.label}</SketchUnderline> : <span className="truncate">{item.label}</span>}
                </span>
            )}
        </NavLink>
    )
}

export default function AdminLayout() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [search, setSearch] = useState("");
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = useApi<Resource<DashboardSummary>>(dashboardPath);
    const summary = data?.data;

    const profileRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);

    const displayName = user?.nama_lengkap ?? user?.name ?? user?.username ?? "Admin";
    const initials = displayName.trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("") || "AD";
    const roleLabel = (user?.role ?? "ADMIN").replace(/_/g, " ");

    // Antrean konten yang perlu ditangani, sama dengan isi "Perlu Tindakan" di dashboard
    const alerts = [
        { count: summary?.news.draft ?? 0, title: "Draf berita", desc: "Belum tampil di situs, tinjau lalu terbitkan.", to: "/admin/berita?status=draft" },
        { count: summary?.news.scheduled ?? 0, title: "Berita terjadwal", desc: "Akan terbit otomatis sesuai tanggalnya.", to: "/admin/berita?status=scheduled" },
    ].filter((alert) => alert.count > 0);
    const alertTotal = alerts.reduce((sum, alert) => sum + alert.count, 0);

    // Halaman Berita punya kotak pencariannya sendiri, jadi pencarian di header disembunyikan di sana
    const onNewsList = location.pathname === "/admin/berita";

    const submitSearch = (e: FormEvent) => {
        e.preventDefault();
        const query = search.trim();
        navigate(query ? `/admin/berita?search=${encodeURIComponent(query)}` : "/admin/berita");
        setSearch("");
    };

    // Sidebar mobile: tutup dengan Escape dan kunci scroll halaman selama terbuka
    useEffect(() => {
        if (!menuOpen) return;
        const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    // Dropdown: tutup saat klik di luar atau tekan Escape
    useEffect(() => {
        const onMouseDown = (e: MouseEvent) => {
            const target = e.target as Node;
            if (profileRef.current && !profileRef.current.contains(target)) setProfileOpen(false);
            if (notifRef.current && !notifRef.current.contains(target)) setNotifOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            setProfileOpen(false);
            setNotifOpen(false);
        };
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    // Pindah halaman menutup sidebar mobile & dropdown
    const [prevPath, setPrevPath] = useState(location.pathname);
    if (prevPath !== location.pathname) {
        setPrevPath(location.pathname);
        setProfileOpen(false);
        setNotifOpen(false);
        setMenuOpen(false);
    }

    const dropdownLink = "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-brand-ink hover:bg-brand-paper transition-colors";

    return (
        <div className="dash-theme min-h-screen flex flex-col font-sans antialiased">
            {/* HEADER */}
            <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur border-b border-brand-ink/10 flex items-center gap-2 px-3 sm:px-5">
                <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Buka menu"
                    className="lg:hidden w-10 h-10 rounded-full grid place-items-center hover:bg-brand-softmist text-brand-ink transition-colors"
                >
                    <AdminIcon name="menu" className="w-5 h-5" />
                </button>

                <Link to="/admin" className="flex items-center gap-2.5 group shrink-0" title="Dashboard CMS Portal Utama">
                    <img src={logoSekolah} alt="Logo SMK Plus Pelita Nusantara" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
                    <span className="hidden sm:flex flex-col">
                        <span className="font-display text-[15px] font-bold uppercase tracking-wide text-brand-ink leading-tight group-hover:text-brand-darkred transition-colors">
                            Portal Pelita Nusantara
                        </span>
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-brand-darkred mt-0.5">Panel Admin CMS</span>
                    </span>
                </Link>

                {/* Pencarian berita */}
                <div className="flex-1 max-w-xl mx-auto hidden md:block">
                    {!onNewsList && (
                        <form onSubmit={submitSearch} role="search">
                            <label className="flex items-center gap-3 h-10 rounded-full bg-brand-paper border border-brand-ink/10 focus-within:bg-white focus-within:border-brand-darkred focus-within:ring-4 focus-within:ring-brand-darkred/10 px-4 transition-all">
                                <AdminIcon name="search" className="w-4 h-4 text-brand-muted" />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berita berdasarkan judul atau isi…"
                                    aria-label="Cari berita"
                                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-brand-muted text-brand-ink"
                                />
                            </label>
                        </form>
                    )}
                </div>

                <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-semibold text-brand-ink bg-white border border-brand-ink/15 hover:bg-brand-softmist transition-colors"
                    >
                        <AdminIcon name="external" className="w-3.5 h-3.5 text-brand-darkred" />
                        <span>Web Publik</span>
                    </a>

                    {/* Notifikasi: antrean konten nyata dari API dashboard */}
                    <div className="relative" ref={notifRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setNotifOpen(!notifOpen);
                                setProfileOpen(false);
                            }}
                            aria-label={`Notifikasi (${alertTotal})`}
                            aria-haspopup="true"
                            aria-expanded={notifOpen}
                            className="relative w-10 h-10 rounded-full grid place-items-center hover:bg-brand-softmist text-brand-ink transition-colors"
                        >
                            <AdminIcon name="bell" className="w-5 h-5" />
                            {alertTotal > 0 && (
                                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-darkred text-white text-[10px] font-bold grid place-items-center ring-2 ring-white">
                                    {alertTotal > 99 ? "99+" : alertTotal}
                                </span>
                            )}
                        </button>

                        {notifOpen && (
                            <div className="absolute right-0 mt-2 w-[min(22rem,calc(100vw-1.5rem))] bg-white rounded-card border border-brand-ink/10 shadow-softpill overflow-hidden z-50 animate-fade-in">
                                <div className="px-4 py-3 border-b border-brand-ink/10 flex justify-between items-center bg-brand-paper">
                                    <span className="font-display uppercase tracking-wide text-sm text-brand-ink">Perlu Tindakan</span>
                                    <span className="text-[11px] text-brand-darkred font-bold bg-brand-darkred/10 px-2 py-0.5 rounded-full">{alertTotal} antrean</span>
                                </div>
                                <div className="divide-y divide-brand-ink/5 max-h-80 overflow-y-auto">
                                    {alerts.length > 0 ? (
                                        alerts.map((alert) => (
                                            <Link key={alert.title} to={alert.to} className="flex gap-3 px-4 py-3 hover:bg-brand-paper transition-colors">
                                                <span className="mt-0.5 min-w-7 h-7 px-1.5 rounded-full bg-brand-darkred text-white text-xs font-bold grid place-items-center shrink-0">
                                                    {alert.count}
                                                </span>
                                                <span>
                                                    <span className="block text-sm font-semibold text-brand-ink">{alert.title}</span>
                                                    <span className="block text-xs text-brand-muted mt-0.5">{alert.desc}</span>
                                                </span>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center">
                                            <AdminIcon name="checkCircle" className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                                            <p className="text-sm font-semibold text-brand-ink">Semua beres</p>
                                            <p className="text-xs text-brand-muted mt-0.5">Tidak ada konten yang menunggu tindakan.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profil */}
                    <div className="relative" ref={profileRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setProfileOpen(!profileOpen);
                                setNotifOpen(false);
                            }}
                            aria-label="Menu profil"
                            aria-haspopup="true"
                            aria-expanded={profileOpen}
                            className="flex items-center gap-2 h-10 pl-1 pr-1 sm:pr-3 rounded-full hover:bg-brand-softmist transition-colors"
                        >
                            {user?.foto_profil ? (
                                <img src={user.foto_profil} alt="" className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                                <span className="w-8 h-8 rounded-full grid place-items-center text-white text-xs font-bold bg-brand-darkred">{initials}</span>
                            )}
                            <span className="hidden sm:block text-left leading-tight">
                                <span className="block text-xs font-bold text-brand-ink max-w-[140px] truncate">{displayName}</span>
                                <span className="block text-[10px] font-semibold uppercase tracking-wider text-brand-muted">{roleLabel}</span>
                            </span>
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-72 bg-white rounded-card border border-brand-ink/10 shadow-softpill p-4 z-50 animate-fade-in">
                                <div className="text-center pb-3 border-b border-brand-ink/10">
                                    <div className="w-14 h-14 mx-auto rounded-full grid place-items-center text-white text-lg font-bold bg-brand-darkred">{initials}</div>
                                    <div className="mt-2 font-bold text-brand-ink text-sm">{displayName}</div>
                                    <div className="text-xs text-brand-muted">{user?.email ?? user?.username ?? "-"}</div>
                                    <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-softmist text-brand-ink">
                                        {roleLabel}
                                        {user?.nomor_induk ? ` · ${user.nomor_induk}` : ""}
                                    </div>
                                </div>

                                <div className="mt-3 space-y-0.5">
                                    <Link to="/admin" className={dropdownLink}>
                                        <AdminIcon name="dashboard" className="w-4 h-4 text-brand-muted" />
                                        <span>Dashboard Admin</span>
                                    </Link>
                                    <Link to="/admin/akun" className={dropdownLink}>
                                        <AdminIcon name="user" className="w-4 h-4 text-brand-muted" />
                                        <span>Profil Saya ({user?.username ?? "admin"})</span>
                                    </Link>
                                    <a href="/" target="_blank" rel="noreferrer" className={dropdownLink}>
                                        <AdminIcon name="external" className="w-4 h-4 text-brand-muted" />
                                        <span>Web Publik Sekolah</span>
                                    </a>
                                    <div className="pt-1 mt-1 border-t border-brand-ink/10">
                                        <button
                                            type="button"
                                            onClick={() => void logout()}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-brand-darkred hover:bg-brand-darkred/5 transition-colors"
                                        >
                                            <AdminIcon name="logout" className="w-4 h-4" />
                                            <span>Keluar Sesi</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
                {/* Backdrop sidebar mobile */}
                {menuOpen && <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-brand-ink/40 z-40 lg:hidden animate-fade-in" />}

                {/* SIDEBAR */}
                <aside
                    className={`w-[264px] shrink-0 fixed lg:sticky top-16 h-[calc(100vh-4rem)] left-0 z-40 bg-white border-r border-brand-ink/10 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
                        menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                    aria-label="Navigasi admin CMS"
                >
                    <div className="flex-1 overflow-y-auto p-3 space-y-5">
                        <Link
                            to="/admin/berita/baru"
                            className="flex items-center gap-3 h-12 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred text-white px-4 shadow-[0_4px_14px_0_rgba(122,16,24,0.25)] hover:shadow-[0_6px_20px_0_rgba(122,16,24,0.35)] hover:-translate-y-px transition-all"
                        >
                            <AdminIcon name="plus" className="w-4 h-4" />
                            <span className="text-sm font-semibold">Tulis Berita Baru</span>
                        </Link>

                        <nav className="space-y-0.5">
                            <SectionLabel>{navGroups[0].label}</SectionLabel>
                            {navGroups[0].items.map((item) => <SideLink key={item.to} item={item} />)}
                        </nav>

                        <nav className="space-y-0.5">
                            <SectionLabel>Halaman Publik</SectionLabel>
                            {publicLinks.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center justify-between h-10 px-3 rounded-xl text-[13px] font-medium text-brand-ink hover:bg-brand-paper transition-colors"
                                >
                                    <span className="flex items-center gap-3">
                                        <AdminIcon name={item.icon} className="w-4 h-4 text-brand-muted group-hover:text-brand-ink" />
                                        {item.label}
                                    </span>
                                    <AdminIcon name="arrowUpRight" className="w-3.5 h-3.5 text-brand-muted group-hover:text-brand-darkred" />
                                </a>
                            ))}
                        </nav>

                        <DashboardShortcuts current="cms" />

                        <nav className="space-y-0.5">
                            <SectionLabel>{navGroups[1].label}</SectionLabel>
                            {navGroups[1].items.map((item) => <SideLink key={item.to} item={item} />)}
                        </nav>
                    </div>

                    {/* Kaki sidebar */}
                    <div className="p-3 border-t border-brand-ink/10">
                        <a href="/" target="_blank" rel="noreferrer" className="group block rounded-card bg-brand-ink text-white p-4 relative overflow-hidden">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F5C2C7]">Situs Publik</span>
                            <span className="mt-1 flex items-center justify-between font-display text-base uppercase tracking-wide">
                                Web SMK Penus
                                <AdminIcon name="arrowUpRight" className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                        </a>
                    </div>
                </aside>

                {/* KONTEN */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </main>

                    <footer className="border-t border-brand-ink/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-ink/50">
                        <span>
                            <b className="text-brand-ink/80">Sistem Informasi Landing Page</b> &copy; {new Date().getFullYear()} SMK Plus Pelita Nusantara Bogor
                        </span>
                        <span>CMS Panel</span>
                    </footer>
                </div>
            </div>
        </div>
    );
}
