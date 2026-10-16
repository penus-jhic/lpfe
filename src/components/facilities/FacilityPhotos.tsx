import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from "react";
import Icon from "../Icon";
import ImageLightbox from "../ImageLightbox";
import type { Facility } from "../../data/facilities";

const AUTOPLAY_DELAY = 4000;

// Kotak foto fasilitas. Kalau fotonya lebih dari satu, foto berganti otomatis tiap beberapa detik dan muncul
// thumbnail untuk memilih foto; semua foto ditumpuk lalu dipudarkan bergantian. Kalau belum ada foto, tampil ikon fasilitas.
// className = rasio & sudut kotak, iconSize = ukuran ikon, thumbsPosition = letak deretan thumbnail,
// thumbSize = ukuran tiap thumbnail. children = lapisan di atas foto (mis. gradasi & nomor), di bawah thumbnail.
// zoomable = foto bisa diklik untuk dibuka besar (ImageLightbox), dimulai dari foto yang sedang tampil.
export default function FacilityPhotos({
    facility,
    className,
    iconSize,
    thumbsPosition = "right-3 bottom-3",
    thumbSize = "w-10 h-7",
    zoomable = false,
    children,
}: {
    facility: Facility;
    className: string;
    iconSize: string;
    thumbsPosition?: string;
    thumbSize?: string;
    zoomable?: boolean;
    children?: ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [onScreen, setOnScreen] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const { images, title } = facility;
    const canZoom = zoomable && images.length > 0;

    // Hanya berganti saat kotaknya terlihat. Setiap fasilitas dipasang dua kali (carousel HP & daftar desktop, salah
    // satunya disembunyikan) dan kartu carousel di luar layar juga tidak terlihat, jadi semua itu tidak ikut berganti.
    useEffect(() => {
        const el = ref.current;
        if (!el || images.length < 2) return;
        const observer = new IntersectionObserver(([entry]) => setOnScreen(entry?.isIntersecting ?? false));
        observer.observe(el);
        return () => observer.disconnect();
    }, [images.length]);

    // Timer dipasang ulang setiap foto berganti, jadi klik thumbnail juga mengulang hitungan. Berhenti selama
    // kursor/fokus ada di kotak foto, dan tidak jalan sama sekali kalau pengguna memilih kurangi gerakan.
    useEffect(() => {
        if (images.length < 2 || paused || zoomed || !onScreen) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const timer = window.setTimeout(() => setActive((i) => (i + 1) % images.length), AUTOPLAY_DELAY);
        return () => window.clearTimeout(timer);
    }, [active, paused, zoomed, onScreen, images.length]);

    // Pindah fokus antar-thumbnail tidak dihitung keluar dari kotak foto
    const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
    };

    return(
        <div
            ref={ref}
            className={`group relative overflow-hidden bg-linear-to-br from-brand-signal to-brand-deepred ${className}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={handleBlur}
        >
            {images.length > 0 ? (
                images.map((image, i) => (
                    <img
                        key={image.id}
                        src={image.url}
                        alt={images.length > 1 ? `${title} (foto ${i + 1} dari ${images.length})` : title}
                        aria-hidden={i !== active}
                        className={`absolute inset-0 w-full h-full object-cover transition-[opacity,scale] duration-500 group-hover:scale-105 ${
                            i === active ? "opacity-100" : "opacity-0"
                        }`}
                        loading="lazy"
                    />
                ))
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/15 transition-transform duration-500 group-hover:scale-110">
                    <Icon name={facility.icon} className={iconSize} />
                </div>
            )}

            {/* Tombol selebar foto, di bawah thumbnail supaya thumbnail tetap bisa diklik sendiri */}
            {canZoom && (
                <button
                    type="button"
                    onClick={() => setZoomed(true)}
                    aria-label={`Perbesar foto ${title}`}
                    className="absolute inset-0 cursor-zoom-in focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-white"
                >
                    {/* Penanda bisa diperbesar: selalu tampil di layar sentuh, muncul saat hover di desktop */}
                    <span
                        aria-hidden="true"
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-ink/55 text-white backdrop-blur-xs transition-[opacity,scale] duration-300 pointer-fine:opacity-0 pointer-fine:scale-90 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100"
                    >
                        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
                        </svg>
                    </span>
                </button>
            )}

            {children}

            {images.length > 1 && (
                <div className={`absolute flex gap-2 ${thumbsPosition}`}>
                    {images.map((image, i) => (
                        <button
                            key={image.id}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`Tampilkan foto ${i + 1} dari ${images.length}: ${title}`}
                            aria-pressed={i === active}
                            className={`overflow-hidden rounded-md shadow-md shadow-brand-ink/30 ring-2 transition ${thumbSize} ${
                                i === active ? "ring-white" : "ring-white/40 opacity-70 hover:opacity-100"
                            }`}
                        >
                            <img src={image.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </button>
                    ))}
                </div>
            )}

            {zoomed && (
                <ImageLightbox
                    images={images.map((image, i) => ({ url: image.url, alt: `${title} (foto ${i + 1} dari ${images.length})` }))}
                    startIndex={active}
                    title={title}
                    onClose={() => setZoomed(false)}
                />
            )}
        </div>
    )
}
