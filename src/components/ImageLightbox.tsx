import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type LightboxImage = {
    url: string;
    alt: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

// Tampilan foto layar penuh. Ditutup dengan tombol silang, klik di luar foto, atau Escape; kalau fotonya lebih
// dari satu bisa digeser dengan panah di layar, tombol panah keyboard, atau swipe di HP.
// Pakai <dialog> supaya fokus keyboard tertahan di dalamnya, dan di-portal ke <body> supaya tidak ikut
// transform/opacity kartu carousel tempat tombolnya berada. startIndex = foto yang dibuka pertama.
export default function ImageLightbox({ images, startIndex = 0, title, onClose }: {
    images: LightboxImage[];
    startIndex?: number;
    title: string;
    onClose: () => void;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const touchStartX = useRef<number | null>(null);
    const [index, setIndex] = useState(startIndex);
    const many = images.length > 1;
    const image = images[index];

    const go = (step: number) => setIndex((i) => (i + step + images.length) % images.length);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        // Tidak memanggil dialog.close() saat dilepas: event "close" yang dipicunya akan memanggil onClose lagi
        // (di StrictMode efek dijalankan dua kali, jadi foto langsung tertutup). Dialog yang dilepas dari halaman
        // sudah otomatis keluar dari lapisan atas.
        if (!dialog.open) dialog.showModal();
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        if (!many) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    });

    if (!image) return null;

    return createPortal(
        <dialog
            ref={dialogRef}
            aria-label={`Foto ${title}`}
            // Escape memicu "cancel" lalu "close"; keduanya diteruskan ke onClose supaya komponen ini dilepas
            onClose={onClose}
            // Klik di latar (bukan di foto atau tombol) = tutup
            onClick={(e) => e.target === e.currentTarget && onClose()}
            onTouchStart={(e) => (touchStartX.current = e.touches[0]?.clientX ?? null)}
            onTouchEnd={(e) => {
                const start = touchStartX.current;
                const end = e.changedTouches[0]?.clientX;
                touchStartX.current = null;
                if (!many || start == null || end == null || Math.abs(end - start) < 50) return;
                go(end < start ? 1 : -1);
            }}
            data-lenis-prevent
            className="size-full max-w-none max-h-none flex-col items-center justify-center bg-brand-ink/95 backdrop-blur-sm p-4 sm:p-8 text-white open:flex animate-fade-in backdrop:bg-transparent"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-4 sm:p-6">
                <p className="min-w-0 truncate text-left text-sm font-semibold text-white/90">
                    {title}
                    {many && (
                        <span className="ml-3 font-display tracking-wide">
                            <span className="text-brand-warmred">{pad(index + 1)}</span>
                            <span className="text-white/50"> / {pad(images.length)}</span>
                        </span>
                    )}
                </p>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup foto"
                    autoFocus
                    className="pointer-events-auto shrink-0 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* key: animasi muncul diulang setiap foto berganti */}
            <img
                key={image.url}
                src={image.url}
                alt={image.alt}
                className="max-h-[calc(100svh-9rem)] max-w-full rounded-card object-contain shadow-2xl shadow-black/50 animate-zoom-in select-none"
            />

            {many && (
                <>
                    <LightboxArrow direction="left" onClick={() => go(-1)} />
                    <LightboxArrow direction="right" onClick={() => go(1)} />
                </>
            )}
        </dialog>,
        document.body,
    );
}

function LightboxArrow({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
    const left = direction === "left";

    return(
        <button
            type="button"
            onClick={onClick}
            aria-label={left ? "Foto sebelumnya" : "Foto berikutnya"}
            className={`absolute bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                left ? "left-1/2 -translate-x-[calc(100%+0.5rem)] sm:left-6 sm:translate-x-0" : "right-1/2 translate-x-[calc(100%+0.5rem)] sm:right-6 sm:translate-x-0"
            }`}
        >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={left ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
            </svg>
        </button>
    )
}
