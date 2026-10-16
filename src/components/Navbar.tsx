import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems, ppdbLink, type MenuGroup, type MenuLink } from "../data/navigation";
import { useAuth } from "../admin/auth/auth-context";
import { dashboardLink, hasSession } from "../admin/auth/dashboard-link";
import { loadAdminApp } from "../admin/loadAdminApp";
import logoPenus from "/logo-penus.png";
import { SketchArrow, SketchUnderline } from "./SketchFrame";

type IsActive = (link: MenuLink) => boolean;

export default function Navbar() {
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    // Di paling atas halaman navbar berupa bar penuh, setelah discroll berubah jadi pill mengambang
    const [atTop, setAtTop] = useState(() => window.scrollY < 24);
    // Tombol Dasbor hanya untuk yang sudah masuk; pengunjung biasa tetap lewat link "Dashboard" di footer
    const { status } = useAuth();
    const dashboard = hasSession(status) ? dashboardLink(status) : null;
    // Kode panel admin mulai diunduh saat tombolnya disorot/disentuh, supaya dasbor langsung terbuka saat diklik
    const preloadDashboard = () => {
        if (dashboard?.href === "/admin") void loadAdminApp();
    };

    useEffect(() => {
        const onScroll = () => setAtTop(window.scrollY < 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isActive: IsActive = (link) =>
        !link.external && (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href));

    // Menu mobile pakai <dialog> supaya fokus keyboard tertahan di dalam menu & bisa ditutup dengan Escape
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!menuOpen || !dialog) return;

        dialog.showModal();
        document.body.style.overflow = "hidden";

        // Tutup sendiri kalau layar dilebarkan sampai ukuran desktop
        const desktop = window.matchMedia("(min-width: 64rem)");
        const closeOnDesktop = () => desktop.matches && setMenuOpen(false);
        desktop.addEventListener("change", closeOnDesktop);

        return () => {
            dialog.close();
            document.body.style.overflow = "";
            desktop.removeEventListener("change", closeOnDesktop);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return(
        <header className={`fixed left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 motion-reduce:transition-none ${
            atTop ? "top-0 px-0" : "top-6 px-4"
        }`}>
            {/* rounded-[2.5rem] (bukan rounded-full) supaya perubahan sudutnya ikut teranimasi dengan halus.
                Saat di atas, padding kiri-kanan menyamakan isi navbar dengan lebar konten halaman (max-w-6xl) */}
            <nav
                className={`pointer-events-auto w-full border flex items-center justify-between gap-4 transition-all duration-300 motion-reduce:transition-none ${
                    atTop
                        ? "max-w-full rounded-none bg-white border-transparent border-b-brand-ink/10 px-[max(1.5rem,calc((100%-72rem)/2))] py-3 md:py-4"
                        : "max-w-6xl rounded-[2.5rem] bg-brand-softmist border-brand-ink/10 shadow-softpill px-6 md:px-8 py-3 md:py-3.5"
                }`}
                aria-label="Navigasi Utama"
            >
                <Link to="/" className="flex items-center group">
                    <img
                        src={logoPenus}
                        alt="SMK Plus Pelita Nusantara"
                        className="h-10 sm:h-11 md:h-12 w-auto object-contain drop-shadow-xs group-hover:scale-105 transition-transform shrink-0"
                        loading="eager"
                    />
                </Link>

                <ul className="hidden lg:flex items-center gap-1 xl:gap-1.5">
                    {navItems.map((item) =>
                        "links" in item ? (
                            <NavDropdown key={item.label} group={item} isActive={isActive} />
                        ) : (
                            <li key={item.label}>
                                <Link
                                    to={item.href}
                                    reloadDocument={item.external}
                                    aria-current={isActive(item) ? "page" : undefined}
                                    className={`block px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                                        isActive(item)
                                            ? "text-brand-darkred"
                                            : "text-brand-ink/80 hover:text-brand-ink hover:bg-black/5"
                                    }`}
                                >
                                    {/* Menu aktif ditandai coretan bawah, bukan latar pill */}
                                    {isActive(item) ? <SketchUnderline size="sm">{item.label}</SketchUnderline> : item.label}
                                </Link>
                            </li>
                        )
                    )}
                </ul>

                <div className="flex items-center gap-2">
                    {dashboard && (
                        <Link
                            to={dashboard.href}
                            reloadDocument={dashboard.external}
                            onMouseEnter={preloadDashboard}
                            onFocus={preloadDashboard}
                            onTouchStart={preloadDashboard}
                            className="group hidden sm:inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-brand-darkred/25 bg-white px-4 py-2 text-sm font-semibold text-brand-darkred transition-colors hover:border-brand-darkred hover:bg-brand-darkred hover:text-white"
                        >
                            <DashboardIcon className="w-4 h-4" />
                            Dasbor
                        </Link>
                    )}

                    {/* Tombol utama: satu-satunya menu yang diberi warna penuh */}
                    <Link
                        to={ppdbLink.href}
                        reloadDocument
                        className="group hidden sm:inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-darkred/25 transition-shadow hover:shadow-lg hover:shadow-brand-darkred/30"
                    >
                        {ppdbLink.label}
                        <SketchArrow className="w-6 h-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        aria-haspopup="dialog"
                        aria-expanded={menuOpen}
                        className="lg:hidden p-2 rounded-full text-brand-ink hover:bg-black/5"
                        aria-label="Buka menu"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            <dialog
                ref={dialogRef}
                aria-label="Menu navigasi"
                onClose={closeMenu}
                // Lenis tidak ikut memproses scroll di dalam menu, jadi halaman di belakangnya tetap diam
                data-lenis-prevent
                className="pointer-events-auto size-full max-w-none max-h-none flex-col overscroll-contain bg-brand-darkred/95 backdrop-blur-lg p-6 sm:p-8 text-brand-mist open:flex"
            >
                <div className="flex items-center justify-between gap-4">
                    <Link to="/" onClick={closeMenu} className="flex items-center">
                        <img src={logoPenus} alt="SMK Plus Pelita Nusantara" className="h-10 w-auto object-contain drop-shadow shrink-0" />
                    </Link>
                    <button
                        type="button"
                        onClick={closeMenu}
                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white shrink-0"
                        aria-label="Tutup menu"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Rata atas (bukan di tengah) supaya menu tidak bergeser saat grup dibuka */}
                <ul className="flex flex-col gap-5 py-10 animate-fade-up">
                    {navItems.map((item) =>
                        "links" in item ? (
                            <MobileGroup key={item.label} group={item} isActive={isActive} onNavigate={closeMenu} />
                        ) : (
                            <li key={item.label}>
                                <Link
                                    to={item.href}
                                    reloadDocument={item.external}
                                    aria-current={isActive(item) ? "page" : undefined}
                                    onClick={closeMenu}
                                    className={`font-display text-3xl font-bold uppercase tracking-wide transition-colors ${
                                        isActive(item) ? "text-white" : "text-brand-mist/80 hover:text-white"
                                    }`}
                                >
                                    {isActive(item) ? (
                                        <SketchUnderline tone="text-brand-warmred">{item.label}</SketchUnderline>
                                    ) : (
                                        item.label
                                    )}
                                </Link>
                            </li>
                        )
                    )}
                </ul>

                <div className="mt-auto flex flex-col gap-3 border-t border-white/15 pt-6">
                    {dashboard && (
                        <Link
                            to={dashboard.href}
                            reloadDocument={dashboard.external}
                            onClick={closeMenu}
                            onTouchStart={preloadDashboard}
                            className="flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            <DashboardIcon className="w-4 h-4" />
                            Buka Dasbor
                        </Link>
                    )}
                    <Link
                        to={ppdbLink.href}
                        reloadDocument
                        className="group flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-darkred transition-colors hover:bg-brand-mist"
                    >
                        {ppdbLink.label}
                        <SketchArrow className="w-6 h-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </dialog>
        </header>
    )
}

function NavDropdown({ group, isActive }: { group: MenuGroup; isActive: IsActive }) {
    const [open, setOpen] = useState(false);
    // Kalau sudah terbuka karena hover, klik pertama di tombolnya jangan malah menutup menu
    const openedByHover = useRef(false);
    const itemRef = useRef<HTMLLIElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelId = useId();
    const active = group.links.some(isActive);

    // Tutup saat klik di luar menu atau tekan Escape
    useEffect(() => {
        if (!open) return;

        const onPointerDown = (e: PointerEvent) => {
            if (!itemRef.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            setOpen(false);
            buttonRef.current?.focus();
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    return(
        <li
            ref={itemRef}
            className="relative"
            onMouseEnter={() => {
                openedByHover.current = true;
                setOpen(true);
            }}
            onMouseLeave={() => {
                openedByHover.current = false;
                setOpen(false);
            }}
            onBlur={(e) => {
                // Fokus keyboard pindah ke luar menu (Tab)
                if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(false);
            }}
        >
            <button
                ref={buttonRef}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => {
                    if (openedByHover.current) {
                        openedByHover.current = false;
                        setOpen(true);
                    } else {
                        setOpen(!open);
                    }
                }}
                className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    active
                        ? `text-brand-darkred ${open ? "bg-black/5" : ""}`
                        : open
                            ? "bg-black/5 text-brand-darkred"
                            : "text-brand-ink/80 hover:text-brand-ink hover:bg-black/5"
                }`}
            >
                {active ? <SketchUnderline size="sm">{group.label}</SketchUnderline> : group.label}
                <Chevron className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            {/* pt-6 jadi "jembatan" supaya hover tidak putus saat kursor turun ke panel */}
            <div
                id={panelId}
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-6 transition-all duration-200 motion-reduce:transition-none ${
                    open ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
                }`}
            >
                <ul className="w-max min-w-52 rounded-card border border-brand-ink/10 bg-white p-2 shadow-softpill">
                    {group.links.map((link) => (
                        <li key={link.href}>
                            <Link
                                to={link.href}
                                reloadDocument={link.external}
                                aria-current={isActive(link) ? "page" : undefined}
                                onClick={() => setOpen(false)}
                                className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                    isActive(link)
                                        ? "bg-brand-darkred/10 text-brand-darkred"
                                        : "text-brand-ink/80 hover:bg-brand-softmist hover:text-brand-darkred"
                                }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    )
}

function MobileGroup({ group, isActive, onNavigate }: { group: MenuGroup; isActive: IsActive; onNavigate: () => void }) {
    const active = group.links.some(isActive);
    // Grup yang berisi halaman sekarang langsung terbuka
    const [open, setOpen] = useState(active);
    const panelId = useId();

    return(
        <li>
            <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen(!open)}
                className={`flex w-full items-center justify-between gap-4 font-display text-3xl font-bold uppercase tracking-wide transition-colors ${
                    active ? "text-white" : "text-brand-mist/80 hover:text-white"
                }`}
            >
                {group.label}
                <Chevron className={`w-6 h-6 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Trik grid-rows 0fr -> 1fr supaya tinggi panel bisa dianimasikan */}
            <div
                id={panelId}
                className={`grid transition-all duration-300 motion-reduce:transition-none ${
                    open ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <ul className="mt-4 flex flex-col border-l border-white/15">
                        {group.links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    to={link.href}
                                    reloadDocument={link.external}
                                    aria-current={isActive(link) ? "page" : undefined}
                                    onClick={onNavigate}
                                    className={`-ml-px block border-l-2 py-1.5 pl-5 text-lg font-medium transition-colors ${
                                        isActive(link)
                                            ? "border-brand-warmred text-white"
                                            : "border-transparent text-brand-mist/80 hover:text-white"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    )
}

function DashboardIcon({ className }: { className?: string }) {
    return(
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="9" rx="1.5" />
            <rect x="14" y="3" width="7" height="5" rx="1.5" />
            <rect x="14" y="12" width="7" height="9" rx="1.5" />
            <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
    )
}

function Chevron({ className }: { className?: string }) {
    return(
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}
